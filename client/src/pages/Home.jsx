import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, TrendingUp, Sparkles, Filter, ListFilter } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [formData, setFormData] = useState({
    rank: '',
    category: 'OPEN',
    exam: 'JoSAA',
    gender: 'Gender-Neutral'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results', { state: formData });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 border border-blue-100"
        >
          <Sparkles size={16} />
          2024 Predictor Now Available
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight"
        >
          Your Future College. <br/>
          <span className="gradient-text">Scientifically Predicted.</span>
        </motion.h1>
        
        <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
          Skip the guesswork. Use previous years' data and our prediction engine to find exactly where you'll get in.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Search Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-12 xl:col-span-8 bg-white p-10 rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <ListFilter size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Entrance Details</h2>
              <p className="text-slate-500 text-sm">Tell us about your performance</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Exam Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Entrance Exam</label>
                <div className="flex p-1 bg-slate-100 rounded-xl">
                  {['JoSAA', 'EAMCET'].map((exam) => (
                    <button 
                      key={exam}
                      type="button"
                      onClick={() => setFormData({...formData, exam})}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${formData.exam === exam ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {exam === 'JoSAA' ? 'JEE Main' : 'EAMCET'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rank Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Your All India Rank</label>
                <div className="relative">
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 15420"
                    className="w-full pl-5 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-semibold text-lg"
                    value={formData.rank}
                    onChange={(e) => setFormData({...formData, rank: e.target.value})}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Caste Category</label>
                <select 
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="OPEN">General (OPEN)</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Gender Type</label>
                <select 
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="Gender-Neutral">Gender Neutral</option>
                  <option value="Female-only (including Supernumerary)">Female Only</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/25 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg"
              >
                <Search size={24} />
                Predict My Future Colleges
              </button>
            </div>
          </form>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="lg:col-span-12 xl:col-span-4 grid sm:grid-cols-2 xl:grid-cols-1 gap-6">
          <FeatureCard 
            icon={<Sparkles className="text-blue-600" />}
            title="Smart ROI Insights"
            desc="We don't just show colleges, we show which ones give you the best return on investment."
          />
          <FeatureCard 
            icon={<MapPin className="text-emerald-600" />}
            title="Location Matching"
            desc="Find institutes in your home state or across India with advanced location filtering."
          />
          <FeatureCard 
            icon={<Building2 className="text-amber-600" />}
            title="Verified Data"
            desc="Powered by 2023 JoSAA official cutoff databases for maximum accuracy."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex xl:flex-row flex-col gap-4"
  >
    <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default Home;
