import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { CheckCircle2, Mail, Phone, Users, Bot, MessageCircle, GraduationCap, Award, BadgeCheck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-white py-20 border-b border-gray-200 overflow-hidden">
        {/* 토스 스타일 기하학 패턴 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 원형 패턴들 */}
          <div className="absolute top-20 right-1/4 w-64 h-64 border-2 border-blue-100 rounded-full"></div>
          <div className="absolute bottom-10 left-1/3 w-48 h-48 border-2 border-purple-100 rounded-full"></div>
          
          {/* 작은 원형 도트들 */}
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-100 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-purple-100 rounded-full"></div>
          
          {/* 선형 요소 */}
          <div className="absolute top-1/2 left-0 w-32 h-1 bg-blue-200"></div>
          <div className="absolute top-1/3 right-0 w-24 h-1 bg-purple-200"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="px-4 py-2 border-2 border-gray-900 text-gray-900 text-sm font-bold">
                  ABOUT ME
                </div>
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              소개
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              사용자와 비즈니스를 연결하는 기획자
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <ImageWithFallback
                src={portfolioData.personal.profileImage}
                alt={portfolioData.personal.name}
                className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
                style={{ maxHeight: '500px' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {portfolioData.personal.name}
              </h2>
              <p className="text-2xl text-blue-600 mb-6">
                {portfolioData.personal.title}
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {portfolioData.personal.introduction}
              </p>

              <div className="space-y-3 mb-8">
                {portfolioData.personal.summary.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>{portfolioData.personal.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{portfolioData.personal.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
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
              기획 철학
            </h2>
            <p className="text-xl text-gray-600">
              제가 중요하게 생각하는 가치들입니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "사용자 중심",
                description: "사용자의 불편함과 니즈를 깊이 이해하고, 그들의 입장에서 생각합니다. 데이터와 리서치를 통해 가설을 검증하며, 사용자에게 진정한 가치를 제공하는 서비스를 만듭니다.",
                icon: Users,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "AI 활용 기획",
                description: "Claude, GPT 등 AI 툴을 기획 프로세스에 적극 활용합니다. 바이브 코딩으로 프로토타입을 직접 구현하고, AI 기반 인사이트 도출로 의사결정의 속도와 정확성을 높입니다.",
                icon: Bot,
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                title: "협업과 소통",
                description: "디자이너, 개발자, 마케터 등 다양한 직군과 효과적으로 협업합니다. 명확한 커뮤니케이션으로 팀의 시너지를 극대화합니다.",
                icon: MessageCircle,
                color: "text-purple-600",
                bg: "bg-purple-50"
              }
            ].map((philosophy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${philosophy.bg} rounded-xl mb-6`}>
                  <philosophy.icon className={`h-7 w-7 ${philosophy.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {philosophy.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {philosophy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education - Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">학력</h2>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-12 mb-6"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 top-5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-lg font-bold text-gray-900">{edu.school}</div>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap ml-2">
                          {edu.degree}
                        </span>
                      </div>
                      <div className="text-blue-600 font-medium text-sm mb-1">{edu.major}</div>
                      <div className="text-gray-400 text-xs mb-3">{edu.period}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">자격증</h2>
              </div>
              <div className="space-y-4">
                {portfolioData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#232F3E]">
                        {cert.issuer.toLowerCase().includes('amazon') || cert.issuer.toLowerCase().includes('aws') ? (
                          <div className="flex flex-col items-center justify-center gap-0.5 py-1">
                            <span className="text-[#FF9900] font-black text-[10px] leading-none tracking-tight">aws</span>
                            <svg viewBox="0 0 20 7" className="w-5 h-1.5">
                              <path d="M1 3.5 Q10 7 19 3.5" stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                              <path d="M16.5 1.5 L19.5 3.5 L16.5 5.5Z" fill="#FF9900"/>
                            </svg>
                          </div>
                        ) : (
                          <BadgeCheck className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">{cert.name}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-500">{cert.issuer}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs font-medium px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">{cert.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{cert.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}