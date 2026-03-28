import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { CheckCircle2, Mail, Phone, Users, Bot, MessageCircle, GraduationCap, Award, BadgeCheck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AboutPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative pt-6 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
            ABOUT ME
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-5">ABOUT ME</p>
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-3 leading-none tracking-tight">
              Profile
            </h1>
            <p className="text-base text-white/40 leading-relaxed">
              사용자와 비즈니스를 연결하는 기획자
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="flex flex-col items-center">
                {/* 랜야드 줄 */}
                <div className="relative flex flex-col items-center">
                  <div className="w-1 h-16 bg-gradient-to-b from-blue-500/60 to-blue-500/80 rounded-full" />
                  {/* 클립 */}
                  <div className="flex flex-col items-center -mt-1">
                    <div className="w-5 h-5 rounded-full border-[3px] border-blue-400/80 bg-transparent" />
                    <div className="w-3 h-3 bg-blue-500/60 border border-blue-400/60 rounded-sm -mt-1.5" />
                  </div>
                </div>

                {/* 사원증 카드 */}
                <div className="w-80 rounded-xl overflow-hidden border border-white/20 bg-[#0f1117] shadow-[0_24px_80px_rgba(0,0,0,0.9)] -mt-1">

                  {/* 상단 헤더 - 회사 브랜딩 */}
                  <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm" />
                      </div>
                      <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Portfolio Inc.</span>
                    </div>
                    <span className="text-blue-200/60 text-[8px] tracking-widest font-mono">EMPLOYEE ID</span>
                  </div>

                  {/* 사진 + 홀로그램 */}
                  <div className="px-4 pt-4 pb-2 relative">
                    <div className="relative">
                      <ImageWithFallback
                        src={portfolioData.personal.profileImage}
                        alt={portfolioData.personal.name}
                        className="w-full object-cover object-top rounded-md border border-white/10"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>

                  {/* 이름 + 직책 */}
                  <div className="px-4 pb-3 border-b border-white/10">
                    <div className="text-white font-black text-lg leading-none">{portfolioData.personal.name}</div>
                    <div className="text-blue-300/70 text-[10px] tracking-[0.15em] mt-0.5 uppercase">Seungjin Lee</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded font-semibold tracking-wider uppercase">Service Planner</span>
                      <span className="text-white/20 text-[9px]">|</span>
                      <span className="text-white/40 text-[9px]">PO / PM</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-white mb-4">
                {portfolioData.personal.name}
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-blue-400" />
                <span className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-400">
                  {portfolioData.personal.title}
                </span>
              </div>
              <p className="text-white/50 leading-relaxed mb-8">
                {portfolioData.personal.introduction}
              </p>

              <div className="space-y-3 mb-8">
                {portfolioData.personal.summary.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/60">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-white/50">
                  <Mail className="h-4 w-4 mr-3 text-blue-400" />
                  <span>{portfolioData.personal.email}</span>
                </div>
                <div className="flex items-center text-white/50">
                  <Phone className="h-4 w-4 mr-3 text-violet-400" />
                  <span>{portfolioData.personal.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">PHILOSOPHY</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
              기획 철학
            </h2>
            <p className="text-white/50 leading-relaxed">
              제가 중요하게 생각하는 가치들입니다
            </p>
          </motion.div>

          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {[
              {
                title: "사용자 중심",
                description: "사용자의 불편함과 니즈를 깊이 이해하고, 그들의 입장에서 생각합니다. 데이터와 리서치를 통해 가설을 검증하며, 사용자에게 진정한 가치를 제공하는 서비스를 만듭니다.",
                icon: Users,
                color: "text-violet-400",
              },
              {
                title: "AI 활용 기획",
                description: "Claude, GPT 등 AI 툴을 기획 프로세스에 적극 활용합니다. 바이브 코딩으로 프로토타입을 직접 구현하고, AI 기반 인사이트 도출로 의사결정의 속도와 정확성을 높입니다.",
                icon: Bot,
                color: "text-sky-400",
              },
              {
                title: "협업과 소통",
                description: "디자이너, 개발자, 마케터 등 다양한 직군과 효과적으로 협업합니다. 명확한 커뮤니케이션으로 팀의 시너지를 극대화합니다.",
                icon: MessageCircle,
                color: "text-teal-400",
              }
            ].map((philosophy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-8"
              >
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center mb-6">
                  <philosophy.icon className={`h-5 w-5 ${philosophy.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {philosophy.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {philosophy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education - Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-5 w-5 text-amber-400" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/30">EDUCATION</p>
              </div>
              <h2 className="text-3xl font-black text-white mb-8">학력</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-white/20"></div>
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-10 mb-6"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1.5 top-5 w-3 h-3 bg-amber-400 border-2 border-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <div className="border border-white/10 bg-[#0a0a0a] p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-base font-bold text-white">{edu.school}</div>
                        <span className={`text-xs px-2.5 py-1 font-semibold ml-2 whitespace-nowrap ${
                          edu.degree === "석사"
                            ? "bg-violet-500/20 border border-violet-400/40 text-violet-300"
                            : "bg-sky-500/20 border border-sky-400/40 text-sky-300"
                        }`}>
                          {edu.degree}
                        </span>
                      </div>
                      <div className="text-white/60 text-sm mb-1">{edu.major}</div>
                      <div className="text-white/30 text-xs mb-3">{edu.period}</div>
                      <p className="text-white/50 text-sm leading-relaxed">{edu.description}</p>
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
                <Award className="h-5 w-5 text-amber-400" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/30">CERTIFICATIONS</p>
              </div>
              <h2 className="text-3xl font-black text-white mb-8">자격증</h2>
              <div className="grid gap-px bg-white/10">
                {portfolioData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#0a0a0a] p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#232F3E] border border-white/10">
                        {cert.issuer.toLowerCase().includes('amazon') || cert.issuer.toLowerCase().includes('aws') ? (
                          <div className="flex flex-col items-center justify-center gap-0.5 py-1">
                            <span className="text-[#FF9900] font-black text-[10px] leading-none tracking-tight">aws</span>
                            <svg viewBox="0 0 20 7" className="w-5 h-1.5">
                              <path d="M1 3.5 Q10 7 19 3.5" stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                              <path d="M16.5 1.5 L19.5 3.5 L16.5 5.5Z" fill="#FF9900"/>
                            </svg>
                          </div>
                        ) : (
                          <BadgeCheck className="h-5 w-5 text-emerald-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white mb-1">{cert.name}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-white/50">{cert.issuer}</span>
                          <span className="text-white/20">·</span>
                          <span className="text-xs px-2 py-0.5 border border-white/15 text-white/40">{cert.date}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">{cert.description}</p>
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
