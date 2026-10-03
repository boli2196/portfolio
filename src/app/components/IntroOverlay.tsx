import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

// ── 인트로 종료 상태 (HomePage 타자 효과가 인트로 이후에 시작되도록 공유) ──
let introDone = false;
const listeners = new Set<() => void>();
function markIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((l) => l());
}
export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => introDone,
  );
}

function shouldPlay() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {}
  // 메인 주소로 들어올 때마다 재생 (프로젝트 상세 등 딥링크는 바로 보여줌)
  const hash = window.location.hash.replace(/^#/, "");
  return hash === "" || hash === "/";
}

// 태평양 중심 투영: 경도/위도 → viewBox(1000×600) 좌표
function project(lat: number, lon: number) {
  const l = ((lon - 150 + 540) % 360) - 180; // -180..180, 150°E가 중앙
  return { x: 470 + l * 4.3, y: 400 - lat * 7 };
}

const HQ = { name: "SEOUL", sub: "HQ", ...project(37.57, 126.98), coord: "37.57°N 126.98°E" };
const MARKETS = [
  { name: "MUMBAI", ...project(19.08, 72.88), coord: "19.08°N 72.88°E", lx: -14, ly: -22, anchor: "end" },
  { name: "KUALA LUMPUR", ...project(3.14, 101.69), coord: "03.14°N 101.69°E", lx: -16, ly: 30, anchor: "end" },
  { name: "SINGAPORE", ...project(1.35, 103.82), coord: "01.35°N 103.82°E", lx: 16, ly: 34, anchor: "start" },
  { name: "TAIPEI", ...project(25.03, 121.57), coord: "25.03°N 121.57°E", lx: 18, ly: 26, anchor: "start" },
  { name: "TEXAS", ...project(31.97, -99.9), coord: "31.97°N 99.90°W", lx: 10, ly: 32, anchor: "end" },
] as const;

// 다음 확산 대상 — 이름 없이 점선으로만 표시 (일부는 화면 밖으로 뻗어나감)
const NEXT = [
  project(25.2, 55.27),    // 중동
  project(13.75, 100.5),   // 동남아
  project(-6.2, 106.85),
  project(14.6, 121.0),
  project(35.68, 139.69),  // 동아시아
  project(49.28, -123.12), // 북미
  project(51.5, -0.12),    // 유럽 (화면 밖)
  project(-23.55, -46.63), // 남미 (화면 밖)
];

const CENTER = { x: 500, y: 300 };

// 본사 → 시장으로 휘어지는 연결선
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return `M ${from.x} ${from.y} Q ${mx} ${Math.max(20, my - dist * 0.25)} ${to.x} ${to.y}`;
}

type Phase = "map" | "converge" | "title" | "exit";

