import { Link } from "react-router";
import { ArrowRight, Briefcase, Code2, Lightbulb, TrendingUp, Mail, Phone, Linkedin, Sparkles, ShoppingBag, Smartphone, MessageSquare } from "lucide-react";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollVideoCanvas } from "../components/ScrollVideoCanvas";
import { useRef } from "react";

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Scroll Animation */}
      <div ref={heroRef} style={{ height: "300vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-8">
                  AI와 함께 만드는 기획
                </div>
                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                  {portfolioData.personal.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-10">
                  {portfolioData.personal.title.split(" / ").map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-600 text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                  {portfolioData.personal.introduction}
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/projects"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                  >
                    프로젝트 보기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors font-medium text-lg"
                  >
                    연락하기
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ScrollVideoCanvas containerRef={heroRef} />
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              주요 강점
            </h2>
            <p className="text-xl text-gray-600">
              데이터와 사용자 경험을 중심으로 가치를 만듭니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "전략적 사고",
                description: "비즈니스 목표와 사용자 니즈를 연결하는 전략 수립",
                color: "text-yellow-600",
                bg: "bg-yellow-50"
              },
              {
                icon: TrendingUp,
                title: "데이터 기반",
                description: "정량적 지표와 분석을 통한 의사결정",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                icon: Briefcase,
                title: "프로젝트 리드",
                description: "크로스펑셔널 팀을 이끄는 리더십",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Code2,
                title: "AI & 바이브 코딩",
                description: "AI 대학원 과정 중이며 바이브 코딩 역량 보유",
                color: "text-purple-600",
                bg: "bg-purple-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${item.bg} rounded-lg mb-6`}>
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              주요 프로젝트
            </h2>
            <p className="text-xl text-gray-600">
              다양한 도메인에서의 프로젝트 경험
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.slice(0, 3).map((project, index) => {
              const projectIcons = [
                { Icon: ShoppingBag, gradient: "from-orange-400 to-red-500" },
                { Icon: Smartphone, gradient: "from-blue-400 to-indigo-500" },
                { Icon: MessageSquare, gradient: "from-green-400 to-emerald-500" }
              ];
              const { Icon, gradient } = projectIcons[index];
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all group"
                  >
                    {project.image ? (
                      <div className="h-40 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`bg-gradient-to-br ${gradient} h-40 flex items-center justify-center`}>
                        <Icon className="h-20 w-20 text-white/90" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-gray-900">{project.company}</span>
                        <span className="text-sm text-gray-400">·</span>
                        <span className="text-sm text-gray-500">{project.period}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {project.overview}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                        자세히 보기
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
            >
              모든 프로젝트 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
              <div className="relative px-12 py-20">
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        함께 일하고<br />싶으신가요?
                      </h2>
                      <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        새로운 기회와 협업을 언제나 환영합니다.
                      </p>

                      <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg"
                      >
                        연락처 보기
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="group flex items-center p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-blue-100 font-medium mb-1">
                            이메일
                          </div>
                          <div className="text-white font-semibold">
                            {portfolioData.personal.email}
                          </div>
                        </div>
                      </a>

                      <a
                        href={portfolioData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                          <Linkedin className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-blue-100 font-medium mb-1">
                            LinkedIn
                          </div>
                          <div className="text-white font-semibold">
                            프로필 보기
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}