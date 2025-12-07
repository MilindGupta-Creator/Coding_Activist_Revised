export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export interface Feature {
    title: string;
    description: string;
    iconPath: string;
  }
  
  export interface Chapter {
    number: string;
    title: string;
    topics: string[];
  }
  
  export enum SampleTopic {
    NEXTJS = 'Next.js & RSCs',
    MICROFRONTENDS = 'Micro-frontends',
    SYSTEM_DESIGN = 'System Architecture',
    ADVANCED_REACT = 'Advanced React Patterns',
    WEB_PERFORMANCE = 'Core Web Vitals'
  }
  
  export interface GeneratedQuestion {
    question: string;
    hint: string;
    difficulty: 'Junior' | 'Mid' | 'Senior' | 'Staff';
  }