import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  BEBAS, EASE_IO, EASE_OUT, GRADIENT, MONO, gradientText,
  IntroShell, SceneWrap, Wipe, useTimeline,
} from "./shared";

// ── 타임라인 (ms) : 런칭 영상처럼 장면이 빠르게 컷 전환된다 ──
type Scene = "kinetic" | "assemble" | "numbers" | "map" | "converge" | "title" | "exit";
const TIMELINE = [
  ["assemble", 2300],
  ["numbers", 5300],
  ["map", 7700],
  ["converge", 10300],
  ["title", 10800],
  ["exit", 13300],
] as const satisfies readonly (readonly [Scene, number])[];
const END = 14200;
const SCENE_LABEL: Record<Scene, string> = {
  kinetic: "01 — Intro",
  assemble: "02 — Standard",
  numbers: "03 — Track record",
  map: "04 — Markets",
  converge: "05 — One standard",
  title: "05 — One standard",
  exit: "05 — One standard",
};

// "One Standard." 인트로: 글로벌 표준 모델을 중심으로 한 버전
export function StandardIntro({ onFinish }: { onFinish: () => void }) {
  const { scene, skip } = useTimeline<Scene>(TIMELINE, "kinetic", "exit", END, onFinish);
  const onMap = scene === "map" || scene === "converge" || scene === "title" || scene === "exit";

  return (
    <IntroShell exiting={scene === "exit"} label={SCENE_LABEL[scene]} totalMs={TIMELINE[TIMELINE.length - 1][1]} onSkip={skip}>
      <AnimatePresence>
        {scene === "kinetic" && <SceneWrap key="kinetic"><KineticScene /></SceneWrap>}
        {scene === "assemble" && <SceneWrap key="assemble"><AssembleScene /></SceneWrap>}
        {scene === "numbers" && <SceneWrap key="numbers"><NumbersScene /></SceneWrap>}
        {onMap && <SceneWrap key="map"><MapScene converging={scene !== "map"} /></SceneWrap>}
      </AnimatePresence>

      {/* 장면 전환 와이프 */}
      <AnimatePresence>
        {(scene === "assemble" || scene === "numbers" || scene === "map") && <Wipe key={`wipe-${scene}`} />}
      </AnimatePresence>

      <AnimatePresence>
        {(scene === "title" || scene === "exit") && <TitleCard />}
      </AnimatePresence>
    </IntroShell>
  );
}

// ─────────────────────────────────────────────────────────────
// 01. 키네틱 타이포: 비트마다 단어가 꽂히고 마지막에 "Anywhere."
// ─────────────────────────────────────────────────────────────
const BEATS = [
  { word: "Plan.", flash: "#60a5fa" },
  { word: "Build.", flash: "#a78bfa" },
  { word: "Launch.", flash: "#f472b6" },
  { word: "Scale.", flash: "#fbbf24" },
  { word: "Anywhere.", flash: "#ffffff" },
];
const BEAT_MS = 380;

