import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import {
  Lightbulb,
  Search,
  BarChart3,
  Users,
  Wrench,
  CheckCircle2,
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

const ToolIcon = ({ iconName, colorClass }: { iconName: string; colorClass: string }) => {
  switch (iconName) {
    case "SiFigma": return <SiFigma className={`h-6 w-6 ${colorClass}`} />;
    case "SiSketch": return <SiSketch className={`h-6 w-6 ${colorClass}`} />;
    case "SiZeplin": return <Layers className={`h-6 w-6 ${colorClass}`} />;
    case "SiJira": return <SiJira className={`h-6 w-6 ${colorClass}`} />;
    case "SiConfluence": return <SiConfluence className={`h-6 w-6 ${colorClass}`} />;
    case "SiNotion": return <SiNotion className={`h-6 w-6 ${colorClass}`} />;
    case "SiGoogleanalytics": return <SiGoogleanalytics className={`h-6 w-6 ${colorClass}`} />;
    case "SiAmplitude": return <Activity className={`h-6 w-6 ${colorClass}`} />;
    case "SiMixpanel": return <SiMixpanel className={`h-6 w-6 ${colorClass}`} />;
    case "SiTableau": return <PieChart className={`h-6 w-6 ${colorClass}`} />;
    case "SiPython": return <SiPython className={`h-6 w-6 ${colorClass}`} />;
    case "Database": return <Database className={`h-6 w-6 ${colorClass}`} />;
    default: return <Wrench className={`h-6 w-6 ${colorClass}`} />;
  }
};

export function SkillsPage() {
  const skillCategories = [
    {
      title: "서비스 기획",
      icon: Lightbulb,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      borderColor: "border-yellow-200",
      skills: portfolioData.skills.planning
    },
    {
      title: "리서치 & 분석",
      icon: Search,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-blue-200",
      skills: portfolioData.skills.research
    },
    {
      title: "데이터 분석",
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-200",
      skills: portfolioData.skills.data
    },
    {
      title: "협업 & 관리",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      borderColor: "border-purple-200",
      skills: portfolioData.skills.collaboration
    },
    {
      title: "도구 & 툴",
      icon: Wrench,
      color: "text-pink-600",
      bg: "bg-pink-50",
      borderColor: "border-pink-200",
      skills: portfolioData.skills.tools
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-20 bg-white overflow-hidden border-b-2 border-gray-100">
        {/* 배경: 톱니바퀴, 도구, 스킬 아이콘들 */}
        <div className="absolute inset-0 opacity-5">
          {/* 톱니바퀴들 */}
          <svg className="absolute top-10 right-20 w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <svg className="absolute bottom-20 left-20 w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1"/>
          </svg>
          {/* 전구 아이콘 */}
          <svg className="absolute top-1/3 left-1/4 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.33.47 2.48 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
          </svg>
          {/* 코드 기호 */}
          <svg className="absolute bottom-1/4 right-1/3 w-28 h-28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>

        {/* 프로그레스 바 스타일 장식 */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="space-y-2">
            <div className="w-32 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-24 h-2 bg-purple-600 rounded-full"></div>
            <div className="w-28 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border-2 border-blue-600 rounded-lg flex items-center justify-center animate-pulse">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                Skills & Expertise
              </span>
              <div className="w-10 h-10 border-2 border-purple-600 rounded-lg flex items-center justify-center animate-pulse animation-delay-300">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              역량
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              다양한 도구와 방법론을 활용한 전문성
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl shadow-lg border-2 ${category.borderColor} overflow-hidden`}
              >
                <div className={`${category.bg} p-6 border-b ${category.borderColor}`}>
                  <div className="flex items-center">
                    <div className={`w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mr-4`}>
                      <category.icon className={`h-7 w-7 ${category.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill: any, skillIndex: number) => {
                      const isTool = typeof skill === 'object';
                      return (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05
                          }}
                          viewport={{ once: true }}
                          className={`flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${isTool ? 'items-start' : ''}`}
                        >
                          {isTool ? (
                            <div className={`p-2 rounded-lg bg-white shadow-sm mr-4 flex-shrink-0`}>
                              <ToolIcon iconName={skill.icon} colorClass={category.color} />
                            </div>
                          ) : (
                            <CheckCircle2 className={`h-5 w-5 ${category.color} mr-3 flex-shrink-0`} />
                          )}
                          <div className={isTool ? "flex flex-col" : ""}>
                            <span className={isTool ? "text-gray-900 font-bold" : "text-gray-800 font-medium"}>
                              {isTool ? skill.name : skill}
                            </span>
                            {isTool && (
                              <span className="text-sm text-gray-500 mt-1">
                                {skill.description}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning & Growth */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              지속적인 성장
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "학습 중",
                  items: [
                    "AI/ML 기반 서비스 기획",
                    "프로덕트 매니지먼트",
                    "그로스 해킹 심화"
                  ],
                  icon: BookOpen,
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                },
                {
                  title: "관심 분야",
                  items: [
                    "플랫폼 비즈니스",
                    "구독 경제",
                    "개인화 추천 시스템"
                  ],
                  icon: Compass,
                  color: "text-purple-600",
                  bg: "bg-purple-50"
                },
                {
                  title: "목표",
                  items: [
                    "CPO/Head of Product",
                    "프로덕트 조직 리드",
                    "0→1 프로덕트 런칭"
                  ],
                  icon: Target,
                  color: "text-green-600",
                  bg: "bg-green-50"
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${section.bg} rounded-xl mb-6 mx-auto`}>
                    <section.icon className={`h-7 w-7 ${section.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}