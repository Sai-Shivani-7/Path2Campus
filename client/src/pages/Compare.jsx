import React from 'react';
import { ArrowLeft, GitCompare, Building2, Package, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Compare = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 gap-1 mb-2">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900">Compare <span className="text-blue-600">Institutes</span></h1>
        <p className="text-slate-500 mt-2 text-lg">Select up to 3 colleges to compare side-by-side.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((slot) => (
          <div key={slot} className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-row items-center justify-center min-h-[400px] hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Building2 size={32} />
              </div>
              <p className="font-bold text-slate-400 group-hover:text-blue-600">Add College to Compare</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <GitCompare className="text-blue-600" />
          <h2 className="text-xl font-bold">Comparison Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Features</th>
                <th className="p-6 text-sm font-bold text-slate-900 border-l border-slate-100">- - -</th>
                <th className="p-6 text-sm font-bold text-slate-900 border-l border-slate-100">- - -</th>
                <th className="p-6 text-sm font-bold text-slate-900 border-l border-slate-100">- - -</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <ComparisonRow icon={<GraduationCap size={18}/>} label="Average Salary" />
              <ComparisonRow icon={<Package size={18}/>} label="ROI Score" />
              <ComparisonRow icon={<Building2 size={18}/>} label="Campus Size" />
              <ComparisonRow icon={<Package size={18}/>} label="Placement %" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ComparisonRow = ({ label, icon }) => (
  <tr>
    <td className="p-6 font-semibold flex items-center gap-3 text-slate-600">
      <span className="p-1.5 bg-slate-50 rounded-lg text-slate-400">{icon}</span>
      {label}
    </td>
    <td className="p-6 text-slate-400 border-l border-slate-100">---</td>
    <td className="p-6 text-slate-400 border-l border-slate-100">---</td>
    <td className="p-6 text-slate-400 border-l border-slate-100">---</td>
  </tr>
);

export default Compare;
