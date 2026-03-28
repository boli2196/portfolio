import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

export function ExperiencePage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative pt-6 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
            EXPERIENCE
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-5">CAREER PATH</p>
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-3 leading-none tracking-tight">
              Career
            </h1>
            <p className="text-base text-white/40 leading-relaxed">
              다양한 경험을 통해 성장해왔습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 bg-[#0a0a0a] overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 border-b border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-14 h-14 flex items-center justify-center mr-4 shrink-0 overflow-hidden rounded-lg p-0.5 ${exp.logo ? "bg-white" : "bg-white/10 border border-white/15"}`}>
                          {exp.logo ? (
                            <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
                          ) : (
                            <Briefcase className="h-6 w-6 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-white">
                            {exp.company}
                          </h2>
                          <span className="inline-flex items-center mt-2 gap-1.5 text-sm font-medium text-blue-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                            {exp.position}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 text-white/40 flex-shrink-0" />
                      <span className="text-base font-medium text-white/70 flex items-center gap-2">
                        {exp.period.includes('재직중') ? (
                          <>
                            <span>{exp.period.split(' - ')[0]}</span>
                            <span className="text-white/30">–</span>
                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                              재직중
                            </span>
                          </>
                        ) : (
                          exp.period
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/50 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-sm font-bold text-white mb-4">주요 성과</p>
                  <ul className="space-y-3 mb-8">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1 h-1 bg-white/40 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-white/60">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <p className="text-sm font-bold text-white mb-3">주요 역량</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 border border-white/30 text-white/70 rounded-full bg-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">SUMMARY</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white">
              경력 요약
            </h2>
          </motion.div>

          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {[
              {
                number: "13년+",
                label: "서비스 기획 경력",
                description: "2012년부터 현재까지"
              },
              {
                number: "4개사",
                label: "회사 경험",
                description: "롯데 · 삼성 · 교보 · 코웨이"
              },
              {
                number: "10+",
                label: "주요 프로젝트",
                description: "대형 커머스 · 면세 · 글로벌"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-8 text-center"
              >
                <div className="text-5xl font-black text-white mb-3">
                  {stat.number}
                </div>
                <div className="text-base font-semibold text-white/60 mb-2">
                  {stat.label}
                </div>
                <p className="text-white/40 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
