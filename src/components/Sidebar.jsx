import React from 'react';
import { LayoutDashboard, ArrowUpCircle, ArrowDownCircle, History, Landmark } from 'lucide-react';
import { clsx } from 'clsx';

export default function Sidebar({ currentView, setView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'income', label: 'Income Management', icon: ArrowUpCircle },
    { id: 'expenses', label: 'Expense Management', icon: ArrowDownCircle },
    { id: 'history', label: 'Transaction History', icon: History },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Landmark className="w-6 h-6 text-blue-500" />
        <span className="font-bold text-white tracking-tight uppercase text-sm">Enterprise Ledger v1.0</span>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={clsx(
              "w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
              currentView === item.id 
                ? "bg-blue-600 text-white" 
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
        System Status: Operational
      </div>
    </aside>
  );
}