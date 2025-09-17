"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
  Search,
  Code,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Grid,
  List,
  BookmarkIcon,
  Share2,
  ArrowUp,
  Clock,
  Award,
  X,
  Settings,
  Save,
  Trash2,
  PlayCircle,
  Eye,
  Crown,
  Sparkles,
} from "lucide-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useRouter } from "next/navigation";
import questiondata from "../../components/ui/questions.json";
import blind75data from "../../components/ui/blind75-questions.json";
import { capitalizeWords } from "../../../src/utils/commonUtils";

const firebaseConfig = {
  apiKey: "AIzaSyBegkaVBpkSz2UWnespSWZdBBKJFN2-aiw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

type DPLevel = "Linear DP" | "Knapsack" | "Multi Dimensions DP";

type Question = {
  id: number;
  title: string;
  companies: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
  dpLevel?: DPLevel;
  leetCodeUrl: string;
  isBlind75?: boolean;
};

const companyLogos: { [key: string]: string } = {
  Google: "https://logo.clearbit.com/google.com",
  Amazon: "https://logo.clearbit.com/amazon.com",
  Facebook: "https://logo.clearbit.com/facebook.com",
  Apple: "https://logo.clearbit.com/apple.com",
  Walmart: "https://logo.clearbit.com/walmart.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Uber: "https://logo.clearbit.com/uber.com",
  Airbnb: "https://logo.clearbit.com/airbnb.com",
  Adobe: "https://logo.clearbit.com/adobe.com",
  Oracle: "https://logo.clearbit.com/oracle.com",
  Yandex: "https://logo.clearbit.com/yandex.com",
  Infosys: "https://logo.clearbit.com/infosys.com",
  Line: "https://logo.clearbit.com/line.me",
  "ICICI Bank": "https://logo.clearbit.com/icicibank.com",
  "Mail.ru": "https://logo.clearbit.com/mail.ru",
  IBM: "https://logo.clearbit.com/ibm.com",
  "Goldman Sachs": "https://logo.clearbit.com/goldmansachs.com",
  "VK Cup": "https://logo.clearbit.com/vk.com",
  Zomato: "https://logo.clearbit.com/zomato.com",
  HackerRank: "https://logo.clearbit.com/hackerrank.com",
  Swiggy: "https://logo.clearbit.com/swiggy.com",
};

const questions: Question[] = [
  ...questiondata.questions.map((q) => ({
    ...q,
    difficulty: q.difficulty as "Easy" | "Medium" | "Hard",
    dpLevel: q.dpLevel as DPLevel | undefined,
  })),
  ...blind75data.blind75.map((q) => ({
    ...q,
    difficulty: q.difficulty as "Easy" | "Medium" | "Hard",
    isBlind75: true,
  })),
];

const allCompanies = Array.from(new Set(questions.flatMap((q) => q.companies)));
const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));
const allDPLevels: DPLevel[] = ["Linear DP", "Knapsack", "Multi Dimensions DP"];

