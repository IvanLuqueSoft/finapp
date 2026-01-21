import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import IncomeManager from './components/IncomeManager.jsx';
import ExpenseManager from './components/ExpenseManager.jsx';
import History from './components/History.jsx';
import './styles.css';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'income', amount: 5000, category: 'Salary', description: 'Monthly Salary', date: '2023-10-01' },
    { id: '2', type: 'expense', amount: 1200, category: 'Rent', description: 'October Rent', date: '2023-10-02' },
    { id: '3', type: 'expense', amount: 150, category: 'Utilities', description: 'Electricity Bill', date: '2023-10-05' },
    { id: '4', type: 'income', amount: 200, category: 'Freelance', description: 'Logo Design', date: '2023-10-10' },
  ]);

  const addTransaction = (tx) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] text-[#1e293b] font-sans antialiased">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {view === 'dashboard' && (
            <Dashboard transactions={transactions} />
          )}
          {view === 'income' && (
            <IncomeManager 
              transactions={transactions.filter(t => t.type === 'income')} 
              onAdd={addTransaction} 
              onDelete={deleteTransaction} 
            />
          )}
          {view === 'expenses' && (
            <ExpenseManager 
              transactions={transactions.filter(t => t.type === 'expense')} 
              onAdd={addTransaction} 
              onDelete={deleteTransaction} 
            />
          )}
          {view === 'history' && (
            <History 
              transactions={transactions} 
              onDelete={deleteTransaction} 
            />
          )}
        </div>
      </main>
    </div>
  );
}