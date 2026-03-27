import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 80;

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  variant?: "card" | "fullscreen";
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  const sx = (w - sw) / 2;
  const sy = (h - sh) / 2;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, sx, sy, sw, sh);
}

export function ScrollVideoCanvas({ containerRef, className, variant = "card" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(-1);
  const base = import.meta.env.BASE_URL;

  // For fullscreen: keep canvas dimensions in sync with container
  useEffect(() => {
    if (variant !== "fullscreen") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      const frameIdx = Math.max(0, currentFrameRef.current);
      const img = imagesRef.current[frameIdx];
      const ctx = canvas.getContext("2d");
      if (img && ctx) drawCover(ctx, img, w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
  }, [variant]);

  // Preload all frames
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `${base}frames/frame_${frameNum}.webp`;
      const index = i;
      img.onload = () => {
        imagesRef.current[index] = img;
        count++;
        setLoadedCount(count);
        if (index === 0) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) {
            if (variant === "fullscreen") {
              drawCover(ctx, img, canvas.width || img.naturalWidth, canvas.height || img.naturalHeight);
            } else {
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              ctx.drawImage(img, 0, 0);
            }
          }
        }
      };
    }
  }, [base, variant]);

  // Scroll-driven frame update
  useEffect(() => {
    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[frameIndex];
      if (!canvas || !ctx || !img) return;

      if (variant === "fullscreen") {
        drawCover(ctx, img, canvas.width, canvas.height);
      } else {
        if (canvas.width !== img.naturalWidth) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        ctx.drawImage(img, 0, 0);
      }
      currentFrameRef.current = frameIndex;
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, variant]);

  const isLoaded = loadedCount === TOTAL_FRAMES;
  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  if (variant === "fullscreen") {
    return (
      <div className={`absolute inset-0 ${className ?? ""}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: loadedCount > 0 ? 1 : 0, transition: "opacity 0.6s" }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/60 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-white/40">{progress}%</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl shadow-2xl"
        style={{ opacity: loadedCount > 0 ? 1 : 0, transition: "opacity 0.3s" }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-2xl">
          <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{progress}%</span>
        </div>
      )}
    </div>
  );
}