export function IntroOverlay() {
  const [visible, setVisible] = useState(() => shouldPlay());
  const [phase, setPhase] = useState<Phase>("map");

  useEffect(() => {
    if (!visible) { markIntroDone(); return; }
    document.documentElement.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setPhase("converge"), 2900),
      setTimeout(() => setPhase("title"), 3400),
      setTimeout(() => setPhase("exit"), 5200),
      setTimeout(() => finish(), 6100),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    document.documentElement.style.overflow = "";
    setVisible(false);
    markIntroDone();
  }

  function skip() {
    if (phase === "exit") return;
    setPhase("exit");
    setTimeout(finish, 900);
  }

  if (!visible) return null;

  const converging = phase !== "map";
  const exiting = phase === "exit";
  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="fixed inset-0 z-[9998] select-none" onClick={skip} role="presentation">
      {/* 위/아래로 갈라지며 사이트를 여는 셔터 */}
      {(["top", "bottom"] as const).map((side) => (
        <motion.div
          key={side}
          className="absolute left-0 w-full h-1/2 bg-black"
          style={{ [side]: 0 }}
          animate={exiting ? { y: side === "top" ? "-100%" : "100%" } : { y: 0 }}
          transition={{ duration: 0.9, ease }}
        />
      ))}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={exiting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <svg viewBox="0 0 1000 600" className="w-full h-full max-h-screen" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="intro-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <radialGradient id="intro-glow">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </radialGradient>
            <pattern id="intro-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="white" fillOpacity="0.09" />
            </pattern>
          </defs>

          {/* 도트 그리드 배경 */}
          <motion.rect
            width="1000" height="600" fill="url(#intro-dots)"
            initial={{ opacity: 0 }}
            animate={{ opacity: converging ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* 연결선 */}
          {MARKETS.map((m, i) => (
            <motion.path
              key={m.name}
              d={arc(HQ, m)}
              fill="none"
              stroke="url(#intro-line)"
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={converging ? { pathLength: 1, opacity: 0 } : { pathLength: 1, opacity: 0.9 }}
              transition={converging ? { duration: 0.35 } : { duration: 0.9, delay: 0.7 + i * 0.16, ease: "easeInOut" }}
            />
          ))}

          {/* 다음 확산 대상: 점선 연결 + 희미한 점 */}
          {NEXT.map((n, i) => (
            <motion.g key={`next-${i}`}>
              <motion.path
                d={arc(HQ, n)}
                fill="none"
                stroke="white"
                strokeOpacity={0.28}
                strokeWidth={0.8}
                strokeDasharray="3 5"
                initial={{ opacity: 0 }}
                animate={{ opacity: converging ? 0 : 1 }}
                transition={converging ? { duration: 0.3 } : { duration: 0.5, delay: 2.0 + i * 0.07 }}
              />
              <motion.circle
                r={2.5}
                fill="white"
                initial={{ cx: n.x, cy: n.y, opacity: 0 }}
                animate={converging ? { cx: CENTER.x, cy: CENTER.y, opacity: 0 } : { cx: n.x, cy: n.y, opacity: 0.45 }}
                transition={converging ? { duration: 0.55, ease: [0.7, 0, 0.3, 1] } : { duration: 0.4, delay: 2.2 + i * 0.07 }}
              />
            </motion.g>
          ))}

          {/* 본사 + 시장 노드 → 중앙으로 수렴 */}
          {[HQ, ...MARKETS].map((n, i) => {
            const isHQ = i === 0;
            const appear = isHQ ? 0.25 : 1.3 + (i - 1) * 0.16;
            const label = n as typeof MARKETS[number];
            return (
              <motion.g
                key={n.name}
                initial={{ x: n.x, y: n.y, opacity: 0 }}
                animate={converging ? { x: CENTER.x, y: CENTER.y, opacity: 0 } : { x: n.x, y: n.y, opacity: 1 }}
                transition={converging ? { duration: 0.55, ease: [0.7, 0, 0.3, 1], delay: i * 0.03 } : { duration: 0.4, delay: appear }}
              >
                <motion.circle
                  r={isHQ ? 18 : 12}
                  fill="none"
                  stroke={isHQ ? "#a78bfa" : "#60a5fa"}
                  strokeWidth={1}
                  initial={{ scale: 0.3, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: appear, ease: "easeOut" }}
                />
                <circle r={isHQ ? 5 : 3.5} fill="white" />
                <text
                  x={isHQ ? -16 : label.lx}
                  y={isHQ ? -18 : label.ly}
                  textAnchor={isHQ ? "end" : label.anchor}
                  fill="white"
                  style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: isHQ ? 22 : 17, letterSpacing: "0.12em" }}
                >
                  {n.name}{isHQ && <tspan fill="#a78bfa"> · HQ</tspan>}
                </text>
                <text
                  x={isHQ ? -16 : label.lx}
                  y={(isHQ ? -18 : label.ly) + 13}
                  textAnchor={isHQ ? "end" : label.anchor}
                  fill="white"
                  fillOpacity={0.35}
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 8.5, letterSpacing: "0.08em" }}
                >
                  {n.coord}
                </text>
              </motion.g>
            );
          })}

          {/* 수렴 지점의 빛 */}
          <motion.circle
            cx={CENTER.x} cy={CENTER.y} r={160}
            fill="url(#intro-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={converging ? { scale: [0, 1.4, 1], opacity: [0, 1, 0.55] } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: converging ? 0.45 : 0, times: [0, 0.4, 1] }}
          />
        </svg>

        {/* 상단 상태 표시 */}
        <motion.div
          className="absolute top-8 left-0 right-0 flex justify-between px-6 sm:px-10 font-mono text-[10px] tracking-[0.3em] uppercase text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{converging ? "One standard · any market" : "Connecting markets"}</span>
          <span className="hidden sm:inline">
            <Counter running={!converging} /> live <span className="text-white/20 mx-2">/</span> <span className="text-white">∞</span> next
          </span>
        </motion.div>

        {/* 타이틀 */}
        <AnimatePresence>
          {(phase === "title" || phase === "exit") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-white/50 mb-4"
                >
                  Built to scale · Anywhere
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.08 }}
                  className="leading-[0.9] text-white"
                  style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "0.02em" }}
                >
                  One{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Standard.
                  </span>
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 text-sm sm:text-base text-white/60"
              >
                어떤 나라든 확장할 수 있는 글로벌 표준을 만듭니다
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="mt-3 text-[11px] tracking-[0.3em] uppercase text-white/35"
              >
                이승진 · Global Commerce 기획 / PM
              </motion.p>
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={(e) => { e.stopPropagation(); skip(); }}
          className="absolute bottom-8 right-6 sm:right-10 font-mono text-[10px] tracking-[0.3em] uppercase text-white/35 hover:text-white transition-colors"
        >
          Skip →
        </button>
      </motion.div>
    </div>
  );
}

// 시장이 하나씩 연결될 때 올라가는 카운터 (00 → 05)
function Counter({ running }: { running: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!running) return;
    const timers = MARKETS.map((_, i) => setTimeout(() => setN(i + 1), 1300 + i * 160));
    return () => timers.forEach(clearTimeout);
  }, [running]);
  return <span className="text-white">{String(n).padStart(2, "0")}</span>;
}
