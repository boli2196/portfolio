import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

export function ContactPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-24 bg-white overflow-hidden border-b-2 border-gray-100">
        {/* 배경: 메시지, 이메일, 연결 아이콘들 */}
        <div className="absolute inset-0 opacity-5">
          {/* 메시지 버블들 */}
          <svg className="absolute top-10 left-20 w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <svg className="absolute bottom-20 right-32 w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          {/* 이메일 아이콘 */}
          <svg className="absolute top-1/3 right-1/4 w-28 h-28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M22 7l-10 7L2 7"/>
          </svg>
          {/* 전화 아이콘 */}
          <svg className="absolute bottom-1/3 left-1/3 w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>

        {/* 연결선들 (네트워크 느낌) */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            <line x1="100" y1="100" x2="300" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5"/>
            <line x1="300" y1="200" x2="500" y2="150" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5 5"/>
            <line x1="500" y1="150" x2="700" y2="250" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5"/>
            <circle cx="100" cy="100" r="8" fill="#3b82f6"/>
            <circle cx="300" cy="200" r="8" fill="#8b5cf6"/>
            <circle cx="500" cy="150" r="8" fill="#3b82f6"/>
            <circle cx="700" cy="250" r="8" fill="#8b5cf6"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                Get In Touch
              </span>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              연락하기
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              새로운 기회와 협업을 환영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-12">
                <div className="text-center mb-12">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={portfolioData.personal.profileImage}
                      alt={portfolioData.personal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    {portfolioData.personal.name}
                  </h2>
                  <p className="text-2xl text-blue-600 mb-6">
                    {portfolioData.personal.title}
                  </p>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    서비스 기획, 프로덕트 매니지먼트, 컨설팅 등 다양한 형태의 협업에 열려있습니다.
                    언제든지 편하게 연락 주세요.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="flex items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1">
                        이메일
                      </div>
                      <div className="text-gray-900 font-medium">
                        {portfolioData.personal.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="flex items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1">
                        연락처
                      </div>
                      <div className="text-gray-900 font-medium">
                        {portfolioData.personal.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group md:col-span-2"
                  >
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1">
                        LinkedIn
                      </div>
                      <div className="text-gray-900 font-medium">
                        {portfolioData.personal.linkedin}
                      </div>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <div className="inline-flex gap-4">
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      이메일 보내기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work Together */}
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
              함께 일하면 좋은 이유
            </h2>
            <p className="text-xl text-gray-600">
              다양한 프로젝트 경험을 통해 검증된 역량
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "문제 해결 능력",
                description: "복잡한 문제를 구조화하고, 데이터와 리서치를 통해 최적의 솔루션을 도출합니다.",
                icon: "💡"
              },
              {
                title: "크로스펑셔널 협업",
                description: "디자이너, 개발자, 마케터 등 다양한 직군과 효과적으로 협업하며 시너지를 만듭니다.",
                icon: "🤝"
              },
              {
                title: "비즈니스 임팩트",
                description: "단순한 기능 기획을 넘어, 측정 가능한 비즈니스 성과를 만들어냅니다.",
                icon: "📈"
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gray-50 rounded-3xl overflow-hidden border-2 border-gray-200">
              {/* 간단한 기하학 패턴 배경 */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-32 h-32 border-4 border-blue-600 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-600 rounded-lg rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 border-4 border-blue-600"></div>
              </div>

              <div className="relative px-8 sm:px-12 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  지금 바로 시작하세요
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  포트폴리오를 살펴보시고 궁금한 점이 있으시다면<br />
                  언제든지 연락 주세요
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    이메일 보내기
                  </a>
                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-gray-900"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    전화하기
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}