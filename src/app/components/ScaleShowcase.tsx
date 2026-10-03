import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import { useRef, useState } from "react";

// 홈 히어로 아래: 스크롤하면 표준 블록 하나가 여러 나라로 복제되고,
// 공통 영역은 그대로 · 아래 층(변수/모듈/전용)만 나라별로 현지화되는 장면

const GRADIENT = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)";

const TIERS = [
  { key: "common", label: "공통", en: "Common", h: 42 },
  { key: "variable", label: "변수", en: "Variable", h: 20 },
  { key: "module", label: "모듈", en: "Module", h: 16 },
  { key: "dedicated", label: "전용", en: "Dedicated", h: 10 },
] as const;

type Col = {
  name: string;
  short: string;
  hue: number;
  dedicated?: boolean;
  origin?: boolean;
  next?: boolean;
  tag?: string;      // 3단계부터 라벨 아래 표시
  detail?: string[]; // 마우스를 올리면 표시
};

// 가운데가 원본(표준), 양옆이 복제되는 시장 — 사이트 프로젝트에 공개된 내용만 사용
const COLUMNS: Col[] = [
  { name: "Kuala Lumpur", short: "KL", hue: 190, dedicated: true, tag: "PDPA · 신용조회", detail: ["PDPA 개인정보보호", "CTOS / CCRIS 신용조회", "WhatsApp Business"] },
  { name: "Singapore", short: "SG", hue: 160, tag: "eTrust 연동", detail: ["단계적 구축 (필터 구매 · 배송 우선)", "eTrust 연동"] },
  { name: "Mumbai", short: "MUM", hue: 30, dedicated: true, tag: "KYC · 설치", detail: ["KYC 승인", "결제 · 정산", "설치 배정"] },
  { name: "Global Standard", short: "STD", hue: 0, origin: true },
  { name: "Taipei", short: "TPE", hue: 330, tag: "준비 단계", detail: ["사전 준비 단계"] },
  { name: "Texas", short: "TX", hue: 260, dedicated: true, tag: "신용조회 · 렌탈", detail: ["렌탈 이커머스 (NECOA)", "Experian 신용조회"] },
  { name: "Next", short: "NEXT", hue: 0, next: true },
];
const CENTER = 3;
const SPACING = 118; // 칸 간격 (칸 너비 대비 %)
const COL_WIDTH = 11; // 무대 너비 대비 %

const STEPS = [
  { n: "01", title: "표준을 설계한다", desc: "모든 나라가 함께 쓰는 공통 영역을 먼저 정의합니다." },
  { n: "02", title: "나라마다 복제한다", desc: "새 나라를 열 때 처음부터 만들지 않고, 표준을 그대로 가져갑니다." },
  { n: "03", title: "필요한 만큼만 현지화한다", desc: "변수 · 모듈 · 전용 영역만 그 나라에 맞게 바꿉니다." },
  { n: "04", title: "다음 나라는 더 빠르게", desc: "공통 영역은 이미 준비되어 있습니다. 남은 건 현지화뿐입니다." },
];
const STEP_AT = [0, 0.28, 0.52, 0.78];

