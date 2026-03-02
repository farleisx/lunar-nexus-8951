import React from 'react';
import { useTheme } from './context/ThemeContext'; // Assuming ThemeContext is directly available
import { cn } from './lib/utils'; // Assuming utils is directly available

function App() {
  const { theme } = useTheme();

  return (
    <div className={cn("min-h-screen bg-background text-foreground transition-colors duration-300", theme)}>
      <header className="py-4 px-6 border-b border-gray-800 flex justify-between items-center bg-obsidian-950/70 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-gold-500 font-mono">SOVEREIGN X</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-obsidian-100 hover:text-gold-300 transition-colors">Home</a></li>
            <li><a href="#" className="text-obsidian-100 hover:text-gold-300 transition-colors">About</a></li>
            <li><a href="#" className="text-obsidian-100 hover:text-gold-300 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="p-8 text-center">
        <h2 className="text-5xl font-extrabold text-gold-500 mb-4 animate-fade-in">Welcome to SOVEREIGN X</h2>
        <p className="text-xl text-obsidian-200">The Autonomous AI Workforce & Revenue OS for Enterprises</p>
        <button className="mt-8 px-8 py-3 bg-gold-500 text-obsidian-950 font-bold rounded-lg shadow-lg hover:bg-gold-400 transition-all duration-300 transform hover:scale-105">
          Deploy Your AI Workforce
        </button>
      </main>
    </div>
  );
}

export default App;