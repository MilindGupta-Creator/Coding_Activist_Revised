import { LearningPath } from "../data/learningPaths";
import {
  ArrowLeft,
  Book,
  Video,
  Globe,
  Notebook,
  Clock,
  ChevronRight,
  BriefcaseIcon as BriefcaseDollar,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PenToolIcon as Tool,
  TrendingUp,
} from "lucide-react";
import { JobMarketData } from "./JobMarketData";
import { useEffect } from "react";

interface PathDetailProps {
  path: LearningPath;
  onBack: () => void;
}

export function PathDetail({ path, onBack }: PathDetailProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "book":
        return <Book className="w-4 h-4" />;
      case "course":
        return <Notebook className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-28">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 group"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md group-hover:bg-blue-600 transition-colors duration-300 mr-3">
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="font-medium">Back to Paths</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center mb-6">
          <div
            className={`${path.color} lg:w-16 h-16 w-36 rounded-2xl flex items-center justify-center mr-6`}
          >
            <path.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {path.title}
            </h1>
            <p className="text-gray-600 text-lg">{path.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Duration</h3>
            </div>
            <p className="text-gray-700">{path.totalDuration}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Final Level</h3>
            </div>
            <p className="text-gray-700 capitalize">
              {path.steps[path.steps.length - 1].skillLevel}
            </p>
          </div>

          {path.salary && (
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <BriefcaseDollar className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Salary Range</h3>
              </div>
              <p className="text-gray-700">
                {path.salary.currency} {path.salary.min} - {path.salary.max}
              </p>
            </div>
          )}
        </div>

        {path.careers && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Career Opportunities
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {path.careers.map((career, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {path.prerequisites && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Prerequisites
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {path.prerequisites.map((prerequisite, index) => (
              <li key={index} className="text-gray-700">
                {prerequisite}
              </li>
            ))}
          </ul>
        </div>
      )}

      {path.tools && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Tool className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Tools and Technologies
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {path.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute top-0 bottom-0 w-1 bg-gray-200 rounded-full" />

        <div className="space-y-12">
          {path.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-white border-4 border-blue-600" />

              <div className="ml-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
                <div className="absolute -left-8 top-8 w-8 h-1 bg-gray-200" />

                <div className="flex items-start mb-6">
                  <div
                    className={`${path.color} w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0`}
                  >
                    <span className="font-semibold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {step.timeEstimate}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      step.skillLevel === "beginner"
                        ? "bg-green-50 text-green-700"
                        : step.skillLevel === "intermediate"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {step.skillLevel}
                  </span>
                </div>

                {step.keyTakeaways && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="text-sm font-semibold text-gray-900">
                        Key Takeaways:
                      </h4>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start group">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-gray-700">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.prerequisites && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="text-sm font-semibold text-gray-900">
                        Prerequisites:
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {step.prerequisites.map((prerequisite, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
                          {prerequisite}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.projects && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Notebook className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="text-sm font-semibold text-gray-900">
                        Projects:
                      </h4>
                    </div>
                    <div className="grid gap-3">
                      {step.projects.map((project, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                          <h5 className="font-medium text-gray-900 mb-1">
                            {project.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Learning Resources:
                  </h4>
                  <ul className="grid gap-2">
                    {step.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 group bg-white hover:bg-blue-50 p-3 rounded-lg transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors duration-300">
                            {getResourceIcon(resource.type)}
                          </div>
                          <span className="flex-1">{resource.name}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />

      {path.industryTrends && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Industry Trends
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {path.industryTrends.map((trend, index) => (
              <li key={index} className="text-gray-700">
                {trend}
              </li>
            ))}
          </ul>
        </div>
      )}

{path.jobMarketData && <JobMarketData data={path.jobMarketData} />}

      {path.whatsNext && (
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bol d text-gray-900">What's Next?</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Advanced Topics to Explore
              </h3>
              <ul className="space-y-3">
                {path.whatsNext.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-indigo-500 mr-2 shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended Resources
              </h3>
              <ul className="space-y-3">
                {path.whatsNext.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white/60 hover:bg-white rounded-lg group transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors duration-300">
                        {getResourceIcon(resource.type)}
                      </div>
                      <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                        {resource.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
