import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import { useRef, useState } from "react";

// 홈 히어로 아래: 13년 커리어를 "다루는 범위가 한 겹씩 넓어지는" 동심원으로 보여주는 스크롤 장면
// 내용은 portfolio-data의 경력·프로젝트에 있는 사실만 사용

const GRADIENT = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)";

type Chapter = {
  year: string;
  company: string;
  scope: string;   // 동심원 라벨
  title: string;
  desc: string;
  chips: string[];
  color: string;
  nodes?: string[]; // 동심원 위에 찍히는 점
};

const CHAPTERS: Chapter[] = [
  {
    year: "2012",
    company: "롯데닷컴",
    scope: "Channel",
    title: "운영을 자동화하다",
    desc: "가격비교 채널 프로모션을 운영하며, 사람이 하던 반복 업무를 운영자가 직접 관리하는 구조로 바꿨습니다.",
    chips: ["가격비교 채널 운영", "EP 자동화 설계", "제휴 쿠폰 체계"],
    color: "#60a5fa",
  },
  {
    year: "2014",
    company: "아이피그룹",
    scope: "Platform",
    title: "대형 플랫폼을 다시 짓다",
    desc: "국내 대표 커머스의 차세대 프로젝트에서 검색 · 전시 · 쿠폰 등 핵심 도메인을 설계했습니다.",
    chips: ["롯데인터넷면세점", "삼성전자 e-store", "교보문고"],
    color: "#818cf8",
    nodes: ["롯데면세점", "삼성전자", "교보문고"],
  },
  {
    year: "2022",
    company: "커넥트웨이브",
    scope: "SaaS",
    title: "플랫폼을 만드는 플랫폼",
    desc: "셀러가 직접 해외 쇼핑몰을 여는 커머스 빌더를 고도화하고, 글로벌 결제와 외부 솔루션을 연동했습니다.",
    chips: ["메이크글로비", "PayPal 연동", "플레이오토 API"],
    color: "#a78bfa",
  },
  {
    year: "2023",
    company: "코웨이",
    scope: "Overseas",
    title: "해외에서 0 → 1을 런칭하다",
    desc: "미국 정수기 렌탈 이커머스 NECOA를 처음부터 기획해 오픈했습니다. 해외 수행사 선정으로 구축 비용을 40% 이상 줄였습니다.",
    chips: ["NECOA 런칭", "Shopify", "구축비 40%↓"],
    color: "#e879f9",
    nodes: ["미국"],
  },
  {
    year: "2026",
    company: "코웨이",
    scope: "Global",
    title: "어디든 확장되는 표준을 만들다",
    desc: "국가마다 따로 만들던 쇼핑몰을 하나의 글로벌 표준과 통합회원으로 묶었습니다. 이제 이 표준 위에서 모든 해외 법인으로 확산합니다.",
    chips: ["글로벌 표준 모델", "Coway ID", "→ 모든 해외 법인"],
    color: "#f472b6",
    nodes: ["말레이시아", "싱가포르", "인도", "대만"],
  },
];

const AT = CHAPTERS.map((_, i) => i / CHAPTERS.length); // 0, .2, .4, .6, .8
const RADII = [46, 88, 130, 172, 214];
const C = 250; // SVG 중심

