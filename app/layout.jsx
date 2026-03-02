"use client";

import './globals.css';
import { Inter, Fira_Mono } from 'next/font/google'; // Import Fira_Mono for futuristic elements
import { ThemeProvider } from '../src/context/ThemeContext'; // Using the specified path
import { cn } from '../src/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Users, DollarSign, Brain, Bot, Network, X, Menu, BriefcaseBusiness, Package2, BarChart3, ReceiptText } from 'lucide-react'; // Ensure all icons are imported

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const firaMono = Fira_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

// Define Navigation Items for the Sidebar
const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: Package2 },
  { name: 'AI Agents', href: '/dashboard/agents', icon: Brain },
  { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
  { name: 'Automation Flows', href: '/dashboard/automations', icon: Network },
  { name: 'Data Intelligence', href: '/dashboard/intelligence', icon: BarChart3 },
  { name: 'AI CFO', href: '/dashboard/cfo', icon: ReceiptText },
];

const secondaryNavigationItems = [
  { name: 'Billing', href: '/dashboard/billing', icon: ReceiptText }, // Re-using for now, but could be a distinct icon
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Admin Panel', href: '/admin', icon: ShieldCheck, adminOnly: true },
];

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [isAdmin, setIsAdmin] = useState(false); // Mock admin state for now

  // In a real app, you'd fetch user role from context/auth
  useEffect(() => {
    // Mocking admin status. In production, this would come from user session.
    const userRole = localStorage.getItem('userRole'); // Example: check local storage
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Helper for conditional classes
  const activeLinkClass = "bg-obsidian-700/50 text-gold-300 border-l-4 border-gold-500";
  const inactiveLinkClass = "text-obsidian-200 hover:bg-obsidian-800 hover:text-gold-300 border-l-4 border-transparent";
  const baseLinkClass = "flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out group";

  return (
    <html lang="en" className={cn("dark", inter.variable, firaMono.variable)}>
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col md:flex-row relative">
            {/* Top Bar for Mobile */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian-950/90 backdrop-blur-md border-b border-obsidian-800 p-4 flex items-center justify-between md:hidden">
              <a href="/" className="text-2xl font-bold text-gold-500 font-mono tracking-wider">SOVEREIGN X</a>
              <button onClick={toggleSidebar} className="p-2 text-obsidian-100 hover:text-gold-300 transition-colors rounded-md hover:bg-obsidian-800">
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </header>

            {/* Sidebar */}
            <AnimatePresence>
              {(isSidebarOpen || window.innerWidth >= 768) && (
                <motion.aside
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="fixed inset-y-0 left-0 z-40 w-64 bg-obsidian-900/95 backdrop-blur-xl border-r border-obsidian-800 p-6 flex flex-col overflow-y-auto shadow-xl md:static md:translate-x-0 md:shadow-none md:top-0 md:pt-4 md:pb-4 pt-20"
                >
                  <div className="flex items-center justify-between mb-8 md:justify-center">
                    <a href="/" className="text-3xl font-bold text-gold-500 font-mono tracking-wider">SOVEREIGN X</a>
                    {window.innerWidth < 768 && (
                      <button onClick={toggleSidebar} className="p-2 text-obsidian-100 hover:text-gold-300 transition-colors rounded-md hover:bg-obsidian-800">
                        <X size={24} />
                      </button>
                    )}
                  </div>

                  <nav className="flex-grow space-y-4">
                    <ul className="space-y-2">
                      {navigationItems.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={cn(baseLinkClass, window.location.pathname === item.href ? activeLinkClass : inactiveLinkClass)}
                            onClick={toggleSidebar}
                          >
                            <item.icon className="h-5 w-5 text-obsidian-300 group-hover:text-gold-400 transition-colors" />
                            <span className="text-lg font-medium">{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-obsidian-800 pt-4 mt-4">
                      <h3 className="text-xs font-semibold uppercase text-obsidian-400 mb-2 px-4">Management</h3>
                      <ul className="space-y-2">
                        {secondaryNavigationItems.map((item) => (
                          (!item.adminOnly || isAdmin) && (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={cn(baseLinkClass, window.location.pathname === item.href ? activeLinkClass : inactiveLinkClass)}
                                onClick={toggleSidebar}
                              >
                                <item.icon className="h-5 w-5 text-obsidian-300 group-hover:text-gold-400 transition-colors" />
                                <span className="text-lg font-medium">{item.name}</span>
                              </a>
                            </li>
                          )
                        ))}
                         <li>
                          <a
                            href="/admin"
                            className={cn(baseLinkClass, window.location.pathname === '/admin' ? activeLinkClass : inactiveLinkClass)}
                            onClick={toggleSidebar}
                          >
                            <BriefcaseBusiness className="h-5 w-5 text-obsidian-300 group-hover:text-gold-400 transition-colors" />
                            <span className="text-lg font-medium">Manage Bookings</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>

                  {/* User Profile / Footer */}
                  <div className="mt-auto pt-6 border-t border-obsidian-800">
                    <div className="flex items-center space-x-3 p-4">
                      <div className="h-10 w-10 bg-gold-600 rounded-full flex items-center justify-center text-obsidian-950 font-bold">A</div>
                      <div>
                        <p className="text-obsidian-50 text-sm font-semibold">Admin User</p>
                        <p className="text-obsidian-400 text-xs">admin@sovereignx.ai</p>
                      </div>
                    </div>
                    {/* Add logout button here if needed */}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto md:ml-64 p-4 md:p-8 pt-20 md:pt-8 custom-scrollbar">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}