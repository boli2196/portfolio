import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  BEBAS, EASE_IO, EASE_OUT, GRADIENT, MONO, gradientText,
  IntroShell, SceneWrap, Wipe, useTimeline,
} from "./shared";

// ── 타임라인 (ms) : 기획자가 일하는 순서대로 컷이 넘어간다 ──
type Scene = "process" | "chaos" | "flow" | "spec" | "launch" | "title" | "exit";
const TIMELINE = [
  ["chaos", 2600],
  ["flow", 5300],
  ["spec", 7900],
  ["launch", 10300],
  ["title", 11500],
  ["exit", 13700],
] as const satisfies readonly (readonly [Scene, number])[];
const END = 14600;
const SCENE_LABEL: Record<Scene, string> = {
  process: "01 — Process",
  chaos: "02 — Structure",
  flow: "03 — Flow",
  spec: "04 — Spec",
  launch: "05 — Launch",
  title: "05 — Launch",
  exit: "05 — Launch",
};
const BLUE = "#60a5fa";
const VIOLET = "#a78bfa";
const PINK = "#f472b6";

// "Plan → Launch." 인트로: 기획자의 일하는 방식(발견 → 구조화 → 흐름 → 문서 → 런칭) 중심
export function PlannerIntro({ onFinish }: { onFinish: () => void }) {
  const { scene, skip } = useTimeline<Scene>(TIMELINE, "process", "exit", END, onFinish);

  return (
    <IntroShell exiting={scene === "exit"} label={SCENE_LABEL[scene]} totalMs={TIMELINE[TIMELINE.length - 1][1]} onSkip={skip}>
      <AnimatePresence>
        {scene === "process" && <SceneWrap key="process"><ProcessScene /></SceneWrap>}
        {scene === "chaos" && <SceneWrap key="chaos"><ChaosScene /></SceneWrap>}
        {scene === "flow" && <SceneWrap key="flow"><FlowScene /></SceneWrap>}
        {scene === "spec" && <SceneWrap key="spec"><SpecScene /></SceneWrap>}
        {scene === "launch" && <SceneWrap key="launch"><LaunchScene /></SceneWrap>}
      </AnimatePresence>

      <AnimatePresence>
        {(scene === "chaos" || scene === "flow" || scene === "spec" || scene === "launch") && <Wipe key={`wipe-${scene}`} />}
      </AnimatePresence>

      <AnimatePresence>
        {(scene === "title" || scene === "exit") && <TitleCard />}
      </AnimatePresence>
    </IntroShell>
  );
}

function Caption({ en, ko, delay = 0.15 }: { en: string; ko: string; delay?: number }) {
  return (
    <div className="text-center mb-5 sm:mb-7 px-4">
      <div className="overflow-hidden">
        <motion.p
          className="text-white"
          style={{ fontFamily: BEBAS, fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1, letterSpacing: "0.02em" }}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay }}
        >
          {en}
        </motion.p>
      </div>
      <motion.p
        className="mt-2 text-xs sm:text-sm text-white/50"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.25 }}
      >
        {ko}
      </motion.p>
    </div>
  );
}

// 마우스 커서 아이콘
function CursorIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 14 20" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
      <path d="M1 1 L1 16 L5 12.5 L8 19 L10.5 18 L7.5 11.5 L13 11.5 Z" fill="white" stroke="black" strokeWidth={1} strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 01. 프로세스: 더블 다이아몬드가 그려지고 점이 단계를 따라 달린다
// ─────────────────────────────────────────────────────────────
const PHASES = [
  { en: "Discover", ko: "발견", x: 200 },
  { en: "Define", ko: "정의", x: 400 },
  { en: "Design", ko: "설계", x: 600 },
  { en: "Deliver", ko: "런칭", x: 800 },
];
const RUN_DELAY = 0.7;
const RUN_DUR = 1.6;

