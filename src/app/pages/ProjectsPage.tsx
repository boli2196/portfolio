import { Link } from "react-router";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Calendar, Mail } from "lucide-react";

const SIGNATURE_GRADIENT = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)";

export function ProjectsPage() {
  const featured = portfolioData.projects.filter((p) => p.featured);
  const rollout = portfolioData.projects.filter((p) => !p.featured && p.basedOnStandard);
  const previous = portfolioData.projects.filter((p) => !p.featured && !p.basedOnStandard);

  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative pt-6 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
            PORTFOLIO
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-5">PORTFOLIO</p>
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-3 leading-none tracking-tight">
              Projects
            </h1>
            <p className="text-base text-white/40 leading-relaxed">
              실제 비즈니스 문제를 해결한 프로젝트들
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signature Projects */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3 bg-clip-text text-transparent" style={{ backgroundImage: SIGNATURE_GRADIENT }}>
                Signature Projects
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-white">대표 프로젝트</h2>
            </div>
            <p className="hidden md:block text-sm text-white/40 max-w-xs text-right leading-relaxed">
              전략과 토대 수립 완료 — 이제 모든 해외 법인 프로젝트의 기준입니다
            </p>
          </div>

          <div className="space-y-6">
            {featured.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative p-px rounded-2xl"
                style={{ background: SIGNATURE_GRADIENT }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative block rounded-2xl bg-[#0b0b10] overflow-hidden"
                >
                  {/* 배경 글로우 */}
                  <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 group-hover:opacity-30 blur-3xl transition-opacity pointer-events-none"
                    style={{ background: SIGNATURE_GRADIENT }}
                  />
                  <span className="absolute top-6 right-8 text-[7rem] font-black leading-none text-white/[0.05] select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 p-6 sm:p-8 lg:p-12">
                    {/* 왼쪽: 제목과 핵심 지표 */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span
                          className="text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full text-black"
                          style={{ background: SIGNATURE_GRADIENT }}
                        >
                          Signature {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] tracking-[0.3em] uppercase text-white/40">{project.role}</span>
                        {project.period.includes("완료") && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/10 border border-white/25 text-white/80">
                            ✓ 완료
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-5" style={{ wordBreak: "keep-all" }}>
                        {project.title}
                      </h3>
                      <p className="text-white/55 leading-relaxed mb-8" style={{ wordBreak: "keep-all" }}>
                        {project.overview}
                      </p>

                      {project.highlights && (
                        <div className={`grid gap-px bg-white/10 rounded-xl overflow-hidden ${project.highlights.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                          {project.highlights.map((h) => (
                            <div key={h.label} className="bg-[#0b0b10] p-4">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-black bg-clip-text text-transparent" style={{ backgroundImage: SIGNATURE_GRADIENT }}>
                                {h.value}
                              </div>
                              <div className="text-[11px] text-white/40 mt-1 leading-snug">{h.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 오른쪽: 성과 */}
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-bold text-white mb-4">주요 성과</p>
                      <ul className="space-y-3 mb-8">
                        {project.results.map((result, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="inline-block w-1.5 h-1.5 rounded-full mr-3 mt-1.5 flex-shrink-0" style={{ background: SIGNATURE_GRADIENT }} />
                            <span className="text-white/65 leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-xs px-3 py-1.5 border border-white/20 text-white/60 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto inline-flex items-center text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                        자세히 보기
                        <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 표준 → 실행 연결 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12" aria-hidden="true">
        <div className="flex flex-col items-center py-4">
          <div className="w-px h-14" style={{ background: SIGNATURE_GRADIENT }} />
          <span className="mt-3 text-[10px] tracking-[0.4em] uppercase text-white/40">이 표준을 토대로</span>
        </div>
      </div>

      {/* 표준 기반 실행 프로젝트 */}
      <section className="pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-violet-300/70 mb-3">Rolling Out</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white">표준 기반 실행 프로젝트</h2>
            </div>
            <p className="hidden md:block text-sm text-white/40 max-w-xs text-right leading-relaxed">
              완성된 표준 위에서 국가별 쇼핑몰을 구축하고 있습니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {rollout.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 이전 프로젝트 */}
      <section className="pt-10 pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">Previous Work</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">이전 프로젝트</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {previous.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            {previous.length % 2 !== 0 && <ContactCard />}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">HIGHLIGHTS</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
              프로젝트 하이라이트
            </h2>
            <p className="text-white/50 leading-relaxed">
              다양한 도메인에서 측정 가능한 성과를 만들어왔습니다
            </p>
          </motion.div>

          <div className="grid gap-px bg-white/10 md:grid-cols-4">
            {[
              { label: "기획 경력", value: "13년+", sub: "서비스 기획 · PM" },
              { label: "서비스 유형", value: "FO · BO", sub: "전 영역 기획 경험" },
              { label: "고객 유형", value: "B2B · B2C", sub: "커머스 · 면세 · SaaS" },
              { label: "AI 활용", value: "바이브코딩", sub: "Claude · GPT · Cursor" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-6 text-center"
              >
                <div className="text-2xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white/60 mb-1">{stat.label}</div>
                <div className="text-xs text-white/30">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

type Project = (typeof portfolioData.projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-[#0a0a0a]"
      >
        <Link
          to={`/projects/${project.id}`}
          className="block group h-full"
        >
          {/* Header with image */}
          <div className="h-56 relative overflow-hidden">
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-50 transition-all"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/50"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-white/5"></div>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              {/* Index number */}
              <span className="absolute top-4 right-5 text-7xl font-black text-white/[0.07] leading-none select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.basedOnStandard && (
                <span className="absolute top-4 left-5 text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-violet-400/40 text-violet-300 bg-violet-500/10">
                  Built on Standard
                </span>
              )}
              <div className="w-8 h-[2px] bg-blue-400 mb-3" />
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-2">
                {project.role}
              </div>
              <h2 className="text-3xl font-black text-white leading-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sky-400 text-xs mb-4 font-semibold">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              {project.period.includes('진행중') ? (
                <>
                  <span>{project.period.split(' - ')[0]}</span>
                  <span className="text-sky-400/40">–</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                    진행중
                  </span>
                </>
              ) : (
                project.period
              )}
            </div>

            <p className="text-white/50 leading-relaxed mb-6 line-clamp-3">
              {project.overview}
            </p>

            {/* Key Results */}
            <div className="mb-6">
              <p className="text-sm font-bold text-white mb-3">주요 성과</p>
              <ul className="space-y-2">
                {project.results.slice(0, 2).map((result, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="inline-block w-1 h-1 bg-white/40 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    <span className="text-white/50">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 border border-white/30 text-white/70 rounded-full bg-white/5"
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="text-xs px-3 py-1 border border-white/15 text-white/40 rounded-full">
                    +{project.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center text-white/40 text-sm group-hover:text-white/70 transition-colors">
              자세히 보기
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>
  );
}

function ContactCard() {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-[#0a0a0a]"
      >
        <Link to="/contact" className="flex flex-col items-center justify-center h-full p-12 text-center group min-h-[400px]">
          <div className="w-16 h-16 border border-white/15 flex items-center justify-center mb-8 group-hover:border-white/30 transition-colors">
            <Mail className="h-7 w-7 text-blue-400" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">CONTACT</p>
          <h3 className="text-3xl font-black text-white mb-4 leading-tight">
            함께 만들어갈<br />다음 프로젝트
          </h3>
          <p className="text-white/40 leading-relaxed mb-8 max-w-xs">
            새로운 기회와 협업을 기다리고 있습니다
          </p>
          <div className="inline-flex items-center text-white/50 text-sm font-medium group-hover:text-white transition-colors">
            연락하기
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </motion.div>
  );
}
