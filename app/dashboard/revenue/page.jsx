"use client";

import { motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';
import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Percent, AreaChart, PieChart, LineChart, Target, Lightbulb, BarChart, XCircle } from 'lucide-react'; // Ensure all icons are imported
import { useInView } from 'react-intersection-observer';

// Reusable Button Component (local to this file)
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  const variants = {
    default: "bg-gold-500 text-obsidian-950 hover:bg-gold-400 focus:ring-gold-500",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-900 focus:ring-gold-500",
    ghost: "text-gold-500 hover:bg-obsidian-800 focus:ring-gold-500",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-base",
    sm: "h-9 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  };
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant || "default"],
        sizes[size || "default"],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

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

// Reusable Component: BentoGridItem for consistency
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

// Simplified Chart Component (Manual Tailwind/Framer Motion for Bar Chart)
const BarChartComponent = ({ data, title, primaryColor = "text-gold-500", secondaryColor = "text-obsidian-500" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-64 flex flex-col p-4 bg-obsidian-900 rounded-lg border border-obsidian-800" ref={ref}>
      <h4 className="text-obsidian-100 font-semibold mb-4">{title}</h4>
      <div className="flex-grow flex items-end justify-around gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center justify-end w-full max-w-[40px] group cursor-pointer"
            initial={{ height: 0, opacity: 0 }}
            animate={inView ? { height: `${(item.value / maxValue) * 100}%`, opacity: 1 } : {}}
            transition={{ delay: 0.1 * index, duration: 0.8, ease: "easeOut" }}
          >
            <div className={`relative w-full rounded-t-md ${primaryColor} bg-gold-500 group-hover:bg-gold-400 transition-colors duration-200`}
              style={{ height: `${(item.value / maxValue) * 100}%` }}>
              <span className="absolute -top-6 text-xs text-obsidian-100 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value.toLocaleString()}
              </span>
            </div>
            <span className={`mt-1 text-xs ${secondaryColor} font-mono`}>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Simplified Progress Ring (for Churn, LTV)
const ProgressRing = ({ value, label, primaryColor = "text-gold-500", trackColor = "text-obsidian-700", textColor = "text-gold-300", icon: Icon }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    if (inView) {
      setAnimatedOffset(offset);
    }
  }, [inView, offset]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className={`text-obsidian-700`}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <motion.circle
            className={primaryColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          {Icon && <Icon className="h-6 w-6 mb-1 text-gold-400" />}
          <span className={cn("text-3xl font-bold font-mono", textColor)}>{value}%</span>
        </div>
      </div>
      <p className="mt-2 text-obsidian-200 text-sm">{label}</p>
    </div>
  );
};


export default function RevenueIntelligencePage() {
  // Mock Data
  const [revenueMetrics, setRevenueMetrics] = useState({
    mrr: 1520000,
    churnRate: 3.5,
    customerLTV: 7500,
    upsellProbability: 18,
  });

  const mrrHistory = useMemo(() => [
    { label: 'Jan', value: 800000 }, { label: 'Feb', value: 850000 }, { label: 'Mar', value: 920000 },
    { label: 'Apr', value: 1050000 }, { label: 'May', value: 1150000 }, { label: 'Jun', value: 1300000 },
    { label: 'Jul', value: 1520000 },
  ], []);

  const marketForecastData = useMemo(() => [
    { label: 'Q3', value: 20000000 }, { label: 'Q4', value: 25000000 }, { label: 'Q1', value: 30000000 },
    { label: 'Q2', value: 38000000 },
  ], []);

  const costReductionOpportunities = [
    { id: 1, insight: "Optimize cloud infrastructure spending by 15% through agent 'Chronos'.", savings: "Est. $50,000/quarter" },
    { id: 2, insight: "Reduce customer support ticket volume by 20% with enhanced AI agent 'Aether'.", savings: "Est. $30,000/quarter" },
    { id: 3, insight: "Identify and eliminate redundant SaaS subscriptions via AI CFO analysis.", savings: "Est. $15,000/quarter" },
  ];

  const strategicSuggestions = [
    { id: 1, suggestion: "Target high-LTV customer segments with personalized AI-driven upsell campaigns. Expected 10% LTV increase.", icon: Target },
    { id: 2, suggestion: "Automate onboarding for new enterprises to reduce churn risk and improve activation.", icon: Users },
    { id: 3, suggestion: "Leverage AI-generated content for new market penetration in emerging regions.", icon: Lightbulb },
  ];


  return (
    <div className="p-4 md:p-8 space-y-12">
      <motion.h1
        className="text-5xl font-extrabold text-gold-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Revenue Intelligence
      </motion.h1>

      <p className="text-xl text-obsidian-200 mb-8 max-w-3xl">
        Harness AI-powered insights to understand, predict, and optimize your enterprise's revenue streams.
      </p>

      {/* Key Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <BentoGridItem
          animationDelay={0.1}
          title="Current MRR"
          description="Monthly Recurring Revenue"
          icon={<DollarSign className="h-8 w-8 text-green-400" />}
        >
          <p className="text-5xl font-extrabold text-green-400 font-mono">
            $<AnimatedNumber value={revenueMetrics.mrr} duration={2000} />
          </p>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.2}
          title="Churn Prediction"
          description="AI-projected churn rate"
          icon={<XCircle className="h-8 w-8 text-red-500" />}
        >
          <ProgressRing value={revenueMetrics.churnRate} label="Annual Churn Rate" primaryColor="text-red-500" icon={XCircle} />
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.3}
          title="Customer LTV"
          description="Lifetime Value per customer"
          icon={<Users className="h-8 w-8 text-blue-400" />}
        >
          <p className="text-5xl font-extrabold text-blue-400 font-mono">
            $<AnimatedNumber value={revenueMetrics.customerLTV} duration={1800} />
          </p>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.4}
          title="Upsell Probability"
          description="Likelihood of successful upsells"
          icon={<Percent className="h-8 w-8 text-purple-400" />}
        >
          <ProgressRing value={revenueMetrics.upsellProbability} label="Upsell Likelihood" primaryColor="text-purple-400" icon={TrendingUp} />
        </BentoGridItem>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BentoGridItem
          animationDelay={0.5}
          className="lg:col-span-1 min-h-[350px]"
          title="Monthly Recurring Revenue Trend"
          description="Historical MRR growth over the last 7 months."
          icon={<LineChart className="h-8 w-8 text-obsidian-400" />}
        >
          <BarChartComponent data={mrrHistory} title="MRR Evolution" primaryColor="text-green-500" secondaryColor="text-obsidian-400" />
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.6}
          className="lg:col-span-1 min-h-[350px]"
          title="Market Forecast"
          description="AI-powered market projections for the next 4 quarters."
          icon={<AreaChart className="h-8 w-8 text-obsidian-400" />}
        >
          <BarChartComponent data={marketForecastData} title="Market Projections" primaryColor="text-blue-500" secondaryColor="text-obsidian-400" />
        </BentoGridItem>
      </div>

      {/* AI Insights and Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BentoGridItem
          animationDelay={0.7}
          title="AI-Driven Cost Reduction Opportunities"
          description="Actionable insights to minimize operational expenses."
          icon={<DollarSign className="h-8 w-8 text-red-400" />}
        >
          <ul className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
            {costReductionOpportunities.map((item, index) => (
              <motion.li
                key={item.id}
                className="flex items-start bg-obsidian-800 p-4 rounded-lg border border-obsidian-700 hover:border-gold-500 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                <Lightbulb className="h-5 w-5 mr-3 flex-shrink-0 text-yellow-400" />
                <div>
                  <p className="text-obsidian-100 text-sm font-medium">{item.insight}</p>
                  <p className="text-obsidian-400 text-xs mt-1 font-mono">{item.savings}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </BentoGridItem>

        <BentoGridItem
          animationDelay={0.8}
          title="Strategic Growth Suggestions"
          description="AI-generated strategies to accelerate revenue and market share."
          icon={<Target className="h-8 w-8 text-green-400" />}
        >
          <ul className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
            {strategicSuggestions.map((item, index) => (
              <motion.li
                key={item.id}
                className="flex items-start bg-obsidian-800 p-4 rounded-lg border border-obsidian-700 hover:border-gold-500 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                {React.createElement(item.icon, { className: "h-5 w-5 mr-3 flex-shrink-0 text-purple-400" })}
                <p className="text-obsidian-100 text-sm font-medium">{item.suggestion}</p>
              </motion.li>
            ))}
          </ul>
        </BentoGridItem>
      </div>

      {/* Action CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="glass p-10 rounded-3xl shadow-2xl animated-border text-center mt-12"
      >
        <h2 className="text-4xl font-extrabold text-gold-500 mb-6">
          Ready to Implement Revenue-Boosting Strategies?
        </h2>
        <p className="text-xl text-obsidian-100 mb-8 max-w-2xl mx-auto">
          Take action on AI insights. Deploy new agents or refine automations to capitalize on growth opportunities.
        </p>
        <Button size="lg" className="flex items-center space-x-2 mx-auto shadow-gold-glow">
          <span>Optimize Your AI Workforce</span>
          <TrendingUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}