"use client";

import { motion } from 'framer-motion';
import { cn } from '../src/lib/utils';
import Image from 'next/image';
import { Sparkles, ArrowRight, CheckCircle, Zap, ShieldCheck, TrendingUp, BarChart, Users, DollarSign, Brain, Bot, Rocket, Gem, Lightbulb, Workflow } from 'lucide-react'; // Ensure all icons used are imported
import React, { useState, useEffect, useRef } from 'react';
import * as Dialog from "@radix-ui/react-dialog"; // Importing Radix Dialog

const images = [
  "https://images.pexels.com/photos/19867468/pexels-photo-19867468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Business meeting
  "https://images.pexels.com/photos/7947967/pexels-photo-7947967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Tech office
  "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Data analytics
  "https://images.pexels.com/photos/9028873/pexels-photo-9028873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Financial analysis
  "https://images.pexels.com/photos/8566523/pexels-photo-8566523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // AI tech
  "https://images.pexels.com/photos/8439090/pexels-photo-8439090.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"  // Global team
];

const videos = [
  "https://videos.pexels.com/video-files/4473250/4473250-sd_960_540_30fps.mp4", // Abstract tech
  "https://videos.pexels.com/video-files/33838590/14360600_640_360_30fps.mp4" // Data visualization
];

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


const Tooltip = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="relative inline-block" ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-50 px-3 py-2 text-sm text-obsidian-100 bg-obsidian-800 rounded-md shadow-lg -translate-x-1/2 left-1/2 mt-2 whitespace-nowrap"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};