function Ring({ ch, index, progress, active, reached }: { ch: Chapter; index: number; progress: MotionValue<number>; active: boolean; reached: boolean }) {
  const r = RADII[index];
  const start = AT[index];
  const draw = useTransform(progress, [start, start + 0.12], [0, 1]);
  // 라벨 위치: 왼쪽 위 대각선
  const angle = (-130 * Math.PI) / 180;
  const lx = C + r * Math.cos(angle);
  const ly = C + r * Math.sin(angle);
  // 노드 위치: 오른쪽 아래 방향으로 고르게
  const nodes = ch.nodes ?? [];
  return (
    <g>
      <circle cx={C} cy={C} r={r} fill="none" stroke="white" strokeOpacity={0.06} strokeWidth={1} />
      <motion.circle
        cx={C}
        cy={C}
        r={r}
        fill="none"
        stroke={ch.color}
        strokeWidth={active ? 2.2 : 1.2}
        strokeOpacity={active ? 1 : 0.45}
        strokeLinecap="round"
        style={{ pathLength: draw, rotate: -90, transformOrigin: `${C}px ${C}px` }}
        className="transition-[stroke-width,stroke-opacity] duration-500"
      />
      {/* 범위 라벨 */}
      <g style={{ opacity: reached ? 1 : 0, transition: "opacity 0.5s" }}>
        <circle cx={lx} cy={ly} r={3} fill={ch.color} />
        <text
          x={lx - 8}
          y={ly - 6}
          textAnchor="end"
          fill={active ? "white" : "rgba(255,255,255,0.45)"}
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, letterSpacing: "0.15em", transition: "fill 0.5s" }}
        >
          {ch.year} · {ch.scope.toUpperCase()}
        </text>
      </g>
      {/* 고객사 / 시장 노드 */}
      {nodes.map((n, i) => {
        const a = ((10 + i * (nodes.length > 1 ? 70 / (nodes.length - 1) : 0)) * Math.PI) / 180;
        const nx = C + r * Math.cos(a);
        const ny = C + r * Math.sin(a);
        return (
          <g key={n} style={{ opacity: reached ? 1 : 0, transition: `opacity 0.5s ${0.15 + i * 0.08}s` }}>
            <circle cx={nx} cy={ny} r={active ? 4 : 3} fill="#0a0a0a" stroke={ch.color} strokeWidth={1.5} />
            <text
              x={nx + 9}
              y={ny + 4}
              fill={active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)"}
              style={{ fontSize: 10, transition: "fill 0.5s" }}
            >
              {n}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function CareerArc() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [chapter, setChapter] = useState(0);
  // 스크롤 값을 일반 MotionValue로 옮겨 씀 (스크롤에 직접 묶인 값이 페이지 기준으로 가속되는 문제 회피)
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.set(v);
    setChapter(AT.reduce((acc, at, i) => (v >= at ? i : acc), 0));
  });

  const nextRing = useTransform(progress, [0.9, 0.98], [0, 1]);
  const ch = CHAPTERS[chapter];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a]" style={{ height: "380vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-center">
          {/* 왼쪽: 챕터 */}
          <div className="order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">13 Years · Widening the scope</p>

            {/* 연도 레일 */}
            <div className="flex items-center gap-2 mb-8">
              {CHAPTERS.map((c, i) => (
                <div key={c.year} className="flex items-center gap-2">
                  <span
                    className="font-mono text-[11px] transition-colors duration-500"
                    style={{ color: i === chapter ? c.color : i < chapter ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}
                  >
                    {c.year}
                  </span>
                  {i < CHAPTERS.length - 1 && (
                    <span className="w-4 sm:w-8 h-px transition-colors duration-500" style={{ background: i < chapter ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)" }} />
                  )}
                </div>
              ))}
            </div>

            <div className="relative min-h-[260px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-xs tracking-[0.2em]" style={{ color: ch.color }}>
                      {String(chapter + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/50">{ch.company}</span>
                  </div>
                  <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-5" style={{ wordBreak: "keep-all" }}>
                    {chapter === CHAPTERS.length - 1 ? (
                      <span style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{ch.title}</span>
                    ) : (
                      ch.title
                    )}
                  </h3>
                  <p className="text-white/55 leading-relaxed mb-6 max-w-lg" style={{ wordBreak: "keep-all" }}>{ch.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ch.chips.map((c) => (
                      <span key={c} className="text-xs px-3 py-1.5 rounded-full border text-white/75" style={{ borderColor: `${ch.color}66` }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 오른쪽: 넓어지는 동심원 */}
          <div className="order-1 lg:order-2 flex justify-center">
            <svg viewBox="0 0 500 500" className="w-[78vw] max-w-[340px] sm:max-w-[420px] lg:max-w-[560px] h-auto overflow-visible">
              <defs>
                <radialGradient id="arc-core">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={C} cy={C} r={70} fill="url(#arc-core)" />
              {CHAPTERS.map((c, i) => (
                <Ring key={c.year} ch={c} index={i} progress={progress} active={i === chapter} reached={i <= chapter} />
              ))}
              {/* 바깥: 다음 범위 */}
              <motion.g style={{ opacity: nextRing }}>
                <circle cx={C} cy={C} r={244} fill="none" stroke="white" strokeOpacity={0.3} strokeDasharray="3 6" />
                <text x={C} y={C + 244 + 18} textAnchor="middle" fill="rgba(255,255,255,0.55)"
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, letterSpacing: "0.25em" }}>
                  NEXT · ALL OVERSEAS ENTITIES
                </text>
              </motion.g>
              {/* 중심 */}
              <circle cx={C} cy={C} r={5} fill="white" />
              <text x={C} y={C + 20} textAnchor="middle" fill="rgba(255,255,255,0.6)" style={{ fontSize: 11, fontWeight: 700 }}>
                이승진
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
