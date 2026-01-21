import React, { useState } from 'react';
import { Trash2, ArrowUpDown } from 'lucide-react';
import { clsx } from 'clsx';

export default function History({ transactions, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      const valA = a.type === 'expense' ? -a.amount : a.amount;
      const valB = b.type === 'expense' ? -b.amount : b.amount;
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
        <p className="text-slate-500 text-sm">Unified chronological audit log of all financial activities.</p>
      </header>

      <div className="bg-white border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th 
                className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500 cursor-pointer hover:bg-slate-100"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center gap-2">Date <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Type</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Category/Source</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Description</th>
              <th 
                className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500 text-right cursor-pointer hover:bg-slate-100"
                onClick={() => requestSort('amount')}
              >
                <div className="flex items-center justify-end gap-2">Amount <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500 text-center w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedTransactions.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-mono">{tx.date}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={clsx(
                    "px-2 py-0.5 text-[10px] font-bold uppercase border",
                    tx.type === 'income' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                  )}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{tx.category}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{tx.description}</td>
                <td className={clsx(
                  "px-4 py-3 text-sm font-bold text-right",
                  tx.type === 'income' ? "text-emerald-600" : "text-rose-600"
                )}>
                  {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => onDelete(tx.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}