// Hero Section Component
const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-obsidian-950 to-obsidian-900 text-center p-4">
    <div className="absolute inset-0 z-0 opacity-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src={videos[0]}
      ></video>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-obsidian-900/60 to-obsidian-950/70 z-10"></div>

    {/* Abstract AI Network Globe (CSS-based simulation) */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <motion.div
        className="relative w-[600px] h-[600px] rounded-full flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Core sphere */}
        <div className="absolute w-64 h-64 rounded-full bg-obsidian-700/30 border border-obsidian-600/50 animate-pulse-light"></div>
        {/* Concentric rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`absolute border border-gold-500/20 rounded-full`}
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        ))}
        {/* Connecting lines/particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-300 rounded-full shadow-gold-glow"
              initial={{
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300,
                opacity: 0,
              }}
              animate={{
                x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                y: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div
      className="relative z-20 max-w-4xl mx-auto glass p-8 rounded-3xl shadow-2xl animated-border"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-6xl md:text-8xl font-extrabold text-gold-500 mb-6 leading-tight tracking-tighter">
        Your Company. Fully Autonomous.
      </h1>
      <p className="text-xl md:text-2xl text-obsidian-100 mb-10 max-w-2xl mx-auto">
        Unleash the SOVEREIGN X AI Workforce. Automate 60-80% of operations, drive unprecedented revenue growth, and redefine efficiency.
      </p>
      <div className="flex justify-center space-x-4">
        <Button size="lg" className="flex items-center space-x-2 shadow-gold-glow">
          <span>Deploy Your AI Workforce</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline" className="flex items-center space-x-2">
          <span>Learn More</span>
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  </section>
);

// Explainer Video Section
const ExplainerVideoSection = () => (
  <section className="py-20 md:py-32 bg-obsidian-900 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto px-6"
    >
      <h2 className="text-5xl font-extrabold text-gold-500 mb-6">See SOVEREIGN X in Action</h2>
      <p className="text-xl text-obsidian-200 mb-12 max-w-3xl mx-auto">
        Witness how autonomous AI agents transform sales, marketing, and operations, driving exponential revenue for leading enterprises.
      </p>
      <motion.div
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl glass animated-border mx-auto max-w-4xl"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          controls
          poster="https://images.pexels.com/photos/8566523/pexels-photo-8566523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" // Placeholder image
          src={videos[1]}
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-obsidian-950/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button size="lg" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-8 h-8 mr-2" /> Watch Demo
          </Button>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

// Enterprise Logos Section
const EnterpriseLogos = () => {
  const logos = [
    { src: 'https://cdn.worldvectorlogo.com/logos/salesforce.svg', alt: 'Salesforce' },
    { src: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg', alt: 'Hubspot' },
    { src: 'https://cdn.worldvectorlogo.com/logos/stripe.svg', alt: 'Stripe' },
    { src: 'https://cdn.worldvectorlogo.com/logos/microsoft.svg', alt: 'Microsoft' },
    { src: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg', alt: 'Google Cloud' },
    { src: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg', alt: 'Slack' },
    { src: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', alt: 'AWS' },
  ];

  return (
    <section className="py-16 bg-obsidian-950 border-t border-b border-obsidian-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-xl uppercase tracking-widest text-obsidian-400 font-semibold mb-10">Trusted by Forward-Thinking Enterprises</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="w-32 h-16 relative flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image src={logo.src} alt={logo.alt} fill style={{ objectFit: 'contain' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Revenue Calculator Section (Conceptual)
const RevenueCalculator = () => {
  const [employeesReplaced, setEmployeesReplaced] = useState(60);
  const [avgSalary, setAvgSalary] = useState(75000);
  const [currentRevenue, setCurrentRevenue] = useState(5000000);

  const employeesSaved = Math.round(employeesReplaced / 100 * 100); // Assuming 100-person ops team for simplicity
  const costSavings = employeesSaved * avgSalary;
  const revenueGrowth = currentRevenue * 0.20; // Example: 20% revenue growth from AI optimization
  const totalImpact = costSavings + revenueGrowth;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-obsidian-900 to-obsidian-950 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-gold-500 mb-6">Calculate Your Autonomous ROI</h2>
        <p className="text-xl text-obsidian-200 mb-12 max-w-3xl mx-auto">
          See the tangible financial impact SOVEREIGN X can have on your enterprise's operational costs and revenue streams.
        </p>

        <div className="glass p-8 rounded-3xl shadow-xl animated-border max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-left">
            <div>
              <label htmlFor="employeesReplaced" className="block text-obsidian-100 text-lg font-medium mb-2">
                % Operational Staff Replaced by AI
              </label>
              <input
                type="range"
                id="employeesReplaced"
                min="30"
                max="80"
                step="5"
                value={employeesReplaced}
                onChange={(e) => setEmployeesReplaced(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-700 rounded-lg appearance-none cursor-pointer range-xl"
              />
              <p className="text-sm text-obsidian-400 mt-2">Currently: {employeesReplaced}%</p>
            </div>
            <div>
              <label htmlFor="avgSalary" className="block text-obsidian-100 text-lg font-medium mb-2">
                Avg. Operational Staff Salary ($)
              </label>
              <input
                type="number"
                id="avgSalary"
                min="30000"
                max="150000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label htmlFor="currentRevenue" className="block text-obsidian-100 text-lg font-medium mb-2">
                Current Annual Revenue ($)
              </label>
              <input
                type="number"
                id="currentRevenue"
                min="1000000"
                max="100000000"
                step="1000000"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-obsidian-900 p-8 rounded-2xl border border-obsidian-700 shadow-lg text-center flex flex-col items-center justify-center h-full"
          >
            <h3 className="text-3xl font-bold text-gold-500 mb-4">Projected Annual Impact</h3>
            <div className="text-6xl font-extrabold text-green-400 mb-4 font-mono flex items-center">
              <span className="text-gold-400 text-3xl mr-2">$</span>
              <motion.span
                key={totalImpact}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {totalImpact.toLocaleString()}
              </motion.span>
            </div>
            <p className="text-lg text-obsidian-200">
              <span className="text-gold-300 font-bold">{employeesSaved}</span> operational staff equivalents saved annually.
            </p>
            <p className="text-lg text-obsidian-200">
              Estimated <span className="text-gold-300 font-bold">${costSavings.toLocaleString()}</span> in cost savings.
            </p>
            <p className="text-lg text-obsidian-200">
              Estimated <span className="text-gold-300 font-bold">${revenueGrowth.toLocaleString()}</span> in revenue growth.
            </p>
            <Button className="mt-8">
              Get Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const testimonials = [
  {
    quote: "SOVEREIGN X has fundamentally changed how we approach operations. Our sales cycle is 40% faster, and support costs are down by half. Truly game-changing AI.",
    author: "Dr. Evelyn Reed",
    title: "CEO, Quantum Dynamics Inc.",
    avatar: images[0],
  },
  {
    quote: "The autonomous marketing agents are beyond impressive. We've seen a 300% increase in qualified leads and our ad spend ROI has never been higher.",
    author: "Marcus Thorne",
    title: "CMO, Nova Solutions",
    avatar: images[1],
  },
  {
    quote: "As a CFO, I'm always looking for efficiency. SOVEREIGN X's AI CFO is like having a team of analysts working 24/7, providing unparalleled financial foresight.",
    author: "Sophia Chen",
    title: "CFO, Ascend Global",
    avatar: images[2],
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-32 bg-obsidian-950 text-center">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-5xl font-extrabold text-gold-500 mb-6">What Industry Leaders Say</h2>
      <p className="text-xl text-obsidian-200 mb-12 max-w-3xl mx-auto">
        Don't just take our word for it. Hear from the executives who are already leveraging SOVEREIGN X to dominate their markets.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="glass p-8 rounded-3xl shadow-xl text-left flex flex-col justify-between h-full animated-border"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <p className="text-lg text-obsidian-100 italic mb-6">"{testimonial.quote}"</p>
            <div className="flex items-center mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                <Image src={testimonial.avatar} alt={testimonial.author} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p className="font-bold text-gold-400">{testimonial.author}</p>
                <p className="text-sm text-obsidian-300">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Tiers Section
const pricingTiers = [
  {
    name: "Tier 1: Foundation",
    price: "$4,999",
    per: "month",
    description: "Essential AI automation for growing enterprises.",
    features: [
      "1 x AI Sales Agent",
      "1 x AI Marketing Agent",
      "Basic AI Data Analyst",
      "5,000 AI Token Credits/mo",
      "Standard Automation Flows",
      "Email & Chat Support",
    ],
    cta: "Start Deployment",
    highlight: false,
  },
  {
    name: "Tier 2: Growth Engine",
    price: "$19,999",
    per: "month",
    description: "Accelerated growth with a full suite of autonomous AI.",
    features: [
      "3 x AI Sales Agents",
      "3 x AI Marketing Agents",
      "AI CFO & Data Analyst",
      "25,000 AI Token Credits/mo",
      "Advanced Automation Builder",
      "Dedicated Account Manager",
    ],
    cta: "Accelerate Growth",
    highlight: true,
  },
  {
    name: "Tier 3: Enterprise OS",
    price: "$49,999",
    per: "month",
    description: "Complete operational autonomy and revenue optimization.",
    features: [
      "Unlimited AI Agents",
      "Full AI Workforce Teams",
      "AI Growth Hacker & CFO",
      "100,000 AI Token Credits/mo",
      "Custom AI Workflow Development",
      "24/7 Priority Support",
    ],
    cta: "Request Demo",
    highlight: false,
  },
  {
    name: "Enterprise: Custom",
    price: "Custom",
    per: "Revenue Share (5-10%)",
    description: "Tailored AI solutions for market leaders with revenue share.",
    features: [
      "Unlimited Scalability",
      "On-Premise AI Deployment",
      "Dedicated AI Engineering Team",
      "Custom Tool Integration",
      "Strategic AI Partnership",
      "Executive Onboarding & Support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingSection = () => (
  <section className="py-20 md:py-32 bg-obsidian-900 text-center">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-5xl font-extrabold text-gold-500 mb-6">Simple, Transparent Pricing</h2>
      <p className="text-xl text-obsidian-200 mb-12 max-w-3xl mx-auto">
        Choose the plan that fits your enterprise needs, from foundational automation to a fully autonomous AI operating system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            className={cn(
              "glass p-8 rounded-3xl shadow-xl flex flex-col items-center h-full text-left",
              tier.highlight ? "animated-border border-2 border-gold-500" : "border border-obsidian-700"
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <h3 className="text-3xl font-bold text-gold-400 mb-4">{tier.name}</h3>
            <p className="text-obsidian-300 mb-6 flex-grow">{tier.description}</p>
            <div className="my-6">
              <span className="text-5xl font-extrabold text-gold-500 font-mono">{tier.price}</span>
              {tier.per && <span className="text-lg text-obsidian-200">/{tier.per}</span>}
            </div>
            <ul className="space-y-3 mb-8 text-obsidian-100 text-left w-full flex-grow">
              {tier.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className={cn("w-full mt-auto", tier.highlight ? "bg-gold-500 text-obsidian-950" : "bg-obsidian-700 text-obsidian-50 hover:bg-obsidian-600")}
              size="lg"
            >
              {tier.cta} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// CTA Section
const CTASecion = () => (
  <section className="py-20 md:py-32 bg-gradient-to-tr from-obsidian-950 to-obsidian-700 text-center">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="glass p-10 rounded-3xl shadow-2xl animated-border"
      >
        <h2 className="text-5xl font-extrabold text-gold-500 mb-6">
          Ready to Redefine Your Enterprise?
        </h2>
        <p className="text-xl text-obsidian-100 mb-10 max-w-2xl mx-auto">
          Deploy SOVEREIGN X and unlock unparalleled efficiency, exponential growth, and complete operational autonomy.
        </p>
        <Button size="lg" className="flex items-center space-x-2 mx-auto shadow-gold-glow">
          <span>Start Your Autonomous Journey</span>
          <Rocket className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-obsidian-950 border-t border-obsidian-800 py-12 px-6 text-obsidian-300">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-3xl font-bold text-gold-500 font-mono mb-4">SOVEREIGN X</h3>
        <p className="text-sm">
          The Autonomous AI Workforce & Revenue OS for Enterprises. <br />
          Empowering your business with intelligence and efficiency.
        </p>
        <div className="flex space-x-4 mt-6">
          <a href="#" className="hover:text-gold-500 transition-colors"><Zap className="h-6 w-6" /></a>
          <a href="#" className="hover:text-gold-500 transition-colors"><ShieldCheck className="h-6 w-6" /></a>
          <a href="#" className="hover:text-gold-500 transition-colors"><TrendingUp className="h-6 w-6" /></a>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-obsidian-100 mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-gold-300 transition-colors">Home</a></li>
          <li><a href="/dashboard" className="hover:text-gold-300 transition-colors">Dashboard</a></li>
          <li><a href="/dashboard/agents" className="hover:text-gold-300 transition-colors">AI Agents</a></li>
          <li><a href="/admin" className="hover:text-gold-300 transition-colors">Manage Bookings</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-obsidian-100 mb-4">Contact Us</h4>
        <p className="text-sm mb-2">123 AI Boulevard, Silicon Valley, CA 94043</p>
        <p className="text-sm mb-2">info@sovereignx.ai</p>
        <p className="text-sm">+1 (800) 555-0100</p>
      </div>
    </div>
    <div className="mt-12 text-center text-sm border-t border-obsidian-800 pt-8">
      &copy; {new Date().getFullYear()} SOVEREIGN X. All rights reserved.
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground">
      <HeroSection />
      <ExplainerVideoSection />
      <EnterpriseLogos />
      <RevenueCalculator />
      <TestimonialsSection />
      <PricingSection />
      <CTASecion />
      <Footer />
    </div>
  );
}