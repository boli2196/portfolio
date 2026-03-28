import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";

const marqueeKeywords = [
  "Service Design", "Product Strategy", "UX Planning", "Data-Driven", "AI Integration",
  "Shopify", "Roadmapping", "FO / BO Design", "Project Lead", "Stakeholder Mgmt",
  "User Research", "Ecommerce", "API Planning", "Vibe Coding",
];

const marqueeKeywords2 = [
  "Global Ecommerce", "Rental Platform", "B2B System", "Loyalty Program", "Payment Flow",
  "Membership Design", "Next-Gen Platform", "US Market", "Singapore", "Cart & Order",
  "Backend Planning", "MVP Scoping", "Go-to-Market",
];

export function HomePage() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white" style={{ overflowX: "clip" }}>

      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-black grid lg:grid-cols-2">

        {/* Left: Photo */}
        <motion.div
          className="relative overflow-hidden min-h-[55vw] lg:min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={`${base}IMG_7490_1.jpeg`}
            alt="이승진"
            className="w-full h-full object-cover object-center"
          />
          {/* Right-edge fade to blend with text side */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40" />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="flex items-center justify-center py-24 lg:py-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <div className="w-full max-w-[480px] px-10 xl:px-0">
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/35 mb-10">
              Service Planner / PO
            </p>

            <h1 className="text-[clamp(3.4rem,4.6vw,6rem)] font-black leading-[1.05] tracking-tight text-white mb-10">
              사용자와<br />비즈니스를<br />잇는 기획자,<br />이승진
            </h1>

            <p className="text-base text-white/45 mb-12 leading-relaxed">
              {portfolioData.personal.introduction}
            </p>

            <div className="flex gap-3 mb-16">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                프로젝트 보기 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                연락하기
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-8 border-t border-white/10">
              {[
                { n: "13+", label: "Years" },
                { n: "10+", label: "Projects" },
                { n: "4", label: "Companies" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white leading-none">{s.n}</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/4 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/20">
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Marquee Banners (교차 띠) ── */}
      <div className="relative bg-[#0a0a0a]" style={{ height: "220px" }}>
        {/* Strip 1: 흰색, 왼쪽 스크롤 */}
        <div style={{
          position: "absolute",
          left: "-50vw",
          width: "200vw",
          top: "36px",
          transform: "rotate(-4deg)",
          overflow: "hidden",
          background: "white",
        }}>
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 28s linear infinite",
            alignItems: "center",
            padding: "14px 0",
          }}>
            {[...marqueeKeywords, ...marqueeKeywords].map((kw, i) => (
              <span key={i} style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "1.7rem", letterSpacing: "0.06em",
                whiteSpace: "nowrap", padding: "0 28px", color: "#000",
                flexShrink: 0,
              }}>
                {kw}<span style={{ color: "rgba(0,0,0,0.25)", margin: "0 10px" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Strip 2: 파란색, 오른쪽 스크롤 */}
        <div style={{
          position: "absolute",
          left: "-50vw",
          width: "200vw",
          top: "124px",
          transform: "rotate(4deg)",
          overflow: "hidden",
          background: "#2563eb",
        }}>
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "marquee-reverse 28s linear infinite",
            alignItems: "center",
            padding: "14px 0",
          }}>
            {[...marqueeKeywords2, ...marqueeKeywords2].map((kw, i) => (
              <span key={i} style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "1.7rem", letterSpacing: "0.06em",
                whiteSpace: "nowrap", padding: "0 28px", color: "#fff",
                flexShrink: 0,
              }}>
                {kw}<span style={{ color: "rgba(255,255,255,0.3)", margin: "0 10px" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Numbers / About ── */}
      <section className="py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">About</p>
              <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
                13년간 쌓아온<br />기획의 깊이
              </h2>
              <p className="text-white/50 leading-relaxed max-w-sm">
                롯데, 삼성, 교보, 코웨이를 거치며 대형 커머스부터 글로벌 이커머스까지 다양한 도메인의 서비스를 기획해왔습니다.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-10 text-sm text-white/50 hover:text-white transition-colors group"
              >
                더 알아보기
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[
                { number: "13년+", label: "서비스 기획 경력" },
                { number: "4개사", label: "대기업 경험" },
                { number: "10+", label: "주요 프로젝트" },
                { number: "글로벌", label: "미국 · 싱가포르" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0a0a0a] p-8"
                >
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Work</p>
              <h2 className="text-5xl font-black">주요 프로젝트</h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
            >
              전체 보기
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div>
            {portfolioData.projects.slice(0, 5).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="flex items-center gap-6 py-7 border-t border-white/10 hover:bg-white/[0.03] transition-colors group px-2 -mx-2"
                >
                  <span className="text-xs text-white/20 font-mono w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/30 mt-1">
                      {project.company} · {project.period}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 hidden lg:flex">
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1 border border-white/15 text-white/40 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              전체 보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-16">Expertise</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              {
                title: "전략 기획",
                skills: ["비즈니스 전략 수립", "서비스 로드맵", "이해관계자 관리", "데이터 기반 의사결정"],
              },
              {
                title: "커머스 플랫폼",
                skills: ["FO/BO 화면설계", "주문·결제·회원", "기간계 연동 설계", "Shopify 커스터마이징"],
              },
              {
                title: "글로벌 서비스",
                skills: ["미국 시장 기획", "싱가포르 현지화", "글로벌 결제 연동", "해외 수행사 협업"],
              },
              {
                title: "AI & 기술",
                skills: ["AI 대학원 과정", "바이브 코딩", "GTM 연동 설계", "API 기획"],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-8"
              >
                <h3 className="text-base font-bold text-white mb-6">{item.title}</h3>
                <ul className="space-y-2">
                  {item.skills.map((skill) => (
                    <li key={skill} className="text-sm text-white/40">{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-8">Contact</p>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-black leading-none tracking-tight mb-12">
              기획으로
              <br />증명합니다.
            </h2>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center gap-3 text-xl text-white/50 hover:text-white transition-colors group"
            >
              {portfolioData.personal.email}
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
