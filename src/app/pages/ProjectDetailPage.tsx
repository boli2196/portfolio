import { useParams, Link } from "react-router";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Zap
} from "lucide-react";

function AutoScrollImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const measure = () => {
    if (imgRef.current && containerRef.current) {
      const { naturalWidth, naturalHeight, offsetWidth } = imgRef.current;
      const renderedHeight = (naturalHeight / naturalWidth) * offsetWidth;
      const viewportH = containerRef.current.offsetHeight;
      setScrollAmount(Math.max(0, renderedHeight - viewportH));
      setAnimKey((k) => k + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 200px/sec
  const duration = scrollAmount > 0 ? Math.round(scrollAmount / 200) : 0;

  return (
    <div
      ref={containerRef}
      style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}
    >
      <style>{`
        @keyframes page-scroll-${animKey} {
          0%, 8%   { transform: translateY(0); }
          80%, 90% { transform: translateY(-${scrollAmount}px); }
          100%     { transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          animation: scrollAmount > 0
            ? `page-scroll-${animKey} ${duration}s ease-in-out infinite`
            : "none",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={measure}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = portfolioData.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            프로젝트를 찾을 수 없습니다
          </h1>
          <Link
            to="/projects"
            className="text-white/60 hover:text-white font-medium transition-colors"
          >
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative py-20 overflow-hidden border-b border-white/10">
        {/* Background: image at low opacity */}
        {project.image && (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/80"></div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-white/40 hover:text-white mb-8 font-medium transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              프로젝트 목록으로
            </Link>

            <div>
              <div className="inline-flex items-center gap-1.5 mb-5 text-sm font-medium text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                {project.role}
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 border border-white/15 px-3 py-2">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span className="text-white/50">{project.company}</span>
                </div>
                <div className="flex items-center gap-2 border border-white/15 px-3 py-2">
                  <Calendar className="h-4 w-4 text-white/50" />
                  <span className="text-white/50">{project.period}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Browser Mockup */}
      {project.image && (
        <section className="py-16 border-b border-white/10 bg-white/[0.02]">
          <div className="mx-4 lg:mx-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Mac browser frame */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                {/* Browser chrome */}
                <div className="bg-[#1e1e1e] px-4 py-3 flex items-center gap-3 border-b border-white/10">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 mx-4">
                    <div className="bg-[#2a2a2a] rounded-md px-3 py-1.5 text-xs text-white/30 text-center max-w-sm mx-auto">
                      {(project as any).url ?? project.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}
                    </div>
                  </div>
                </div>
                {/* Screenshot - auto scroll */}
                <AutoScrollImage src={project.image} alt={project.title} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">OVERVIEW</p>
            <h2 className="text-3xl font-black text-white mb-6">
              프로젝트 개요
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Background */}
      <section className="py-16 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center mr-4">
                <Lightbulb className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-3xl font-black text-white">배경</h2>
            </div>
            <p className="text-white/60 leading-relaxed text-lg">
              {project.background}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center mr-4">
                <Target className="h-5 w-5 text-rose-400" />
              </div>
              <h2 className="text-3xl font-black text-white">프로젝트 목표</h2>
            </div>
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {project.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-[#0a0a0a]"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">{objective}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center mr-4">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-black text-white">접근 방법</h2>
            </div>
            <div className="space-y-4">
              {project.approach.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center justify-center w-7 h-7 border border-white/15 text-white/40 mr-4 flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-white/60 leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center mr-4">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black text-white">주요 성과</h2>
            </div>
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0a0a0a] p-6"
                >
                  <div className="flex items-start">
                    <div className="w-6 h-6 border border-white/15 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="text-white/60 font-medium">{result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">IMPACT</p>
            <h2 className="text-3xl font-black text-white mb-6">
              비즈니스 임팩트
            </h2>
            <p className="text-white/60 leading-relaxed text-xl max-w-3xl mx-auto">
              {project.impact}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Used */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 text-center">SKILLS</p>
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              활용한 역량
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-xs px-3 py-1 border border-white/15 text-white/40 rounded-full hover:border-white/30 hover:text-white/60 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-white/25 text-white hover:border-white/50 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              프로젝트 목록
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
