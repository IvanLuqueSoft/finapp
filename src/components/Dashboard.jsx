import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function Dashboard({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  // Calculate percentages for the bar chart
  const maxVal = Math.max(totalIncome, totalExpenses, 1);
  const incomeHeight = (totalIncome / maxVal) * 100;
  const expenseHeight = (totalExpenses / maxVal) * 100;

  // Prepare data for category list
  const categoryData = Object.entries(expenseByCategory)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
        <p className="text-slate-500 text-sm">Consolidated reporting for the current fiscal period.</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Income" value={totalIncome} icon={<TrendingUp className="text-emerald-600" />} />
        <StatCard label="Total Expenses" value={totalExpenses} icon={<TrendingDown className="text-rose-600" />} />
        <StatCard label="Net Balance" value={netBalance} icon={<Wallet className="text-blue-600" />} highlight />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Simple CSS Bar Chart */}
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Income vs Expenses</h3>
          <div className="h-64 flex items-end justify-around px-10 border-b border-slate-100 pb-2">
            <div className="flex flex-col items-center gap-2 w-24 group">
              <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ${totalIncome.toLocaleString()}
              </div>
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-500"
                style={{ height: `${incomeHeight}%` }}
              ></div>
              <div className="text-xs font-bold text-slate-500 uppercase">Income</div>
            </div>
            <div className="flex flex-col items-center gap-2 w-24 group">
              <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ${totalExpenses.toLocaleString()}
              </div>
              <div 
                className="w-full bg-slate-700 rounded-t transition-all duration-500"
                style={{ height: `${expenseHeight}%` }}
              ></div>
              <div className="text-xs font-bold text-slate-500 uppercase">Expenses</div>
            </div>
          </div>
        </div>

        {/* Category Distribution List (Replacing Pie Chart) */}
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Expenses by Category</h3>
          <div className="h-64 overflow-y-auto pr-2 space-y-4">
            {categoryData.length > 0 ? (
              categoryData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="text-slate-500">${item.value.toLocaleString()} ({item.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-slate-600 h-full rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                No expense data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, highlight }) {
  return (
    <div className={`p-5 border border-slate-200 bg-white ${highlight ? 'border-l-4 border-l-blue-600' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-mono font-bold">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}