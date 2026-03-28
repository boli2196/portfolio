import { Link } from "react-router";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Building2, Mail } from "lucide-react";

export function ProjectsPage() {
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

      {/* Projects Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-[#0a0a0a] ${portfolioData.projects.length % 2 !== 0 && index === portfolioData.projects.length - 1 ? "md:col-span-1" : ""}`}
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
                          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-all"
                        />
                        <div className="absolute inset-0 bg-[#0a0a0a]/50"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-white/5"></div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                      <div className="text-xs text-white/50 mb-2 tracking-widest uppercase">
                        {project.role}
                      </div>
                      <h2 className="text-2xl font-black text-white mb-3">
                        {project.title}
                      </h2>
                      <div className="flex items-center text-white/40 text-sm">
                        <Building2 className="h-3 w-3 mr-2" />
                        {project.company}
                      </div>
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
            ))}

            {/* CTA card when odd number of projects */}
            {portfolioData.projects.length % 2 !== 0 && (
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
            )}
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
              { label: "기획 경력", value: "10년+", sub: "서비스 기획 / PO" },
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
