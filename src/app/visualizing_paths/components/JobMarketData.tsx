import { Briefcase, TrendingUp, Building2 } from "lucide-react"
import type { JobMarketData } from "../data/learningPaths"

interface JobMarketDataProps {
  data: JobMarketData
}

export function JobMarketData({ data }: JobMarketDataProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">2024 Job Market Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Closed Positions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-700">{data.openPositions.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Growth Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-700">{data.growthRate}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Building2 className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Top Companies Hiring</h3>
          </div>
          <ul className="list-disc list-inside">
            {data.topCompanies.map((company, index) => (
              <li key={index} className="text-gray-700">
                {company}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

