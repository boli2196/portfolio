import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ── 인트로 공통 스타일 ──
export const GRADIENT = "linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)";
export const BEBAS = '"Bebas Neue", sans-serif';
export const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
export const EASE_IO = [0.76, 0, 0.24, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

// 장면 타임라인 재생. skip 하면 남은 컷을 모두 취소하고 바로 퇴장 장면으로 간다
export function useTimeline<S extends string>(
  timeline: readonly (readonly [S, number])[],
  first: S,
  exitScene: S,
  end: number,
  onFinish: () => void,
) {
  const [scene, setScene] = useState<S>(first);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current = [
      ...timeline.map(([s, at]) => setTimeout(() => setScene(s), at)),
      setTimeout(onFinish, end),
    ];
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    if (scene === exitScene) return;
    timers.current.forEach(clearTimeout);
    setScene(exitScene);
    timers.current = [setTimeout(onFinish, 900)];
  }

  return { scene, skip };
}

// 셔터 + 그레인 + HUD + Skip 버튼을 감싸는 틀
export function IntroShell({
  exiting, label, totalMs, onSkip, children,
}: { exiting: boolean; label: string; totalMs: number; onSkip: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[9998] select-none overflow-hidden" onClick={onSkip} role="presentation">
      {/* 위/아래로 갈라지며 사이트를 여는 셔터 */}
      {(["top", "bottom"] as const).map((side) => (
        <motion.div
          key={side}
          className="absolute left-0 w-full h-1/2 bg-black"
          style={{ [side]: 0 }}
          animate={exiting ? { y: side === "top" ? "-100%" : "100%" } : { y: 0 }}
          transition={{ duration: 0.9, ease: EASE_IO }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        animate={exiting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_IO }}
      >
        {children}
        <Grain />
        <Hud label={label} totalMs={totalMs} />
        <button
          onClick={(e) => { e.stopPropagation(); onSkip(); }}
          className="absolute bottom-8 right-6 sm:right-10 font-mono text-[10px] tracking-[0.3em] uppercase text-white/35 hover:text-white transition-colors"
        >
          Skip →
        </button>
      </motion.div>
    </div>
  );
}

export function SceneWrap({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

// 비스듬한 그라디언트 띠가 화면을 가로지르며 컷을 덮는다
export function Wipe() {
  return (
    <motion.div
      className="absolute inset-y-[-20%] w-[45vw] pointer-events-none z-10"
      style={{ background: GRADIENT, skewX: -16, boxShadow: "0 0 80px 20px rgba(167,139,250,0.35)" }}
      initial={{ x: "-60vw" }}
      animate={{ x: "160vw" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_IO }}
    />
  );
}

// 필름 그레인 + 비네팅
function Grain() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)" }}
      />
    </>
  );
}

// 쇼릴 HUD: 타임코드, 장면 라벨, 진행 바
function Hud({ label, totalMs }: { label: string; totalMs: number }) {
  const tcRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const ms = performance.now() - start;
      const s = Math.floor(ms / 1000);
      const f = Math.floor((ms % 1000) / (1000 / 24));
      if (tcRef.current) {
        tcRef.current.textContent = `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
      <motion.div
        className="absolute top-8 left-0 right-0 flex justify-between px-6 sm:px-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span className="flex items-center gap-2">
          <span className="on-air-dot inline-block w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
          Lee Seung-jin<span className="hidden sm:inline"> · Reel 2026</span>
        </span>
        <span ref={tcRef} className="text-white/60 tabular-nums">00:00:00:00</span>
      </motion.div>
      <div className="absolute bottom-8 left-6 sm:left-10 overflow-hidden h-4">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={label}
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{ background: GRADIENT }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: totalMs / 1000, ease: "linear" }}
      />
    </div>
  );
}
