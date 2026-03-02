"use client";

import { motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';
import React, { useState, useEffect, useMemo } from 'react';
import { Bot, PlusCircle, Settings, Trash2, Edit, CheckCircle, XCircle, ArrowRight, Book, Activity, Memory, Zap, Target, Search, Filter, PlayCircle, PauseCircle, Loader, Cloud, Database, Code, RefreshCcw } from 'lucide-react'; // Ensure all icons are imported
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Reusable Button Component (local to this file)
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  const variants = {
    default: "bg-gold-500 text-obsidian-950 hover:bg-gold-400 focus:ring-gold-500",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-900 focus:ring-gold-500",
    ghost: "text-gold-500 hover:bg-obsidian-800 focus:ring-gold-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
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

// Mock AI Agents Data
const initialAgents = [
  {
    id: 'agent-1',
    name: 'Apollo',
    role: 'Sales',
    status: 'active',
    goals: ['Increase Q3 deal closures by 15%', 'Expand market reach in APAC'],
    kpis: ['Deal Closure Rate: 12%', 'Lead-to-Opportunity Ratio: 30%'],
    permissions: { email: true, crm: true, ads: false },
    reasoningLog: [
      { timestamp: '2024-07-26T10:30:00Z', event: 'Started outreach campaign for Q3 leads.' },
      { timestamp: '2024-07-26T11:15:00Z', event: 'Identified 5 high-potential prospects via intent data.' },
      { timestamp: '2024-07-26T12:00:00Z', event: 'Scheduled follow-up meetings for 2 prospects.' },
      { timestamp: '2024-07-26T14:45:00Z', event: 'Updated CRM with latest interaction notes.' },
    ],
  },
  {
    id: 'agent-2',
    name: 'Hermes',
    role: 'Marketing',
    status: 'paused',
    goals: ['Generate 1000 MQLs in Q3', 'Improve website conversion rate by 5%'],
    kpis: ['MQLs per month: 250', 'Website Conversion Rate: 3%'],
    permissions: { email: true, crm: true, ads: true },
    reasoningLog: [
      { timestamp: '2024-07-25T09:00:00Z', event: 'Launched targeted social media ad campaign.' },
      { timestamp: '2024-07-25T10:00:00Z', event: 'Published new blog post on "AI in Enterprise".' },
      { timestamp: '2024-07-25T11:30:00Z', event: 'Analyzed campaign performance data.' },
      { timestamp: '2024-07-25T15:00:00Z', event: 'Paused campaign due to budget constraint.' },
    ],
  },
  {
    id: 'agent-3',
    name: 'Chronos',
    role: 'CFO',
    status: 'active',
    goals: ['Reduce operational expenses by 10%', 'Optimize cash flow forecasting accuracy'],
    kpis: ['Expense-to-Revenue Ratio: 35%', 'Forecast Accuracy: 90%'],
    permissions: { email: false, crm: false, ads: false, finance: true },
    reasoningLog: [
      { timestamp: '2024-07-26T09:00:00Z', event: 'Initiated expense review for Q2.' },
      { timestamp: '2024-07-26T10:00:00Z', event: 'Generated cash flow projection for next month.' },
      { timestamp: '2024-07-26T11:00:00Z', event: 'Identified potential cost-saving areas in cloud infrastructure.' },
    ],
  },
];

// Schema for New Agent Form Validation
const newAgentSchema = z.object({
  name: z.string().min(2, { message: "Agent name is required." }),
  role: z.string().min(1, { message: "Agent role is required." }),
  systemPrompt: z.string().min(20, { message: "System prompt must be at least 20 characters." }),
  goals: z.string().optional(), // Comma separated string for simplicity
  kpis: z.string().optional(), // Comma separated string
  permissionsEmail: z.boolean().default(false),
  permissionsCrm: z.boolean().default(false),
  permissionsAds: z.boolean().default(false),
  permissionsFinance: z.boolean().default(false),
});

export default function AIAgentsPage() {
  const [agents, setAgents] = useState(initialAgents);
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [openEditAgentDialog, setOpenEditAgentDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(newAgentSchema),
  });

  // Filtered and Memoized Agents
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            agent.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || agent.role.toLowerCase() === filterRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }, [agents, searchTerm, filterRole]);

  const handleCreateAgent = async (data) => {
    console.log("Creating agent with data:", data);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newAgent = {
        id: crypto.randomUUID(),
        name: data.name,
        role: data.role,
        status: 'active', // Default to active on creation
        goals: data.goals ? data.goals.split(',').map(s => s.trim()) : [],
        kpis: data.kpis ? data.kpis.split(',').map(s => s.trim()) : [],
        permissions: {
          email: data.permissionsEmail,
          crm: data.permissionsCrm,
          ads: data.permissionsAds,
          finance: data.permissionsFinance,
        },
        reasoningLog: [{ timestamp: new Date().toISOString(), event: 'Agent initialized and deployed.' }],
      };
      setAgents((prev) => [...prev, newAgent]);
      setOpenNewAgentDialog(false);
      reset(); // Clear form
    } catch (error) {
      console.error('Error creating agent:', error);
      // Handle error, show toast
    }
  };

  const handleEditAgent = async (data) => {
    if (!selectedAgent) return;
    console.log("Updating agent with data:", data);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === selectedAgent.id
            ? {
                ...agent,
                name: data.name,
                role: data.role,
                systemPrompt: data.systemPrompt, // Assuming system prompt is editable
                goals: data.goals ? data.goals.split(',').map(s => s.trim()) : agent.goals,
                kpis: data.kpis ? data.kpis.split(',').map(s => s.trim()) : agent.kpis,
                permissions: {
                  email: data.permissionsEmail,
                  crm: data.permissionsCrm,
                  ads: data.permissionsAds,
                  finance: data.permissionsFinance,
                },
              }
            : agent
        )
      );
      setOpenEditAgentDialog(false);
      setSelectedAgent(null);
      reset();
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  const handleDeleteAgent = (agentId) => {
    if (window.confirm("Are you sure you want to delete this AI Agent? This action cannot be undone.")) {
      setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    }
  };

  const handleToggleAgentStatus = (agentId) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
          : agent
      )
    );
  };

  // Populate edit form when selectedAgent changes
  useEffect(() => {
    if (selectedAgent) {
      setValue('name', selectedAgent.name);
      setValue('role', selectedAgent.role);
      // Mock system prompt as it's not stored in the initial mock data
      setValue('systemPrompt', "You are an advanced AI agent configured for enterprise operations. Your primary directive is to optimize revenue generation and operational efficiency for the company. Always adhere to ethical guidelines and company policies. Adapt and learn from interactions to improve performance over time.");
      setValue('goals', selectedAgent.goals.join(', '));
      setValue('kpis', selectedAgent.kpis.join(', '));
      setValue('permissionsEmail', selectedAgent.permissions.email);
      setValue('permissionsCrm', selectedAgent.permissions.crm);
      setValue('permissionsAds', selectedAgent.permissions.ads);
      setValue('permissionsFinance', selectedAgent.permissions.finance);
    }
  }, [selectedAgent, setValue]);

  return (
    <div className="p-4 md:p-8 space-y-12">
      <motion.h1
        className="text-5xl font-extrabold text-gold-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI Agents Management
      </motion.h1>

      <p className="text-xl text-obsidian-200 mb-8 max-w-3xl">
        Deploy, configure, and monitor your autonomous AI workforce. Each agent is goal-driven, memory-enabled, and revenue-optimized.
      </p>

      {/* Controls & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 glass p-6 rounded-2xl shadow-lg animated-border"
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Search className="h-5 w-5 text-obsidian-400" />
          <input
            type="text"
            placeholder="Search agents by name or role..."
            className="flex-grow p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="h-5 w-5 text-obsidian-400" />
          <Select.Root value={filterRole} onValueChange={setFilterRole}>
            <Select.Trigger className="flex items-center justify-between p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 focus:outline-none focus:ring-2 focus:ring-gold-500 w-full md:w-40">
              <Select.Value aria-label={filterRole}>
                {filterRole === 'all' ? 'All Roles' : filterRole.charAt(0).toUpperCase() + filterRole.slice(1)}
              </Select.Value>
              <Select.Icon className="ml-2">
                <ArrowRight className="h-4 w-4 transform rotate-90 text-obsidian-300" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-obsidian-800 rounded-md shadow-lg overflow-hidden border border-obsidian-700 z-50">
                <Select.Viewport className="p-1">
                  <Select.Item value="all" className="p-2 text-obsidian-100 hover:bg-obsidian-700 cursor-pointer rounded-md">
                    <Select.ItemText>All Roles</Select.ItemText>
                  </Select.Item>
                  {['Sales', 'Marketing', 'CFO', 'Support', 'Data Analyst', 'Growth Hacker'].map((role) => (
                    <Select.Item key={role} value={role.toLowerCase()} className="p-2 text-obsidian-100 hover:bg-obsidian-700 cursor-pointer rounded-md">
                      <Select.ItemText>{role}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <Dialog.Root open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}>
          <Dialog.Trigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" /> Deploy New Agent
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-obsidian-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 animated-border glass custom-scrollbar overflow-y-auto">
              <Dialog.Title className="text-3xl font-bold text-gold-500 mb-6 border-b border-obsidian-800 pb-3">Deploy New AI Agent</Dialog.Title>
              <form onSubmit={handleSubmit(handleCreateAgent)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-obsidian-100 text-sm font-medium mb-2">Agent Name</label>
                  <input
                    id="name"
                    {...register('name')}
                    className={cn(
                      "w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.name ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-2">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="role" className="block text-obsidian-100 text-sm font-medium mb-2">Agent Role</label>
                  <Select.Root defaultValue="" {...register('role')}>
                    <Select.Trigger className={cn(
                      "flex items-center justify-between w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.role ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}>
                      <Select.Value placeholder="Select a role..." />
                      <Select.Icon className="ml-2">
                        <ArrowRight className="h-4 w-4 transform rotate-90 text-obsidian-300" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-obsidian-800 rounded-md shadow-lg overflow-hidden border border-obsidian-700 z-50">
                        <Select.Viewport className="p-1">
                          {['Sales', 'Marketing', 'CFO', 'Support', 'Data Analyst', 'Growth Hacker'].map((role) => (
                            <Select.Item key={role} value={role} className="p-2 text-obsidian-100 hover:bg-obsidian-700 cursor-pointer rounded-md">
                              <Select.ItemText>{role}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  {errors.role && <p className="text-destructive text-sm mt-2">{errors.role.message}</p>}
                </div>

                <div>
                  <label htmlFor="systemPrompt" className="block text-obsidian-100 text-sm font-medium mb-2">System Prompt</label>
                  <textarea
                    id="systemPrompt"
                    {...register('systemPrompt')}
                    rows="5"
                    placeholder="Define the core directives and persona of this AI agent..."
                    className={cn(
                      "w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.systemPrompt ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}
                  ></textarea>
                  {errors.systemPrompt && <p className="text-destructive text-sm mt-2">{errors.systemPrompt.message}</p>}
                </div>

                <div>
                  <label htmlFor="goals" className="block text-obsidian-100 text-sm font-medium mb-2">Goals (comma-separated)</label>
                  <input
                    id="goals"
                    {...register('goals')}
                    placeholder="e.g., Increase Q3 deal closures by 15%, Expand market reach"
                    className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="kpis" className="block text-obsidian-100 text-sm font-medium mb-2">KPIs (comma-separated)</label>
                  <input
                    id="kpis"
                    {...register('kpis')}
                    placeholder="e.g., Deal Closure Rate: 12%, Lead-to-Opportunity Ratio: 30%"
                    className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-obsidian-100 mb-2">Automation Permissions</h3>
                  <div className="flex items-center justify-between">
                    <label htmlFor="permissionsEmail" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-obsidian-400" /> Email Sending Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="permissionsEmail"
                      {...register('permissionsEmail')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="permissionsCrm" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-obsidian-400" /> CRM Update Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="permissionsCrm"
                      {...register('permissionsCrm')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="permissionsAds" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-obsidian-400" /> Paid Ads Management Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="permissionsAds"
                      {...register('permissionsAds')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="permissionsFinance" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-obsidian-400" /> Financial System Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="permissionsFinance"
                      {...register('permissionsFinance')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <Dialog.Close asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Deploy Agent
                  </Button>
                </div>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-obsidian-400 hover:text-gold-500" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </motion.div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-4 text-center p-10 glass rounded-3xl text-obsidian-200"
          >
            <Bot className="h-12 w-12 mx-auto mb-4 text-obsidian-400" />
            <p className="text-xl font-medium">No AI Agents found matching your criteria.</p>
            <p className="text-obsidian-300 mt-2">Try adjusting your search or deploy a new agent!</p>
          </motion.div>
        ) : (
          filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="glass p-6 rounded-3xl shadow-lg flex flex-col animated-border transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Bot className="h-7 w-7 text-gold-500" />
                  <h3 className="text-2xl font-bold text-gold-300">{agent.name}</h3>
                </div>
                <span className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full",
                  agent.status === 'active' ? "bg-emerald-600/20 text-emerald-400" : "bg-yellow-600/20 text-yellow-400"
                )}>
                  {agent.status.toUpperCase()}
                </span>
              </div>
              <p className="text-obsidian-200 text-sm mb-4">Role: <span className="font-medium text-obsidian-50">{agent.role}</span></p>

              <div className="space-y-3 mb-4 flex-grow">
                <div>
                  <h4 className="flex items-center text-obsidian-100 font-semibold mb-2">
                    <Target className="h-4 w-4 mr-2 text-obsidian-400" /> Goals
                  </h4>
                  <ul className="list-disc list-inside text-obsidian-300 text-sm space-y-1">
                    {agent.goals.map((goal, i) => <li key={i}>{goal}</li>)}
                    {agent.goals.length === 0 && <li>No specific goals set.</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center text-obsidian-100 font-semibold mb-2 mt-3">
                    <Zap className="h-4 w-4 mr-2 text-obsidian-400" /> KPIs
                  </h4>
                  <ul className="list-disc list-inside text-obsidian-300 text-sm space-y-1">
                    {agent.kpis.map((kpi, i) => <li key={i}>{kpi}</li>)}
                    {agent.kpis.length === 0 && <li>No specific KPIs defined.</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center text-obsidian-100 font-semibold mb-2 mt-3">
                    <Cloud className="h-4 w-4 mr-2 text-obsidian-400" /> Permissions
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {Object.entries(agent.permissions).map(([key, value]) => value && (
                      <span key={key} className="bg-obsidian-800 text-obsidian-200 px-2 py-1 rounded-full flex items-center gap-1">
                        {key === 'email' && <Mail className="h-3 w-3" />}
                        {key === 'crm' && <Database className="h-3 w-3" />}
                        {key === 'ads' && <Zap className="h-3 w-3" />}
                        {key === 'finance' && <Wallet className="h-3 w-3" />}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    ))}
                    {Object.values(agent.permissions).every(p => !p) && <span className="text-obsidian-400">No permissions granted.</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6 border-t border-obsidian-800 pt-4">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleAgentStatus(agent.id)}
                        className={cn(
                          "transition-colors duration-200",
                          agent.status === 'active' ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"
                        )}
                      >
                        {agent.status === 'active' ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent bg-obsidian-800 text-obsidian-100 px-3 py-1 rounded-md shadow-md text-sm z-50">
                        {agent.status === 'active' ? 'Pause Agent' : 'Activate Agent'}
                        <Tooltip.Arrow className="TooltipArrow fill-obsidian-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300" onClick={() => { setSelectedAgent(agent); setOpenEditAgentDialog(true); }}>
                        <Settings className="h-5 w-5" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent bg-obsidian-800 text-obsidian-100 px-3 py-1 rounded-md shadow-md text-sm z-50">
                        Configure Agent
                        <Tooltip.Arrow className="TooltipArrow fill-obsidian-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteAgent(agent.id)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent bg-obsidian-800 text-obsidian-100 px-3 py-1 rounded-md shadow-md text-sm z-50">
                        Delete Agent
                        <Tooltip.Arrow className="TooltipArrow fill-obsidian-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button variant="ghost" size="icon" className="text-gold-400 hover:text-gold-300">
                        <Activity className="h-5 w-5" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent bg-obsidian-800 text-obsidian-100 px-3 py-1 rounded-md shadow-md text-sm z-50">
                        View Logs
                        <Tooltip.Arrow className="TooltipArrow fill-obsidian-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Edit Agent Dialog */}
      {selectedAgent && (
        <Dialog.Root open={openEditAgentDialog} onOpenChange={setOpenEditAgentDialog}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-obsidian-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 animated-border glass custom-scrollbar overflow-y-auto">
              <Dialog.Title className="text-3xl font-bold text-gold-500 mb-6 border-b border-obsidian-800 pb-3">Edit Agent: {selectedAgent.name}</Dialog.Title>
              <form onSubmit={handleSubmit(handleEditAgent)} className="space-y-6">
                 <div>
                  <label htmlFor="editName" className="block text-obsidian-100 text-sm font-medium mb-2">Agent Name</label>
                  <input
                    id="editName"
                    {...register('name')}
                    className={cn(
                      "w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.name ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-2">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="editRole" className="block text-obsidian-100 text-sm font-medium mb-2">Agent Role</label>
                  <Select.Root defaultValue={selectedAgent.role} onValueChange={(val) => setValue('role', val)}>
                    <Select.Trigger className={cn(
                      "flex items-center justify-between w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.role ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}>
                      <Select.Value placeholder="Select a role..." />
                      <Select.Icon className="ml-2">
                        <ArrowRight className="h-4 w-4 transform rotate-90 text-obsidian-300" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-obsidian-800 rounded-md shadow-lg overflow-hidden border border-obsidian-700 z-50">
                        <Select.Viewport className="p-1">
                          {['Sales', 'Marketing', 'CFO', 'Support', 'Data Analyst', 'Growth Hacker'].map((role) => (
                            <Select.Item key={role} value={role} className="p-2 text-obsidian-100 hover:bg-obsidian-700 cursor-pointer rounded-md">
                              <Select.ItemText>{role}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  {errors.role && <p className="text-destructive text-sm mt-2">{errors.role.message}</p>}
                </div>

                <div>
                  <label htmlFor="editSystemPrompt" className="block text-obsidian-100 text-sm font-medium mb-2">System Prompt</label>
                  <textarea
                    id="editSystemPrompt"
                    {...register('systemPrompt')}
                    rows="5"
                    placeholder="Define the core directives and persona of this AI agent..."
                    className={cn(
                      "w-full p-3 rounded-lg bg-obsidian-800 border",
                      errors.systemPrompt ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                      "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                    )}
                  ></textarea>
                  {errors.systemPrompt && <p className="text-destructive text-sm mt-2">{errors.systemPrompt.message}</p>}
                </div>

                <div>
                  <label htmlFor="editGoals" className="block text-obsidian-100 text-sm font-medium mb-2">Goals (comma-separated)</label>
                  <input
                    id="editGoals"
                    {...register('goals')}
                    placeholder="e.g., Increase Q3 deal closures by 15%, Expand market reach"
                    className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="editKpis" className="block text-obsidian-100 text-sm font-medium mb-2">KPIs (comma-separated)</label>
                  <input
                    id="editKpis"
                    {...register('kpis')}
                    placeholder="e.g., Deal Closure Rate: 12%, Lead-to-Opportunity Ratio: 30%"
                    className="w-full p-3 rounded-lg bg-obsidian-800 border border-obsidian-700 text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-obsidian-100 mb-2">Automation Permissions</h3>
                  <div className="flex items-center justify-between">
                    <label htmlFor="editPermissionsEmail" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-obsidian-400" /> Email Sending Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="editPermissionsEmail"
                      {...register('permissionsEmail')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="editPermissionsCrm" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-obsidian-400" /> CRM Update Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="editPermissionsCrm"
                      {...register('permissionsCrm')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="editPermissionsAds" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-obsidian-400" /> Paid Ads Management Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="editPermissionsAds"
                      {...register('permissionsAds')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="editPermissionsFinance" className="text-obsidian-200 text-sm flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-obsidian-400" /> Financial System Access
                    </label>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-obsidian-700 rounded-full relative data-[state=checked]:bg-gold-500 outline-none cursor-default"
                      id="editPermissionsFinance"
                      {...register('permissionsFinance')}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-obsidian-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <Dialog.Close asChild>
                    <Button type="button" variant="outline" onClick={() => setSelectedAgent(null)}>
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <Edit className="h-5 w-5 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-obsidian-400 hover:text-gold-500" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}