function Column({ col, index, progress, step }: { col: Col; index: number; progress: MotionValue<number>; step: number }) {
  const offset = index - CENTER;
  const x = useTransform(progress, [0.1, 0.42], ["0%", `${offset * SPACING}%`]);
  const spreadOpacity = useTransform(progress, [0.08, 0.2], [col.origin ? 1 : 0, 1]);
  // 바깥쪽 칸일수록 조금 늦게 물듦
  const d = Math.abs(offset) * 0.03;
  const localize = useTransform(progress, [0.52 + d, 0.68 + d], [0, 1]);
  const labelOpacity = useTransform(progress, [0.38, 0.48], [col.origin ? 1 : 0, 1]);
  // NEXT 칸: 마지막 단계에서 공통 층이 채워짐
  const nextFill = useTransform(progress, [0.8, 0.94], [0, 1]);
  const nextCommon = useTransform(progress, [0.8, 0.94], [0, 0.85]);
  const plusOpacity = useTransform(progress, [0.8, 0.9], [1, 0]);

  const tint = (light: number) => `hsla(${col.hue}, 80%, ${light}%, 0.85)`;

  return (
    <motion.div
      className="group absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
      style={{ width: `${COL_WIDTH}%`, x, opacity: spreadOpacity, zIndex: col.origin ? 10 : 5 - Math.abs(offset) }}
    >
      <div
        className={`relative h-full rounded-lg p-1 flex flex-col gap-1 transition-transform duration-300 ${
          col.next ? "border border-dashed border-white/25" : "border border-white/10 bg-[#0e0e14] group-hover:-translate-y-1"
        }`}
        style={col.origin ? { boxShadow: "0 0 0 1px rgba(167,139,250,0.6), 0 20px 60px rgba(167,139,250,0.18)" } : undefined}
      >
        {TIERS.map((t) => {
          const isCommon = t.key === "common";
          const hidden = t.key === "dedicated" && !col.origin && !col.dedicated && !col.next;
          return (
            <div key={t.key} className="relative rounded overflow-hidden" style={{ flexGrow: t.h, opacity: hidden ? 0.15 : 1 }}>
              {col.next ? (
                isCommon ? (
                  <motion.div className="absolute inset-0 scale-shimmer" style={{ background: GRADIENT, opacity: nextCommon }} />
                ) : (
                  <motion.div className="absolute inset-0 border border-dashed border-white/15 rounded" style={{ opacity: nextFill }} />
                )
              ) : isCommon ? (
                <div className="absolute inset-0 scale-shimmer" style={{ background: GRADIENT, opacity: 0.85 }} />
              ) : (
                <>
                  <div className="absolute inset-0 bg-white/[0.07]" />
                  {!col.origin && !hidden && (
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: tint(t.key === "dedicated" ? 55 : t.key === "module" ? 45 : 35), opacity: localize }}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}
        {col.next && (
          <motion.div style={{ opacity: plusOpacity }} className="absolute inset-0 flex items-center justify-center text-white/40 text-2xl font-light">
            +
          </motion.div>
        )}
      </div>

      {/* 라벨 + 현지화 태그 */}
      <motion.div style={{ opacity: labelOpacity }} className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
        <p className={`font-mono text-[8px] sm:text-[10px] tracking-[0.15em] uppercase ${col.origin ? "text-white" : "text-white/55"}`}>
          <span className="sm:hidden">{col.short}</span>
          <span className="hidden sm:inline">{col.next && step >= 3 ? "Next Market" : col.name}</span>
        </p>
        {col.tag && (
          <p
            className="hidden md:block text-[10px] mt-1 transition-all duration-500"
            style={{ color: `hsl(${col.hue}, 70%, 70%)`, opacity: step >= 2 ? 0.9 : 0, transform: `translateY(${step >= 2 ? 0 : 4}px)` }}
          >
            {col.tag}
          </p>
        )}
      </motion.div>

      {/* 마우스를 올리면 현지화 내용 */}
      {col.detail && (
        <div className="hidden md:block pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-20">
          <div className="rounded-lg border border-white/15 bg-[#14141c]/95 backdrop-blur px-3 py-2.5 shadow-xl">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: `hsl(${col.hue}, 70%, 70%)` }}>
              {col.name} · 현지화
            </p>
            <ul className="space-y-1">
              {col.detail.map((item) => (
                <li key={item} className="text-[11px] text-white/70 leading-snug">· {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// 복제 단계에서 표준 → 각 나라로 뻗는 연결선
function Connectors({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0.14, 0.4], [0, 1]);
  const opacity = useTransform(progress, [0.12, 0.2, 0.5, 0.6], [0, 1, 1, 0.25]);
  const centers = COLUMNS.map((_, i) => 50 + (i - CENTER) * (SPACING / 100) * COL_WIDTH);
  return (
    <motion.svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="absolute left-0 right-0 -top-8 h-8 w-full overflow-visible pointer-events-none"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="scale-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      {centers.map((cx, i) =>
        i === CENTER ? null : (
          <motion.path
            key={i}
            d={`M 50 20 V 6 H ${cx} V 20`}
            fill="none"
            stroke="url(#scale-line)"
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
            strokeDasharray={COLUMNS[i].next ? "3 4" : undefined}
            style={{ pathLength: draw }}
          />
        ),
      )}
    </motion.svg>
  );
}

export function ScaleShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  // 스크롤 값을 일반 MotionValue로 옮겨 씀: 스크롤에 직접 묶인 opacity는
  // 브라우저 ScrollTimeline으로 가속되면서 섹션 기준이 아닌 페이지 기준으로 계산되는 문제가 있음
  const progress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.set(v);
    setStep(STEP_AT.reduce((acc, at, i) => (v >= at ? i : acc), 0));
  });

  const barScale = useTransform(progress, [0, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a]" style={{ height: "320vh" }}>
      <style>{`
        .scale-shimmer { overflow: hidden; }
        .scale-shimmer::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%);
          transform: translateX(-120%); animation: scale-shimmer 3.2s ease-in-out infinite;
        }
        @keyframes scale-shimmer { 0%, 55% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
      `}</style>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16 lg:pt-0">
        {/* 큰 단계 번호 워터마크 */}
        <div aria-hidden="true" className="absolute right-[4%] bottom-[6%] font-black leading-none text-white/[0.035] select-none pointer-events-none" style={{ fontSize: "clamp(8rem, 22vw, 20rem)" }}>
          {STEPS[step].n}
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-center">
          {/* 왼쪽: 단계 설명 */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">How it scales</p>
            <div className="relative pl-5">
              {/* 진행 바 */}
              <div className="absolute left-0 top-1 bottom-1 w-px bg-white/10">
                <motion.div className="absolute inset-x-0 top-0 h-full origin-top" style={{ scaleY: barScale, background: GRADIENT }} />
              </div>
              <div className="space-y-3 lg:space-y-5">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex gap-4 transition-opacity duration-500" style={{ opacity: step === i ? 1 : 0.25 }}>
                    <span
                      className="font-mono text-xs pt-1"
                      style={step === i ? { backgroundImage: GRADIENT, WebkitBackgroundClip: "text", color: "transparent" } : { color: "rgba(255,255,255,0.4)" }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base lg:text-xl font-bold text-white">{s.title}</h3>
                      <p className={`text-sm text-white/50 leading-relaxed mt-1 ${step === i ? "" : "hidden lg:block"}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 범례 */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 lg:mt-10 text-[11px] text-white/45">
              <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: GRADIENT }} />공통 · 그대로 재사용</span>
              <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm bg-white/25" />변수 · 모듈 · 전용 · 현지화</span>
            </div>
          </div>

          {/* 오른쪽: 층 이름 축 + 블록 무대 */}
          <div className="flex gap-3 sm:gap-4 h-[32vh] sm:h-[44vh] lg:h-[54vh] mt-10 mb-12 lg:mt-12 lg:mb-14">
            <div className="flex flex-col gap-1 py-1 w-9 sm:w-14 flex-shrink-0">
              {TIERS.map((t) => (
                <div key={t.key} className="flex flex-col justify-center border-r border-white/10 pr-2 text-right" style={{ flexGrow: t.h }}>
                  <span className="text-[10px] sm:text-xs font-bold text-white/75">{t.label}</span>
                  <span className="hidden sm:block text-[8px] tracking-[0.15em] uppercase text-white/30">{t.en}</span>
                </div>
              ))}
            </div>
            <div className="relative flex-1">
              <Connectors progress={progress} />
              {COLUMNS.map((col, i) => (
                <Column key={col.name} col={col} index={i} progress={progress} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
