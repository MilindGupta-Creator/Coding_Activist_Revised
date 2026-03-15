import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <span className="text-2xl font-bold text-slate-900">Coding<span className="text-brand-600">Activist</span></span>
            <p className="text-slate-600 mt-4 max-w-sm">
              Helping developers crack the code to their dream jobs. The most comprehensive guide to frontend engineering interviews.
            </p>
          </div>
          {/* <div>
            <h4 className="text-slate-900 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Free Sample</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Cheatsheets</a></li>
            </ul>
          </div> */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-brand-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Coding Activist. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
