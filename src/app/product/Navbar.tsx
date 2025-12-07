import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/main-logo.png";

interface NavbarProps {
  onPurchase: () => void;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPurchase, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' 
        : 'bg-gradient-to-r from-[#181818]/90 to-[#2d2d2d]/90 backdrop-blur-md border-b border-gray-700/50'
    }`}>
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-x-3 group relative z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={Logo}
              alt="logo"
              width="50"
              height="50"
              className="relative bg-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50"
              loading="lazy"
            />
          </div>
          <p className="font-bold text-gray-200 text-xl group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg">Coding Activist</p>
        </Link>

        {/* Desktop Menu */}
        <div className="md:flex items-center gap-x-6 lg:gap-x-8 hidden relative">
          <button 
            onClick={() => scrollToSection('features')} 
            className="relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white text-gray-300 px-3 py-2 rounded-lg hover:bg-white/5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-3/4"
          >
            What's Inside
          </button>
          <button 
            onClick={() => scrollToSection('preview')} 
            className="relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white text-gray-300 px-3 py-2 rounded-lg hover:bg-white/5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-3/4"
          >
            AI Preview
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white text-gray-300 px-3 py-2 rounded-lg hover:bg-white/5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-3/4"
          >
            Pricing
          </button>
          
          <div className="w-px h-6 bg-gray-700/50 mx-2"></div>
          
          <button 
            onClick={onLogin}
            className="text-sm lg:text-base font-medium transition-all duration-300 hover:text-white text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Member Login
          </button>
          
          <button 
            onClick={onPurchase}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
          >
            <span className="relative z-10">Get the Ebook</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
            }`}></span>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
            }`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}>
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className={`absolute top-0 right-0 w-80 max-w-[85vw] bg-gradient-to-b from-[#0a0a0a] via-[#181818] to-[#0a0a0a] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
              <div className="flex flex-col gap-y-2">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-left text-lg font-medium transition-all duration-300 hover:text-white text-gray-300 py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 border-transparent hover:border-blue-500"
                >
                  What's Inside
                </button>
                <button 
                  onClick={() => scrollToSection('preview')} 
                  className="text-left text-lg font-medium transition-all duration-300 hover:text-white text-gray-300 py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 border-transparent hover:border-blue-500"
                >
                  AI Preview
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-left text-lg font-medium transition-all duration-300 hover:text-white text-gray-300 py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 border-transparent hover:border-blue-500"
                >
                  Pricing
                </button>
                
                <div className="h-px bg-gray-700/50 my-4"></div>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogin();
                  }}
                  className="text-left text-lg font-medium transition-all duration-300 hover:text-white text-gray-300 py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  Member Login
                </button>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onPurchase();
                  }}
                  className="mt-4 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                >
                  <span className="relative z-10">Get the Ebook</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;