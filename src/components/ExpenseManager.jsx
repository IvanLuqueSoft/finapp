import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ExpenseManager({ transactions, onAdd, onDelete }) {
  const [formData, setFormData] = useState({ amount: '', category: 'Rent', description: '', date: new Date().toISOString().split('T')[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    onAdd({ ...formData, id: uuidv4(), type: 'expense' });
    setFormData({ amount: '', category: 'Rent', description: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Expense Management</h1>
        <p className="text-slate-500 text-sm">Monitor and categorize all operational expenditures.</p>
      </header>

      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Add New Expense</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Amount ($)</label>
            <input 
              type="number" 
              className="w-full border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Category</label>
            <select 
              className="w-full border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Rent</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Healthcare</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Expense details"
              required
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-slate-900 text-white text-sm font-bold py-2 hover:bg-slate-800 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> RECORD EXPENSE
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Date</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Category</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Description</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500 text-right">Amount</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500 text-center w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-mono">{tx.date}</td>
                <td className="px-4 py-3 text-sm">{tx.category}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{tx.description}</td>
                <td className="px-4 py-3 text-sm font-bold text-rose-600 text-right">-${Number(tx.amount).toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => onDelete(tx.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-400 text-sm italic">No expense records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}