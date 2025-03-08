"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AiOutlineArrowRight } from "react-icons/ai";
import Testimonials from "../components/common/Testimonials";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import export1 from "../../public/assets/export-1.svg";
import export2 from "../../public/assets/export-2.svg";
import export3 from "../../public/assets/export-3.svg";
import export4 from "../../public/assets/export-4.svg";
import export5 from "../../public/assets/export-5.svg";
import { ButtonHoverEffect } from "@/components/ui/button-hover-effect";
import { ArrowRight, Briefcase, Code, Code2, GitFork, Globe2, Laptop2, Timer, Blocks, Brain, Cpu, Database, Users, Building2, Gem, Rocket, BarChart, GraduationCap } from 'lucide-react';
import { formatDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface Job {
  id: string;
  [key: string]: any;
}

const benefits = [
  {
    icon: <Globe2 className="w-8 h-8 text-blue-500" />,
    title: "Work from Anywhere",
    description: "Choose your perfect work environment, whether it's home, a café, or across the globe."
  },
  {
    icon: <Timer className="w-8 h-8 text-green-500" />,
    title: "Flexible Hours",
    description: "Balance your work and life with schedules that adapt to your needs."
  },
  {
    icon: <Laptop2 className="w-8 h-8 text-purple-500" />,
    title: "Latest Tech Stack",
    description: "Work with cutting-edge technologies and keep your skills sharp."
  }
];

const technologies = [
  "React", "Node.js", "Python", "Java", "TypeScript", "AWS", "Docker", "Kubernetes",
  "GraphQL", "MongoDB", "PostgreSQL", "Vue.js", "Angular", "Go", "Ruby", "Rust"
];

const careerTracks = [
  {
    icon: <Rocket className="w-8 h-8 text-pink-400" />,
    title: "Web Development",
    description: "Master both front-end and back-end technologies",
    skills: ["React", "Node.js", "PostgreSQL"]
  },
  {
    icon: <BarChart className="w-8 h-8 text-emerald-400" />,
    title: "Data Engineering",
    description: "Design and implement data infrastructure Units.",
    skills: ["Python", "Spark", "Kafka"]
  },
  {
    icon: <Database className="w-8 h-8 text-purple-400" />,
    title: "Blockchain Development",
    description: "Build decentralized applications and smart contracts",
    skills: ["Solidity", "Web3.js", "Smart Contracts"]
  }
];

const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    value: "8,000+",
    label: "Active Users",
    description: "Tech professionals in our community"
  },
  {
    icon: <Building2 className="w-8 h-8 text-green-500" />,
    value: "300+",
    label: "Companies",
    description: "Jobs posted through our platform"
  },
  {
    icon: <Gem className="w-8 h-8 text-purple-500" />,
    value: "95%",
    label: "Success Rate",
    description: "Of active job seekers find roles"
  }
];

const faqs = [
  {
    question: "How does the remote job platform work?",
    answer: "Our platform connects tech professionals with companies offering remote positions. Create a profile, browse opportunities that match your skills, and apply with a single click. Companies can review your application and reach out directly through our messaging system."
  },
  {
    question: "What types of companies hire through the platform?",
    answer: "We partner with a diverse range of companies, from fast-growing startups to established tech giants. All companies are verified and committed to remote work culture, offering competitive compensation and benefits packages."
  },
  {
    question: "Is the platform free for job seekers?",
    answer: "Yes, job seekers can create profiles, browse jobs, and apply to positions completely free of charge. Premium features are available for enhanced visibility and additional tools, but the core functionality is always free."
  },
  {
    question: "How can I increase my chances of getting hired?",
    answer: "Complete your profile with detailed information about your skills and experience, keep your portfolio up-to-date, and actively participate in our community discussions. We also recommend following our blog for tips on remote job hunting and interview preparation."
  },
  {
    question: "What makes this platform different from other job boards?",
    answer: "We focus exclusively on remote tech positions and build a community around them. Our platform offers not just job listings, but also learning resources, mentorship opportunities, and networking events specifically for remote tech professionals."
  }
];

