"use client";

import { motion } from 'framer-motion';
import { cn } from '../../src/lib/utils';
import React, { useState, useEffect } from 'react';
import { DollarSign, Zap, Activity, Users, Target, Rocket, RefreshCcw, Bell, Lightbulb, TrendingUp, BarChart, Package2, ShieldCheck, Mail, Bot, Network, BriefcaseBusiness, PackageMinus, Wallet, Percent, AreaChart, PieChart, LineChart } from 'lucide-react'; // Ensure all icons are imported
import { useInView } from 'react-intersection-observer';

const images = [
  "https://images.pexels.com/photos/19867468/pexels-photo-19867468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/7947967/pexels-photo-7947967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/9028873/pexels-photo-9028873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
];

// Reusable Component: AnimatedNumber
const AnimatedNumber = ({ value, duration = 1500, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration, inView]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};


// Reusable Component: BentoGridItem
const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: animationDelay, duration: 0.6, ease: "easeOut" }}
      className={cn(
        "glass animated-border group/bento transition duration-200 shadow-xl rounded-3xl flex flex-col justify-between space-y-4 p-6",
        className
      )}
    >
      {header && <div className="flex-shrink-0">{header}</div>}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {icon && <div className="mb-4 text-gold-400">{icon}</div>}
        <div className="font-bold text-gold-300 mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="font-normal text-obsidian-200 text-sm">
          {description}
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
};


