import React from 'react';
import { User, Bookmark, History, Settings, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white text-4xl font-black">
          JD
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 mb-1">Welcome back, John Doe</h1>
          <p className="text-slate-500 font-medium">Rank: 12,450 | Category: OPEN | Goal: NIT Surathkal CSE</p>
        </div>
        <button className="md:ml-auto px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
          <Settings size={18} /> Edit Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Stats */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <StatCard icon={<Bookmark className="text-blue-600" />} label="Saved Colleges" value="12" />
            <StatCard icon={<History className="text-emerald-600" />} label="Recent Searches" value="48" />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900">Your High-Chance List</h2>
              <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                View all <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black">
                    {i}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">NIT Warangal</h4>
                    <p className="text-xs text-slate-400 font-medium">Electronics and Communication Engineering</p>
                  </div>
                  <div className="ml-auto text-emerald-500 font-black text-sm">
                    94% Safe
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Award size={120} />
             </div>
             <h3 className="text-2xl font-black mb-4 relative z-10">AI Career Match</h3>
             <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
               Based on your priority for "Placements" and your rank, we recommend focusing on <span className="text-blue-400 font-bold">Top NITs</span> rather than <span className="text-amber-400 font-bold">New IITs</span> for better ROI.
             </p>
             <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-400 hover:text-white transition-all">
               View Path Insights
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
