import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale
} from "chart.js";
import { Line, Bar, Doughnut, Radar, Pie } from "react-chartjs-2";
import { TrendingUp, Globe, Building, Briefcase, ChevronDown, Info } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale
);

type TimeRangeType = 'monthly' | 'quarterly' | 'yearly';
type RegionType = 'northAmerica' | 'europe' | 'asiaPacific' | 'latinAmerica' | 'global';

const JobTrends = () => {
  const [timeRange, setTimeRange] = useState<TimeRangeType>("yearly");
  const [region, setRegion] = useState<RegionType>("global");

  // Sample data for charts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quarters = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024"];
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

  // Dynamic labels based on selected time range
  const getTimeLabels = () => {
    switch (timeRange) {
      case "quarterly": return quarters;
      case "yearly": return years;
      default: return months;
    }
  };

  // Job Growth Data with regional variations
  const getJobGrowthData = () => {
    const baseData = {
      monthly: [1200, 1350, 1500, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000],
      quarterly: [1200, 1600, 2200, 2800, 3200, 3600],
      yearly: [800, 1200, 1800, 2400, 3000, 3600]
    };

    const regionalVariations = {
      northAmerica: [1.2, 1.15, 1.1, 1.2, 1.25, 1.3],
      europe: [0.9, 0.95, 1.0, 1.05, 1.1, 1.15],
      asiaPacific: [1.3, 1.4, 1.5, 1.45, 1.4, 1.5],
      latinAmerica: [0.7, 0.8, 0.9, 1.0, 1.1, 1.2],
      global: [1, 1, 1, 1, 1, 1]
    };

    const multiplier = regionalVariations[region as RegionType] || regionalVariations.global;

    return baseData[timeRange].map((value: number, index: number) => {
      const multiplierValue = multiplier[Math.min(index, multiplier.length - 1)];
      return Math.round(value * multiplierValue);
    });
  };

  const jobGrowthData = {
    labels: getTimeLabels(),
    datasets: [
      {
        label: "Tech Jobs Growth",
        data: getJobGrowthData(),
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Non-Tech Jobs Growth",
        data: getJobGrowthData().map(val => Math.round(val * 0.7)),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const jobCategoriesData = {
    labels: ["Frontend", "Backend", "Full Stack", "DevOps", "Data Science", "Mobile", "AI/ML", "Cybersecurity", "Cloud", "UI/UX"],
    datasets: [
      {
        label: "Number of Jobs",
        data: [450, 380, 520, 290, 340, 220, 310, 280, 360, 240],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(107, 114, 128, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(124, 58, 237, 0.8)",
          "rgba(37, 99, 235, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const salaryTrendsData = {
    labels: ["Entry Level", "Mid Level", "Senior Level", "Lead", "Architect", "CTO/VP"],
    datasets: [
      {
        label: "Average Salary (USD)",
        data: [65000, 95000, 130000, 160000, 180000, 220000],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Salary Range (High)",
        data: [80000, 120000, 160000, 190000, 220000, 300000],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const skillsDemandData = {
    labels: ["React", "JavaScript", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "Kubernetes", "Go", "Rust", "TensorFlow"],
    datasets: [
      {
        label: "Current Demand Score",
        data: [85, 90, 75, 80, 70, 65, 60, 50, 55, 45, 40, 60],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Projected Growth (Next Year)",
        data: [90, 85, 85, 85, 80, 75, 70, 60, 70, 60, 55, 75],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderRadius: 6,
      }
    ],
  };

  const industryTrendsData = {
    labels: ["Fintech", "Healthcare", "E-commerce", "Education", "Entertainment", "Manufacturing", "Transportation"],
    datasets: [
      {
        label: "Job Growth Rate (%)",
        data: [28, 35, 22, 18, 24, 15, 20],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Average Salary Premium (%)",
        data: [25, 15, 10, 5, 12, 8, 10],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 6,
      }
    ],
  };

  const hiringTimelineData = {
    labels: ["Job Posting", "Initial Screening", "Technical Assessment", "First Interview", "Second Interview", "Final Decision", "Offer"],
    datasets: [
      {
        label: "Average Days",
        data: [0, 5, 12, 18, 25, 30, 35],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(139, 92, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(139, 92, 246)",
        tension: 0.4,
      },
      {
        label: "Fast-Track Process",
        data: [0, 3, 7, 10, 15, 18, 20],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(16, 185, 129)",
        tension: 0.4,
      }
    ],
  };

  const remoteWorkTrendsData = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Remote Jobs (%)",
        data: [15, 65, 75, 70, 68, 65],
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Hybrid Jobs (%)",
        data: [10, 15, 20, 25, 30, 35],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "On-site Jobs (%)",
        data: [75, 20, 5, 5, 2, 0],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const workModelPreferenceData = {
    labels: ["Remote", "Hybrid", "On-site"],
    datasets: [
      {
        label: "Employer Preference (%)",
        data: [25, 60, 15],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const employeePreferenceData = {
    labels: ["Remote", "Hybrid", "On-site"],
    datasets: [
      {
        label: "Employee Preference (%)",
        data: [55, 40, 5],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const skillsRadarData = {
    labels: ["Technical Skills", "Communication", "Problem Solving", "Teamwork", "Adaptability", "Leadership"],
    datasets: [
      {
        label: "2023 Requirements",
        data: [80, 65, 75, 70, 60, 50],
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "rgb(139, 92, 246)",
        pointBackgroundColor: "rgb(139, 92, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(139, 92, 246)",
      },
      {
        label: "2024 Requirements",
        data: [85, 80, 85, 80, 75, 65],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
      }
    ],
  };

  const regionalComparisonData = {
    labels: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"],
    datasets: [
      {
        label: "Job Growth (%)",
        data: [25, 20, 30, 15, 18, 12],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Salary Growth (%)",
        data: [15, 12, 18, 10, 14, 8],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 6,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "white",
          padding: 20,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "white",
          padding: 20,
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
    },
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Average Tech Salary",
      value: "$112,500",
      change: "+8.5%",
      trend: "up",
      description: "Year-over-year increase"
    },
    {
      title: "Open Positions",
      value: "245,800",
      change: "+12.3%",
      trend: "up",
      description: "Compared to last quarter"
    },
    {
      title: "Time to Hire",
      value: "32 days",
      change: "-4.2%",
      trend: "down",
      description: "Faster than previous quarter"
    },
    {
      title: "Remote Jobs",
      value: "68%",
      change: "+62.1%",
      trend: "up",
      description: "Faster increase from Covid time"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">



        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-violet-900/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Market Overview
            </TabsTrigger>
            <TabsTrigger value="regional" className="data-[state=active]:bg-violet-900/30">
              <Globe className="w-4 h-4 mr-2" />
              Regional Data
            </TabsTrigger>
            <TabsTrigger value="industry" className="data-[state=active]:bg-violet-900/30">
              <Building className="w-4 h-4 mr-2" />
              Industry Trends
            </TabsTrigger>
            <TabsTrigger value="hiring" className="data-[state=active]:bg-violet-900/30">
              <Briefcase className="w-4 h-4 mr-2" />
              Hiring Process
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Growth Trend */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Tech Job Growth Trend</h3>
                  <Badge variant="outline" className="bg-violet-900/20 text-violet-300 border-violet-800">
                    {timeRange === "monthly" ? "Monthly" : timeRange === "quarterly" ? "Quarterly" : "Yearly"} Data
                  </Badge>
                </div>
                <div className="h-80">
                  <Line data={jobGrowthData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Tech job postings have shown consistent growth over the past year, with a notable
                    increase in Q3 and Q4. Non-tech roles are growing at a slower but steady pace.
                  </p>
                </div>
              </motion.div>

              {/* Job Categories */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Job Categories Distribution</h3>
                <div className="h-80">
                  <Doughnut data={jobCategoriesData} options={doughnutOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Full Stack and Frontend roles continue to dominate the tech job market, with AI/ML and
                    Cybersecurity showing the fastest growth rates among all categories.
                  </p>
                </div>
              </motion.div>

              {/* Salary Trends */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Salary Trends by Experience Level</h3>
                <div className="h-80">
                  <Bar data={salaryTrendsData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Senior-level positions show the highest salary growth, with a significant jump from mid-level to senior roles.
                    The gap between average and high-end salaries widens at more senior levels.
                  </p>
                </div>
              </motion.div>

              {/* Skills in Demand */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Most In-Demand Skills</h3>
                <div className="h-80">
                  <Bar
                    data={skillsDemandData}
                    options={{
                      ...chartOptions,
                      indexAxis: 'y' as const,
                    }}
                  />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    JavaScript and React remain the most sought-after skills, with TypeScript and Node.js following closely.
                    TensorFlow and AI-related skills show the highest projected growth for the next year.
                  </p>
                </div>
              </motion.div>

              {/* Skills Balance Radar */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Skills Balance Requirements</h3>
                <div className="h-80">
                  <Radar data={skillsRadarData} options={radarOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    While technical skills remain paramount, employers are increasingly valuing soft skills like communication
                    and adaptability. The trend shows a more balanced skill set requirement for 2024.
                  </p>
                </div>
              </motion.div>

              {/* Remote Work Trends */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Remote Work Trends</h3>
                <div className="h-80">
                  <Line data={remoteWorkTrendsData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    After the pandemic-driven spike in 2020, remote work has stabilized at around 65% of tech jobs.
                    Hybrid arrangements continue to grow in popularity, while fully on-site positions are becoming rare.
                  </p>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Regional Comparison */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Regional Growth Comparison</h3>
                <div className="h-80">
                  <Bar data={regionalComparisonData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Asia Pacific shows the strongest job growth at 30%, followed by North America at 25%.
                    Salary growth follows a similar pattern but with less pronounced regional differences.
                  </p>
                </div>
              </motion.div>

              {/* Regional Salary Comparison */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Regional Salary Comparison (USD)</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white">North America</span>
                    <span className="text-white font-semibold">$120,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white">Europe</span>
                    <span className="text-white font-semibold">$95,800</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white">Asia Pacific</span>
                    <span className="text-white font-semibold">$78,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white">Latin America</span>
                    <span className="text-white font-semibold">$52,400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white">Middle East</span>
                    <span className="text-white font-semibold">$68,900</span>
                  </div>
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    North America maintains the highest average salaries, though cost of living adjustments
                    are increasingly common for remote workers based in different regions.
                  </p>
                </div>
              </motion.div>

              {/* Regional Demand Hotspots */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Regional Demand Hotspots</h3>
                <div className="space-y-4">
                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">North America</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Top City</span>
                          <span className="text-white">San Francisco</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Fastest Growing</span>
                          <span className="text-white">Austin</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Hot Skills</span>
                          <span className="text-white">AI/ML, React, AWS</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Europe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Top City</span>
                          <span className="text-white">London</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Fastest Growing</span>
                          <span className="text-white">Berlin</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Hot Skills</span>
                          <span className="text-white">TypeScript, Python, Cloud</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Asia Pacific</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Top City</span>
                          <span className="text-white">Singapore</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Fastest Growing</span>
                          <span className="text-white">Bangalore</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Hot Skills</span>
                          <span className="text-white">Full Stack, Mobile, DevOps</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="industry" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Industry Growth Trends */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Industry Growth & Salary Trends</h3>
                <div className="h-80">
                  <Bar data={industryTrendsData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Healthcare tech shows the strongest job growth at 35%, followed by Fintech at 28%.
                    Fintech offers the highest salary premium at 25% above industry average.
                  </p>
                </div>
              </motion.div>

              {/* Industry Insights */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Industry Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-600">Fintech</Badge>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                        +28% Growth
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Blockchain, cryptocurrency, and AI-driven financial tools are driving growth.
                      Regulatory compliance expertise is increasingly valued alongside technical skills.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-600">Healthcare</Badge>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                        +35% Growth
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Telemedicine, health data analytics, and AI diagnostics are creating numerous opportunities.
                      Privacy expertise and regulatory knowledge are key differentiators.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-600">E-commerce</Badge>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                        +22% Growth
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Personalization engines, AR/VR shopping experiences, and advanced logistics solutions
                      are driving technical innovation and job creation.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-600">Education</Badge>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                        +18% Growth
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">
                      EdTech continues to evolve with adaptive learning platforms, virtual classrooms,
                      and AI-powered personalized education tools creating new opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Industry-Specific Skills */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Industry-Specific Skills in Demand</h3>
                <div className="space-y-4">
                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Fintech</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700">Blockchain</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Smart Contracts</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Financial APIs</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Cybersecurity</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Regulatory Compliance</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Data Analysis</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Healthcare</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700">HIPAA Compliance</Badge>
                        <Badge variant="secondary" className="bg-gray-700">HL7/FHIR</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Medical Imaging</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Telemedicine</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Health Analytics</Badge>
                        <Badge variant="secondary" className="bg-gray-700">ML for Diagnostics</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/30 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">E-commerce</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700">Payment Gateways</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Recommendation Systems</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Inventory Management</Badge>
                        <Badge variant="secondary" className="bg-gray-700">AR/VR</Badge>
                        <Badge variant="secondary" className="bg-gray-700">Logistics Optimization</Badge>
                        <Badge variant="secondary" className="bg-gray-700">CRM Integration</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="hiring" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hiring Timeline */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Hiring Process Timeline</h3>
                <div className="h-80">
                  <Line data={hiringTimelineData} options={chartOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    The standard hiring process takes an average of 35 days from job posting to offer, while
                    fast-track processes for in-demand roles can be completed in as little as 20 days.
                  </p>
                </div>
              </motion.div>

              {/* Work Model Preferences */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Employer Work Model Preferences</h3>
                <div className="h-80">
                  <Pie data={workModelPreferenceData} options={pieOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Employers increasingly prefer hybrid work models (60%), with only 15% requiring fully on-site work.
                    This represents a significant shift from pre-pandemic preferences.
                  </p>
                </div>
              </motion.div>

              {/* Employee Preferences */}
              <motion.div
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Employee Work Model Preferences</h3>
                <div className="h-80">
                  <Pie data={employeePreferenceData} options={pieOptions} />
                </div>
                <div className="mt-4 text-gray-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p>
                    Employees strongly prefer remote work (55%) or hybrid arrangements (40%), with only 5% preferring
                    fully on-site work. This preference gap creates negotiation challenges in the hiring process.
                  </p>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Insights */}
        <motion.div
          className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Key Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-violet-400 mb-2">Emerging Trends</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>AI and Machine Learning roles have seen a 45% increase in demand</li>
                <li>Remote work opportunities continue to expand, with 68% of tech jobs offering remote options</li>
                <li>Blockchain and Web3 positions are growing at 30% annually</li>
                <li>DevOps and Cloud expertise remain critical skills for employers</li>
                <li>Cybersecurity positions have seen a 38% increase following high-profile breaches</li>
                <li>Companies are increasingly hiring for specialized AI ethics and governance roles</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-violet-400 mb-2">Industry Outlook</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Fintech and Healthcare tech sectors show the strongest hiring growth</li>
                <li>Startups are increasingly competing with established companies for talent</li>
                <li>Contract and freelance opportunities are expanding by 25% year-over-year</li>
                <li>Companies are placing greater emphasis on soft skills alongside technical abilities</li>
                <li>Sustainability and green tech roles are emerging as a significant growth sector</li>
                <li>Quantum computing skills command the highest premium, with salaries 40% above average</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-violet-400 mb-2">Hiring Challenges</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Skill gap in emerging technologies remains a significant challenge for employers</li>
                <li>Competition for senior talent has intensified, with multiple offers common</li>
                <li>Retention has become as critical as recruitment, with average tenure decreasing</li>
                <li>Work model preferences create friction in negotiations and job acceptance</li>
                <li>Diversity and inclusion initiatives are expanding but progress remains slow</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-violet-400 mb-2">Future Predictions</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>AI augmentation will transform job requirements across all tech roles by 2025</li>
                <li>Specialized roles will continue to emerge as technologies mature</li>
                <li>Continuous learning will become a formal part of employment agreements</li>
                <li>Geographic salary normalization will continue for remote roles</li>
                <li>Project-based hiring will increase by 35% over the next two years</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-violet-900/20 rounded-lg border border-violet-800/50">
            <h4 className="text-lg font-medium text-white mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-violet-400" />
              Strategic Recommendations
            </h4>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li><span className="text-violet-400 font-medium">For Job Seekers:</span> Focus on developing a T-shaped skill profile with deep expertise in one area and broader knowledge across related domains.</li>
              <li><span className="text-violet-400 font-medium">For Employers:</span> Implement skills-based hiring rather than focusing solely on years of experience or specific technologies.</li>
              <li><span className="text-violet-400 font-medium">For Education:</span> Develop specialized micro-credentials that address specific industry skill gaps and can be completed alongside full-time employment.</li>
              <li><span className="text-violet-400 font-medium">For Policy Makers:</span> Create incentives for companies to invest in reskilling programs and apprenticeships to address the growing tech talent shortage.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobTrends;
