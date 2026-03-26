import { Link } from "react-router";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Building2, User } from "lucide-react";

export function ProjectsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-20 bg-white overflow-hidden border-b-2 border-gray-100">
        {/* 배경: 폴더, 파일, 작업물 아이콘들 */}
        <div className="absolute inset-0 opacity-5">
          {/* 폴더 아이콘들 */}
          <svg className="absolute top-10 left-20 w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6a2 2 0 0 1 2-2h4.5l2 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>
          </svg>
          <svg className="absolute bottom-20 right-32 w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6a2 2 0 0 1 2-2h4.5l2 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>
          </svg>
          {/* 문서 아이콘들 */}
          <svg className="absolute top-1/3 right-20 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="15" y2="17"/>
          </svg>
        </div>

        {/* 그리드 레이아웃 암시 (프로젝트 카드들) */}
        <div className="absolute bottom-10 left-10 opacity-10">
          <div className="grid grid-cols-3 gap-2">
            <div className="w-12 h-12 border-2 border-blue-600 rounded"></div>
            <div className="w-12 h-12 border-2 border-purple-600 rounded"></div>
            <div className="w-12 h-12 border-2 border-blue-600 rounded"></div>
            <div className="w-12 h-12 border-2 border-purple-600 rounded"></div>
            <div className="w-12 h-12 border-2 border-blue-600 rounded"></div>
            <div className="w-12 h-12 border-2 border-purple-600 rounded"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                    Portfolio
                  </span>
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              프로젝트
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              실제 비즈니스 문제를 해결한 프로젝트들
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group h-full"
                >
                  {/* Header with image or gradient */}
                  <div className="h-56 relative overflow-hidden rounded-t-2xl">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                      <div className="text-sm font-semibold mb-2 opacity-90">
                        {project.role}
                      </div>
                      <h2 className="text-3xl font-bold mb-3">
                        {project.title}
                      </h2>
                      <div className="flex items-center text-sm opacity-90">
                        <Building2 className="h-4 w-4 mr-2" />
                        {project.company}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.period}
                    </div>

                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {project.overview}
                    </p>

                    {/* Key Results */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        주요 성과
                      </h4>
                      <ul className="space-y-2">
                        {project.results.slice(0, 2).map((result, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="text-gray-600">{result}</span>
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
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            +{project.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      자세히 보기
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              프로젝트 하이라이트
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              다양한 도메인에서 측정 가능한 성과를 만들어왔습니다
            </p>

            <div className="grid md:grid-cols-4 gap-6">
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
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}