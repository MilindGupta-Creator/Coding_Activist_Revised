import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <span className="text-2xl font-bold text-white">Frontend<span className="text-brand-400">Mastery</span></span>
            <p className="text-slate-500 mt-4 max-w-sm">
              Helping developers crack the code to their dream jobs. The most comprehensive guide to frontend engineering interviews.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-400">Free Sample</a></li>
              <li><a href="#" className="hover:text-brand-400">Blog</a></li>
              <li><a href="#" className="hover:text-brand-400">Cheatsheets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} FrontendMastery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