export default function DashboardPage() {
  // Mock data for the dashboard
  const [dashboardData, setDashboardData] = useState({
    mrr: 1520000,
    activeAgents: 45,
    tasksCompleted: 8760,
    weeklyGrowth: 1.08, // 8% growth
    revenueForecast: 20000000,
    riskAlerts: 3,
  });

  // Simulate real-time updates for MRR
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData((prevData) => ({
        ...prevData,
        mrr: prevData.mrr + Math.floor(Math.random() * 500) - 200, // Fluctuate MRR
        tasksCompleted: prevData.tasksCompleted + Math.floor(Math.random() * 5) + 1,
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const alerts = [
    { id: 1, message: "Sales agent 'Apollo' detected low engagement in Q3 leads. Suggesting re-engagement strategy.", type: "warning", icon: Lightbulb },
    { id: 2, message: "Security alert: Unusual access attempt detected on API endpoint.", type: "danger", icon: ShieldCheck },
    { id: 3, message: "Marketing campaign 'Aurora' exceeded budget by 5%. Review performance.", type: "info", icon: DollarSign },
  ];

  const recentActivities = [
    { id: 1, agent: "Athena (Sales)", action: "Closed deal with 'GlobalCorp'", timestamp: "2 minutes ago", icon: BriefcaseBusiness },
    { id: 2, agent: "Hermes (Marketing)", action: "Launched 'Q4 Demand Gen' campaign", timestamp: "15 minutes ago", icon: Rocket },
    { id: 3, agent: "Chronos (CFO)", action: "Generated Q3 financial report", timestamp: "1 hour ago", icon: Wallet },
    { id: 4, agent: "Aether (Support)", action: "Resolved 'Ticket #7890'", timestamp: "3 hours ago", icon: Mail },
    { id: 5, agent: "Orion (Data)", action: "Identified churn risk in 'Tier 1 Client A'", timestamp: "1 day ago", icon: PackageMinus },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12">
      <motion.h1
        className="text-5xl font-extrabold text-gold-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        SOVEREIGN X Dashboard
      </motion.h1>

      {/* Main Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <BentoGridItem
          animationDelay={0.1}
          className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[250px] flex flex-col justify-end"
          title="Real-time MRR"
          description="Monthly Recurring Revenue performance."
          icon={<DollarSign className="h-8 w-8 text-green-400" />}
        >
          <p className="text-6xl md:text-7xl font-extrabold text-green-400 font-mono flex items-baseline">
            $<AnimatedNumber value={dashboardData.mrr} duration={2000} />
          </p>
          <p className="text-lg text-obsidian-200 mt-2">
            <span className="text-emerald-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> {((dashboardData.weeklyGrowth - 1) * 100).toFixed(1)}% this week
            </span>
          </p>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.2}
          title="Active AI Agents"
          description="Operational agents across your enterprise."
          icon={<Bot className="h-8 w-8 text-primary" />}
        >
          <p className="text-5xl font-extrabold text-gold-300 font-mono">
            <AnimatedNumber value={dashboardData.activeAgents} duration={1800} />
          </p>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.3}
          title="Tasks Completed"
          description="Total automated tasks executed by AI workforce."
          icon={<Zap className="h-8 w-8 text-blue-400" />}
        >
          <p className="text-5xl font-extrabold text-gold-300 font-mono">
            <AnimatedNumber value={dashboardData.tasksCompleted} duration={1700} />
          </p>
        </BentoGridItem>
      </div>

      {/* Mid-Section: Growth Predictions & Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BentoGridItem
          animationDelay={0.4}
          className="lg:col-span-2 min-h-[300px]"
          title="Growth & Revenue Projections"
          description="AI-powered forecast for the next 12 months."
          icon={<BarChart className="h-8 w-8 text-gold-400" />}
        >
          <div className="h-48 w-full bg-obsidian-800 rounded-lg p-4 flex items-end justify-between overflow-hidden relative">
            {/* Simple bar chart simulation */}
            {Array.from({ length: 12 }).map((_, i) => {
              const height = (50 + Math.sin(i * 0.5) * 40 + Math.random() * 30) + '%';
              const color = `hsl(${220 + i * 5} 70% 50%)`;
              return (
                <motion.div
                  key={i}
                  className="w-[6%] bg-obsidian-500 rounded-sm hover:bg-gold-500 transition-colors duration-200 cursor-pointer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: height, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  style={{ backgroundColor: color }}
                />
              );
            })}
            <div className="absolute top-2 left-4 text-obsidian-100 text-3xl font-bold font-mono">
              ${(dashboardData.revenueForecast / 1000000).toFixed(1)}M
            </div>
            <div className="absolute bottom-2 left-4 text-obsidian-400 text-xs">Monthly Revenue</div>
          </div>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.5}
          title="Critical Risk Alerts"
          description="Immediate attention required for these system and operational alerts."
          icon={<Bell className="h-8 w-8 text-red-500" />}
        >
          <div className="space-y-4">
            {alerts.slice(0, 3).map((alert) => (
              <motion.div
                key={alert.id}
                className="flex items-start bg-obsidian-800 p-4 rounded-lg border border-obsidian-700 hover:border-gold-500 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                <alert.icon className={cn("h-5 w-5 mr-3 flex-shrink-0", {
                  "text-amber-400": alert.type === "warning",
                  "text-red-500": alert.type === "danger",
                  "text-blue-400": alert.type === "info",
                })} />
                <p className="text-obsidian-100 text-sm flex-grow">{alert.message}</p>
              </motion.div>
            ))}
          </div>
        </BentoGridItem>
      </div>

      {/* Bottom Section: Recent Activities & AI Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BentoGridItem
          animationDelay={0.6}
          title="Recent AI Activity Log"
          description="Autonomous agent actions and critical events."
          icon={<Activity className="h-8 w-8 text-blue-300" />}
        >
          <ul className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
            {recentActivities.map((activity) => (
              <motion.li
                key={activity.id}
                className="flex items-center bg-obsidian-800 p-3 rounded-lg border border-obsidian-700 group hover:border-gold-500 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                <activity.icon className="h-5 w-5 mr-3 text-obsidian-300 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                <div className="flex-grow">
                  <p className="text-obsidian-100 font-medium text-sm">{activity.agent}: {activity.action}</p>
                  <p className="text-obsidian-400 text-xs">{activity.timestamp}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.7}
          title="AI Agent Performance Leaderboard"
          description="Top-performing AI agents by efficiency and goal achievement."
          icon={<Target className="h-8 w-8 text-purple-400" />}
        >
          <div className="space-y-4">
            {[
              { name: "Athena (Sales)", score: 98, icon: BriefcaseBusiness },
              { name: "Hermes (Marketing)", score: 95, icon: Rocket },
              { name: "Chronos (CFO)", score: 92, icon: Wallet },
            ].map((agent, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-obsidian-800 p-3 rounded-lg border border-obsidian-700 hover:border-gold-500 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                <agent.icon className="h-5 w-5 mr-3 text-obsidian-300 flex-shrink-0" />
                <span className="flex-grow text-obsidian-100 font-medium text-sm">{agent.name}</span>
                <div className="w-24 bg-obsidian-700 rounded-full h-2">
                  <motion.div
                    className="bg-gold-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.score}%` }}
                    transition={{ delay: 1 + index * 0.2, duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <span className="ml-3 text-gold-300 font-mono text-sm">{agent.score}%</span>
              </motion.div>
            ))}
          </div>
        </BentoGridItem>
      </div>

      {/* Quick Action Buttons */}
      <motion.div
        className="flex justify-center flex-wrap gap-6 mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <QuickActionButton icon={<Bot className="h-6 w-6" />} text="Deploy New AI Agent" link="/dashboard/agents" />
        <QuickActionButton icon={<Network className="h-6 w-6" />} text="Build Automation Flow" link="/dashboard/automations" />
        <QuickActionButton icon={<TrendingUp className="h-6 w-6" />} text="Review Revenue Insights" link="/dashboard/revenue" />
        <QuickActionButton icon={<RefreshCcw className="h-6 w-6" />} text="Sync Data" />
      </motion.div>
    </div>
  );
}


// Quick Action Button Component (local to this file)
const QuickActionButton = ({ icon, text, link }) => (
  <motion.a
    href={link || "#"}
    className="group glass p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center animated-border text-center w-40 h-40 transform hover:scale-105 transition-all duration-300 ease-in-out"
    whileHover={{ translateY: -5 }}
  >
    <div className="text-gold-400 group-hover:text-gold-300 transition-colors mb-3">
      {icon}
    </div>
    <span className="text-obsidian-100 text-sm font-semibold group-hover:text-gold-500 transition-colors">
      {text}
    </span>
  </motion.a>
);