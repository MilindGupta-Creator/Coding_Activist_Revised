import { useState, useCallback, useEffect, useRef } from 'react';
import { ebookContent } from '../ebookContent';

export interface SearchResult {
  type: 'module' | 'question';
  moduleId: string;
  moduleTitle: string;
  questionIndex?: number;
  questionText?: string;
  matchedIn: 'title' | 'question' | 'answer' | 'tags' | 'code';
  relevance: number;
}

interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  recentSearches: string[];
  selectedResultIndex: number;
  setSelectedResultIndex: (index: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  saveToRecentSearches: (query: string) => void;
  navigateToResult: (
    result: SearchResult,
    goToModule: (moduleId: string) => void
  ) => void;
  clearSearch: () => void;
}

export function useSearch(): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reader_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Helper to calculate relevance score
  const calculateRelevance = useCallback(
    (text: string, query: string): number => {
      const textLower = text.toLowerCase();
      if (textLower === query) return 100;
      if (textLower.startsWith(query)) return 80;
      if (textLower.includes(query)) return 60;
      // Check for word matches
      const queryWords = query.split(/\s+/);
      const textWords = textLower.split(/\s+/);
      const wordMatches = queryWords.filter((qw) =>
        textWords.some((tw) => tw.includes(qw))
      ).length;
      return wordMatches * 20;
    },
    []
  );

  // Search functionality
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const queryLower = query.toLowerCase().trim();
      const results: SearchResult[] = [];

      // Search through all modules
      const searchInModules = (
        modules: typeof ebookContent,
        parentTitle = ''
      ) => {
        for (const module of modules) {
          const fullTitle = parentTitle
            ? `${parentTitle} > ${module.title}`
            : module.title;

          // Search in module title
          if (module.title.toLowerCase().includes(queryLower)) {
            results.push({
              type: 'module',
              moduleId: module.id,
              moduleTitle: fullTitle,
              matchedIn: 'title',
              relevance: calculateRelevance(module.title, queryLower),
            });
          }

          // Search in questions
          if (module.items) {
            module.items.forEach((item, index) => {
              let maxRelevance = 0;
              let matchedIn: SearchResult['matchedIn'] = 'question';

              // Search in question text
              const questionText = item.q.replace(/^Q\d+\.\s*/i, '');
              if (questionText.toLowerCase().includes(queryLower)) {
                const rel = calculateRelevance(questionText, queryLower);
                if (rel > maxRelevance) {
                  maxRelevance = rel;
                  matchedIn = 'question';
                }
              }

              // Search in answer
              if (item.a.toLowerCase().includes(queryLower)) {
                const rel = calculateRelevance(item.a, queryLower) * 0.7;
                if (rel > maxRelevance) {
                  maxRelevance = rel;
                  matchedIn = 'answer';
                }
              }

              // Search in tags
              if (item.tags) {
                const tagMatch = item.tags.some((tag) =>
                  tag.toLowerCase().includes(queryLower)
                );
                if (tagMatch) {
                  const rel = 50;
                  if (rel > maxRelevance) {
                    maxRelevance = rel;
                    matchedIn = 'tags';
                  }
                }
              }

              // Search in code
              if (item.code && item.code.toLowerCase().includes(queryLower)) {
                const rel = calculateRelevance(item.code, queryLower) * 0.5;
                if (rel > maxRelevance) {
                  maxRelevance = rel;
                  matchedIn = 'code';
                }
              }

              if (maxRelevance > 0) {
                results.push({
                  type: 'question',
                  moduleId: module.id,
                  moduleTitle: fullTitle,
                  questionIndex: index,
                  questionText: questionText.substring(0, 100),
                  matchedIn,
                  relevance: maxRelevance,
                });
              }
            });
          }

          // Recursively search submodules
          if (module.submodules) {
            searchInModules(module.submodules, fullTitle);
          }
        }
      };

      searchInModules(ebookContent);

      // Sort by relevance (highest first)
      results.sort((a, b) => b.relevance - a.relevance);

      // Limit to top 50 results
      setSearchResults(results.slice(0, 50));
    },
    [calculateRelevance]
  );

  // Handle search input change
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setSelectedResultIndex(0);
    } else {
      setSearchResults([]);
      setSelectedResultIndex(0);
    }
  }, [searchQuery, performSearch]);

  // Auto-scroll selected result into view
  useEffect(() => {
    if (isSearchOpen && searchResults.length > 0 && selectedResultIndex >= 0) {
      const selectedElement = document.querySelector(
        `[data-search-result-index="${selectedResultIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedResultIndex, isSearchOpen, searchResults.length]);

  // Save to recent searches
  const saveToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const updated = [query, ...prev.filter((s) => s !== query)].slice(0, 10);
      localStorage.setItem('reader_recent_searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Navigate to search result
  const navigateToResult = useCallback(
    (result: SearchResult, goToModule: (moduleId: string) => void) => {
      const currentQuery = searchQuery;
      goToModule(result.moduleId);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      saveToRecentSearches(currentQuery);

      // Scroll to question if it's a question result
      if (result.type === 'question' && result.questionIndex !== undefined) {
        setTimeout(() => {
          const questionEl = document.getElementById(
            `question-${result.questionIndex}`
          );
          if (questionEl) {
            questionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight the question briefly
            questionEl.classList.add(
              'ring-2',
              'ring-brand-500',
              'ring-opacity-50'
            );
            setTimeout(() => {
              questionEl.classList.remove(
                'ring-2',
                'ring-brand-500',
                'ring-opacity-50'
              );
            }, 2000);
          }
        }, 300);
      }
    },
    [searchQuery, saveToRecentSearches]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedResultIndex(0);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        clearSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, clearSearch]);

  // Keyboard navigation for search results
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedResultIndex((prev) =>
            Math.min(prev + 1, searchResults.length - 1)
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedResultIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults.length]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    setIsSearchOpen,
    recentSearches,
    selectedResultIndex,
    setSelectedResultIndex,
    searchInputRef,
    saveToRecentSearches,
    navigateToResult,
    clearSearch,
  };
}

