import { motion } from "motion/react";

// 대표 프로젝트 상세 페이지용 구조도 (사이트용으로 단순화한 개념도)

const GRADIENT = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)";

const TIERS = [
  { name: "공통", en: "Common", desc: "모든 국가가 그대로 사용", width: "100%", alpha: 0.9 },
  { name: "변수", en: "Variable", desc: "같은 기능, 국가별 설정값만 다르게", width: "90%", alpha: 0.65 },
  { name: "모듈", en: "Module", desc: "국가별로 갈아 끼우는 기능 단위", width: "80%", alpha: 0.42 },
  { name: "전용", en: "Dedicated", desc: "해당 국가만을 위한 개발", width: "70%", alpha: 0.25 },
];

const MARKETS = ["말레이시아", "싱가포르", "인도", "대만"];

function StandardModelDiagram() {
  return (
    <div className="grid lg:grid-cols-[1.2fr_auto_1fr] gap-10 items-center">
      {/* 4단계 현지화 분류 */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-5">4-Tier Localization</p>
        <div className="space-y-2">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden"
              style={{ width: t.width }}
            >
              <div className="absolute inset-0" style={{ background: GRADIENT, opacity: t.alpha * 0.35 }} />
              <div className="relative flex items-baseline gap-3 px-4 py-3 border border-white/10 rounded-lg">
                <span className="text-white font-black whitespace-nowrap">{t.name}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 whitespace-nowrap">{t.en}</span>
                <span className="ml-auto text-xs text-white/55 text-right hidden sm:inline">{t.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-white/35 mt-4">
          아래로 갈수록 국가별로 달라지는 영역 · 12개 도메인, 98개 항목에 적용
        </p>
      </div>

      {/* 화살표 */}
      <div className="flex lg:flex-col items-center justify-center gap-2 text-white/30">
        <div className="h-px w-16 lg:w-px lg:h-16" style={{ background: GRADIENT }} />
        <span className="text-[10px] tracking-[0.3em] uppercase">Scale</span>
      </div>

      {/* 국가별 확산 */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-5">Roll-out</p>
        <div className="rounded-xl p-px mb-3" style={{ background: GRADIENT }}>
          <div className="rounded-xl bg-[#0b0b10] px-5 py-4 text-center">
            <div className="text-white font-black">글로벌 표준 모델</div>
            <div className="text-[11px] text-white/40 mt-1">한 번 정의한 공통 영역</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {MARKETS.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/15 px-3 py-2.5 text-center text-sm text-white/75"
            >
              {m}
            </motion.div>
          ))}
          <div className="col-span-2 rounded-lg border border-dashed border-white/20 px-3 py-2.5 text-center text-sm text-white/40">
            + 모든 해외 법인
          </div>
        </div>
      </div>
    </div>
  );
}

function CowayIdDiagram() {
  const channels = ["말레이시아 · 싱가포르", "인도", "+ 모든 해외 법인 쇼핑몰"];
  const erps = ["SAP", "ERPNext", "Odoo"];
  return (
    <div className="grid md:grid-cols-[1fr_auto_1.1fr_auto_1fr] gap-6 items-center">
      <div className="space-y-2">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-3">국가별 쇼핑몰</p>
        {channels.map((c) => (
          <div key={c} className="rounded-lg border border-white/15 px-4 py-3 text-sm text-white/75 text-center">{c}</div>
        ))}
        <p className="text-[11px] text-white/35 pt-1 text-center">SSO 로그인 (토큰 · 세션 · Redirect URI)</p>
      </div>

      <div className="mx-auto h-8 w-px md:h-px md:w-12" style={{ background: GRADIENT }} />

      <div className="rounded-2xl p-px" style={{ background: GRADIENT }}>
        <div className="rounded-2xl bg-[#0b0b10] px-6 py-8 text-center">
          <div className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">Coway ID</div>
          <div className="text-4xl font-black bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>cwid</div>
          <div className="text-xs text-white/50 mt-3">이메일 또는 휴대폰으로 가입하는<br />하나의 글로벌 회원키</div>
        </div>
      </div>

      <div className="mx-auto h-8 w-px md:h-px md:w-12" style={{ background: GRADIENT }} />

      <div className="space-y-2">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-3">법인별 ERP</p>
        {erps.map((e) => (
          <div key={e} className="rounded-lg border border-white/15 px-4 py-3 text-sm text-white/75 text-center">{e}</div>
        ))}
        <p className="text-[11px] text-white/35 pt-1 text-center">기존 주문(판매인 앱 포함)을 cwid에 매핑</p>
      </div>
    </div>
  );
}

const DIAGRAMS: Record<string, { title: string; render: () => JSX.Element }> = {
  "project-global-standard": { title: "표준 모델 구조", render: StandardModelDiagram },
  "project-coway-id": { title: "통합회원 구조", render: CowayIdDiagram },
};

export function SignatureDiagram({ projectId }: { projectId: string }) {
  const diagram = DIAGRAMS[projectId];
  if (!diagram) return null;
  return (
    <section className="py-16 border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">Architecture</p>
        <h2 className="text-3xl font-black text-white mb-10">{diagram.title}</h2>
        {diagram.render()}
        <p className="text-[11px] text-white/25 mt-8">* 공개용으로 단순화한 개념도입니다.</p>
      </div>
    </section>
  );
}
