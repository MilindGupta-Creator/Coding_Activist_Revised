import { Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    bgColor: string;
    textGradient: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya Patel",
        role: "Backend Developer",
        content: "I found my current role through the jobs board. The curated listings saved me so much time in my job search.",
        bgColor: "from-purple-900/20 to-indigo-900/20",
        textGradient: "from-purple-300 to-indigo-200"
    },
    {
        id: 2,
        name: "Ananya Verma",
        role: "Full Stack Developer",
        content: "Tech roadmap section ne mujhe React aur Node.js seekhne mein madad ki. 6 mahine mein beginner se confident developer ban gaya!",
        bgColor: "from-blue-900/20 to-cyan-900/20",
        textGradient: "from-blue-300 to-cyan-200"
    },
    {
        id: 3,
        name: "Marcus Johnson",
        role: "DevOps Engineer",
        content: "The community's support during my job search was invaluable. The mock interviews and resume reviews made all the difference.",
        bgColor: "from-emerald-900/20 to-teal-900/20",
        textGradient: "from-emerald-300 to-teal-200"
    },
    {
        id: 4,
        name: "Vikram Singh",
        role: "FrontEnd Developer",
        content: "As someone transitioning into tech, this community provided the guidance and resources I needed to succeed in my new career path.",
        bgColor: "from-pink-900/20 to-rose-900/20",
        textGradient: "from-pink-300 to-rose-200"
    },
    {
        id: 5,
        name: "David Kim",
        role: "Backend Developer",
        content: "The technical discussions and code reviews from peers have significantly improved my coding skills and problem-solving abilities.",
        bgColor: "from-amber-900/20 to-yellow-900/20",
        textGradient: "from-amber-300 to-yellow-200"
    }
];

// Duplicate testimonials to create an infinite effect
const duplicatedTestimonials = [...testimonials,...testimonials];

export default function CommunityVoices() {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState<{ [key: string]: boolean }>({});
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        // Function to handle automatic scrolling
        const autoScroll = () => {
            if (containerRef.current && !isPaused) {
                if (containerRef.current.scrollLeft >= (containerRef.current.scrollWidth - containerRef.current.clientWidth - 10)) {
                    // Reset to start when reaching the end
                    containerRef.current.scrollTo({ left: 0, behavior: 'auto' });
                    setScrollPosition(0);
                } else {
                    // Scroll by a small amount
                    containerRef.current.scrollBy({ left: 2, behavior: 'auto' });
                    setScrollPosition(prev => prev + 2);
                }
            }
        };

        // Set up interval for smooth scrolling
        const scrollInterval = setInterval(autoScroll, 15);

        return () => clearInterval(scrollInterval);
    }, [isPaused]);

    // Function to handle intersection observer for blur effect
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('data-id');
                    if (id) {
                        setVisibleCards(prev => ({
                            ...prev,
                            [id]: entry.isIntersecting
                        }));
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: '-10% 0px',
                threshold: [0.1, 0.5, 0.9]
            }
        );

        // Observe all testimonial cards
        const cards = containerRef.current.querySelectorAll('.testimonial-card');
        cards.forEach(card => observer.observe(card));

        return () => {
            cards.forEach(card => observer.unobserve(card));
        };
    }, []);

    // Handle manual scroll
    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    return (
        <div className="w-full mt-12 pb-8 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="text-purple-500 mr-3">
                            <Users className="h-8 w-8 text-purple-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            Community Voices
                        </h2>
                    </div>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Hear from developers who have grown their careers through our community.
                    </p>
                </div>

                <div className="relative">
                    {/* Gradient overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-24  z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10"></div>

                    {/* Testimonial Cards Container */}
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto scrollbar-hide py-8 px-4 gap-6
                        
                        "
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onScroll={handleScroll}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => {
                            const cardId = `${testimonial.id}-${index}`;
                            const isVisible = visibleCards[cardId] !== false; // Default to visible
                            const distance = Math.abs((index * 300) - scrollPosition);
                            const scale = Math.max(0.85, 1 - (distance * 0.0002));

                            return (
                                <div
                                    key={cardId}
                                    data-id={cardId}
                                    className={`testimonial-card flex-none w-[280px] md:w-[450px] transform transition-all duration-700  ${isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-md'}`}
                                    style={{
                                        transform: `scale(${scale})`,
                                        transition: 'all 700ms cubic-bezier(0.25, 0.1, 0.25, 1.0)'
                                    }}
                                >
                                    <div
                                        className={`h-full p-8 rounded-xl bg-gradient-to-br ${testimonial.bgColor} backdrop-blur-sm border border-white/10 shadow-xl flex flex-col`}
                                    >
                                        <div className="mb-4">
                                            <div className="text-[#5E548E]">
                                                <FaQuoteLeft size={24} />
                                            </div>
                                        </div>

                                        <p className="text-gray-200 text-lg flex-grow mb-6 leading-relaxed">
                                            "{testimonial.content}"
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/10">
                                            <h4 className={`font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r ${testimonial.textGradient}`}>
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-purple-300">{testimonial.role}</p>

                                            <div className="flex space-x-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
}