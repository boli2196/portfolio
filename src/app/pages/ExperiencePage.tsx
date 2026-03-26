import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";

export function ExperiencePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-gray-900 py-20 overflow-hidden">
        {/* 배경: 타임라인/성장 곡선 */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" stroke="white" strokeWidth="3">
            <path d="M0,350 L200,300 L400,250 L600,180 L800,120 L1000,80 L1200,50" strokeDasharray="10 5"/>
            <circle cx="200" cy="300" r="8" fill="white"/>
            <circle cx="400" cy="250" r="8" fill="white"/>
            <circle cx="600" cy="180" r="8" fill="white"/>
            <circle cx="800" cy="120" r="8" fill="white"/>
            <circle cx="1000" cy="80" r="8" fill="white"/>
          </svg>
        </div>

        {/* 계단 모양 장식 (경력 성장) */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-10">
          <div className="w-12 h-8 bg-white mb-1"></div>
          <div className="w-16 h-8 bg-white mb-1 ml-2"></div>
          <div className="w-20 h-8 bg-white mb-1 ml-4"></div>
          <div className="w-24 h-8 bg-white ml-6"></div>
        </div>

        {/* 브리프케이스/서류 아이콘 */}
        <svg className="absolute top-10 right-20 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
          <rect x="4" y="7" width="16" height="12" rx="2"/>
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="4" y1="13" x2="20" y2="13"/>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="text-sm font-bold tracking-widest text-blue-400">
                CAREER PATH
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              경력
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              다양한 경험을 통해 성장해왔습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center mb-3">
                          <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mr-4 overflow-hidden shrink-0">
                            {exp.logo ? (
                              <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain p-1" />
                            ) : (
                              <Briefcase className="h-8 w-8 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                              {exp.company}
                            </h2>
                            <p className="text-xl text-gray-700 mt-1">
                              {exp.position}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 mt-4 md:mt-0">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-medium flex items-center">
                          {exp.period.includes('재직중') ? (
                            <>
                              <span>{exp.period.split(' - ')[0]}</span>
                              <span className="mx-2 text-gray-400">-</span>
                              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700 shadow-sm border border-blue-200">
                                재직중
                              </span>
                            </>
                          ) : (
                            exp.period
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-lg">
                      {exp.description}
                    </p>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                      주요 성과
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">
                        주요 역량
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              경력 요약
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="text-5xl font-bold text-blue-600 mb-3">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}