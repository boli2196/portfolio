import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import {
  Lightbulb,
  Search,
  BarChart3,
  Users,
  Wrench,
  BookOpen,
  Compass,
  Target,
  Database,
  Layers,
  Activity,
  PieChart
} from "lucide-react";
import {
  SiFigma, SiSketch, SiJira, SiConfluence, SiNotion,
  SiGoogleanalytics, SiMixpanel, SiPython
} from "react-icons/si";

const ToolIcon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case "SiFigma": return <SiFigma className="h-6 w-6 text-[#F24E1E]" />;
    case "SiSketch": return <SiSketch className="h-6 w-6 text-[#F7B500]" />;
    case "SiZeplin": return <Layers className="h-6 w-6 text-teal-400" />;
    case "SiJira": return <SiJira className="h-6 w-6 text-blue-500" />;
    case "SiConfluence": return <SiConfluence className="h-6 w-6 text-blue-400" />;
    case "SiNotion": return <SiNotion className="h-6 w-6 text-white/70" />;
    case "SiGoogleanalytics": return <SiGoogleanalytics className="h-6 w-6 text-orange-400" />;
    case "SiAmplitude": return <Activity className="h-6 w-6 text-pink-400" />;
    case "SiMixpanel": return <SiMixpanel className="h-6 w-6 text-purple-400" />;
    case "SiTableau": return <PieChart className="h-6 w-6 text-emerald-400" />;
    case "SiPython": return <SiPython className="h-6 w-6 text-yellow-400" />;
    case "Database": return <Database className="h-6 w-6 text-sky-400" />;
    default: return <Wrench className="h-6 w-6 text-orange-400" />;
  }
};

export function SkillsPage() {
  const textCategories = [
    {
      title: "서비스 기획",
      icon: Lightbulb,
      iconColor: "text-amber-400",
      skills: portfolioData.skills.planning
    },
    {
      title: "리서치 & 분석",
      icon: Search,
      iconColor: "text-sky-400",
      skills: portfolioData.skills.research
    },
    {
      title: "데이터 분석",
      icon: BarChart3,
      iconColor: "text-emerald-400",
      skills: portfolioData.skills.data
    },
    {
      title: "협업 & 관리",
      icon: Users,
      iconColor: "text-violet-400",
      skills: portfolioData.skills.collaboration
    }
  ];

  return (
    <div className="bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative pt-6 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
            EXPERTISE
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-5">SKILLS & EXPERTISE</p>
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-3 leading-none tracking-tight">
              Skills
            </h1>
            <p className="text-base text-white/40 leading-relaxed">
              다양한 도구와 방법론을 활용한 전문성
            </p>
          </motion.div>
        </div>
      </section>

      {/* 도구 & 툴 */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-black text-white">도구 & 툴</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {portfolioData.skills.tools.map((skill: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start p-4 border border-white/10 bg-white/5"
                >
                  <div className="p-2 border border-white/10 mr-4 flex-shrink-0">
                    <ToolIcon iconName={skill.icon} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">{skill.name}</span>
                    <span className="text-xs text-white/40 mt-1">{skill.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 나머지 스킬 카테고리 - 2열 컴팩트 */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {textCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-white/15 flex items-center justify-center">
                    <category.icon className={`h-4 w-4 ${category.iconColor}`} />
                  </div>
                  <h2 className="text-base font-black text-white">{category.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="text-sm px-3.5 py-1.5 border border-white/15 text-white/60 bg-white/[0.03]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning & Growth */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">GROWTH</p>
            <h2 className="text-4xl font-black text-white">지속적인 성장</h2>
          </motion.div>

          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {[
              {
                title: "학습 중",
                items: ["AI/ML 기반 서비스 기획", "프로덕트 매니지먼트", "그로스 해킹 심화"],
                icon: BookOpen,
                iconColor: "text-sky-400",
              },
              {
                title: "관심 분야",
                items: ["플랫폼 비즈니스", "구독 경제", "개인화 추천 시스템"],
                icon: Compass,
                iconColor: "text-violet-400",
              },
              {
                title: "목표",
                items: ["CPO/Head of Product", "프로덕트 조직 리드", "0→1 프로덕트 런칭"],
                icon: Target,
                iconColor: "text-rose-400",
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-white/15 flex items-center justify-center">
                    <section.icon className={`h-4 w-4 ${section.iconColor}`} />
                  </div>
                  <h3 className="text-base font-black text-white">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start text-white/55 text-sm">
                      <span className="inline-block w-1 h-1 bg-white/25 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
