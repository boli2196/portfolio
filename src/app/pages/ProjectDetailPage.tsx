import { useParams, Link } from "react-router";
import { portfolioData } from "../data/portfolio-data";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Building2,
  User,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  CheckCircle2,
  Zap
} from "lucide-react";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = portfolioData.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            프로젝트를 찾을 수 없습니다
          </h1>
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        {/* Background: image or gradient */}
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              opacity: 0.3
            }}></div>
          </>
        )}

        {/* 장식 라인들 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-white hover:text-blue-100 mb-8 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              프로젝트 목록으로
            </Link>

            <div className="text-white">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-md text-xs font-bold tracking-widest uppercase bg-blue-500/80 text-white border border-blue-400/50 backdrop-blur-sm">
                  {project.role}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                  <Building2 className="h-4 w-4 text-blue-300" />
                  <span>{project.company}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                  <Calendar className="h-4 w-4 text-blue-300" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                  <Users className="h-4 w-4 text-blue-300" />
                  <span>{project.teamSize}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              프로젝트 개요
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Background */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">배경</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {project.background}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">프로젝트 목표</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {project.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-purple-50 rounded-xl"
                >
                  <CheckCircle2 className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{objective}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">접근 방법</h2>
            </div>
            <div className="space-y-4">
              {project.approach.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-4 flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg pt-1">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">주요 성과</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-800 font-medium">{result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              비즈니스 임팩트
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              {project.impact}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Used */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              활용한 역량
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              프로젝트 목록
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}