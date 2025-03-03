import React, { useState } from 'react';
import { Bell, TrendingUp, Mail, ExternalLink } from 'lucide-react';

interface TrendingCategory {
  name: string;
  count: number;
  growth: string;
  isGrowing: boolean;
}

interface RecentJob {
  title: string;
  company: string;
  postedAt: string;
  link: string;
}

interface JobData {
  type: string;
  name: string;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  address: string;
}

interface TrendingSidebarProps {
  trendingJobs: JobData[];
}

const TrendingSidebar: React.FC<TrendingSidebarProps> = ({ trendingJobs }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <div className="w-full space-y-6">
      
      {/* Recent Job Alerts */}
      <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center mb-4">
          <Bell className="text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">Recent Job Alerts</h3>
        </div>
        <div className="space-y-4">
          {trendingJobs.map((job) => (
            <div key={job.id} className="border-b border-gray-700 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <h4 className="text-white font-medium">{job.name}</h4>
                <a href={`/job-details/${job.id}`} className="text-violet-400 hover:text-violet-300">
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="text-gray-400 text-sm">{job.type}</p>
              <p className="text-gray-500 text-xs mt-1">{job.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Signup */}
      {/* <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center mb-4">
          <Mail className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">Job Alerts</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">Get notified when new jobs match your skills.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Subscribe
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default TrendingSidebar;