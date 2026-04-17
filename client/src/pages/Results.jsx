import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Filter, ChevronRight, Bookmark, ArrowLeft, Building2, MapPin, TrendingUp, Sparkles, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/colleges/predict-colleges', state);
        setResults(response.data);
        setFilteredResults(response.data);
      } catch (err) {
        console.error('Error fetching predictions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchPredictions();
    } else {
      navigate('/');
    }
  }, [state, navigate]);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === 'All') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(item => item.chance === type));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-blue-600 border-r-4 border-blue-100"
        />
        <p className="mt-6 text-slate-500 font-bold animate-pulse">Analyzing 2,500+ cutoff records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-4 transition-all hover:-translate-x-1">
            <ArrowLeft size={16} />
            <span className="text-sm font-bold">Adjust Rank</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-slate-900">Your <span className="text-blue-600">Predictions</span></h1>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-black border border-blue-100">
              {state?.exam} Rank {state?.rank}
            </div>
          </div>
          <p className="text-slate-500 text-lg">Found {results.length} colleges matching your profile.</p>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          {['All', 'Safe', 'Target', 'Dream'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilter(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeFilter === tab ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-2xl shadow-blue-900/5"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Building2 size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No results yet</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Try a different rank or category to see matching colleges from the 2023 database.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredResults.map((item, index) => (
              <motion.div
                key={`${item.collegeName}-${item.branch}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <CollegeCard college={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const CollegeCard = ({ college }) => {
  const getChanceStyle = (chance) => {
    switch (chance) {
      case 'Safe': return { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      case 'Target': return { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'Dream': return { bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
      default: return { bg: 'bg-slate-500', light: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  const style = getChanceStyle(college.chance);
  const roiScore = Math.floor(Math.random() * 20) + 80; // Mock ROI for demo

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all p-8 group relative overflow-hidden">
      {/* Probability Progress Bar at very top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${college.probability}%` }}
          className={`h-full ${style.bg}`}
        />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider ${style.text} ${style.light} ${style.border}`}>
          {college.chance} CHANCE
        </div>
        <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
          <TrendingUp size={14} className="font-bold" />
          <span className="text-xs font-black">{roiScore} ROI</span>
        </div>
      </div>

      <h3 className="font-black text-slate-900 text-xl mb-2 leading-tight min-h-[3rem]">
        {college.collegeName}
      </h3>
      
      <div className="flex items-center gap-2 text-slate-400 mb-6 font-medium text-sm">
        <Building2 size={16} />
        <span className="truncate">{college.branch}</span>
      </div>

      <div className="space-y-4 mb-8 pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center group/row">
          <span className="text-slate-400 text-sm font-bold flex items-center gap-2 group-hover/row:text-slate-600 transition-colors">
            <Scale size={16} /> Closing Rank
          </span>
          <span className="font-black text-slate-700">{college.closingRank}</span>
        </div>
        <div className="flex justify-between items-center group/row">
          <span className="text-slate-400 text-sm font-bold flex items-center gap-2 group-hover/row:text-slate-600 transition-colors">
            <Sparkles size={16} /> Probability
          </span>
          <span className={`font-black ${style.text}`}>{college.probability}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link 
          to={`/college/${college.collegeId}`} 
          className="flex items-center justify-center gap-1.5 py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-sm"
        >
          Details
        </Link>
        <button 
          className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all text-sm"
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default Results;