function ProcessScene() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Caption en="From question to launch." ko="문제를 찾고, 정의하고, 설계하고, 런칭합니다" />
      <svg viewBox="0 0 1000 420" className="w-[min(96vw,1000px)]">
        <defs>
          <linearGradient id="pl-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BLUE} />
            <stop offset="50%" stopColor={VIOLET} />
            <stop offset="100%" stopColor={PINK} />
          </linearGradient>
          <linearGradient id="pl-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.12" />
            <stop offset="100%" stopColor={PINK} stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {["M100 210 L300 70 L500 210 L300 350 Z", "M500 210 L700 70 L900 210 L700 350 Z"].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="url(#pl-fill)"
            stroke="url(#pl-line)"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ pathLength: { duration: 0.9, ease: EASE_IO, delay: 0.1 + i * 0.25 }, fillOpacity: { duration: 0.6, delay: 0.9 } }}
          />
        ))}
        {[300, 700].map((x, i) => (
          <motion.line
            key={x}
            x1={x} x2={x} y1={70} y2={350}
            stroke="white" strokeOpacity={0.18} strokeDasharray="3 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
          />
        ))}

        {PHASES.map((p, k) => {
          const at = RUN_DELAY + (RUN_DUR / 4) * (k + 0.5);
          return (
            <motion.g
              key={p.en}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: at }}
            >
              <text x={p.x} y={208} textAnchor="middle" fill="white" style={{ fontFamily: BEBAS, fontSize: 34, letterSpacing: "0.06em" }}>
                {p.en}
              </text>
              <text x={p.x} y={232} textAnchor="middle" fill="white" fillOpacity={0.5} style={{ fontSize: 14 }}>
                {String(k + 1).padStart(2, "0")} · {p.ko}
              </text>
            </motion.g>
          );
        })}

        {/* 단계를 따라 달리는 점 + 잔상 */}
        {[0, 0.06, 0.12].map((lag, i) => (
          <motion.circle
            key={lag}
            r={i === 0 ? 7 : 5 - i}
            fill={i === 0 ? "white" : VIOLET}
            fillOpacity={i === 0 ? 1 : 0.5 - i * 0.15}
            initial={{ cx: 100, cy: 210, opacity: 0 }}
            animate={{ cx: [100, 300, 500, 700, 900], cy: [210, 70, 210, 350, 210], opacity: 1 }}
            transition={{ duration: RUN_DUR, ease: "easeInOut", delay: RUN_DELAY + lag, opacity: { duration: 0.1, delay: RUN_DELAY } }}
          />
        ))}

        {/* 도착 지점에서 터지는 링 */}
        {[0, 0.15].map((d) => (
          <motion.circle
            key={d}
            cx={900} cy={210} r={20}
            fill="none" stroke={PINK} strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 3], opacity: [1, 0] }}
            transition={{ duration: 0.8, delay: RUN_DELAY + RUN_DUR + d, ease: "easeOut" }}
            style={{ transformOrigin: "900px 210px" }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02. 구조화: 흩어진 메모가 문제 / 요구사항 / 산출물 보드로 정렬된다
// ─────────────────────────────────────────────────────────────
const COLUMNS = [
  { en: "Problem", ko: "문제", color: BLUE },
  { en: "Requirement", ko: "요구사항", color: VIOLET },
  { en: "Deliverable", ko: "산출물", color: PINK },
];
const NOTES = [
  "As-Is 분석", "국가별 시스템", "현지 규제", "운영 비효율",
  "인터뷰 111문항", "현지 워크숍", "회원 · 주문", "결제 · 정산",
  "요구사항 정의서", "정책서 v1.0", "RFP · 영문", "화면설계서",
];
const ORDER_AT = 1100;

function ChaosScene() {
  const [ordered, setOrdered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOrdered(true), ORDER_AT);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Caption en={ordered ? "Chaos → Structure." : "Too many voices."} ko="흩어진 요구사항을 하나의 구조로 정리합니다" />
      <div className="relative w-[min(94vw,900px)] h-[min(52vh,420px)]">
        {COLUMNS.map((c, i) => (
          <motion.div
            key={c.en}
            className="absolute top-0 flex items-baseline gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase"
            style={{ left: `${2 + i * 33.3}%`, color: c.color }}
            initial={{ opacity: 0, y: -8 }}
            animate={ordered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ delay: 0.35 + i * 0.08 }}
          >
            {c.ko} <span className="text-white/35 hidden sm:inline">{c.en}</span>
          </motion.div>
        ))}

        {NOTES.map((text, i) => {
          const col = Math.floor(i / 4);
          const row = i % 4;
          const color = COLUMNS[col].color;
          const chaos = { left: `${(i * 37) % 72}%`, top: `${(i * 53) % 80}%`, rotate: ((i * 29) % 30) - 15 };
          const order = { left: `${2 + col * 33.3}%`, top: `${12 + row * 22}%`, rotate: 0 };
          return (
            <motion.div
              key={text}
              className="absolute w-[30%] h-[18%] rounded-md border px-2 sm:px-3 flex items-center text-[11px] sm:text-sm text-white shadow-lg"
              initial={{ ...chaos, scale: 0, opacity: 0, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
              animate={
                ordered
                  ? { ...order, scale: 1, opacity: 1, backgroundColor: `${color}1f`, borderColor: `${color}80` }
                  : { ...chaos, scale: 1, opacity: 1 }
              }
              transition={
                ordered
                  ? { type: "spring", stiffness: 220, damping: 24, delay: (col * 4 + row) * 0.03 }
                  : { type: "spring", stiffness: 300, damping: 18, delay: i * 0.05 }
              }
            >
              <span className="w-1.5 h-1.5 rounded-full mr-2 shrink-0" style={{ background: ordered ? color : "rgba(255,255,255,0.4)" }} />
              <span className="truncate">{text}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03. 흐름: 주문 플로우가 그려지고, 커서가 정상 흐름과 예외 흐름을 훑는다
// ─────────────────────────────────────────────────────────────
const FLOW = [
  { ko: "상품", en: "Product", x: 100 },
  { ko: "장바구니", en: "Cart", x: 300 },
  { ko: "주문서", en: "Checkout", x: 500 },
  { ko: "결제", en: "Payment", x: 700 },
  { ko: "완료", en: "Done", x: 900 },
];
const EDGES = [
  { ko: "결제 실패", en: "Retry", x: 700 },
  { ko: "취소 · 환불", en: "Refund", x: 900 },
];
const FY = 130;
const EY = 300;
const CURSOR_DELAY = 0.5;
const CURSOR_DUR = 1.9;
const CURSOR_PTS = [{ x: 1080, y: 420 }, ...FLOW.map((f) => ({ x: f.x, y: FY })), { x: 900, y: EY }];
const visitAt = (k: number) => CURSOR_DELAY + (CURSOR_DUR / (CURSOR_PTS.length - 1)) * k;

function FlowNode({ x, y, ko, en, color, delay, hitAt, dashed }: {
  x: number; y: number; ko: string; en: string; color: string; delay: number; hitAt?: number; dashed?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20, delay }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <rect x={x - 75} y={y - 30} width={150} height={60} rx={12} fill="rgba(255,255,255,0.04)" stroke={color} strokeOpacity={0.7} strokeDasharray={dashed ? "5 5" : undefined} />
      {hitAt !== undefined && (
        <motion.rect
          x={x - 75} y={y - 30} width={150} height={60} rx={12} fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 0.5, delay: hitAt }}
        />
      )}
      <text x={x} y={y + 2} textAnchor="middle" fill="white" style={{ fontSize: 18, fontWeight: 600 }}>{ko}</text>
      <text x={x} y={y + 19} textAnchor="middle" fill="white" fillOpacity={0.4} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em" }}>
        {en.toUpperCase()}
      </text>
    </motion.g>
  );
}

function FlowScene() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Caption en="Every path. Every edge case." ko="정상 흐름부터 예외 흐름까지 빠짐없이 설계합니다" />
      <svg viewBox="0 0 1000 400" className="w-[min(96vw,1000px)] overflow-visible">
        <defs>
          <marker id="pl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="white" fillOpacity={0.6} />
          </marker>
        </defs>

        {FLOW.slice(0, -1).map((f, i) => (
          <motion.line
            key={`c-${f.en}`}
            x1={f.x + 78} y1={FY} x2={FLOW[i + 1].x - 82} y2={FY}
            stroke="white" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#pl-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.25 + i * 0.15 }}
          />
        ))}
        {EDGES.map((e, i) => (
          <motion.line
            key={`e-${e.en}`}
            x1={e.x} y1={FY + 33} x2={e.x} y2={EY - 36}
            stroke={PINK} strokeWidth={1.5} strokeDasharray="4 5" markerEnd="url(#pl-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.15 }}
          />
        ))}

        {FLOW.map((f, i) => (
          <FlowNode key={f.en} x={f.x} y={FY} ko={f.ko} en={f.en} color={BLUE} delay={0.15 + i * 0.15} hitAt={visitAt(i + 1)} />
        ))}
        {EDGES.map((e, i) => (
          <FlowNode key={e.en} x={e.x} y={EY} ko={e.ko} en={e.en} color={PINK} delay={1.15 + i * 0.15} hitAt={i === 1 ? visitAt(FLOW.length + 1) : undefined} dashed />
        ))}
        <motion.text
          x={800} y={EY + 62} textAnchor="middle" fill={PINK}
          style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.3em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          EDGE CASES
        </motion.text>

        {/* 클릭 리플 */}
        {CURSOR_PTS.slice(1).map((p, k) => (
          <motion.circle
            key={`rip-${k}`}
            cx={p.x} cy={p.y} r={10}
            fill="none" stroke="white" strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.3, 3], opacity: [0.9, 0] }}
            transition={{ duration: 0.5, delay: visitAt(k + 1) }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        <motion.g
          initial={{ x: CURSOR_PTS[0].x, y: CURSOR_PTS[0].y }}
          animate={{ x: CURSOR_PTS.map((p) => p.x), y: CURSOR_PTS.map((p) => p.y) }}
          transition={{ duration: CURSOR_DUR, delay: CURSOR_DELAY, ease: "easeInOut" }}
        >
          <foreignObject x={-2} y={-2} width={30} height={40}>
            <CursorIcon />
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 04. 문서: 화면설계서가 써지고, 영문화되고, 개발 준비 완료 도장이 찍힌다
// ─────────────────────────────────────────────────────────────
const SPEC_ITEMS = [
  { ko: "배송지 선택", en: "Shipping address" },
  { ko: "결제수단", en: "Payment method" },
  { ko: "약관 동의", en: "Terms consent" },
];

function SpecScene() {
  const [en, setEn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEn(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      <Caption en="Specs that ship." ko="벤더가 바로 개발을 시작할 수 있는 문서를 만듭니다" />
      <div className="relative w-[min(88vw,640px)]" style={{ perspective: 1400 }}>
        {/* 뒤에 깔리는 다른 문서들 */}
        {[
          { label: "RFP · EN", rot: -7, x: -60 },
          { label: "Policy v1.0", rot: 6, x: 60 },
        ].map((d, i) => (
          <motion.div
            key={d.label}
            className="absolute inset-0 rounded-xl border border-white/10 bg-[#141418] p-3"
            initial={{ x: 0, rotate: 0, opacity: 0 }}
            animate={{ x: d.x, rotate: d.rot, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 + i * 0.08 }}
          >
            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 ${i === 0 ? "" : "float-right"}`}>{d.label}</span>
          </motion.div>
        ))}

        <motion.div
          className="relative rounded-xl border border-white/15 bg-[#0f0f13] overflow-hidden shadow-2xl"
          initial={{ rotateX: 35, y: 60, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 h-10 border-b border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Screen spec</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={en ? "en" : "ko"}
                  className="text-sm text-white font-semibold whitespace-nowrap"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {en ? "Checkout" : "주문서 화면"}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="relative flex rounded-full bg-white/[0.06] p-0.5 font-mono text-[10px]">
              <motion.span
                className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full"
                style={{ background: GRADIENT }}
                animate={{ left: en ? "50%" : "2px" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <span className={`relative px-2 py-0.5 ${en ? "text-white/50" : "text-white"}`}>KO</span>
              <span className={`relative px-2 py-0.5 ${en ? "text-white" : "text-white/50"}`}>EN</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 p-4">
            {/* 와이어프레임 + 번호 마커 */}
            <div className="col-span-3 space-y-2">
              {SPEC_ITEMS.map((_, i) => (
                <motion.div
                  key={i}
                  className={`relative rounded-md border border-dashed border-white/25 ${i === 1 ? "h-14 sm:h-16" : "h-9 sm:h-11"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.1 }}
                >
                  <motion.span
                    className="absolute -left-2 -top-2 w-5 h-5 rounded-full text-[10px] font-bold text-black flex items-center justify-center"
                    style={{ background: PINK }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.4, 1] }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.12 }}
                  >
                    {i + 1}
                  </motion.span>
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 h-1 rounded bg-white/10" />
                </motion.div>
              ))}
              <motion.div
                className="h-8 rounded-md"
                style={{ background: GRADIENT }}
                initial={{ scaleX: 0, opacity: 0.4 }}
                animate={{ scaleX: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.8 }}
              />
            </div>
            {/* 디스크립션 */}
            <div className="col-span-2 space-y-3">
              {SPEC_ITEMS.map((s, i) => (
                <div key={s.ko}>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white overflow-hidden h-4">
                    <span className="font-bold" style={{ color: PINK }}>{i + 1}</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={en ? s.en : s.ko}
                        className="whitespace-nowrap"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0, transition: { duration: 0.18 } }}
                        transition={{ duration: 0.22, delay: en ? 0.1 + i * 0.06 : 0.8 + i * 0.12 }}
                      >
                        {en ? s.en : s.ko}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  {[0.9, 0.65].map((w, j) => (
                    <motion.div
                      key={j}
                      className="mt-1.5 h-1 rounded bg-white/15 origin-left"
                      style={{ width: `${w * 100}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.35, delay: 0.9 + i * 0.12 + j * 0.06 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 도장 */}
        <motion.div
          className="absolute right-2 sm:-right-6 -bottom-6 px-3 py-1.5 border-2 rounded-md font-mono text-[11px] sm:text-sm tracking-[0.2em] uppercase"
          style={{ borderColor: PINK, color: PINK, background: "rgba(10,10,10,0.85)" }}
          initial={{ scale: 2.6, rotate: -4, opacity: 0 }}
          animate={{ scale: 1, rotate: -10, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18, delay: 1.6 }}
        >
          Ready for dev ✓
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 05. 런칭: 커서가 Launch 버튼을 누르면 터진다
// ─────────────────────────────────────────────────────────────
const CLICK_AT = 0.6;

function LaunchScene() {
  useEffect(() => {
    const colors = [BLUE, VIOLET, PINK, "#ffffff"];
    const t1 = setTimeout(() => {
      confetti({ particleCount: 110, spread: 100, startVelocity: 48, origin: { x: 0.5, y: 0.55 }, colors, zIndex: 10000, scalar: 0.9 });
    }, CLICK_AT * 1000 + 50);
    const t2 = setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors, zIndex: 10000 });
      confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors, zIndex: 10000 });
    }, CLICK_AT * 1000 + 250);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* 클릭 순간의 플래시와 링 */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at center, rgba(167,139,250,0.55) 0%, transparent 55%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.3] }}
        transition={{ duration: 0.7, delay: CLICK_AT, times: [0, 0.2, 1] }}
      />
      {[0, 0.12, 0.24].map((d) => (
        <motion.div
          key={d}
          className="absolute w-40 h-40 rounded-full border-2"
          style={{ borderColor: d === 0 ? PINK : d === 0.12 ? VIOLET : BLUE }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 5], opacity: [1, 0] }}
          transition={{ duration: 0.9, delay: CLICK_AT + d, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="relative rounded-full p-[2px]"
        style={{ background: GRADIENT }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1, 1, 0.88, 1.08, 1], opacity: 1 }}
        transition={{ duration: CLICK_AT + 0.35, times: [0, 0.35, 0.8, 0.86, 0.94, 1], ease: "easeOut" }}
      >
        <div className="rounded-full bg-[#0a0a0a] px-10 sm:px-14 py-4 sm:py-5 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full on-air-dot" style={{ background: PINK }} />
          <span className="text-white" style={{ fontFamily: BEBAS, fontSize: "clamp(2.2rem, 7vw, 4rem)", letterSpacing: "0.12em", lineHeight: 1 }}>
            Launch
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: 260, y: 220, opacity: 0 }}
        animate={{ x: [260, 30, 30], y: [220, 10, 10], scale: [1, 1, 0.8, 1], opacity: 1 }}
        transition={{ duration: CLICK_AT + 0.15, times: [0, 0.8, 1], ease: EASE_OUT, scale: { duration: 0.2, delay: CLICK_AT - 0.05 } }}
      >
        <CursorIcon size={26} />
      </motion.div>
    </div>
  );
}

function TitleCard() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
      <motion.div
        className="absolute w-[60vmin] h-[60vmin] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(96,165,250,0.12) 45%, transparent 70%)" }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
      <div className="overflow-hidden relative">
        <motion.p
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: EASE_IO }}
          className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-white/50 mb-4"
        >
          13 Years · Commerce 기획 / PM
        </motion.p>
      </div>
      <div className="overflow-hidden relative">
        <motion.h1
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: EASE_IO, delay: 0.08 }}
          className="leading-[0.9] text-white"
          style={{ fontFamily: BEBAS, fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "0.02em" }}
        >
          Plan <span className="text-white/40">→</span> <span style={gradientText}>Launch.</span>
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative mt-6 text-sm sm:text-base text-white/60"
      >
        문제를 정의하고, 구조를 설계하고, 런칭까지 리딩합니다
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="relative mt-3 text-[11px] tracking-[0.3em] uppercase text-white/35"
      >
        이승진 · 기획 / PM
      </motion.p>
    </div>
  );
}
