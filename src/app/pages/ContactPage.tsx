import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { Mail, Phone, Linkedin } from "lucide-react";

export function ContactPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative pt-6 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
            LET'S TALK
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-5">GET IN TOUCH</p>
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-3 leading-none tracking-tight">
              Contact
            </h1>
            <p className="text-base text-white/40 leading-relaxed">
              새로운 기회와 협업을 환영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {/* Left: Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a] p-12 flex flex-col justify-between min-h-[480px]"
            >
              <div>
                <div className="w-28 h-28 mb-8 overflow-hidden border border-white/10 rounded-full">
                  <img
                    src={portfolioData.personal.profileImage}
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline gap-4 mb-3">
                  <h2 className="text-5xl font-black text-white">
                    {portfolioData.personal.name}
                  </h2>
                  <span className="text-xl text-white/30 font-medium tracking-wide">Seungjin Lee</span>
                </div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-500/15 border border-blue-400/30 text-blue-300 text-sm font-semibold tracking-wide">
                    {portfolioData.personal.title}
                  </span>
                </div>
                <p className="text-white/40 leading-relaxed text-base">
                  서비스 기획, 프로덕트 매니지먼트, 컨설팅 등<br />
                  다양한 형태의 협업에 열려있습니다.<br />
                  언제든지 편하게 연락 주세요.
                </p>
              </div>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold hover:bg-white/90 transition-colors self-start mt-10"
              >
                <Mail className="h-5 w-5 mr-2" />
                이메일 보내기
              </a>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0a0a0a] flex flex-col divide-y divide-white/10"
            >
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center p-10 hover:bg-white/5 transition-colors group flex-1"
              >
                <div className="w-12 h-12 border border-white/15 flex items-center justify-center mr-6 group-hover:border-white/30 transition-colors flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-medium mb-2 tracking-widest uppercase">Email</div>
                  <div className="text-white/80 font-medium">
                    {portfolioData.personal.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="flex items-center p-10 hover:bg-white/5 transition-colors group flex-1"
              >
                <div className="w-12 h-12 border border-white/15 flex items-center justify-center mr-6 group-hover:border-white/30 transition-colors flex-shrink-0">
                  <Phone className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-medium mb-2 tracking-widest uppercase">Phone</div>
                  <div className="text-white/80 font-medium">
                    {portfolioData.personal.phone}
                  </div>
                </div>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-10 hover:bg-white/5 transition-colors group flex-1"
              >
                <div className="w-12 h-12 border border-white/15 flex items-center justify-center mr-6 group-hover:border-white/30 transition-colors flex-shrink-0">
                  <Linkedin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-medium mb-2 tracking-widest uppercase">LinkedIn</div>
                  <div className="text-white/80 font-medium break-all">
                    {portfolioData.personal.linkedin}
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work Together */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">WHY COLLABORATE</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
              함께 일하면 좋은 이유
            </h2>
            <p className="text-white/50 leading-relaxed">
              다양한 프로젝트 경험을 통해 검증된 역량
            </p>
          </motion.div>

          <div className="grid gap-px bg-white/10 md:grid-cols-3">
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
                className="bg-[#0a0a0a] p-8"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-black text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="border border-white/10 p-16 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">GET IN TOUCH</p>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                기획자를 찾고 있다면
              </h2>
              <p className="text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto">
                프로젝트나 포지션에 대해 궁금한 점이 있다면<br />
                편하게 연락 주세요
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold text-base hover:bg-white/90 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  이메일 보내기
                </a>
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white font-semibold text-base hover:border-white/50 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  전화하기
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
