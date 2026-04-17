import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <GraduationCap className="text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl tracking-tight">College<span className="text-blue-600">Decision</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/results" className="hover:text-blue-600 transition-colors">Predictions</Link>
          <Link to="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Login</button>
          <button className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
