import React from "react";
import { CheckIcon, XIcon } from "./Icons";

const features = [
  {
    name: "CSS Battle & Visual Labs",
    ca: true,
    fm: false,
    udemy: false,
    note: "Interactive pixel-perfect grading",
  },
  {
    name: "XSS & Security Sandbox",
    ca: true,
    fm: false,
    udemy: false,
    note: "Live attack & defense environments",
  },
  {
    name: "System Design Labs",
    ca: true,
    fm: "Theory only",
    udemy: "Theory only",
    note: "WhatsApp & URL Shortener architecture",
  },
  {
    name: "Staff/Senior Level Qs",
    ca: true,
    fm: true,
    udemy: "Varies",
    note: "FAANG recent pattern focus",
  },
  {
    name: "Machine Coding Rounds",
    ca: true,
    fm: "Limited",
    udemy: "Video only",
    note: "Built-in tester for Kanban/Feeds",
  },
  {
    name: "Lifetime Free Updates",
    ca: true,
    fm: "Subscription",
    udemy: true,
    note: "Next.js 15+ included",
  },
];

const ComparisonTable: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Coding Activist?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Most platforms give you videos. Coding Activist gives you a full
            **hands-on interview simulation ecosystem**.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm uppercase tracking-wider">

                <th className="p-6 text-left text-slate-600 font-semibold">
                  Features
                </th>

                {/* Coding Activist */}
                <th className="relative p-8 text-center bg-gradient-to-b from-brand-50 to-white border-x border-brand-200">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                    BEST CHOICE
                  </div>

                  <div className="text-lg font-bold text-brand-600">
                    Coding Activist
                  </div>
                </th>

                <th className="p-6 text-center text-slate-500 font-semibold">
                  FrontendMasters
                </th>

                <th className="p-6 text-center text-slate-500 font-semibold">
                  Udemy / Others
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {features.map((feature, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Feature */}
                  <td className="p-6">
                    <div className="font-semibold text-slate-900">
                      {feature.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {feature.note}
                    </div>
                  </td>

                  {/* Coding Activist */}
                  <td className="p-8 text-center bg-brand-50/40 border-x border-brand-200">
                    <CheckIcon className="w-6 h-6 text-brand-500 mx-auto" />
                  </td>

                  {/* FrontendMasters */}
                  <td className="p-6 text-center">
                    {typeof feature.fm === "boolean" ? (
                      feature.fm ? (
                        <CheckIcon className="w-5 h-5 text-slate-400 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-medium text-slate-500">
                        {feature.fm}
                      </span>
                    )}
                  </td>

                  {/* Udemy */}
                  <td className="p-6 text-center">
                    {typeof feature.udemy === "boolean" ? (
                      feature.udemy ? (
                        <CheckIcon className="w-5 h-5 text-slate-400 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-medium text-slate-500">
                        {feature.udemy}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-brand-500" /> Included
          </span>
          <span className="flex items-center gap-2">
            <XIcon className="w-4 h-4 text-slate-300" /> Not Available
          </span>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;