import { MetadataRoute } from 'next';
import { learningPaths } from './visualizing_paths/data/learningPaths';
import { db } from '@/firebase/firebase';

async function getJobs(): Promise<string[]> {
  try {
    const snapshot = await db.collection('jobsDataCollection').get();
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error('Error fetching jobs for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codingactivist.com';
  const lastModified = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/product`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/visualizing_paths`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic routes for learning paths
  const learningPathRoutes: MetadataRoute.Sitemap = learningPaths.map((path) => ({
    url: `${baseUrl}/visualizing_paths/${path.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic routes for job details
  const jobIds = await getJobs();
  const jobRoutes: MetadataRoute.Sitemap = jobIds.map((jobId) => ({
    url: `${baseUrl}/job-details/${jobId}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...learningPathRoutes, ...jobRoutes];
}

