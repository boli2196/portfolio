import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 터치 디바이스에서는 숨김
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      dotRef.current && (dotRef.current.style.opacity = "1");
      ringRef.current && (ringRef.current.style.opacity = "1");
    };

    const onMouseLeave = () => {
      dotRef.current && (dotRef.current.style.opacity = "0");
      ringRef.current && (ringRef.current.style.opacity = "0");
    };

    const onMouseDown = () => {
      ringRef.current && (ringRef.current.style.transform += " scale(0.8)");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      {/* 작은 점 */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-sky-400 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{ transition: "opacity 0.3s", boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
      />
      {/* 따라오는 링 */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-sky-400/60 pointer-events-none z-[9999] opacity-0"
        style={{ transition: "opacity 0.3s", boxShadow: "0 0 8px rgba(56,189,248,0.3)" }}
      />
    </>
  );
}
