import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/utils';

const RelatedJobs = ({ currentJob, relatedJobs }) => {
  // Filter and categorize related jobs
  const sameCompanyJobs = relatedJobs.filter(job => 
    job.name === currentJob.name && job.id !== currentJob.id
  ).slice(0, 3);

  const similarLocationJobs = relatedJobs.filter(job => 
    job.address === currentJob.address && job.id !== currentJob.id
  ).slice(0, 3);

  const similarSkillsJobs = relatedJobs.filter(job => {
    const commonSkills = job.skills?.filter(skill => 
      currentJob.skills?.includes(skill)
    );
    return commonSkills?.length > 0 && job.id !== currentJob.id;
  }).slice(0, 3);

  const JobCard = ({ job }) => (
    <Link href={`/job-details/${job.id}`} className="block group">
      <div className="relative bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-violet-200 hover:-translate-y-0.5 pr-10 overflow-hidden">
        <div className="flex items-start gap-4">
          {job.image ? (
            <div className="relative">
              <img
                src={job.image}
                alt={`${job.name} logo`}
                className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-gray-100 group-hover:border-violet-200 transition-colors duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center group-hover:from-violet-600 group-hover:to-violet-700 transition-all duration-300">
              <span className="text-white font-semibold text-xl">
                {job.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 group-hover:text-violet-600 transition-colors duration-300 truncate">
              {job.role}
            </h4>
            <p className="text-sm text-gray-600 truncate">{job.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-gray-500 truncate">{job.address}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.skills?.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-2.5 py-1 bg-violet-50 text-violet-600 rounded-full font-medium group-hover:bg-violet-100 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
              {job.skills?.length > 2 && (
                <span className="text-xs px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full">
                  +{job.skills.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Absolutely positioned chevron button */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex-shrink-0 z-10">
          <div className="p-1.5 rounded-lg bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        {/* Mobile-friendly touch target overlay */}
        <div className="absolute inset-0 rounded-xl bg-violet-500/0 group-hover:bg-violet-500/5 transition-colors duration-300 pointer-events-none" />
      </div>
    </Link>
  );

  const RelatedJobsSection = ({ title, jobs, icon, description }) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">No related jobs found</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Jobs</h2>
      
      <RelatedJobsSection
        title="More jobs at this company"
        description="Explore other opportunities at the same company"
        jobs={sameCompanyJobs}
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />

      <RelatedJobsSection
        title="Similar jobs in this location"
        description="Find other opportunities in the same area"
        jobs={similarLocationJobs}
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />

      <RelatedJobsSection
        title="Jobs requiring similar skills"
        description="Discover roles that match your expertise"
        jobs={similarSkillsJobs}
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
      />
    </div>
  );
};

export default RelatedJobs; 