import {
  Smartphone,
  Palette,
  Briefcase,
  Bitcoin,
  Globe,
  Server,
  Brain,
  Box,
  Shield,
  GamepadIcon,
  CpuIcon,
  CloudIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PathStep {
  title: string;
  description: string;
  resources: {
    name: string;
    url: string;
    type: "video" | "article" | "course" | "book";
  }[];
  timeEstimate: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  keyTakeaways?: string[];
  prerequisites?: string[];
  projects?: {
    title: string;
    description: string;
  }[];
}

export interface JobMarketData {
  openPositions: number;
  growthRate: string;
  topCompanies: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
  totalDuration: string;
  steps: PathStep[];
  careers?: string[];
  whatsNext?: {
    topics: string[];
    resources: {
      name: string;
      url: string;
      type: "video" | "article" | "course" | "book";
    }[];
  };
  salary?: {
    min: string;
    max: string;
    currency: string;
  };
  prerequisites?: string[];
  tools?: string[];
  industryTrends?: string[];
  shareableLink?: string;
  jobMarketData: JobMarketData;
}

export const learningPaths: LearningPath[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Master modern web development from fundamentals to advanced frameworks",
    icon: Globe,
    color: "bg-blue-500",
    category: "development",
    totalDuration: "34 weeks",
    careers: [
      "Frontend Developer",
      "Full Stack Developer",
      "UI/UX Developer",
      "JavaScript Engineer",
    ],
    whatsNext: {
      topics: [
        "GraphQL and Apollo",
        "Next.js and Server Components",
        "Web3 Development",
        "Progressive Web Apps (PWA)",
        "Micro-frontends Architecture",
        "WebAssembly",
        "Advanced State Management (Redux Toolkit, Zustand)",
        "Performance Optimization",
      ],
      resources: [
        {
          name: "Advanced React Patterns",
          url: "https://patterns.dev/react",
          type: "book",
        },
        {
          name: "Next.js Enterprise Development",
          url: "https://nextjs.org/learn",
          type: "course",
        },
        {
          name: "Web Performance Fundamentals",
          url: "https://web.dev/learn/performance",
          type: "article",
        },
      ],
    },
    salary: {
      min: "60,000",
      max: "150,000",
      currency: "USD",
    },
    steps: [
      {
        title: "HTML & CSS Fundamentals",
        description:
          "Learn the building blocks of web development with modern HTML5 and CSS3 features",
        resources: [
          {
            name: "MDN Web Docs - HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
            type: "article",
          },
          {
            name: "CSS Fundamentals",
            url: "https://css-tricks.com/guides/",
            type: "article",
          },
          {
            name: "HTML & CSS Crash Course",
            url: "https://www.youtube.com/watch?v=916GWv2Qs08",
            type: "video",
          },
          {
            name: "Modern HTML & CSS From The Beginning",
            url: "https://www.udemy.com/course/modern-html-css-from-the-beginning/",
            type: "course",
          },
        ],
        timeEstimate: "4 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Understanding of HTML5 semantic elements",
          "CSS layout with Flexbox and Grid",
          "Responsive design principles",
          "CSS animations and transitions",
        ],
        projects: [
          {
            title: "Portfolio Website",
            description:
              "Create a responsive personal portfolio website using HTML and CSS",
          },
          {
            title: "Landing Page",
            description:
              "Build a modern landing page with advanced CSS features",
          },
        ],
      },
      {
        title: "JavaScript Essentials",
        description:
          "Master core JavaScript concepts and modern ES6+ features for building interactive web applications",
        resources: [
          {
            name: "JavaScript.info",
            url: "https://javascript.info/",
            type: "article",
          },
          {
            name: "Eloquent JavaScript",
            url: "https://eloquentjavascript.net/",
            type: "book",
          },
          {
            name: "JavaScript: Understanding the Weird Parts",
            url: "https://www.udemy.com/course/understand-javascript/",
            type: "course",
          },
          {
            name: "JavaScript ES6+ Tutorial",
            url: "https://www.youtube.com/watch?v=nZ1DMMsyVyI",
            type: "video",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "ES6+ features and syntax",
          "Asynchronous programming with Promises",
          "DOM manipulation",
          "Error handling and debugging",
        ],
        prerequisites: [
          "Basic HTML & CSS knowledge",
          "Understanding of web browsers",
        ],
        projects: [
          {
            title: "Task Manager App",
            description:
              "Build a task manager with local storage and CRUD operations",
          },
          {
            title: "Weather Dashboard",
            description:
              "Create a weather dashboard using APIs and async JavaScript",
          },
        ],
      },
      {
        title: "React & Modern Frontend",
        description:
          "Build modern web applications with React and explore the ecosystem of modern frontend development",
        resources: [
          {
            name: "React Documentation",
            url: "https://react.dev/",
            type: "article",
          },
          {
            name: "Epic React by Kent C. Dodds",
            url: "https://epicreact.dev/",
            type: "course",
          },
          {
            name: "React Testing Library",
            url: "https://testing-library.com/docs/react-testing-library/intro/",
            type: "article",
          },
          {
            name: "Full Stack Open",
            url: "https://fullstackopen.com/en/",
            type: "course",
          },
        ],
        timeEstimate: "12 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "React components and hooks",
          "State management with Context and Redux",
          "Performance optimization",
          "Testing React applications",
        ],
        prerequisites: [
          "Strong JavaScript fundamentals",
          "Understanding of ES6+ features",
          "Basic knowledge of npm and build tools",
        ],
        projects: [
          {
            title: "E-commerce Platform",
            description:
              "Build a full-featured e-commerce platform with React and modern tools",
          },
          {
            title: "Social Media Dashboard",
            description:
              "Create a social media dashboard with real-time updates",
          },
        ],
      },
      {
        title: "Backend Development",
        description:
          "Master server-side programming, databases, and API development",
        resources: [
          {
            name: "Node.js Documentation",
            url: "https://nodejs.org/en/docs/",
            type: "article",
          },
          {
            name: "Express.js Tutorial",
            url: "https://expressjs.com/en/starter/installing.html",
            type: "article",
          },
          {
            name: "SQL and NoSQL Databases",
            url: "https://www.udacity.com/course/database-systems-concepts-design--ud150",
            type: "course",
          },
          {
            name: "RESTful API Design",
            url: "https://www.udemy.com/course/rest-api-flask-and-python/",
            type: "course",
          },
        ],
        timeEstimate: "10 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Server-side programming with Node.js",
          "Database design and management",
          "RESTful API development",
          "Authentication and security",
        ],
        prerequisites: [
          "JavaScript fundamentals",
          "Basic understanding of HTTP and web protocols",
          "Familiarity with frontend development",
        ],
        projects: [
          {
            title: "Smart Web Platform",
            description:
              "Developed a dynamic web platform with an interactive user interface, secure backend, and optimized database architecture for seamless performance.",
          },
          {
            title: "High-Performance API Gateway",
            description:
              "Built a scalable and secure API gateway to power mobile applications, enabling smooth data exchange, authentication, and real-time processing.",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Familiarity with version control (Git)",
      "Problem-solving skills and logical thinking",
    ],
    tools: [
      "Visual Studio Code or WebStorm",
      "Git and GitHub",
      "Chrome DevTools",
      "Postman for API testing",
      "Node.js and npm",
    ],
    industryTrends: [
      "Progressive Web Apps (PWAs)",
      "Serverless Architecture",
      "JAMstack",
      "Web Assembly",
      "AI-driven Development",
    ],
    shareableLink: `https://techpaths.com/share/web-development`,
    jobMarketData: {
      openPositions: 150000,
      growthRate: "14% (Much faster than average)",
      topCompanies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    },
  },
  {
    id: "data-science",
    title: "Data Science",
    description:
      "From statistics to machine learning and AI, master the art of data analysis",
    icon: Brain,
    color: "bg-purple-500",
    category: "data",
    totalDuration: "32 weeks",
    careers: [
      "Data Scientist",
      "Machine Learning Engineer",
      "Data Analyst",
      "AI Researcher",
    ],
    whatsNext: {
      topics: [
        "Deep Learning Specialization",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "MLOps and Model Deployment",
        "Time Series Analysis",
        "Quantum Machine Learning",
        "AI Ethics and Responsible AI",
      ],
      resources: [
        {
          name: "Deep Learning Specialization",
          url: "https://www.deeplearning.ai/",
          type: "course",
        },
        {
          name: "Natural Language Processing with Deep Learning",
          url: "https://web.stanford.edu/class/cs224n/",
          type: "course",
        },
        {
          name: "MLOps: From Model-centric to Data-centric AI",
          url: "https://www.coursera.org/learn/mlops-fundamentals",
          type: "course",
        },
      ],
    },
    salary: {
      min: "75,000",
      max: "180,000",
      currency: "USD",
    },
    steps: [
      {
        title: "Python & Statistics",
        description:
          "Learn Python programming and essential statistical concepts for data analysis",
        resources: [
          {
            name: "Python for Data Science",
            url: "https://www.python.org/about/gettingstarted/",
            type: "article",
          },
          {
            name: "Statistics and Probability",
            url: "https://www.khanacademy.org/math/statistics-probability",
            type: "course",
          },
          {
            name: "Python for Data Science Handbook",
            url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
            type: "book",
          },
          {
            name: "Python Crash Course",
            url: "https://www.youtube.com/watch?v=JJmcL1N2KQs",
            type: "video",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Python programming fundamentals",
          "Statistical analysis methods",
          "Data structures and algorithms",
          "Probability concepts",
        ],
        projects: [
          {
            title: "Data Analysis Portfolio",
            description:
              "Create a portfolio of data analysis projects using Python",
          },
          {
            title: "Statistical Analysis Report",
            description:
              "Conduct and present a statistical analysis on real-world data",
          },
        ],
      },
      {
        title: "Data Analysis & Visualization",
        description:
          "Master data analysis tools and create compelling visualizations with Python libraries",
        resources: [
          {
            name: "Pandas Documentation",
            url: "https://pandas.pydata.org/docs/",
            type: "article",
          },
          {
            name: "Data Visualization with Python",
            url: "https://www.coursera.org/learn/python-for-data-visualization",
            type: "course",
          },
          {
            name: "Storytelling with Data",
            url: "https://www.storytellingwithdata.com/",
            type: "book",
          },
          {
            name: "Matplotlib Tutorial",
            url: "https://matplotlib.org/stable/tutorials/index.html",
            type: "article",
          },
        ],
        timeEstimate: "10 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Data cleaning and preprocessing",
          "Exploratory data analysis",
          "Data visualization techniques",
          "Statistical modeling",
        ],
        prerequisites: [
          "Python programming basics",
          "Understanding of statistics",
          "Basic algebra and calculus",
        ],
        projects: [
          {
            title: "Data Dashboard",
            description: "Build an interactive dashboard using Plotly and Dash",
          },
          {
            title: "Market Analysis",
            description: "Perform and visualize market trend analysis",
          },
        ],
      },
      {
        title: "Machine Learning Fundamentals",
        description:
          "Learn the basics of machine learning algorithms and their applications",
        resources: [
          {
            name: "Scikit-learn Documentation",
            url: "https://scikit-learn.org/stable/",
            type: "article",
          },
          {
            name: "Machine Learning Course",
            url: "https://www.coursera.org/learn/machine-learning",
            type: "course",
          },
          {
            name: "Hands-on Machine Learning",
            url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
            type: "book",
          },
          {
            name: "Deep Learning Specialization",
            url: "https://www.coursera.org/specializations/deep-learning",
            type: "course",
          },
        ],
        timeEstimate: "14 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Machine learning algorithms",
          "Model evaluation and validation",
          "Neural networks basics",
          "Deep learning fundamentals",
        ],
        prerequisites: [
          "Strong Python programming skills",
          "Linear algebra and calculus",
          "Statistical analysis experience",
        ],
        projects: [
          {
            title: "Predictive Model",
            description: "Build a predictive model for real-world applications",
          },
          {
            title: "Image Classification",
            description:
              "Develop an image classification system using deep learning",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic programming knowledge (preferably Python)",
      "Fundamental understanding of mathematics and statistics",
      "Analytical thinking and problem-solving skills",
    ],
    tools: [
      "Jupyter Notebooks",
      "Python libraries (NumPy, Pandas, Scikit-learn)",
      "SQL and NoSQL databases",
      "Tableau or Power BI for visualization",
      "Git for version control",
    ],
    industryTrends: [
      "AutoML and AI-assisted data science",
      "Edge AI and TinyML",
      "Explainable AI (XAI)",
      "Data Ethics and Responsible AI",
      "MLOps and DataOps",
    ],
    shareableLink: `https://techpaths.com/share/data-science`,
    jobMarketData: {
      openPositions: 90000,
      growthRate: "31% (Much faster than average)",
      topCompanies: ["Google", "Amazon", "Microsoft", "IBM"],
    },
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description:
      "Master cross-platform and native mobile app development with modern frameworks",
    icon: Smartphone,
    color: "bg-orange-500",
    category: "development",
    totalDuration: "32 weeks",
    careers: [
      "Mobile App Developer",
      "iOS Developer",
      "Android Developer",
      "Cross-platform Developer",
      "Mobile UI/UX Developer",
    ],
    salary: {
      min: "70,000",
      max: "160,000",
      currency: "USD",
    },
    whatsNext: {
      topics: [
        "Advanced App Architecture (Clean Architecture, MVVM)",
        "Mobile App Security",
        "App Store Optimization",
        "CI/CD for Mobile Apps",
        "Mobile Analytics and Monitoring",
        "Advanced Animation and Graphics",
        "AR/VR Development",
        "Mobile App Testing Strategies",
      ],
      resources: [
        {
          name: "Advanced iOS Development",
          url: "https://developer.apple.com/tutorials/app-dev-training",
          type: "course",
        },
        {
          name: "Flutter Advanced Patterns",
          url: "https://flutter.dev/docs/development/data-and-backend/state-mgmt/options",
          type: "article",
        },
        {
          name: "React Native Performance",
          url: "https://reactnative.dev/docs/performance",
          type: "article",
        },
      ],
    },
    steps: [
      {
        title: "Mobile Development Fundamentals",
        description:
          "Learn the basics of mobile app development, UI/UX principles, and platform-specific guidelines",
        resources: [
          {
            name: "Mobile App Design Fundamentals",
            url: "https://www.coursera.org/learn/mobile-app-design",
            type: "course",
          },
          {
            name: "iOS Development for Beginners",
            url: "https://developer.apple.com/tutorials/swiftui",
            type: "course",
          },
          {
            name: "Android Basics in Kotlin",
            url: "https://developer.android.com/courses/android-basics-kotlin/course",
            type: "course",
          },
          {
            name: "Mobile UX Design Principles",
            url: "https://www.nngroup.com/articles/mobile-ux-design/",
            type: "article",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Mobile UI/UX principles",
          "Platform-specific design guidelines",
          "Mobile app architecture basics",
          "Development environment setup",
        ],
        projects: [
          {
            title: "Weather App",
            description:
              "Create a weather app with basic UI components and API integration",
          },
          {
            title: "Task Manager",
            description:
              "Build a task manager app with local storage and basic CRUD operations",
          },
        ],
      },
      {
        title: "Cross-Platform Development",
        description:
          "Master Flutter and React Native for building cross-platform mobile applications",
        resources: [
          {
            name: "Flutter Development Bootcamp",
            url: "https://www.udemy.com/course/flutter-bootcamp-with-dart",
            type: "course",
          },
          {
            name: "React Native Documentation",
            url: "https://reactnative.dev/docs/getting-started",
            type: "article",
          },
          {
            name: "Flutter Cookbook",
            url: "https://flutter.dev/docs/cookbook",
            type: "article",
          },
          {
            name: "Cross-Platform App Architecture",
            url: "https://www.raywenderlich.com/books/flutter-apprentice",
            type: "book",
          },
        ],
        timeEstimate: "12 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Flutter widgets and state management",
          "React Native components",
          "Cross-platform navigation",
          "Native module integration",
        ],
        prerequisites: [
          "Basic programming knowledge",
          "Understanding of mobile UI/UX",
          "JavaScript/Dart fundamentals",
        ],
        projects: [
          {
            title: "Social Media App",
            description:
              "Develop a social media app with cross-platform compatibility",
          },
          {
            title: "E-commerce Mobile App",
            description:
              "Create an e-commerce app with product catalog and cart functionality",
          },
        ],
      },
      {
        title: "Native App Development",
        description:
          "Deep dive into native iOS and Android development for maximum performance",
        resources: [
          {
            name: "iOS App Development with Swift",
            url: "https://developer.apple.com/swift/",
            type: "course",
          },
          {
            name: "Android Development with Kotlin",
            url: "https://developer.android.com/kotlin",
            type: "course",
          },
          {
            name: "Advanced iOS Programming Guide",
            url: "https://www.objc.io/books/advanced-swift/",
            type: "book",
          },
          {
            name: "Android Architecture Components",
            url: "https://developer.android.com/topic/architecture",
            type: "article",
          },
        ],
        timeEstimate: "12 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Native performance optimization",
          "Platform-specific features",
          "Advanced UI components",
          "App store deployment",
        ],
        prerequisites: [
          "Cross-platform development experience",
          "Strong programming fundamentals",
          "Understanding of mobile architectures",
        ],
        projects: [
          {
            title: "Streaming Media App",
            description:
              "Build a video streaming app with native performance optimizations",
          },
          {
            title: "Fitness Tracking App",
            description:
              "Develop a fitness app with hardware sensor integration",
          },
        ],
      },
    ],

    prerequisites: [
      "Basic programming knowledge in Swift or Kotlin",
      "Understanding of mobile UI/UX principles",
      "Familiarity with version control systems",
    ],

    tools: [
      "Xcode for iOS development",
      "Android Studio",
      "Flutter SDK",
      "React Native CLI",
      "Git for version control",
      "Figma or Sketch for UI design",
    ],

    industryTrends: [
      "Cross-platform development",
      "Progressive Web Apps (PWAs)",
      "AR/VR in mobile apps",
      "5G and Edge Computing",
      "AI-powered mobile features",
    ],

    jobMarketData: {
      openPositions: 80000,
      growthRate: "24% (Much faster than average)",
      topCompanies: ["Google", "Amazon", "Microsoft", "Facebook"],
    },
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description:
      "Master modern DevOps practices and cloud infrastructure management",
    icon: Server,
    color: "bg-green-500",
    category: "infrastructure",
    totalDuration: "28 weeks",
    careers: [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Cloud Architect",
      "Infrastructure Engineer",
    ],
    whatsNext: {
      topics: [
        "Service Mesh Architecture",
        "GitOps and Infrastructure as Code",
        "Cloud Native Security",
        "Chaos Engineering",
        "Platform Engineering",
        "FinOps",
        "Edge Computing",
        "Multi-cloud Architecture",
      ],
      resources: [
        {
          name: "Advanced Kubernetes Patterns",
          url: "https://kubernetes.io/docs/patterns/",
          type: "article",
        },
        {
          name: "GitOps with ArgoCD",
          url: "https://learning.edx.org/course/course-v1:LinuxFoundationX+LFS169x+2T2021",
          type: "course",
        },
        {
          name: "Cloud Native Security",
          url: "https://www.sans.org/cloud-security/",
          type: "course",
        },
      ],
    },
    salary: {
      min: "80,000",
      max: "200,000",
      currency: "USD",
    },
    steps: [
      {
        title: "Linux & Command Line",
        description:
          "Master Linux fundamentals and essential command line tools for system administration",
        resources: [
          {
            name: "Linux Journey",
            url: "https://linuxjourney.com/",
            type: "course",
          },
          {
            name: "The Linux Command Line",
            url: "http://linuxcommand.org/tlcl.php",
            type: "book",
          },
          {
            name: "Bash Scripting Tutorial",
            url: "https://www.shellscript.sh/",
            type: "article",
          },
          {
            name: "Linux Administration Bootcamp",
            url: "https://www.udemy.com/course/linux-administration-bootcamp/",
            type: "course",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Linux system administration",
          "Shell scripting",
          "System monitoring",
          "User management",
        ],
        projects: [
          {
            title: "System Monitor",
            description: "Create a system monitoring script with bash",
          },
          {
            title: "Automation Scripts",
            description: "Develop automation scripts for common admin tasks",
          },
        ],
      },
      {
        title: "Docker & Containerization",
        description:
          "Learn container technologies and orchestration with Docker and Kubernetes",
        resources: [
          {
            name: "Docker Documentation",
            url: "https://docs.docker.com/get-started/",
            type: "article",
          },
          {
            name: "Kubernetes Basics",
            url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            type: "course",
          },
          {
            name: "Docker Deep Dive",
            url: "https://www.pluralsight.com/courses/docker-deep-dive-update",
            type: "course",
          },
          {
            name: "Container Security",
            url: "https://www.aquasec.com/cloud-native-academy/",
            type: "article",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Container orchestration",
          "Microservices architecture",
          "Container security",
          "Service mesh concepts",
        ],
        prerequisites: [
          "Linux fundamentals",
          "Basic networking knowledge",
          "Command line proficiency",
        ],
        projects: [
          {
            title: "Microservices Platform",
            description:
              "Build a microservices platform using Docker and Kubernetes",
          },
          {
            title: "CI/CD Pipeline",
            description: "Create a complete CI/CD pipeline with containers",
          },
        ],
      },
      {
        title: "Cloud Infrastructure",
        description:
          "Master cloud services and infrastructure as code with AWS or Azure",
        resources: [
          {
            name: "AWS Documentation",
            url: "https://docs.aws.amazon.com/",
            type: "article",
          },
          {
            name: "Terraform Documentation",
            url: "https://www.terraform.io/docs",
            type: "article",
          },
          {
            name: "Cloud Architecture Patterns",
            url: "https://www.oreilly.com/library/view/cloud-architecture-patterns/9781449357979/",
            type: "book",
          },
          {
            name: "AWS Certified Solutions Architect",
            url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            type: "course",
          },
        ],
        timeEstimate: "14 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Cloud architecture design",
          "Infrastructure as Code",
          "Cost optimization",
          "High availability patterns",
        ],
        prerequisites: [
          "Container orchestration experience",
          "Networking fundamentals",
          "Security basics",
        ],
        projects: [
          {
            title: "Cloud Native Application",
            description: "Deploy a scalable cloud-native application",
          },
          {
            title: "Multi-Region Infrastructure",
            description: "Design and implement multi-region infrastructure",
          },
        ],
      },
    ],

    prerequisites: [
      "Basic understanding of Linux systems",
      "Networking fundamentals",
      "Programming basics in Python or Shell",
    ],
    tools: [
      "Docker and Kubernetes",
      "Terraform or CloudFormation",
      "Git and GitHub Actions",
      "Prometheus and Grafana",
      "AWS/Azure/GCP services",
    ],
    industryTrends: [
      "GitOps and Infrastructure as Code",
      "Zero Trust Security",
      "AIOps and MLOps",
      "Edge Computing",
      "FinOps and Cost Optimization",
    ],

    jobMarketData: {
      openPositions: 65000,
      growthRate: "22% (Much faster than average)",
      topCompanies: ["Amazon", "Microsoft", "Google", "IBM"],
    },
  },
  {
    id: "blockchain-development",
    title: "Blockchain Development",
    description:
      "Master blockchain technology, smart contracts, and Web3 development",
    icon: Bitcoin,
    color: "bg-yellow-500",
    category: "development",
    totalDuration: "36 weeks",
    careers: [
      "Blockchain Developer",
      "Smart Contract Engineer",
      "Web3 Developer",
      "DeFi Developer",
      "Blockchain Architect",
    ],
    whatsNext: {
      topics: [
        "Zero-Knowledge Proofs",
        "Layer 2 Scaling Solutions",
        "Cross-chain Development",
        "DeFi Protocol Design",
        "Blockchain Security",
        "NFT Platform Development",
        "DAO Governance Systems",
        "Blockchain Interoperability",
      ],
      resources: [
        {
          name: "Advanced Solidity Patterns",
          url: "https://docs.soliditylang.org/en/latest/patterns.html",
          type: "article",
        },
        {
          name: "Zero Knowledge Proofs",
          url: "https://zk.ethereum.org",
          type: "course",
        },
        {
          name: "Layer 2 Development",
          url: "https://ethereum.org/en/layer-2/",
          type: "article",
        },
      ],
    },
    salary: {
      min: "90,000",
      max: "200,000",
      currency: "USD",
    },
    steps: [
      {
        title: "Blockchain Fundamentals",
        description:
          "Learn the core concepts of blockchain technology and cryptography",
        resources: [
          {
            name: "Bitcoin Whitepaper",
            url: "https://bitcoin.org/bitcoin.pdf",
            type: "article",
          },
          {
            name: "Blockchain Basics",
            url: "https://www.coursera.org/learn/blockchain-basics",
            type: "course",
          },
          {
            name: "Cryptography Fundamentals",
            url: "https://www.crypto101.io",
            type: "book",
          },
          {
            name: "Web3 Introduction",
            url: "https://ethereum.org/en/web3/",
            type: "article",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Blockchain architecture",
          "Cryptographic principles",
          "Consensus mechanisms",
          "Distributed systems",
        ],
        projects: [
          {
            title: "Simple Blockchain",
            description:
              "Build a basic blockchain implementation in JavaScript",
          },
          {
            title: "Crypto Wallet",
            description: "Create a basic cryptocurrency wallet interface",
          },
        ],
      },
      {
        title: "Smart Contract Development",
        description:
          "Master Solidity and smart contract development for Ethereum and other platforms",
        resources: [
          {
            name: "Solidity Documentation",
            url: "https://docs.soliditylang.org",
            type: "article",
          },
          {
            name: "CryptoZombies",
            url: "https://cryptozombies.io",
            type: "course",
          },
          {
            name: "OpenZeppelin Guides",
            url: "https://docs.openzeppelin.com/learn/",
            type: "article",
          },
          {
            name: "Ethereum Smart Contract Security",
            url: "https://ethereum.org/en/developers/docs/smart-contracts/security/",
            type: "course",
          },
        ],
        timeEstimate: "12 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Solidity programming",
          "Smart contract patterns",
          "Testing and deployment",
          "Security best practices",
        ],
        prerequisites: [
          "JavaScript fundamentals",
          "Basic blockchain knowledge",
          "Understanding of Web3",
        ],
        projects: [
          {
            title: "ERC20 Token",
            description:
              "Create and deploy an ERC20 token with advanced features",
          },
          {
            title: "NFT Collection",
            description:
              "Develop a complete NFT collection with minting functionality",
          },
        ],
      },
      {
        title: "Web3 Development",
        description:
          "Build decentralized applications (dApps) with modern Web3 frameworks",
        resources: [
          {
            name: "Web3.js Documentation",
            url: "https://web3js.readthedocs.io",
            type: "article",
          },
          {
            name: "Full Stack Web3 Development",
            url: "https://www.youtube.com/c/PatrickCollins",
            type: "video",
          },
          {
            name: "DeFi Development",
            url: "https://chain.link/education-hub/defi",
            type: "course",
          },
          {
            name: "The Graph Documentation",
            url: "https://thegraph.com/docs/en/",
            type: "article",
          },
        ],
        timeEstimate: "16 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "dApp architecture",
          "Web3 integration",
          "DeFi protocols",
          "Blockchain data indexing",
        ],
        prerequisites: [
          "Smart contract development experience",
          "Frontend development skills",
          "Understanding of DeFi concepts",
        ],
        projects: [
          {
            title: "DeFi Platform",
            description:
              "Build a decentralized finance platform with multiple features",
          },
          {
            title: "DAO Framework",
            description:
              "Develop a framework for creating decentralized autonomous organizations",
          },
        ],
      },
    ],
    prerequisites: [
      "Strong JavaScript programming skills",
      "Basic cryptography knowledge",
      "Understanding of distributed systems",
      "Frontend development experience",
    ],
    tools: [
      "Hardhat or Truffle",
      "MetaMask",
      "Ethers.js/Web3.js",
      "OpenZeppelin",
      "The Graph",
      "IPFS",
    ],
    industryTrends: [
      "DeFi and NFTs",
      "Layer 2 scaling solutions",
      "Cross-chain interoperability",
      "Zero-knowledge proofs",
      "Sustainable blockchain solutions",
    ],
    shareableLink: "https://techpaths.com/share/blockchain-development",
    jobMarketData: {
      openPositions: 45000,
      growthRate: "32% (Much faster than average)",
      topCompanies: [
        "Consensys",
        "Coinbase",
        "Binance",
        "Polygon",
        "Chainlink",
      ],
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Master the art of creating intuitive and visually appealing user interfaces and experiences.",
    icon: Palette, // Assuming Palette is imported from lucide-react
    color: "bg-indigo-500",
    category: "design",
    totalDuration: "28 weeks",
    careers: [
      "UI Designer",
      "UX Designer",
      "Product Designer",
      "Interaction Designer",
      "Visual Designer",
      "UX Researcher",
    ],
    whatsNext: {
      topics: [
        "Advanced Interaction Design",
        "Design Systems at Scale",
        "AI in UX Design",
        "Accessibility and Inclusive Design",
        "Motion Design and Micro-interactions",
        "UX Writing and Content Strategy",
        "DesignOps and Workflow Optimization",
        "AR/VR Design Principles",
      ],
      resources: [
        {
          name: "Design Systems Handbook",
          url: "https://www.designsystems.com/",
          type: "book",
        },
        {
          name: "Advanced Figma Techniques",
          url: "https://www.figma.com/resources/learn-design/",
          type: "course",
        },
        {
          name: "AI in UX Design",
          url: "https://www.interaction-design.org/literature/topics/ai-in-ux",
          type: "article",
        },
      ],
    },
    salary: {
      min: "65,000",
      max: "130,000",
      currency: "USD",
    },
    steps: [
      {
        title: "Design Fundamentals and Principles",
        description:
          "Learn the core principles of design, including typography, color theory, and layout, to create visually appealing interfaces.",
        resources: [
          {
            name: "The Principles of Beautiful Web Design",
            url: "https://www.amazon.com/Principles-Beautiful-Web-Design-4th/dp/0992279444",
            type: "book",
          },
          {
            name: "Introduction to UI/UX Design",
            url: "https://www.coursera.org/learn/ui-ux-design",
            type: "course",
          },
          {
            name: "Design Principles for Non-Designers",
            url: "https://www.youtube.com/watch?v=ZbrzdMaumNk",
            type: "video",
          },
          {
            name: "Color Theory for Designers",
            url: "https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1/",
            type: "article",
          },
        ],
        timeEstimate: "3 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Understanding of design principles (balance, contrast, alignment, etc.)",
          "Typography and color theory basics",
          "Visual hierarchy and composition",
          "Introduction to design tools",
        ],
        projects: [
          {
            title: "Mood Board Creation",
            description:
              "Create a mood board for a hypothetical app to establish visual direction.",
          },
          {
            title: "Typography Exercise",
            description:
              "Design a typographic poster focusing on hierarchy and readability.",
          },
        ],
      },
      {
        title: "Wireframing and Prototyping",
        description:
          "Master the art of creating wireframes and prototypes to visualize and test design concepts.",
        resources: [
          {
            name: "Wireframing for Beginners",
            url: "https://www.uxdesign.cc/wireframing-for-beginners-7b5a1c5a5a5a",
            type: "article",
          },
          {
            name: "Prototyping with Figma",
            url: "https://www.figma.com/resources/learn-design/",
            type: "course",
          },
          {
            name: "The Guide to Wireframing",
            url: "https://www.uxpin.com/studio/ebooks/guide-to-wireframing/",
            type: "book",
          },
          {
            name: "Interactive Prototyping Tutorial",
            url: "https://www.youtube.com/watch?v=3q3FV65ZrUs",
            type: "video",
          },
        ],
        timeEstimate: "4 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Wireframing techniques for different devices",
          "Low-fidelity vs. high-fidelity prototypes",
          "Interactive prototyping tools",
          "User flow and navigation design",
        ],
        prerequisites: ["Basic understanding of design principles"],
        projects: [
          {
            title: "App Wireframe",
            description:
              "Create wireframes for a mobile app, focusing on user flow and navigation.",
          },
          {
            title: "Interactive Prototype",
            description:
              "Build an interactive prototype for a web application.",
          },
        ],
      },
      {
        title: "Figma Essentials",
        description:
          "Learn Figma, the industry-standard tool for UI/UX design, from basics to advanced features.",
        resources: [
          {
            name: "Figma for Beginners",
            url: "https://www.figma.com/resources/learn-design/",
            type: "course",
          },
          {
            name: "Figma Tips and Tricks",
            url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
            type: "video",
          },
          {
            name: "Figma Plugins Guide",
            url: "https://www.figma.com/community/plugins",
            type: "article",
          },
          {
            name: "Collaborative Design with Figma",
            url: "https://www.smashingmagazine.com/2020/09/collaborative-design-tools-figma/",
            type: "article",
          },
        ],
        timeEstimate: "3 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Figma interface and tools",
          "Collaborative design workflows",
          "Design systems and components",
          "Prototyping and animations in Figma",
        ],
        prerequisites: ["Basic wireframing and prototyping knowledge"],
        projects: [
          {
            title: "Figma Design System",
            description:
              "Create a reusable design system in Figma for a web application.",
          },
          {
            title: "Interactive Prototype in Figma",
            description:
              "Design and prototype a mobile app interface in Figma.",
          },
        ],
      },
      {
        title: "Adobe XD Fundamentals",
        description:
          "Explore Adobe XD for designing and prototyping user interfaces with seamless integration into Adobe Creative Cloud.",
        resources: [
          {
            name: "Adobe XD Tutorials",
            url: "https://helpx.adobe.com/xd/tutorials.html",
            type: "course",
          },
          {
            name: "Adobe XD for UI/UX Design",
            url: "https://www.youtube.com/watch?v=WEljsc2zi7A",
            type: "video",
          },
          {
            name: "Adobe XD Plugins Guide",
            url: "https://www.adobe.com/products/xd/features/plugins.html",
            type: "article",
          },
          {
            name: "Adobe XD vs Figma Comparison",
            url: "https://www.uxdesign.cc/adobe-xd-vs-figma-which-one-should-you-use-5b5b5b5b5b5b",
            type: "article",
          },
        ],
        timeEstimate: "3 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Adobe XD interface and tools",
          "Prototyping and animations in Adobe XD",
          "Integration with other Adobe tools",
          "Collaboration features in Adobe XD",
        ],
        prerequisites: ["Basic understanding of design tools"],
        projects: [
          {
            title: "Adobe XD Prototype",
            description:
              "Create a high-fidelity prototype for a web application using Adobe XD.",
          },
          {
            title: "Design System in Adobe XD",
            description: "Build a reusable design system in Adobe XD.",
          },
        ],
      },
      {
        title: "User Research and Testing",
        description:
          "Learn how to conduct user research, usability testing, and analyze user feedback to improve designs.",
        resources: [
          {
            name: "User Research Methods",
            url: "https://www.nngroup.com/articles/user-research-methods/",
            type: "article",
          },
          {
            name: "Usability Testing Guide",
            url: "https://www.smashingmagazine.com/2018/03/guide-usability-testing/",
            type: "article",
          },
          {
            name: "User Research and Testing Course",
            url: "https://www.coursera.org/learn/user-research",
            type: "course",
          },
          {
            name: "Analyzing User Feedback",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "4 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Conducting user interviews and surveys",
          "Usability testing techniques",
          "Analyzing and interpreting user feedback",
          "Iterative design based on user insights",
        ],
        prerequisites: ["Basic understanding of UX principles"],
        projects: [
          {
            title: "Usability Test Report",
            description:
              "Conduct a usability test and create a report with actionable insights.",
          },
          {
            title: "User Persona Creation",
            description: "Develop user personas based on research findings.",
          },
        ],
      },
      {
        title: "Design Systems and Component Libraries",
        description:
          "Master the creation and maintenance of design systems and reusable component libraries for scalable design workflows.",
        resources: [
          {
            name: "Design Systems Handbook",
            url: "https://www.designsystems.com/",
            type: "book",
          },
          {
            name: "Building Design Systems",
            url: "https://www.smashingmagazine.com/2020/05/building-design-systems/",
            type: "article",
          },
          {
            name: "Figma Design Systems Course",
            url: "https://www.figma.com/resources/learn-design/",
            type: "course",
          },
          {
            name: "Component Libraries in Adobe XD",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "3 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Creating scalable design systems",
          "Component-based design workflows",
          "Maintaining design consistency",
          "Collaborating with developers",
        ],
        prerequisites: ["Experience with Figma or Adobe XD"],
        projects: [
          {
            title: "Design System Creation",
            description:
              "Build a comprehensive design system for a web or mobile app.",
          },
          {
            title: "Component Library",
            description:
              "Develop a reusable component library for a design system.",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic understanding of design principles",
      "Familiarity with design tools (Figma, Adobe XD, etc.)",
      "Strong visual and problem-solving skills",
    ],
    tools: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "InVision",
      "Miro for collaboration",
      "UserTesting for usability testing",
      "Google Analytics for user insights",
    ],
    industryTrends: [
      "AI-driven design tools",
      "Inclusive and accessible design",
      "Motion design and micro-interactions",
      "DesignOps for scalable workflows",
      "Remote user testing and research",
    ],
    shareableLink: "https://techpaths.com/share/ui-ux-design",
    jobMarketData: {
      openPositions: 55000,
      growthRate: "18% (Much faster than average)",
      topCompanies: ["Google", "Apple", "Adobe", "Figma", "Airbnb"],
    },
  },
  {
    id: "product-management",
    title: "Tech Product Management",
    description:
      "Master the art of building and managing successful tech products using agile methodologies",
    icon: Briefcase,
    color: "bg-pink-500",
    category: "infrastructure",
    totalDuration: "24 weeks",
    careers: [
      "Technical Product Manager",
      "Product Owner",
      "Scrum Master",
      "Agile Coach",
      "Digital Product Strategist",
    ],
    salary: {
      min: "85,000",
      max: "180,000",
      currency: "USD",
    },
    whatsNext: {
      topics: [
        "Enterprise Product Management",
        "AI Product Strategy",
        "Product Growth and Analytics",
        "Design Thinking Leadership",
        "Product Innovation Methods",
        "OKRs and Goal Setting",
        "Stakeholder Management",
        "Product Portfolio Management",
      ],
      resources: [
        {
          name: "Advanced Product Strategy",
          url: "https://www.productplan.com/learn/product-strategy-framework/",
          type: "article",
        },
        {
          name: "AI Product Management",
          url: "https://www.coursera.org/learn/ai-product-management-specialization",
          type: "course",
        },
        {
          name: "Product Leadership",
          url: "https://www.oreilly.com/library/view/product-leadership/9781491960592/",
          type: "book",
        },
      ],
    },
    steps: [
      {
        title: "Product Management Foundations",
        description:
          "Learn the fundamentals of product management and agile methodologies",
        resources: [
          {
            name: "Product Management Fundamentals",
            url: "https://www.productschool.com/product-management-certification/",
            type: "course",
          },
          {
            name: "Agile Manifesto and Principles",
            url: "https://agilemanifesto.org/",
            type: "article",
          },
          {
            name: "Scrum Guide",
            url: "https://scrumguides.org/",
            type: "article",
          },
          {
            name: "User Story Mapping",
            url: "https://www.oreilly.com/library/view/user-story-mapping/9781491904893/",
            type: "book",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Product management principles",
          "Agile and Scrum fundamentals",
          "User story creation",
          "Product roadmap basics",
        ],
        projects: [
          {
            title: "Product Vision Board",
            description:
              "Create a product vision and strategy document for a digital product",
          },
          {
            title: "Sprint Planning",
            description: "Plan and execute a mock sprint for a product feature",
          },
        ],
      },
      {
        title: "Product Development and MVP",
        description:
          "Master the process of building and validating minimum viable products",
        resources: [
          {
            name: "Lean Product Development",
            url: "https://www.udacity.com/course/lean-product-development",
            type: "course",
          },
          {
            name: "MVP Development Guide",
            url: "https://www.productplan.com/learn/minimum-viable-product/",
            type: "article",
          },
          {
            name: "Product Analytics",
            url: "https://mixpanel.com/blog/product-analytics-guide/",
            type: "article",
          },
          {
            name: "User Research Methods",
            url: "https://www.nngroup.com/articles/user-research-methods/",
            type: "article",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "MVP development process",
          "Product validation techniques",
          "User research methods",
          "Product metrics and KPIs",
        ],
        prerequisites: [
          "Basic product management knowledge",
          "Understanding of agile principles",
          "Basic analytics knowledge",
        ],
        projects: [
          {
            title: "MVP Launch",
            description: "Plan and execute an MVP launch strategy",
          },
          {
            title: "Product Metrics Dashboard",
            description:
              "Create a product analytics dashboard with key metrics",
          },
        ],
      },
      {
        title: "Advanced Product Strategy",
        description:
          "Learn advanced product management techniques and strategic planning",
        resources: [
          {
            name: "Strategic Product Management",
            url: "https://www.coursera.org/learn/strategic-product-management",
            type: "course",
          },
          {
            name: "Product Strategy Framework",
            url: "https://www.productplan.com/learn/product-strategy-framework/",
            type: "article",
          },
          {
            name: "Inspired: Product Management",
            url: "https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers-ebook/dp/B077NRB36N",
            type: "book",
          },
          {
            name: "Advanced Agile Practices",
            url: "https://www.scrum.org/resources/blog",
            type: "article",
          },
        ],
        timeEstimate: "10 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Product strategy development",
          "Stakeholder management",
          "Product growth techniques",
          "Advanced agile practices",
        ],
        prerequisites: [
          "Product development experience",
          "MVP launch experience",
          "Basic product analytics knowledge",
        ],
        projects: [
          {
            title: "Product Growth Strategy",
            description: "Develop a comprehensive product growth strategy",
          },
          {
            title: "Product Portfolio Plan",
            description: "Create a strategic plan for multiple product lines",
          },
        ],
      },
    ],

    prerequisites: [
      "Basic understanding of software development lifecycle",
      "Strong communication and leadership skills",
      "Analytical and problem-solving abilities",
    ],
    tools: [
      "Jira or Trello for project management",
      "Figma or Sketch for wireframing",
      "Analytics tools (Google Analytics, Mixpanel)",
      "Product roadmap software",
      "Collaboration tools (Slack, Confluence)",
    ],
    industryTrends: [
      "AI-driven product development",
      "Data-driven decision making",
      "Remote product management",
      "Continuous discovery and delivery",
      "Product-led growth",
    ],

    jobMarketData: {
      openPositions: 50000,
      growthRate: "20% (Much faster than average)",
      topCompanies: ["Google", "Amazon", "Microsoft", "Atlassian"],
    },
  },
  {
    id: "3d-modeling-animation",
    title: "3D Modeling & Animation",
    description:
      "Master the art of creating stunning 3D models, animations, and visual effects using industry-standard tools like Blender, Maya, and 3ds Max.",
    icon: Box, // Assuming Cube is imported from lucide-react
    color: "bg-teal-500",
    category: "design",
    totalDuration: "36 weeks",
    careers: [
      "3D Modeler",
      "3D Animator",
      "Visual Effects Artist",
      "Game Artist",
      "Motion Graphics Designer",
      "Character Animator",
      "Environment Artist",
    ],
    whatsNext: {
      topics: [
        "Advanced Character Rigging",
        "Procedural Modeling",
        "Real-Time Rendering (Unreal Engine, Unity)",
        "Virtual Production",
        "AI in 3D Animation",
        "Simulation and Dynamics (Fluids, Cloth, Hair)",
        "Photorealistic Rendering",
        "AR/VR Content Creation",
      ],
      resources: [
        {
          name: "Advanced Blender Techniques",
          url: "https://www.blender.org/support/tutorials/",
          type: "course",
        },
        {
          name: "Maya Masterclass",
          url: "https://www.autodesk.com/products/maya/learn",
          type: "course",
        },
        {
          name: "Procedural Modeling in Houdini",
          url: "https://www.sidefx.com/learn/",
          type: "course",
        },
      ],
    },
    salary: {
      min: "60,000",
      max: "140,000",
      currency: "USD",
    },
    steps: [
      {
        title: "Introduction to 3D Modeling",
        description:
          "Learn the basics of 3D modeling, including navigation, tools, and workflows in Blender, Maya, and 3ds Max.",
        resources: [
          {
            name: "Blender Beginner Tutorial",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Maya Basics",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "3ds Max Fundamentals",
            url: "https://www.autodesk.com/products/3ds-max/learn",
            type: "course",
          },
          {
            name: "Introduction to 3D Modeling Concepts",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Understanding 3D space and navigation",
          "Basic modeling tools and techniques",
          "Introduction to Blender, Maya, and 3ds Max",
          "Creating simple 3D objects",
        ],
        projects: [
          {
            title: "Simple 3D Object",
            description:
              "Create a basic 3D object (e.g., a chair or table) in Blender, Maya, or 3ds Max.",
          },
          {
            title: "Low-Poly Model",
            description:
              "Design a low-poly model of a small environment (e.g., a house or forest).",
          },
        ],
      },
      {
        title: "Texturing and Materials",
        description:
          "Master the art of creating realistic textures and materials for 3D models using UV mapping and procedural textures.",
        resources: [
          {
            name: "Blender Texturing Tutorial",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Substance Painter Basics",
            url: "https://www.substance3d.com/learn/",
            type: "course",
          },
          {
            name: "UV Mapping in Maya",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "Procedural Texturing in 3ds Max",
            url: "https://www.autodesk.com/products/3ds-max/learn",
            type: "course",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "UV mapping and unwrapping",
          "Creating realistic materials",
          "Using texture painting tools",
          "Procedural texturing techniques",
        ],
        prerequisites: ["Basic understanding of 3D modeling"],
        projects: [
          {
            title: "Textured 3D Model",
            description:
              "Apply textures and materials to a 3D model of your choice.",
          },
          {
            title: "Material Library",
            description:
              "Create a library of reusable materials for future projects.",
          },
        ],
      },
      {
        title: "Lighting and Rendering",
        description:
          "Learn how to set up lighting and render scenes using industry-standard rendering engines like Cycles, Arnold, and V-Ray.",
        resources: [
          {
            name: "Blender Lighting and Rendering",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Arnold Renderer in Maya",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "V-Ray for 3ds Max",
            url: "https://www.chaos.com/vray/3ds-max",
            type: "course",
          },
          {
            name: "Photorealistic Rendering Techniques",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Setting up realistic lighting",
          "Using rendering engines (Cycles, Arnold, V-Ray)",
          "Optimizing render settings",
          "Post-processing rendered images",
        ],
        prerequisites: ["Basic understanding of 3D modeling and texturing"],
        projects: [
          {
            title: "Rendered Scene",
            description:
              "Light and render a 3D scene with photorealistic quality.",
          },
          {
            title: "Lighting Setup",
            description: "Create a lighting setup for a product visualization.",
          },
        ],
      },
      {
        title: "Character Modeling and Rigging",
        description:
          "Master the art of creating and rigging 3D characters for animation, including facial expressions and body mechanics.",
        resources: [
          {
            name: "Blender Character Modeling",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Maya Character Rigging",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "3ds Max Character Animation",
            url: "https://www.autodesk.com/products/3ds-max/learn",
            type: "course",
          },
          {
            name: "Facial Rigging Techniques",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "8 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Creating 3D character models",
          "Rigging characters for animation",
          "Facial expression rigging",
          "Body mechanics and IK/FK systems",
        ],
        prerequisites: ["Intermediate 3D modeling skills"],
        projects: [
          {
            title: "Character Model",
            description: "Design and rig a 3D character for animation.",
          },
          {
            title: "Facial Rig",
            description: "Create a facial rig with expressive controls.",
          },
        ],
      },
      {
        title: "Animation Fundamentals",
        description:
          "Learn the principles of animation, including keyframing, timing, and motion, to bring 3D models to life.",
        resources: [
          {
            name: "Blender Animation Tutorial",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Maya Animation Basics",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "12 Principles of Animation",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
          {
            name: "Character Animation in 3ds Max",
            url: "https://www.autodesk.com/products/3ds-max/learn",
            type: "course",
          },
        ],
        timeEstimate: "6 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Keyframing and timing",
          "Principles of animation (squash and stretch, anticipation, etc.)",
          "Character animation techniques",
          "Motion paths and curves",
        ],
        prerequisites: ["Basic understanding of 3D modeling and rigging"],
        projects: [
          {
            title: "Walk Cycle Animation",
            description: "Create a walk cycle for a 3D character.",
          },
          {
            title: "Short Animation",
            description:
              "Produce a 10-second animation showcasing character movement.",
          },
        ],
      },
      {
        title: "Advanced Techniques and Specializations",
        description:
          "Explore advanced topics like simulation, dynamics, and visual effects to create complex and realistic 3D scenes.",
        resources: [
          {
            name: "Blender Simulation Tutorial",
            url: "https://www.blender.org/support/tutorials/",
            type: "course",
          },
          {
            name: "Maya Dynamics and Effects",
            url: "https://www.autodesk.com/products/maya/learn",
            type: "course",
          },
          {
            name: "3ds Max Particle Systems",
            url: "https://www.autodesk.com/products/3ds-max/learn",
            type: "course",
          },
          {
            name: "Advanced Visual Effects",
            url: "https://www.youtube.com/watch?v=5b5b5b5b5b5b",
            type: "video",
          },
        ],
        timeEstimate: "4 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Simulating fluids, cloth, and hair",
          "Particle systems and dynamics",
          "Advanced visual effects",
          "Integrating 3D with live-action footage",
        ],
        prerequisites: ["Intermediate animation and rendering skills"],
        projects: [
          {
            title: "Simulation Scene",
            description: "Create a scene with fluid or cloth simulation.",
          },
          {
            title: "Visual Effects Shot",
            description: "Integrate 3D elements into live-action footage.",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic understanding of 3D concepts",
      "Familiarity with design software",
      "Strong spatial and artistic skills",
    ],
    tools: [
      "Blender",
      "Maya",
      "3ds Max",
      "Substance Painter",
      "ZBrush for sculpting",
      "Unreal Engine for real-time rendering",
      "Adobe After Effects for compositing",
    ],
    industryTrends: [
      "Real-time rendering for games and films",
      "Virtual production in filmmaking",
      "AI-assisted 3D modeling",
      "Procedural generation and automation",
      "AR/VR content creation",
    ],
    shareableLink: "https://techpaths.com/share/3d-modeling-animation",
    jobMarketData: {
      openPositions: 40000,
      growthRate: "16% (Faster than average)",
      topCompanies: [
        "Pixar",
        "Disney",
        "Industrial Light & Magic",
        "Blizzard Entertainment",
        "Epic Games",
      ],
    },
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Master the art of protecting systems, networks, and data from digital attacks and security threats",
    icon: Shield,
    color: "bg-red-500",
    category: "infrastructure",
    totalDuration: "36 weeks",
    careers: [
      "Security Analyst",
      "Penetration Tester",
      "Security Engineer",
      "Security Architect",
      "CISO (Chief Information Security Officer)",
      "Security Consultant",
      "Incident Responder"
    ],
    whatsNext: {
      topics: [
        "Advanced Threat Hunting",
        "Cloud Security Architecture",
        "Security Automation with AI",
        "Zero Trust Implementation",
        "Quantum Cryptography",
        "Advanced Malware Analysis",
        "Security Orchestration (SOAR)",
        "Red Team Operations"
      ],
      resources: [
        {
          name: "Advanced Penetration Testing",
          url: "https://www.offensive-security.com/pwk-oscp/",
          type: "course"
        },
        {
          name: "Cloud Security Alliance Guidance",
          url: "https://cloudsecurityalliance.org/research/guidance/",
          type: "article"
        },
        {
          name: "The Art of Memory Forensics",
          url: "https://www.memoryanalysis.net/memory-forensics-book",
          type: "book"
        }
      ]
    },
    salary: {
      min: "85,000",
      max: "200,000",
      currency: "USD"
    },
    steps: [
      {
        title: "Security Fundamentals",
        description:
          "Learn the core concepts of cybersecurity, including basic principles, terminology, and security models",
        resources: [
          {
            name: "CompTIA Security+ Certification",
            url: "https://www.comptia.org/certifications/security",
            type: "course"
          },
          {
            name: "Cybersecurity Fundamentals",
            url: "https://www.coursera.org/learn/cybersecurity-fundamentals",
            type: "course"
          },
          {
            name: "NIST Cybersecurity Framework",
            url: "https://www.nist.gov/cyberframework",
            type: "article"
          },
          {
            name: "Introduction to Cybersecurity",
            url: "https://www.youtube.com/watch?v=rcDO8km6R6c",
            type: "video"
          }
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Security principles (CIA triad)",
          "Basic threat modeling",
          "Security controls and frameworks",
          "Risk assessment fundamentals"
        ],
        projects: [
          {
            title: "Security Assessment",
            description: "Conduct a basic security assessment of a small network environment"
          },
          {
            title: "Security Policy Development",
            description: "Create a comprehensive security policy for a fictional organization"
          }
        ]
      },
      {
        title: "Network Security",
        description:
          "Master the techniques for securing networks, understanding protocols, and implementing defensive measures",
        resources: [
          {
            name: "Network Security Fundamentals",
            url: "https://www.sans.org/cyber-security-courses/network-security-fundamentals/",
            type: "course"
          },
          {
            name: "Wireshark for Network Analysis",
            url: "https://www.wireshark.org/docs/",
            type: "article"
          },
          {
            name: "Practical Packet Analysis",
            url: "https://nostarch.com/packet3",
            type: "book"
          },
          {
            name: "Firewall Configuration Best Practices",
            url: "https://www.youtube.com/watch?v=W5mhKrRUvD0",
            type: "video"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Network protocols and vulnerabilities",
          "Firewall configuration and management",
          "Intrusion detection/prevention systems",
          "VPN and secure communications"
        ],
        prerequisites: [
          "Basic networking knowledge",
          "Understanding of TCP/IP",
          "Familiarity with security principles"
        ],
        projects: [
          {
            title: "Network Defense Setup",
            description: "Configure a secure network with proper segmentation and monitoring"
          },
          {
            title: "Traffic Analysis",
            description: "Analyze network traffic to identify and mitigate potential threats"
          }
        ]
      },
      {
        title: "Ethical Hacking and Penetration Testing",
        description:
          "Learn offensive security techniques to identify vulnerabilities before malicious actors can exploit them",
        resources: [
          {
            name: "Penetration Testing: A Hands-On Introduction",
            url: "https://nostarch.com/pentesting",
            type: "book"
          },
          {
            name: "Kali Linux Revealed",
            url: "https://kali.training/",
            type: "course"
          },
          {
            name: "OWASP Top 10",
            url: "https://owasp.org/www-project-top-ten/",
            type: "article"
          },
          {
            name: "Metasploit Framework Tutorial",
            url: "https://www.offensive-security.com/metasploit-unleashed/",
            type: "course"
          }
        ],
        timeEstimate: "8 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Vulnerability assessment methodologies",
          "Penetration testing frameworks",
          "Exploitation techniques",
          "Reporting and remediation"
        ],
        prerequisites: [
          "Network security knowledge",
          "Basic scripting skills",
          "Understanding of operating systems"
        ],
        projects: [
          {
            title: "Web Application Penetration Test",
            description: "Conduct a comprehensive penetration test on a web application"
          },
          {
            title: "Network Vulnerability Assessment",
            description: "Perform a vulnerability assessment and create a detailed report"
          }
        ]
      },
      {
        title: "Security Operations and Incident Response",
        description:
          "Master the art of monitoring, detecting, and responding to security incidents effectively",
        resources: [
          {
            name: "Incident Response & Computer Forensics",
            url: "https://www.amazon.com/Incident-Response-Computer-Forensics-Third/dp/0071798684",
            type: "book"
          },
          {
            name: "SANS Incident Handling",
            url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/",
            type: "course"
          },
          {
            name: "SIEM Implementation",
            url: "https://www.splunk.com/en_us/resources/videos/getting-started-with-splunk-security.html",
            type: "video"
          },
          {
            name: "NIST Incident Response Framework",
            url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf",
            type: "article"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Security monitoring and SIEM",
          "Incident response procedures",
          "Digital forensics basics",
          "Threat hunting techniques"
        ],
        prerequisites: [
          "Network security experience",
          "Understanding of common attacks",
          "Log analysis skills"
        ],
        projects: [
          {
            title: "Incident Response Plan",
            description: "Develop a comprehensive incident response plan for an organization"
          },
          {
            title: "SIEM Implementation",
            description: "Set up a Security Information and Event Management system"
          }
        ]
      },
      {
        title: "Cloud Security",
        description:
          "Learn how to secure cloud environments and understand the unique challenges of cloud security",
        resources: [
          {
            name: "AWS Security Fundamentals",
            url: "https://aws.amazon.com/training/course-descriptions/security-fundamentals/",
            type: "course"
          },
          {
            name: "Azure Security Best Practices",
            url: "https://docs.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns",
            type: "article"
          },
          {
            name: "Cloud Security Alliance Guidance",
            url: "https://cloudsecurityalliance.org/research/guidance/",
            type: "article"
          },
          {
            name: "Securing DevOps",
            url: "https://www.manning.com/books/securing-devops",
            type: "book"
          }
        ],
        timeEstimate: "8 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Cloud security models (shared responsibility)",
          "Identity and access management in the cloud",
          "Secure cloud architecture",
          "Container and serverless security"
        ],
        prerequisites: [
          "Basic cloud computing knowledge",
          "Security fundamentals",
          "Understanding of virtualization"
        ],
        projects: [
          {
            title: "Secure Cloud Deployment",
            description: "Design and implement a secure cloud infrastructure"
          },
          {
            title: "Cloud Security Assessment",
            description: "Conduct a security assessment of a cloud environment"
          }
        ]
      }
    ],
    prerequisites: [
      "Basic understanding of networking concepts",
      "Familiarity with operating systems (Windows, Linux)",
      "Problem-solving skills and logical thinking",
      "Basic programming or scripting knowledge"
    ],
    tools: [
      "Kali Linux",
      "Wireshark",
      "Metasploit",
      "Nmap",
      "Burp Suite",
      "Splunk or ELK Stack",
      "OWASP ZAP",
      "Hashcat/John the Ripper"
    ],
    industryTrends: [
      "Zero Trust Architecture",
      "Cloud-native security",
      "Security automation and orchestration",
      "AI/ML in cybersecurity",
      "DevSecOps integration",
      "Supply chain security",
      "Ransomware protection strategies"
    ],
    shareableLink: "https://techpaths.com/share/cybersecurity",
    jobMarketData: {
      openPositions: 715000,
      growthRate: "33% (Much faster than average)",
      topCompanies: ["Microsoft", "Cisco", "IBM", "Palo Alto Networks", "CrowdStrike", "Mandiant"]
    }
  },
  {
    id: "data-analyst",
    title: "Data Analysis",
    description: "Master the art of transforming raw data into actionable insights using modern tools and techniques",
    icon: Brain,
    color: "bg-cyan-500",
    category: "data",
    totalDuration: "24 weeks",
    careers: [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Data Visualization Specialist",
      "Reporting Analyst",
      "Business Analyst",
      "Market Research Analyst"
    ],
    whatsNext: {
      topics: [
        "Advanced Statistical Analysis",
        "Machine Learning for Analysts",
        "Big Data Analytics",
        "Data Engineering Fundamentals",
        "Advanced SQL and Database Management",
        "Business Intelligence Tools",
        "Data Storytelling",
        "Predictive Analytics"
      ],
      resources: [
        {
          name: "Advanced SQL for Data Analysis",
          url: "https://www.coursera.org/learn/sql-for-data-science",
          type: "course"
        },
        {
          name: "Data Visualization Best Practices",
          url: "https://www.tableau.com/learn/articles/data-visualization",
          type: "article"
        },
        {
          name: "Storytelling with Data",
          url: "https://www.storytellingwithdata.com/",
          type: "book"
        }
      ]
    },
    salary: {
      min: "60,000",
      max: "120,000",
      currency: "USD"
    },
    steps: [
      {
        title: "Data Analysis Fundamentals",
        description: "Learn the core concepts of data analysis, including data types, cleaning, and basic statistical methods",
        resources: [
          {
            name: "Data Analysis with Python",
            url: "https://www.coursera.org/learn/python-data-analysis",
            type: "course"
          },
          {
            name: "Introduction to Statistics",
            url: "https://www.khanacademy.org/math/statistics-probability",
            type: "course"
          },
          {
            name: "Data Cleaning Best Practices",
            url: "https://www.dataquest.io/blog/data-cleaning-guide/",
            type: "article"
          },
          {
            name: "Excel for Data Analysis",
            url: "https://www.youtube.com/watch?v=opJgMj1II7g",
            type: "video"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Data types and structures",
          "Basic statistical concepts",
          "Data cleaning techniques",
          "Excel for data analysis"
        ],
        projects: [
          {
            title: "Data Cleaning Project",
            description: "Clean and prepare a messy dataset for analysis"
          },
          {
            title: "Statistical Analysis Report",
            description: "Conduct basic statistical analysis on a dataset and create a report"
          }
        ]
      },
      {
        title: "SQL and Database Management",
        description: "Master SQL for data querying and database management",
        resources: [
          {
            name: "SQL for Data Analysis",
            url: "https://www.udacity.com/course/sql-for-data-analysis--ud198",
            type: "course"
          },
          {
            name: "PostgreSQL Documentation",
            url: "https://www.postgresql.org/docs/",
            type: "article"
          },
          {
            name: "SQL Cookbook",
            url: "https://www.oreilly.com/library/view/sql-cookbook/0596009763/",
            type: "book"
          },
          {
            name: "Advanced SQL Queries",
            url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
            type: "video"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "SQL querying and optimization",
          "Database design principles",
          "Data modeling",
          "Advanced SQL functions"
        ],
        prerequisites: [
          "Basic understanding of databases",
          "Familiarity with data structures"
        ],
        projects: [
          {
            title: "Database Design",
            description: "Design and implement a database for a business case"
          },
          {
            title: "Complex SQL Queries",
            description: "Write and optimize complex SQL queries for data analysis"
          }
        ]
      },
      {
        title: "Data Visualization",
        description: "Learn to create compelling visualizations and dashboards using modern tools",
        resources: [
          {
            name: "Tableau Training",
            url: "https://www.tableau.com/learn/training",
            type: "course"
          },
          {
            name: "Power BI Documentation",
            url: "https://docs.microsoft.com/en-us/power-bi/",
            type: "article"
          },
          {
            name: "Data Visualization with Python",
            url: "https://www.datacamp.com/courses/data-visualization-with-python",
            type: "course"
          },
          {
            name: "Visualization Best Practices",
            url: "https://www.youtube.com/watch?v=W9E-uI6zX98",
            type: "video"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Data visualization principles",
          "Dashboard design",
          "Interactive visualizations",
          "Storytelling with data"
        ],
        prerequisites: [
          "Basic data analysis skills",
          "Understanding of data types"
        ],
        projects: [
          {
            title: "Interactive Dashboard",
            description: "Create an interactive dashboard using Tableau or Power BI"
          },
          {
            title: "Data Story",
            description: "Develop a data-driven story with visualizations"
          }
        ]
      },
      {
        title: "Business Intelligence and Reporting",
        description: "Master business intelligence tools and create effective reports for stakeholders",
        resources: [
          {
            name: "Business Intelligence Fundamentals",
            url: "https://www.coursera.org/learn/business-intelligence",
            type: "course"
          },
          {
            name: "Power BI Advanced",
            url: "https://www.microsoft.com/en-us/learning/course.aspx?cid=DA-100",
            type: "course"
          },
          {
            name: "Tableau Advanced",
            url: "https://www.tableau.com/learn/training/20211",
            type: "course"
          },
          {
            name: "Report Writing Best Practices",
            url: "https://www.youtube.com/watch?v=8VtGzhjVN1E",
            type: "video"
          }
        ],
        timeEstimate: "6 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "BI tool implementation",
          "Report automation",
          "KPI tracking",
          "Stakeholder communication"
        ],
        prerequisites: [
          "Data visualization experience",
          "SQL knowledge",
          "Basic business understanding"
        ],
        projects: [
          {
            title: "BI Implementation",
            description: "Implement a business intelligence solution for a company"
          },
          {
            title: "Automated Reporting System",
            description: "Create an automated reporting system with scheduled updates"
          }
        ]
      }
    ],
    prerequisites: [
      "Basic mathematics and statistics",
      "Familiarity with spreadsheets",
      "Problem-solving skills",
      "Basic programming knowledge (helpful but not required)"
    ],
    tools: [
      "SQL (PostgreSQL, MySQL)",
      "Python (pandas, numpy)",
      "Tableau",
      "Power BI",
      "Excel/Google Sheets",
      "Jupyter Notebooks",
      "Git for version control"
    ],
    industryTrends: [
      "Self-service analytics",
      "Real-time data analysis",
      "Data democratization",
      "Augmented analytics",
      "Natural language processing for data analysis",
      "Cloud-based analytics platforms"
    ],
    shareableLink: "https://techpaths.com/share/data-analyst",
    jobMarketData: {
      openPositions: 85000,
      growthRate: "25% (Much faster than average)",
      topCompanies: ["Microsoft", "Google", "Amazon", "IBM", "Tableau", "Salesforce"]
    }
  },
  {
    id: "game-development",
    title: "Game Development",
    description: "Master the art of creating engaging games using industry-standard engines and tools",
    icon: GamepadIcon,
    color: "bg-violet-500",
    category: "development",
    totalDuration: "36 weeks",
    careers: [
      "Game Developer",
      "Game Designer",
      "Game Programmer",
      "Technical Artist",
      "Game Engine Developer",
      "VR/AR Game Developer"
    ],
    whatsNext: {
      topics: [
        "Advanced Game Physics",
        "Multiplayer Game Development",
        "Procedural Content Generation",
        "Game AI and Pathfinding",
        "Real-time Graphics Programming",
        "Game Audio Engineering",
        "Mobile Game Optimization",
        "Game Monetization Strategies"
      ],
      resources: [
        {
          name: "Unity Advanced Game Development",
          url: "https://learn.unity.com/",
          type: "course"
        },
        {
          name: "Unreal Engine Masterclass",
          url: "https://www.unrealengine.com/en-US/onlinelearning-courses",
          type: "course"
        },
        {
          name: "Game Programming Patterns",
          url: "https://gameprogrammingpatterns.com/",
          type: "book"
        }
      ]
    },
    salary: {
      min: "65,000",
      max: "150,000",
      currency: "USD"
    },
    steps: [
      {
        title: "Game Development Fundamentals",
        description: "Learn the basics of game development, including game design principles and programming fundamentals",
        resources: [
          {
            name: "Introduction to Game Development",
            url: "https://www.coursera.org/learn/game-development",
            type: "course"
          },
          {
            name: "Game Design Fundamentals",
            url: "https://www.gamedesigning.org/learn/game-design/",
            type: "article"
          },
          {
            name: "Unity Beginner Tutorial",
            url: "https://learn.unity.com/project/creator-kit-beginner-code",
            type: "course"
          },
          {
            name: "Game Programming Basics",
            url: "https://www.youtube.com/watch?v=on9nwbZngyw",
            type: "video"
          }
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Game design principles",
          "Basic game programming concepts",
          "Unity/Unreal Engine basics",
          "Game development workflow"
        ],
        projects: [
          {
            title: "2D Platformer",
            description: "Create a simple 2D platformer game with basic mechanics"
          },
          {
            title: "Game Design Document",
            description: "Develop a comprehensive game design document for a new game concept"
          }
        ]
      },
      {
        title: "3D Game Development",
        description: "Master 3D game development techniques and tools",
        resources: [
          {
            name: "3D Game Development with Unity",
            url: "https://learn.unity.com/course/3d-game-development",
            type: "course"
          },
          {
            name: "Unreal Engine 3D Game Development",
            url: "https://www.unrealengine.com/marketplace/en-US/product/3d-game-development-starter-kit",
            type: "course"
          },
          {
            name: "3D Game Programming",
            url: "https://www.amazon.com/3D-Game-Programming-All-One/dp/1598638432",
            type: "book"
          },
          {
            name: "3D Game Development Tutorial",
            url: "https://www.youtube.com/watch?v=XtQMytORBmM",
            type: "video"
          }
        ],
        timeEstimate: "10 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "3D modeling and animation",
          "Physics and collision detection",
          "Lighting and materials",
          "3D game optimization"
        ],
        prerequisites: [
          "Basic game development knowledge",
          "Understanding of 3D concepts",
          "Familiarity with game engines"
        ],
        projects: [
          {
            title: "3D Adventure Game",
            description: "Develop a 3D adventure game with basic mechanics and interactions"
          },
          {
            title: "3D Environment Design",
            description: "Create an immersive 3D game environment with proper lighting and materials"
          }
        ]
      },
      {
        title: "Advanced Game Development",
        description: "Learn advanced game development techniques and optimization",
        resources: [
          {
            name: "Advanced Game Programming",
            url: "https://www.coursera.org/learn/game-programming",
            type: "course"
          },
          {
            name: "Game Performance Optimization",
            url: "https://docs.unity3d.com/Manual/PerformanceOptimization.html",
            type: "article"
          },
          {
            name: "Game AI Programming",
            url: "https://www.amazon.com/Programming-Game-AI-Example-Mat/dp/1556220782",
            type: "book"
          },
          {
            name: "Advanced Game Development Techniques",
            url: "https://www.youtube.com/watch?v=THnivyG0Mvo",
            type: "video"
          }
        ],
        timeEstimate: "12 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Advanced game mechanics",
          "Performance optimization",
          "Game AI implementation",
          "Multiplayer networking"
        ],
        prerequisites: [
          "3D game development experience",
          "Strong programming skills",
          "Understanding of game architecture"
        ],
        projects: [
          {
            title: "Multiplayer Game",
            description: "Create a multiplayer game with networking and synchronization"
          },
          {
            title: "AI-driven Game",
            description: "Develop a game with advanced AI behaviors and pathfinding"
          }
        ]
      }
    ],
    prerequisites: [
      "Basic programming knowledge",
      "Understanding of mathematics and physics",
      "Creative thinking and problem-solving skills",
      "Familiarity with game design concepts"
    ],
    tools: [
      "Unity",
      "Unreal Engine",
      "Blender for 3D modeling",
      "Visual Studio/Visual Studio Code",
      "Git for version control",
      "Adobe Creative Suite",
      "Audacity for audio"
    ],
    industryTrends: [
      "VR/AR game development",
      "Cloud gaming",
      "Cross-platform development",
      "Procedural content generation",
      "AI in game development",
      "Mobile gaming growth",
      "Esports development"
    ],
    shareableLink: "https://techpaths.com/share/game-development",
    jobMarketData: {
      openPositions: 45000,
      growthRate: "21% (Much faster than average)",
      topCompanies: ["Epic Games", "Unity Technologies", "Electronic Arts", "Ubisoft", "Blizzard Entertainment"]
    }
  },
  {
    id: "ai-engineering",
    title: "Artificial Intelligence Engineering",
    description: "Master the practical implementation and deployment of AI systems in production environments",
    icon: CpuIcon,
    color: "bg-emerald-500",
    category: "development",
    totalDuration: "40 weeks",
    careers: [
      "AI Engineer",
      "ML Engineer",
      "AI Infrastructure Engineer",
      "MLOps Engineer",
      "AI Systems Architect",
      "Deep Learning Engineer"
    ],
    whatsNext: {
      topics: [
        "Advanced MLOps",
        "Distributed AI Systems",
        "AI Hardware Optimization",
        "Federated Learning",
        "AI Security and Privacy",
        "Quantum Machine Learning",
        "Edge AI Deployment",
        "AI Model Governance"
      ],
      resources: [
        {
          name: "Advanced MLOps",
          url: "https://www.coursera.org/learn/mlops-fundamentals",
          type: "course"
        },
        {
          name: "Distributed AI Systems",
          url: "https://www.oreilly.com/library/view/distributed-systems/9781491926534/",
          type: "book"
        },
        {
          name: "AI Infrastructure Design",
          url: "https://www.udacity.com/course/ai-infrastructure--nd082",
          type: "course"
        }
      ]
    },
    salary: {
      min: "100,000",
      max: "250,000",
      currency: "USD"
    },
    steps: [
      {
        title: "AI Engineering Fundamentals",
        description: "Learn the core concepts of AI engineering and infrastructure",
        resources: [
          {
            name: "AI Engineering Fundamentals",
            url: "https://www.coursera.org/learn/ai-engineering",
            type: "course"
          },
          {
            name: "MLOps Fundamentals",
            url: "https://www.udacity.com/course/mlops-fundamentals--nd082",
            type: "course"
          },
          {
            name: "AI Infrastructure Best Practices",
            url: "https://www.oreilly.com/library/view/ai-infrastructure/9781492079399/",
            type: "book"
          },
          {
            name: "Introduction to AI Engineering",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
            type: "video"
          }
        ],
        timeEstimate: "10 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "AI system architecture",
          "MLOps principles",
          "AI infrastructure components",
          "Model deployment basics"
        ],
        projects: [
          {
            title: "AI Pipeline Development",
            description: "Build an end-to-end AI pipeline for model training and deployment"
          },
          {
            title: "MLOps Implementation",
            description: "Implement MLOps practices in a sample AI project"
          }
        ]
      },
      {
        title: "Advanced AI Systems",
        description: "Master advanced AI system design and implementation",
        resources: [
          {
            name: "Advanced AI Systems",
            url: "https://www.coursera.org/learn/advanced-ai-systems",
            type: "course"
          },
          {
            name: "Distributed AI Systems",
            url: "https://www.udacity.com/course/distributed-ai-systems--nd082",
            type: "course"
          },
          {
            name: "AI System Design Patterns",
            url: "https://www.oreilly.com/library/view/ai-system-design/9781492079399/",
            type: "book"
          },
          {
            name: "Advanced AI Engineering",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
            type: "video"
          }
        ],
        timeEstimate: "12 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Distributed AI systems",
          "High-performance AI computing",
          "AI system optimization",
          "Advanced deployment strategies"
        ],
        prerequisites: [
          "AI engineering fundamentals",
          "Understanding of distributed systems",
          "Experience with cloud platforms"
        ],
        projects: [
          {
            title: "Distributed AI System",
            description: "Design and implement a distributed AI system"
          },
          {
            title: "AI Performance Optimization",
            description: "Optimize an AI system for maximum performance"
          }
        ]
      },
      {
        title: "AI Production Systems",
        description: "Learn to build and maintain production-grade AI systems",
        resources: [
          {
            name: "AI Production Systems",
            url: "https://www.coursera.org/learn/ai-production-systems",
            type: "course"
          },
          {
            name: "MLOps in Production",
            url: "https://www.udacity.com/course/mlops-in-production--nd082",
            type: "course"
          },
          {
            name: "Production AI Systems",
            url: "https://www.oreilly.com/library/view/production-ai-systems/9781492079399/",
            type: "book"
          },
          {
            name: "AI Production Best Practices",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
            type: "video"
          }
        ],
        timeEstimate: "14 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Production AI system design",
          "AI system monitoring",
          "Model versioning and management",
          "AI system security"
        ],
        prerequisites: [
          "Advanced AI systems knowledge",
          "Experience with production systems",
          "Understanding of security principles"
        ],
        projects: [
          {
            title: "Production AI System",
            description: "Build a production-ready AI system with monitoring and security"
          },
          {
            title: "AI System Migration",
            description: "Migrate an existing AI system to a production environment"
          }
        ]
      }
    ],
    prerequisites: [
      "Strong programming skills",
      "Understanding of machine learning",
      "Knowledge of distributed systems",
      "Experience with cloud platforms"
    ],
    tools: [
      "TensorFlow/PyTorch",
      "Kubernetes",
      "Docker",
      "MLflow",
      "Airflow",
      "Prometheus/Grafana",
      "Git for version control"
    ],
    industryTrends: [
      "Edge AI deployment",
      "AI infrastructure as code",
      "Automated ML operations",
      "AI system security",
      "Distributed AI systems",
      "AI hardware optimization",
      "Federated learning"
    ],
    shareableLink: "https://techpaths.com/share/ai-engineering",
    jobMarketData: {
      openPositions: 85000,
      growthRate: "35% (Much faster than average)",
      topCompanies: ["Google", "Microsoft", "Amazon", "IBM", "NVIDIA", "OpenAI"]
    }
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description: "Master the design and implementation of scalable cloud solutions across major platforms",
    icon: CloudIcon,
    color: "bg-sky-500",
    category: "infrastructure",
    totalDuration: "32 weeks",
    careers: [
      "Cloud Architect",
      "Cloud Engineer",
      "Solutions Architect",
      "Cloud Infrastructure Engineer",
      "DevOps Architect",
      "Cloud Security Architect"
    ],
    whatsNext: {
      topics: [
        "Multi-cloud Architecture",
        "Cloud-native Security",
        "Serverless Architecture",
        "Cloud Cost Optimization",
        "Edge Computing",
        "Cloud Migration Strategies",
        "Cloud Governance",
        "Cloud Disaster Recovery"
      ],
      resources: [
        {
          name: "Advanced Cloud Architecture",
          url: "https://aws.amazon.com/architecture/",
          type: "course"
        },
        {
          name: "Cloud-native Security",
          url: "https://www.coursera.org/learn/cloud-security",
          type: "course"
        },
        {
          name: "Multi-cloud Strategies",
          url: "https://www.oreilly.com/library/view/multi-cloud-strategies/9781492079399/",
          type: "book"
        }
      ]
    },
    salary: {
      min: "90,000",
      max: "220,000",
      currency: "USD"
    },
    steps: [
      {
        title: "Cloud Fundamentals",
        description: "Learn the basics of cloud computing and major cloud platforms",
        resources: [
          {
            name: "Cloud Computing Fundamentals",
            url: "https://www.coursera.org/learn/cloud-computing",
            type: "course"
          },
          {
            name: "AWS Cloud Practitioner",
            url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
            type: "course"
          },
          {
            name: "Azure Fundamentals",
            url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
            type: "course"
          },
          {
            name: "Google Cloud Fundamentals",
            url: "https://cloud.google.com/certification/cloud-digital-leader",
            type: "course"
          }
        ],
        timeEstimate: "8 weeks",
        skillLevel: "beginner",
        keyTakeaways: [
          "Cloud computing concepts",
          "Major cloud platforms",
          "Basic cloud services",
          "Cloud security fundamentals"
        ],
        projects: [
          {
            title: "Cloud Infrastructure Setup",
            description: "Set up a basic cloud infrastructure using AWS/Azure/GCP"
          },
          {
            title: "Cloud Service Implementation",
            description: "Implement common cloud services for a sample application"
          }
        ]
      },
      {
        title: "Cloud Architecture Design",
        description: "Master the design of scalable and resilient cloud architectures",
        resources: [
          {
            name: "Cloud Architecture Design",
            url: "https://www.coursera.org/learn/cloud-architecture",
            type: "course"
          },
          {
            name: "AWS Solutions Architect",
            url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            type: "course"
          },
          {
            name: "Azure Solutions Architect",
            url: "https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect/",
            type: "course"
          },
          {
            name: "Cloud Architecture Patterns",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
            type: "video"
          }
        ],
        timeEstimate: "10 weeks",
        skillLevel: "intermediate",
        keyTakeaways: [
          "Cloud architecture patterns",
          "Scalability and resilience",
          "Cloud security design",
          "Cost optimization"
        ],
        prerequisites: [
          "Cloud fundamentals",
          "Understanding of distributed systems",
          "Basic security knowledge"
        ],
        projects: [
          {
            title: "Cloud Architecture Design",
            description: "Design a scalable cloud architecture for a web application"
          },
          {
            title: "Cloud Migration Plan",
            description: "Create a cloud migration strategy for an existing application"
          }
        ]
      },
      {
        title: "Advanced Cloud Solutions",
        description: "Learn advanced cloud architecture patterns and implementation",
        resources: [
          {
            name: "Advanced Cloud Architecture",
            url: "https://www.coursera.org/learn/advanced-cloud-architecture",
            type: "course"
          },
          {
            name: "Cloud-native Architecture",
            url: "https://www.udacity.com/course/cloud-native-architecture--nd082",
            type: "course"
          },
          {
            name: "Multi-cloud Architecture",
            url: "https://www.oreilly.com/library/view/multi-cloud-architecture/9781492079399/",
            type: "book"
          },
          {
            name: "Advanced Cloud Patterns",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
            type: "video"
          }
        ],
        timeEstimate: "12 weeks",
        skillLevel: "advanced",
        keyTakeaways: [
          "Multi-cloud architecture",
          "Cloud-native design",
          "Advanced security patterns",
          "Disaster recovery"
        ],
        prerequisites: [
          "Cloud architecture experience",
          "Understanding of microservices",
          "Security expertise"
        ],
        projects: [
          {
            title: "Multi-cloud Solution",
            description: "Design and implement a multi-cloud architecture"
          },
          {
            title: "Cloud-native Application",
            description: "Build a cloud-native application with advanced patterns"
          }
        ]
      }
    ],
    prerequisites: [
      "Understanding of distributed systems",
      "Basic networking knowledge",
      "Security fundamentals",
      "Experience with cloud platforms"
    ],
    tools: [
      "AWS/Azure/GCP",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Ansible",
      "CloudFormation",
      "Git for version control"
    ],
    industryTrends: [
      "Multi-cloud adoption",
      "Serverless architecture",
      "Edge computing",
      "Cloud-native security",
      "FinOps",
      "Green cloud computing",
      "AI/ML in cloud"
    ],
    shareableLink: "https://techpaths.com/share/cloud-architecture",
    jobMarketData: {
      openPositions: 95000,
      growthRate: "28% (Much faster than average)",
      topCompanies: ["Amazon", "Microsoft", "Google", "IBM", "Oracle", "Salesforce"]
    }
  }
];