export default function Component() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    string | undefined
  >(undefined);
  const [sortBy, setSortBy] = useState<"default" | "difficulty">("default");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [searchTags, setSearchTags] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showSettings, setShowSettings] = useState(false);
  const [questionsPerPage, setQuestionsPerPage] = useState(14);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const [selectedDPLevels, setSelectedDPLevels] = useState<DPLevel[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showBlind75Only, setShowBlind75Only] = useState(false);
  const [showQuickPreview, setShowQuickPreview] = useState<Question | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthLoading(false);
      if (user) {
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedQuestions");
    if (storedBookmarks) {
      setBookmarkedQuestions(JSON.parse(storedBookmarks));
    }

    const storedNotes = localStorage.getItem("questionNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await db.collection("users").doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setBookmarkedQuestions(userData?.bookmarks || []);
        setNotes(userData?.notes || {});
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };

  const saveUserData = async (
    userId: string,
    bookmarks: number[],
    notes: { [key: number]: string }
  ) => {
    try {
      await db.collection("users").doc(userId).set(
        {
          bookmarks,
          notes,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to save user data");
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(
      (q) =>
        (selectedCompanies.length === 0 ||
          q.companies.some((company) => selectedCompanies.includes(company))) &&
        (selectedDifficulty ? q.difficulty === selectedDifficulty : true) &&
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (showBookmarkedOnly ? bookmarkedQuestions.includes(q.id) : true) &&
        (selectedTags.length === 0 ||
          selectedTags.some((tag) => q.tags.includes(tag))) &&
        (selectedDPLevels.length === 0 ||
          (q.dpLevel && selectedDPLevels.includes(q.dpLevel))) &&
        (activeTab === "all" ||
          (activeTab === "easy" && q.difficulty === "Easy") ||
          (activeTab === "medium" && q.difficulty === "Medium") ||
          (activeTab === "hard" && q.difficulty === "Hard") ||
          (activeTab === "dp" && q.dpLevel) ||
          (activeTab === "blind75" && q.isBlind75)) &&
        (showBlind75Only ? q.isBlind75 : true)
    );
  }, [
    selectedCompanies,
    selectedDifficulty,
    searchQuery,
    showBookmarkedOnly,
    bookmarkedQuestions,
    selectedTags,
    selectedDPLevels,
    activeTab,
    showBlind75Only,
  ]);

  const sortedQuestions = useMemo(() => {
    return [...filteredQuestions].sort((a, b) => {
      if (sortBy === "difficulty") {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });
  }, [filteredQuestions, sortBy]);

  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);

  const currentQuestions = sortedQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCompanies,
    selectedDifficulty,
    searchQuery,
    sortBy,
    showBookmarkedOnly,
    selectedTags,
    selectedDPLevels,
    activeTab,
    showBlind75Only,
  ]);

  const handlePageChange = (
    page: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const toggleBookmark = (questionId: number) => {
    if (!user) {
      toast.error("Please sign in to bookmark questions");
      return;
    }

    setBookmarkedQuestions((prev) => {
      const updated = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      saveUserData(user.uid, updated, notes);
      return updated;
    });
  };

  const shareQuestion = (question: Question) => {
    navigator.clipboard.writeText(
      `Check out this coding challenge: ${question.title} - ${question.leetCodeUrl}`
    );
    toast.success("Link copied to clipboard!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const toggleDPLevel = (level: DPLevel) => {
    setSelectedDPLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTags.toLowerCase())
  );

  const toggleExpand = () => {
    setIsTagsExpanded(!isTagsExpanded);
  };

  const saveNote = (questionId: number, noteContent: string) => {
    if (!user) {
      toast.error("Please sign in to save notes");
      return;
    }

    setNotes((prev) => {
      const updated = { ...prev, [questionId]: noteContent };
      saveUserData(user.uid, bookmarkedQuestions, updated);
      return updated;
    });
    toast.success("Note saved successfully!");
  };

  const deleteNote = (questionId: number) => {
    if (!user) {
      toast.error("Please sign in to delete notes");
      return;
    }

    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      saveUserData(user.uid, bookmarkedQuestions, updated);
      return updated;
    });
    toast.success("Note deleted successfully!");
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setBookmarkedQuestions([]);
      setNotes({});
      toast.success("Signed out successfully");
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'b' && showQuickPreview) {
        toggleBookmark(showQuickPreview.id);
      } else if (e.key === 'n' && showQuickPreview) {
        const currentIndex = currentQuestions.findIndex(q => q.id === showQuickPreview.id);
        if (currentIndex < currentQuestions.length - 1) {
          setShowQuickPreview(currentQuestions[currentIndex + 1]);
        }
      } else if (e.key === 'p' && showQuickPreview) {
        const currentIndex = currentQuestions.findIndex(q => q.id === showQuickPreview.id);
        if (currentIndex > 0) {
          setShowQuickPreview(currentQuestions[currentIndex - 1]);
        }
      } else if (e.key === 'Escape') {
        setShowQuickPreview(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showQuickPreview, currentQuestions]);

  // Quick Preview Modal Component
  const QuickPreviewModal = ({ question }: { question: Question }) => {
    const [localNote, setLocalNote] = useState(notes[question.id] || "");

    useEffect(() => {
      setLocalNote(notes[question.id] || "");
    }, [question.id, notes]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setShowQuickPreview(null)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{question.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty}
              </span>
            </div>
            <button
              onClick={() => setShowQuickPreview(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {question.companies.map(company => (
                <div
                  key={company}
                  className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {companyLogos[company] ? (
                    <img
                      src={companyLogos[company]}
                      alt={`${company} logo`}
                      width={16}
                      height={16}
                      className="mr-2 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=16&width=16";
                      }}
                    />
                  ) : (
                    <Briefcase className="mr-2 h-4 w-4" />
                  )}
                  {company}
                </div>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">{question.description}</p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Time: {question.timeComplexity}
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                Space: {question.spaceComplexity}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {question.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              {question.dpLevel && (
                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                  {question.dpLevel}
                </span>
              )}
              {question.isBlind75 && (
                <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">
                  Blind 75
                </span>
              )}
            </div>

            {/* Notes Section */}
            <div className="mt-6 border-t pt-6 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Notes</h3>
              <textarea
                className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                rows={4}
                placeholder="Add your notes here..."
                value={localNote}
                onChange={e => setLocalNote(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-3 space-x-3">
                <button
                  onClick={() => saveNote(question.id, localNote)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Note</span>
                </button>
                <button
                  onClick={() => deleteNote(question.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Note</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => toggleBookmark(question.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  bookmarkedQuestions.includes(question.id)
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <BookmarkIcon className="h-4 w-4" />
                <span>{bookmarkedQuestions.includes(question.id) ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
              <a
                href={question.leetCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Solve</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Modify QuestionCard to use Quick Preview
  const QuestionCard = ({ question }: { question: Question }) => {
    return (
      <motion.div
        key={question.id}
        className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-4 transform hover:scale-[1.02] transition-all duration-300 w-full hover:shadow-xl`}
      >
        <div className="absolute -right-3 -top-3 rotate-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2.5 py-1 text-[10px] font-bold shadow">
            <Crown className="h-3 w-3" /> Premium
          </span>
        </div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Code className="mr-2 text-blue-500" />
            {question.title}
          </h2>
          <div className="flex items-center space-x-2">
            <span className={`${
              question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            } text-xs font-semibold px-3 py-1 rounded-full`}>
              {question.difficulty}
            </span>
            <button
              onClick={() => toggleBookmark(question.id)}
              className={`p-1.5 rounded-full transition-colors ${
                bookmarkedQuestions.includes(question.id)
                  ? 'text-yellow-500 hover:bg-yellow-50'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookmarkIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => shareQuestion(question)}
              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {question.companies.map(company => (
            <div
              key={company}
              className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
            >
              {companyLogos[company] ? (
                <img
                  src={companyLogos[company]}
                  alt={`${company} logo`}
                  width={16}
                  height={16}
                  className="mr-1 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=16&width=16";
                  }}
                />
              ) : (
                <Briefcase className="mr-1 h-4 w-4" />
              )}
              {company}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
            >
              {tag}
            </span>
          ))}
          {question.dpLevel && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              {question.dpLevel}
            </span>
          )}
          {question.isBlind75 && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
              Blind 75
            </span>
          )}
        </div>

        <div className="flex justify-center items-baseline gap-4">
          <button
            onClick={() => setShowQuickPreview(question)}
            className="mt-4 w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center border border-transparent hover:border-yellow-400/40"
          >
            <Eye className="mr-2 h-4 w-4" />
            Quick Preview
          </button>
          <a
            href={question.leetCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 py-2 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Solve
          </a>
        </div>
      </motion.div>
    );
  };

  const TagFilter = () => (
    <div className="mb-6">
      <div
        className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleExpand}
      >
        <h3
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-gray-900" : "text-gray-900"
          } `}
        >
          Filter by Tags:
        </h3>
        <button
          onClick={() => setIsTagsExpanded(!isTagsExpanded)}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          {isTagsExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isTagsExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedTags.includes(tag)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X
                      className="ml-1 h-3 w-3 inline"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTag(tag);
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isTagsExpanded && selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500 text-white"
            >
              {tag}
              <X
                className="ml-1 h-3 w-3 inline cursor-pointer"
                onClick={() => toggleTag(tag)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const DPLevelFilter = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter by DP Levels:</h3>
      <div className="flex flex-wrap gap-2">
        {allDPLevels.map((level) => (
          <button
            key={level}
            onClick={() => toggleDPLevel(level)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
              selectedDPLevels.includes(level)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {level}
            {selectedDPLevels.includes(level) && (
              <X
                className="ml-1 h-3 w-3 inline"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDPLevel(level);
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto pt-20">
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} transition-colors duration-300`}>
        <div className="container mx-auto py-14 px-4 md:max-w-[calc(80%-20px)]">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-blue-600">
                Welcome,{" "}
                {user?.displayName ? capitalizeWords(user.displayName) : "User"}
              </span>
            </div>
          ) : (
            " "
          )}
          <div
            className=" relative overflow-hidden mb-10 py-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg ring-1 ring-white/20"
            style={{ zIndex: "1" }}
          >
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-4 py-1 text-sm font-semibold backdrop-blur">
                  <Crown className="h-4 w-4" /> Premium Unlocked
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold mb-3 text-center text-white"
              >
                LeetCode Premium — for Free
              </motion.h1>
              <p className="text-lg md:text-xl text-center text-white/95">
                Curated premium-style problems with company tags, notes, and solution links. No paywall.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/15 text-white">{questions.length}+ problems</span>
                <span className="px-3 py-1 rounded-full bg-white/15 text-white">Blind 75 included</span>
                <span className="px-3 py-1 rounded-full bg-white/15 text-white">Company filters</span>
                <span className="px-3 py-1 rounded-full bg-white/15 text-white">Bookmarks & Notes</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-10">
              <svg
                className="absolute left-0 top-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                preserveAspectRatio="none"
              >
                <path d="M0 0h32v32H0z" fill="none" />
                <path d="M0 0h32v32H0z" fill="currentColor" fillOpacity=".05" />
                <path d="M0 0h32L0 32z" fill="currentColor" fillOpacity=".05" />
              </svg>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-2xl"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Handpicked by difficulty and topic</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
              <BookmarkIcon className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Sync bookmarks and notes</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
              <PlayCircle className="h-4 w-4 text-purple-500" />
              <span className="text-sm">One-click jump to solve</span>
            </div>
          </div>
          <div className="mb-8 flex justify-center items-center">
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <span
                className={`text-lg font-semibold ${
                  showBlind75Only ? "text-gray-500" : "text-blue-600"
                }`}
              >
                All Questions
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showBlind75Only}
                  onChange={() => {
                    setShowBlind75Only(!showBlind75Only);
                    document.getElementById("question-area")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <span
                className={`text-lg font-semibold ${
                  showBlind75Only ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Blind 75
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-2 pl-10 border border-gray-300 rounded-md ${
                    theme === "dark" ? "text-gray-900" : "text-gray-900"
                  }`}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <select
                onChange={(e) =>
                  setSelectedDifficulty(
                    e.target.value === "All" ? undefined : e.target.value
                  )
                }
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  theme === "dark" ? "text-gray-900" : "text-gray-900"
                }`}
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Filter by Companies:</h3>
            <div className="flex flex-wrap gap-2">
              {allCompanies.map((company) => (
                <button
                  key={company}
                  onClick={() => toggleCompany(company)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center ${
                    selectedCompanies.includes(company)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {companyLogos[company] ? (
                    <img
                      src={companyLogos[company]}
                      alt={`${company} logo`}
                      width={16}
                      height={16}
                      className="mr-2 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=16&width=16";
                      }}
                    />
                  ) : (
                    <Briefcase className="mr-2 h-4 w-4" />
                  )}
                  {company}
                  {selectedCompanies.includes(company) && (
                    <X
                      className="ml-1 h-3 w-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompany(company);
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <select
              onChange={(e) =>
                setSortBy(e.target.value as "default" | "difficulty")
              }
              className={`w-full md:w-auto p-2 border border-gray-300 rounded-md ${
                theme === "dark" ? "text-gray-900" : "text-gray-900"
              }`}
            >
              <option value="default">Sort by: Default</option>
              <option value="difficulty">Sort by: Difficulty</option>
            </select>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsGridView(!isGridView)}
                className={`px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors duration-200 ${
                  theme === "dark" ? "text-gray-900" : "text-gray-900"
                }`}
              >
                {isGridView ? (
                  <List className="h-4 w-4 mr-2 inline" />
                ) : (
                  <Grid className="h-4 w-4 mr-2 inline" />
                )}
                {isGridView ? "List View" : "Grid View"}
              </button>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          {showSettings && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="questions-per-page"
                    className="text-sm font-medium text-gray-700"
                  >
                    Questions per page:
                  </label>
                  <select
                    id="questions-per-page"
                    value={questionsPerPage}
                    onChange={(e) =>
                      setQuestionsPerPage(Number(e.target.value))
                    }
                    className="ml-2 p-2 border border-gray-300 rounded-md"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4" id="question-area">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="bookmark-mode"
                checked={showBookmarkedOnly}
                onChange={(e) => setShowBookmarkedOnly(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="bookmark-mode"
                className={`text-sm font-medium text-gray-700 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Show Bookmarked Only
              </label>
            </div>
          </div>
          <TagFilter />
          <DPLevelFilter />
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {["all", "easy", "medium", "hard", "dp", "blind75"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab === "dp"
                    ? "Dynamic Programming"
                    : tab === "blind75"
                    ? "Blind 75"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div
                className={`${
                  isGridView
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "space-y-4"
                }`}
              >
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-6 animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`${
                  isGridView
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "space-y-4"
                }`}
              >
                {currentQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            )}
          </AnimatePresence>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  onClick={(e) =>
                    handlePageChange(Math.max(currentPage - 1, 1), e)
                  }
                  className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Previous
                </a>
                {(() => {
                  const pageNumbers = [];
                  const maxVisiblePages = 3;
                  const halfVisible = Math.floor(maxVisiblePages / 2);

                  let startPage = Math.max(1, currentPage - halfVisible);
                  let endPage = Math.min(
                    totalPages,
                    startPage + maxVisiblePages - 1
                  );

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  if (startPage > 1) {
                    pageNumbers.push(
                      <a
                        key={1}
                        href="#"
                        onClick={(e) => handlePageChange(1, e)}
                        className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        1
                      </a>
                    );
                    if (startPage > 2) {
                      pageNumbers.push(
                        <span
                          key="start-ellipsis"
                          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(
                      <a
                        key={i}
                        href="#"
                        onClick={(e) => handlePageChange(i, e)}
                        className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === i
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {i}
                      </a>
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pageNumbers.push(
                        <span
                          key="end-ellipsis"
                          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                    pageNumbers.push(
                      <a
                        key={totalPages}
                        href="#"
                        onClick={(e) => handlePageChange(totalPages, e)}
                        className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        {totalPages}
                      </a>
                    );
                  }

                  return pageNumbers;
                })()}
                <a
                  href="#"
                  onClick={(e) =>
                    handlePageChange(Math.min(currentPage + 1, totalPages), e)
                  }
                  className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  Next
                </a>
              </nav>
            </div>
          )}
          <AnimatePresence>
            {showQuickPreview && <QuickPreviewModal question={showQuickPreview} />}
          </AnimatePresence>
        </div>
        <button
          className="fixed mb-16 bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={scrollToTop}
        >
        <ArrowUp className="h-6 w-6" />
        <span className="sr-only">Scroll to top</span>
        </button>
      </div>
    </div>
  );
}