export default function Home() {
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(false);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMarqueeVisible(true);
  }, []);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobsDataCollection");
        const q = query(
          jobsCollection,
          orderBy("createdAt", "desc"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = formatDate(data.createdAt.toDate());

          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        });

        setRecentJobs(jobsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <div className="flex md:justify-center md:items-center items-start min-h-screen w-full">
      <div className="flex flex-col items-center justify-center pt-20 pb-4 w-full">
        <Badge className="mt-12 mb-4 px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-500 border-blue-500/20">
          #1 Remote Job Platform for Tech Professionals
        </Badge>

        <h1 className="font-extrabold md:text-6xl mb-5 text-4xl text-center leading-tight mt-8">
          Connect .Create. <span className="text-blue-500">Discover</span>
        </h1>
        <p className="text-center md:text-xl font-bold">
          This is a Community of Coders{" "}
          <span className="text-red-400"> who are passionate</span> in Computer
          Science Field
          <span className="text-yellow-400">
            {" "}
            <br />
            Hunting for their next tech job
          </span>{" "}
          and are building a unique product.
        </p>
        <div className="md:w-2/3 w-full h-0.5 bg-white opacity-10 mb-3 mt-6" />
        <div className="flex md:flex-row flex-col items-center md:w-1/2 w-full">
          {isMarqueeVisible && (
            <Marquee
              className="gap-5 w-[2/3] -z-10"
              gradient={true}
              gradientColor={"#2C2B2B"}
              pauseOnHover={true}
            >
              <div className="flex gap-x-5 md:gap-x-10">
                <Image
                  src={export1}
                  alt="Community event export graphic 1"
                  className="hover:opacity-50 object-contain duration-300 transition-all"
                />
                <Image
                  src={export2}
                  alt="Community event export graphic 2"
                  className="hover:opacity-50 duration-300 object-contain transition-all"
                />
                <Image
                  src={export3}
                  alt="Community event export graphic 3"
                  className="hover:opacity-50 duration-300 mt-4 transition-all"
                />
                <Image
                  src={export4}
                  alt="Community event export graphic 4"
                  className="hover:opacity-50 duration-300 transition-all"
                />
                <Image
                  src={export5}
                  alt="Community event export graphic 5"
                  className="hover:opacity-50 duration-300 -mt-1 transition-all"
                />
              </div>
            </Marquee>
          )}
        </div>
        <div className="md:w-2/3 w-full h-0.5 bg-white opacity-10 mt-3 mb-6" />

        <section className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
          <Button asChild size="lg" className="w-full bg-black sm:w-auto">
            <Link href="/jobs">
              <Briefcase className="mr-2 h-5 w-5" />
              Explore Jobs
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/questions">
              <Code className="mr-2 h-5 w-5" />
              Browse Questions
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/visualizing_paths">
              <GitFork className="mr-2 h-5 w-5" />
              Tech Roadmaps
            </Link>
          </Button>
        </section>

        {/* Statistics Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recently Added <span className="text-blue-500">Jobs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-center py-6">Loading recent jobs...</div>
            ) : recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  id={job.id}
                  title={job.title || ""}
                  description={job.description || ""}
                  createdAt={job.createdAt || ""}
                />
              ))
            ) : (
              <div className="text-center py-6">No jobs available right now</div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/jobs" className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors text-lg font-medium">
              View More Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        {/* Career Tracks Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Specialized Career Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careerTracks.map((track, index) => (
                <Link href="/visualizing_paths" key={index}>
                  <div className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="mb-4">{track.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
                    <p className="text-gray-400 mb-4">{track.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Remote Work?</h2>
              <p className="text-gray-400">Embrace the future of work with these amazing benefits</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Technologies Section */}
        <section className="pt-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Technologies We Cover</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our platform</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Testimonials />

        <div className="w-full pt-8 border-t border-white/10 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Coding Activist Community. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}