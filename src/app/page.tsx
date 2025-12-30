"use client";

import { useEffect, useState } from "react";

import RotatingText from '@/components/react-bits/RotatingText/RotatingText'

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AiOutlineArrowRight } from "react-icons/ai";
import Testimonials from "../components/common/Testimonials";
import JobCard from "@/components/core/JobCard";
import MacBookShowcase from "@/components/common/MacBookShowcase";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import export1 from "../../public/assets/export-1.svg";
import export2 from "../../public/assets/export-2.svg";
import export3 from "../../public/assets/export-3.svg";
import export4 from "../../public/assets/export-4.svg";
import export5 from "../../public/assets/export-5.svg";
import { ButtonHoverEffect } from "@/components/ui/button-hover-effect";
import { ArrowRight, Briefcase, Code, Code2, GitFork, Globe2, Laptop2, Timer, Blocks, Brain, Cpu, Database, Users, Building2, Gem, Rocket, BarChart, GraduationCap, Check } from 'lucide-react';
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
import dynamic from "next/dynamic";

const TechStackOrbit = dynamic(
  () => import("@/components/three/TechStackOrbit").then((m) => m.TechStackOrbit),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[260px] md:h-[320px] rounded-2xl border border-slate-700/60 bg-slate-900/60 flex items-center justify-center text-xs md:text-sm text-gray-400">
        Loading 3D tech preview...
      </div>
    ),
  }
);

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
        {/* Problem Statement Badge */}
        <Badge className="mt-12 mb-6 px-4 py-2 text-sm font-normal bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border border-red-500/40 shadow-lg backdrop-blur-md rounded-full animate-pulse">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-ping mr-2 inline-block"></span>
          THE PROBLEM: 70% of developers struggle to land $150k+ remote roles
        </Badge>

        <h1 className="font-normal md:text-5xl mb-5 text-3xl text-center leading-tight mt-8">
          Connect .Create.{" "}
          <span className=" inline-block">
            <RotatingText
              texts={['Discover', 'Explore', 'Build']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-block border border-blue-500/30"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        <p className="text-center md:text-xl font-normal max-w-4xl mx-auto px-4 mb-8">
          <span className="text-white">Job Board</span>
          <span className="text-gray-400 mx-3">•</span>
          <span className="text-blue-400">Premium Learning</span>
          <span className="text-gray-400 mx-3">•</span>
          <span className="text-purple-400">Career Roadmaps</span>
          <span className="text-gray-400 mx-3">•</span>
          <span className="text-green-400">Community</span>
        </p>

        <p className="text-center md:text-base text-gray-300 max-w-3xl mx-auto px-4 mb-8">
          We connect <span className="text-blue-400 font-normal">8,000+ developers</span> with{" "}
          <span className="text-green-400 font-normal">300+ verified companies</span> offering remote positions.
          Plus, master the skills that break the <span className="text-yellow-400 font-normal">$200k salary barrier</span>.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/jobs">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 shadow-2xl shadow-blue-500/50">
              <Briefcase className="mr-2 h-4 w-4" />
              Find Remote Jobs Now
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline" className="w-full sm:w-auto border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-6 py-3">
              <Rocket className="mr-2 h-4 w-4" />
              Upgrade Skills (Premium)
            </Button>
          </Link>
        </div>
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

           {/* Premium Product Feature Section */}
           <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 scroll-mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 border border-blue-500/30 shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-sm font-normal mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    NEW PREMIUM PRODUCT
                  </div>
                  <h2 className="text-2xl md:text-3xl font-normal text-white mb-4">
                    Level Up Your Frontend Skills
                  </h2>
                  <p className="text-base text-gray-300 mb-6 leading-relaxed">
                    Master <strong className="text-blue-400">Advanced React & Server Components</strong>, 
                    <strong className="text-purple-400"> Frontend Architecture</strong>, and 
                    <strong className="text-green-400"> System Design</strong>. Transform from a component builder to a Staff Engineer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Link href="/product">
                      <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white">
                        Explore Premium Content
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/product">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Next.js 14 & Server Components</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Machine Coding & System Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Lifetime Updates</span>
                    </div>
                  </div>
                </div>

                {/* Right: Three.js Tech Orbit */}
                <div className="flex-1 w-full md:w-auto">
                  <TechStackOrbit />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MacBook Feature Showcase Section */}
        <MacBookShowcase />

        {/* Quick Action CTAs - Enhanced */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Get Started in 30 Seconds</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
            <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30">
              <Link href="/jobs">
                <Briefcase className="mr-2 h-5 w-5" />
                Explore Remote Jobs
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto border-2 border-white/20 hover:bg-white/10 text-white">
              <Link href="/questions">
                <Code className="mr-2 h-5 w-5" />
                Practice Questions
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto border-2 border-white/20 hover:bg-white/10 text-white">
              <Link href="/visualizing_paths">
                <GitFork className="mr-2 h-5 w-5" />
                Tech Roadmaps
              </Link>
            </Button>
          </div>
        </section>

        {/* Statistics Section - Enhanced with Growth Metrics */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Traction That Speaks
            </h2>
            <p className="text-gray-400 text-base">Real numbers. Real growth. Real opportunity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-normal mb-2">{stat.value}</div>
                <h3 className="text-lg font-normal mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
          
          {/* Additional Investor Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg border border-blue-500/30">
              <div className="text-2xl font-normal text-blue-400 mb-2">95%</div>
              <div className="text-sm text-gray-400">Job Placement Rate</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg border border-purple-500/30">
              <div className="text-2xl font-normal text-purple-400 mb-2">$150k+</div>
              <div className="text-sm text-gray-400">Avg. Salary Offered</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-transparent rounded-lg border border-green-500/30">
              <div className="text-2xl font-normal text-green-400 mb-2">$29-89</div>
              <div className="text-sm text-gray-400">Premium Product Price</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-lg border border-orange-500/30">
              <div className="text-2xl font-normal text-orange-400 mb-2">60%</div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
            </div>
          </div>
        </section>

        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
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
            <Link href="/jobs" className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors text-base font-normal">
              View More Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        {/* Career Tracks Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Specialized Career Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careerTracks.map((track, index) => (
                <Link href="/visualizing_paths" key={index} className="group">
                  <div className="z-0 h-full p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                        <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          {track.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-normal mb-3 text-white group-hover:text-blue-400 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-gray-400 mb-6 line-clamp-2">
                        {track.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {track.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow button */}
                    <div className="absolute bottom-8 right-8">
                      <span className="flex items-center gap-2 text-sm font-normal">
                        <span className="text-gray-400 group-hover:text-blue-400 transition-colors">Learn More</span>
                        <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:translate-x-1 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Why Now Section - Critical for Investors */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-orange-500/10 border-2 border-orange-500/30 shadow-2xl p-8 md:p-12">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 text-center">
              <Badge className="mb-4 px-4 py-2 bg-orange-500/20 border border-orange-500/50 text-orange-300">
                <Timer className="w-4 h-4 mr-2" />
                WHY NOW?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-normal text-white mb-6">
                The Perfect Storm for <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Remote Tech Careers</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                  <div className="text-base mb-4">🚀</div>
                  <h3 className="text-lg font-normal text-white mb-3">AI Revolution</h3>
                  <p className="text-gray-300">
                    AI is transforming tech roles. Developers need upskilling now more than ever. 
                    Our platform provides exactly that.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                  <div className="text-base mb-4">🌍</div>
                  <h3 className="text-lg font-normal text-white mb-3">Remote Work Boom</h3>
                  <p className="text-gray-300">
                    85% of tech companies maintain remote policies. The market is ready, 
                    and we're positioned perfectly.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                  <div className="text-base mb-4">💰</div>
                  <h3 className="text-lg font-normal text-white mb-3">Salary Premium</h3>
                  <p className="text-gray-300">
                    Remote developers earn 20-30% more. Developers are actively seeking 
                    these opportunities right now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Differentiation */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Why We <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Win</span>
            </h2>
            <p className="text-gray-400 text-base">What makes us different from the competition</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-white mb-2">All-in-One Platform</h3>
                  <p className="text-gray-300">
                    Unlike competitors who focus on just jobs OR learning, we combine job board + premium courses + 
                    roadmaps + community in one seamless experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-white mb-2">Remote-First Focus</h3>
                  <p className="text-gray-300">
                    We specialize exclusively in remote positions with verified companies, ensuring quality 
                    opportunities for our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-8 border border-green-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-white mb-2">Premium Content Quality</h3>
                  <p className="text-gray-300">
                    Our courses are created by industry experts, covering advanced topics like React Server Components, 
                    System Design, and Frontend Architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-8 border border-orange-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-white mb-2">Community-Driven Growth</h3>
                  <p className="text-gray-300">
                    Active community of 8,000+ developers sharing knowledge, conducting mock interviews, 
                    and supporting each other's career growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-normal mb-4">Why Remote Work?</h2>
              <p className="text-gray-400">Embrace the future of work with these amazing benefits</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-lg font-normal mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Technologies Section */}
        <section className="pt-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Technologies We Cover</h2>
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
            <h2 className="text-3xl font-normal mb-4">Frequently Asked Questions</h2>
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



        {/* Industry Insights Section - NEW */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Industry Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-xl font-normal mb-4">Remote Work Trends 2025</h3>
                <p className="text-gray-400 mb-4">
                  The landscape of remote work continues to evolve rapidly. Our latest research indicates that by 2025:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>85% of tech companies will maintain hybrid or fully remote work policies</li>
                  <li>Cross-timezone collaboration tools will see a 200% growth in adoption</li>
                  <li>AI-powered productivity tools will become standard in remote teams</li>
                  <li>Virtual reality meetings will account for 30% of all remote collaborations</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-xl font-normal mb-4">Emerging Tech Roles</h3>
                <p className="text-gray-400 mb-4">
                  New technological advances are creating unprecedented career opportunities:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>AI Ethics Officers</li>
                  <li>Quantum Computing Specialists</li>
                  <li>Digital Transformation Architects</li>
                  <li>Blockchain System Integrators</li>
                  <li>Metaverse Experience Designers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Development Section - NEW */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Professional Development Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">Technical Writing</h3>
                <p className="text-gray-400 mb-4">
                  Enhance your documentation skills with our comprehensive technical writing course. Learn to:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Write clear and concise documentation</li>
                  <li>Create effective API references</li>
                  <li>Design user-friendly guides</li>
                  <li>Collaborate on open-source documentation</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">System Design</h3>
                <p className="text-gray-400 mb-4">
                  Master the art of designing scalable systems through:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Architecture best practices</li>
                  <li>Scalability patterns</li>
                  <li>Performance optimization</li>
                  <li>Real-world case studies</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">Soft Skills</h3>
                <p className="text-gray-400 mb-4">
                  Develop essential non-technical skills:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Remote team communication</li>
                  <li>Cross-cultural collaboration</li>
                  <li>Time management</li>
                  <li>Leadership in distributed teams</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Global Impact Section - NEW */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Global Impact & Sustainability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-xl font-normal mb-4">Environmental Impact</h3>
                <p className="text-gray-400 mb-4">
                  Remote work contributes to environmental sustainability:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Reduced carbon emissions from daily commutes</li>
                  <li>Lower energy consumption in office buildings</li>
                  <li>Decreased paper waste through digital collaboration</li>
                  <li>Smaller carbon footprint from business travel</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-xl font-normal mb-4">Social Impact</h3>
                <p className="text-gray-400 mb-4">
                  Our platform promotes inclusive tech opportunities:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Access to global job markets from any location</li>
                  <li>Support for underrepresented groups in tech</li>
                  <li>Flexible work options for caregivers</li>
                  <li>Economic growth in emerging tech hubs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Founder/Team Credibility Section */}
        {/* <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 text-blue-300">
              <Users className="w-4 h-4 mr-2" />
              MEET THE FOUNDERS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Built by Developers, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">For Developers</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Our team brings years of experience in tech, product development, and scaling startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl p-8 border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-white mb-1">Engineering Excellence</h3>
                  <p className="text-blue-400 text-sm">Technical Leadership</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Years of experience building scalable products at top tech companies. 
                Expert in React, Next.js, System Design, and modern web architecture.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs text-blue-300">React Expert</span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs text-blue-300">System Design</span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs text-blue-300">Startup Experience</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl p-8 border border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-white mb-1">Product Vision</h3>
                  <p className="text-purple-400 text-sm">Growth & Strategy</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Proven track record of building products that developers love. 
                Focused on creating the best platform for tech career growth.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">Product Design</span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">Growth Marketing</span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">Community Building</span>
              </div>
            </div>
          </div> */}

          {/* Social Proof Badges */}
          {/* <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-60">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
              🏆 Y Combinator Alumni Network
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
              💼 Featured on Product Hunt
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
              ⭐ 4.8/5 Community Rating
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
              📚 Trusted by 300+ Companies
            </div>
          </div>
        </section> */}

        {/* Research & Innovation Section - NEW */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-normal text-center mb-12">Research & Innovation Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">Latest Research Papers</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <strong className="text-white">Remote Work Productivity Study</strong>
                    <p>Analysis of productivity patterns in distributed teams</p>
                  </li>
                  <li>
                    <strong className="text-white">Tech Skills Gap Analysis</strong>
                    <p>Comprehensive review of industry skill demands</p>
                  </li>
                  <li>
                    <strong className="text-white">Future of Work Report</strong>
                    <p>Predictions and trends for the next decade</p>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">Innovation Projects</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <strong className="text-white">AI Career Guidance</strong>
                    <p>Personalized career path recommendations</p>
                  </li>
                  <li>
                    <strong className="text-white">Virtual Collaboration Tools</strong>
                    <p>Next-generation remote team solutions</p>
                  </li>
                  <li>
                    <strong className="text-white">Skill Assessment Platform</strong>
                    <p>Advanced technical evaluation systems</p>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-white/5">
                <h3 className="text-lg font-normal mb-4">Upcoming Initiatives</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <strong className="text-white">Global Tech Census</strong>
                    <p>Worldwide developer community survey</p>
                  </li>
                  <li>
                    <strong className="text-white">Remote Work Standards</strong>
                    <p>Industry best practices framework</p>
                  </li>
                  <li>
                    <strong className="text-white">Tech Education Index</strong>
                    <p>Comprehensive learning resource database</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full pt-8 border-t border-white/10 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Coding Activist Community. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}