function KineticScene() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const ts = BEATS.slice(1).map((_, k) => setTimeout(() => setI(k + 1), 250 + (k + 1) * BEAT_MS));
    return () => ts.forEach(clearTimeout);
  }, []);
  const beat = BEATS[i];
  const last = i === BEATS.length - 1;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* 비트 플래시 */}
      <AnimatePresence>
        <motion.div
          key={`flash-${i}`}
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at center, ${beat.flash}55 0%, transparent 60%)` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* 비트마다 퍼지는 링 */}
      <AnimatePresence>
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border"
          style={{ width: 240, height: 240, borderColor: beat.flash }}
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="relative" style={{ fontFamily: BEBAS, fontSize: "clamp(5rem, 20vw, 17rem)", lineHeight: 0.85 }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={i}
            className="relative text-center"
            initial={{ scale: 1.9, opacity: 0, filter: "blur(14px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.34, ease: EASE_OUT }}
          >
            {/* 아웃라인 에코 */}
            {[-1, 1].map((d) => (
              <motion.span
                key={d}
                aria-hidden
                className="absolute inset-0 whitespace-nowrap"
                style={{ color: "transparent", WebkitTextStroke: `1px ${beat.flash}` }}
                initial={{ y: 0, opacity: 0.8 }}
                animate={{ y: `${d * 0.42}em`, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                {beat.word}
              </motion.span>
            ))}
            <span className="relative whitespace-nowrap text-white" style={last ? gradientText : undefined}>
              {beat.word}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {last && (
        <motion.p
          className="absolute left-0 right-0 text-center text-[11px] sm:text-xs tracking-[0.5em] uppercase text-white/55"
          style={{ top: "calc(50% + clamp(3rem, 11vw, 9rem))" }}
          initial={{ opacity: 0, letterSpacing: "1.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          Global commerce · 기획 / PM
        </motion.p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02. 표준 조립: 쇼핑몰 화면이 블록 단위로 조립되고,
//     국가가 바뀔 때 공통 블록은 그대로, 현지화 블록만 교체된다
// ─────────────────────────────────────────────────────────────
type Tier = "common" | "variable" | "module" | "dedicated";
const TIERS: Record<Tier, { ko: string; en: string; color: string }> = {
  common: { ko: "공통", en: "Common", color: "#60a5fa" },
  variable: { ko: "변수", en: "Variable", color: "#a78bfa" },
  module: { ko: "모듈", en: "Module", color: "#f472b6" },
  dedicated: { ko: "전용", en: "Dedicated", color: "#fbbf24" },
};
const LOCALES = [
  { code: "IN", price: "₹ 24,990", lang: "EN" },
  { code: "SG", price: "S$ 389", lang: "EN" },
  { code: "MY", price: "RM 1,299", lang: "EN · MS" },
  { code: "TW", price: "NT$ 9,900", lang: "繁中" },
];
const BLOCKS: { id: string; tier: Tier; span: string; h: string; from: { x: number; y: number }; label: string }[] = [
  { id: "header", tier: "common", span: "col-span-12", h: "h-8 sm:h-10", from: { x: 0, y: -160 }, label: "Global header" },
  { id: "hero", tier: "variable", span: "col-span-8", h: "h-24 sm:h-32", from: { x: -320, y: 0 }, label: "Hero · price" },
  { id: "promo", tier: "module", span: "col-span-4", h: "h-24 sm:h-32", from: { x: 320, y: 0 }, label: "Local promo" },
  { id: "p1", tier: "common", span: "col-span-4", h: "h-14 sm:h-20", from: { x: -120, y: 220 }, label: "Product" },
  { id: "p2", tier: "common", span: "col-span-4", h: "h-14 sm:h-20", from: { x: 0, y: 260 }, label: "Product" },
  { id: "p3", tier: "common", span: "col-span-4", h: "h-14 sm:h-20", from: { x: 120, y: 220 }, label: "Product" },
  { id: "id", tier: "common", span: "col-span-6", h: "h-10 sm:h-12", from: { x: -260, y: 120 }, label: "Unified ID" },
  { id: "checkout", tier: "dedicated", span: "col-span-6", h: "h-10 sm:h-12", from: { x: 260, y: 120 }, label: "Local checkout" },
];

function AssembleScene() {
  const [loc, setLoc] = useState(0);
  useEffect(() => {
    // 조립이 끝난 뒤 국가를 빠르게 순환
    const ts = LOCALES.slice(1).map((_, k) => setTimeout(() => setLoc(k + 1), 1500 + k * 420));
    return () => ts.forEach(clearTimeout);
  }, []);
  const L = LOCALES[loc];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      <div className="overflow-hidden mb-5">
        <motion.p
          className="text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-white/50 text-center"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
        >
          One standard <span className="text-white/25">·</span> local where it matters
        </motion.p>
      </div>

      {/* 브라우저 창 */}
      <motion.div
        className="relative w-[min(92vw,720px)] rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
        initial={{ clipPath: "inset(50% 50% 50% 50% round 12px)", rotateX: 18, y: 30 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 12px)", rotateX: 0, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_IO }}
        style={{ transformPerspective: 1200 }}
      >
        <div className="flex items-center gap-2 px-3 h-8 border-b border-white/10">
          {["#f87171", "#fbbf24", "#34d399"].map((c) => (
            <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
          <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.06] flex items-center px-2 font-mono text-[10px] text-white/50 overflow-hidden">
            store /&nbsp;
            <AnimatePresence mode="popLayout">
              <motion.span
                key={L.code}
                className="text-white"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {L.code.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-mono text-[10px] text-white/40 w-14 text-right">{L.lang}</span>
        </div>

        <div className="grid grid-cols-12 gap-2 p-3">
          {BLOCKS.map((b, i) => {
            const t = TIERS[b.tier];
            const local = b.tier !== "common";
            return (
              <motion.div
                key={b.id}
                className={`${b.span} ${b.h} relative rounded-md border overflow-hidden`}
                style={{ borderColor: `${t.color}66`, background: `${t.color}12` }}
                initial={{ x: b.from.x, y: b.from.y, opacity: 0, rotate: b.from.x / 40 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.45 + i * 0.07 }}
              >
                {/* 국가가 바뀌면 현지화 블록만 번쩍 */}
                {local && (
                  <motion.div
                    key={`hit-${L.code}`}
                    className="absolute inset-0"
                    style={{ background: t.color }}
                    initial={{ opacity: loc === 0 ? 0 : 0.55 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  />
                )}
                <div className="absolute top-1.5 left-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-white/55">{b.label}</span>
                </div>
                {b.id === "hero" ? (
                  <div className="absolute bottom-2 left-2 right-2 h-8 sm:h-10 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={L.code}
                        className="block whitespace-nowrap text-white text-2xl sm:text-4xl"
                        style={{ fontFamily: BEBAS }}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      >
                        {L.price}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ) : b.id === "checkout" || b.id === "promo" ? (
                  <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-white/80">{L.code}</span>
                ) : (
                  <div className="absolute bottom-2 left-2 right-2 space-y-1">
                    <div className="h-1 rounded bg-white/15 w-3/4" />
                    <div className="h-1 rounded bg-white/10 w-1/2" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 4단계 분류 범례 */}
      <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {(Object.keys(TIERS) as Tier[]).map((k, i) => (
          <motion.span
            key={k}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.08 }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: TIERS[k].color }} />
            {TIERS[k].ko} <span className="text-white/30">{TIERS[k].en}</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03. 숫자: 타일이 마스크로 열리며 카운트업
// ─────────────────────────────────────────────────────────────
const STATS = [
  { n: 13, unit: "Years", ko: "커머스 기획" },
  { n: 4, unit: "Markets", ko: "해외 법인" },
  { n: 12, unit: "Domains", ko: "표준 도메인" },
  { n: 98, unit: "Items", ko: "현지화 분류" },
];

function NumbersScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 w-[min(92vw,1100px)] border-l border-t border-white/10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.unit}
            className="relative border-r border-b border-white/10 px-5 py-6 sm:px-7 sm:py-9 overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.55, ease: EASE_IO, delay: 0.2 + i * 0.12 }}
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/35 mb-2">0{i + 1}</div>
            <div className="text-white leading-none" style={{ fontFamily: BEBAS, fontSize: "clamp(4rem, 11vw, 9rem)" }}>
              <CountUp to={s.n} delay={350 + i * 120} pad={2} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg sm:text-2xl tracking-[0.08em] uppercase" style={{ fontFamily: BEBAS, ...gradientText }}>
                {s.unit}
              </span>
              <span className="text-xs text-white/50">{s.ko}</span>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
              style={{ background: GRADIENT }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 + i * 0.12 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CountUp({ to, delay, pad, duration = 900 }: { to: number; delay: number; pad: number; duration?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min(1, (now - start) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to, delay, duration]);
  return <span className="tabular-nums">{String(n).padStart(pad, "0")}</span>;
}

// ─────────────────────────────────────────────────────────────
// 04~05. 지도: 본사 → 시장 연결, 이후 중앙으로 수렴
// ─────────────────────────────────────────────────────────────

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
const T = 0.8; // 지도 장면 시간 압축 비율

// 본사 → 시장으로 휘어지는 연결선
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return `M ${from.x} ${from.y} Q ${mx} ${Math.max(20, my - dist * 0.25)} ${to.x} ${to.y}`;
}

function MapScene({ converging }: { converging: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 1000 600"
        className="w-full h-full max-h-screen"
        preserveAspectRatio="xMidYMid meet"
        initial={{ scale: 1.25 }}
        animate={{ scale: converging ? 1.05 : 1 }}
        transition={{ duration: converging ? 0.6 : 2.6, ease: EASE_OUT }}
      >
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
            transition={converging ? { duration: 0.35 } : { duration: 0.8, delay: T * (0.5 + i * 0.16), ease: "easeInOut" }}
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
              transition={converging ? { duration: 0.3 } : { duration: 0.5, delay: T * (1.8 + i * 0.07) }}
            />
            <motion.circle
              r={2.5}
              fill="white"
              initial={{ cx: n.x, cy: n.y, opacity: 0 }}
              animate={converging ? { cx: CENTER.x, cy: CENTER.y, opacity: 0 } : { cx: n.x, cy: n.y, opacity: 0.45 }}
              transition={converging ? { duration: 0.55, ease: [0.7, 0, 0.3, 1] } : { duration: 0.4, delay: T * (2.0 + i * 0.07) }}
            />
          </motion.g>
        ))}

        {/* 본사 + 시장 노드 → 중앙으로 수렴 */}
        {[HQ, ...MARKETS].map((n, i) => {
          const isHQ = i === 0;
          const appear = T * (isHQ ? 0.15 : 1.1 + (i - 1) * 0.16);
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
                style={{ fontFamily: BEBAS, fontSize: isHQ ? 22 : 17, letterSpacing: "0.12em" }}
              >
                {n.name}{isHQ && <tspan fill="#a78bfa"> · HQ</tspan>}
              </text>
              <text
                x={isHQ ? -16 : label.lx}
                y={(isHQ ? -18 : label.ly) + 13}
                textAnchor={isHQ ? "end" : label.anchor}
                fill="white"
                fillOpacity={0.35}
                style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em" }}
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
      </motion.svg>
    </div>
  );
}

function TitleCard() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: EASE_IO }}
          className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-white/50 mb-4"
        >
          Built to scale · Anywhere
        </motion.p>
      </div>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: EASE_IO, delay: 0.08 }}
          className="leading-[0.9] text-white"
          style={{ fontFamily: BEBAS, fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "0.02em" }}
        >
          One <span style={gradientText}>Standard.</span>
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
  );
}
