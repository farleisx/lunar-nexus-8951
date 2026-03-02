"use client";

import { motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { Workflow, PlusCircle, Trash2, Settings, PlayCircle, PauseCircle, Save, Zap, Users, Mail, Database, Send, Lightbulb, TrendingUp, RefreshCcw, Loader, ArrowRight } from 'lucide-react'; // Ensure all icons are imported
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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

// Mock Automation Workflow Components (simplified for UI demonstration)
const workflowComponents = [
  { id: 'trigger-lead', type: 'trigger', name: 'New Lead Captured', icon: Users, description: 'Fires when a new lead enters the system.' },
  { id: 'action-ai-qualify', type: 'action', name: 'AI Lead Qualification', icon: Lightbulb, description: 'AI evaluates lead potential and scores.' },
  { id: 'action-crm-update', type: 'action', name: 'Update CRM', icon: Database, description: 'Updates lead status in connected CRM.' },
  { id: 'action-email-send', type: 'action', name: 'Send Email', icon: Mail, description: 'Sends a personalized email to the lead.' },
  { id: 'action-ai-followup', type: 'action', name: 'AI Smart Follow-up', icon: RefreshCcw, description: 'AI determines best follow-up action.' },
  { id: 'logic-wait', type: 'logic', name: 'Wait (Time Delay)', icon: ArrowRight, description: 'Pauses workflow for a specified duration.' },
  { id: 'logic-if', type: 'logic', name: 'Conditional Branch (IF)', icon: Zap, description: 'Routes workflow based on a condition.' },
  { id: 'action-analytics', type: 'action', name: 'Log Analytics Event', icon: TrendingUp, description: 'Records event for performance tracking.' },
];

// Mock Automations Data
const initialAutomations = [
  {
    id: 'auto-1',
    name: 'New Lead Nurturing Flow',
    status: 'active',
    steps: [
      { id: 'step-1', type: 'trigger', componentId: 'trigger-lead', config: {} },
      { id: 'step-2', type: 'action', componentId: 'action-ai-qualify', config: {} },
      { id: 'step-3', type: 'action', componentId: 'action-crm-update', config: { field: 'status', value: 'AI Qualified' } },
      { id: 'step-4', type: 'logic', componentId: 'logic-if', config: { condition: 'lead.score > 70' } },
      { id: 'step-5', type: 'action', componentId: 'action-email-send', config: { template: 'High-Value Lead Intro' } },
    ],
  },
  {
    id: 'auto-2',
    name: 'Customer Churn Prevention',
    status: 'paused',
    steps: [
      { id: 'step-a', type: 'trigger', componentId: 'trigger-churn-risk', config: {} },
      { id: 'step-b', type: 'action', componentId: 'action-ai-followup', config: { strategy: 'Retention Offer' } },
      { id: 'step-c', type: 'action', componentId: 'action-email-send', config: { template: 'Retention Offer Email' } },
    ],
  },
];

// New Automation Schema for form validation
const newAutomationSchema = z.object({
  name: z.string().min(2, { message: "Automation name is required." }),
});

export default function AutomationBuilderPage() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [selectedAutomation, setSelectedAutomation] = useState(null); // Automation being edited
  const [openNewAutomationDialog, setOpenNewAutomationDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const workflowAreaRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(newAutomationSchema),
  });

  const handleDragStart = (e, component) => {
    setIsDragging(true);
    setDraggedComponent(component);
    e.dataTransfer.setData('componentId', component.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedComponent(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!selectedAutomation || !draggedComponent) return;

    const componentId = e.dataTransfer.getData('componentId');
    const component = workflowComponents.find(c => c.id === componentId);

    if (component) {
      const newStep = {
        id: crypto.randomUUID(),
        type: component.type,
        componentId: component.id,
        config: {}, // Default empty config
      };
      setSelectedAutomation(prev => ({
        ...prev,
        steps: [...prev.steps, newStep],
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpdateStepConfig = (stepId, key, value) => {
    setSelectedAutomation(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, config: { ...step.config, [key]: value } } : step
      ),
    }));
  };

  const handleDeleteStep = (stepId) => {
    if (!selectedAutomation) return;
    setSelectedAutomation(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId),
    }));
  };

  const handleAddAutomation = async (data) => {
    console.log("Adding new automation:", data.name);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newAutomation = {
        id: crypto.randomUUID(),
        name: data.name,
        status: 'paused',
        steps: [],
      };
      setAutomations(prev => [...prev, newAutomation]);
      setOpenNewAutomationDialog(false);
      setSelectedAutomation(newAutomation); // Automatically open the new automation for editing
      reset();
    } catch (error) {
      console.error('Error adding automation:', error);
    }
  };

  const handleSaveAutomation = async () => {
    if (!selectedAutomation) return;
    console.log("Saving automation:", selectedAutomation);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAutomations(prev =>
        prev.map(auto => (auto.id === selectedAutomation.id ? selectedAutomation : auto))
      );
      // Optionally provide feedback to user
      alert("Automation saved successfully!");
    } catch (error) {
      console.error('Error saving automation:', error);
      alert("Failed to save automation.");
    }
  };

  const handleToggleAutomationStatus = (automationId) => {
    setAutomations(prev =>
      prev.map(auto =>
        auto.id === automationId
          ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
          : auto
      )
    );
    if (selectedAutomation && selectedAutomation.id === automationId) {
      setSelectedAutomation(prev => ({
        ...prev,
        status: prev.status === 'active' ? 'paused' : 'active'
      }));
    }
  };

  const handleDeleteAutomation = (automationId) => {
    if (window.confirm("Are you sure you want to delete this automation?")) {
      setAutomations(prev => prev.filter(auto => auto.id !== automationId));
      if (selectedAutomation && selectedAutomation.id === automationId) {
        setSelectedAutomation(null);
      }
    }
  };

  const AutomationCard = ({ automation }) => {
    const componentMap = workflowComponents.reduce((acc, comp) => {
      acc[comp.id] = comp;
      return acc;
    }, {});

    return (
      <motion.div
        key={automation.id}
        className="glass p-6 rounded-3xl shadow-lg flex flex-col animated-border transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Workflow className="h-7 w-7 text-gold-500" />
            <h3 className="text-2xl font-bold text-gold-300">{automation.name}</h3>
          </div>
          <span className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full",
            automation.status === 'active' ? "bg-emerald-600/20 text-emerald-400" : "bg-yellow-600/20 text-yellow-400"
          )}>
            {automation.status.toUpperCase()}
          </span>
        </div>
        <p className="text-obsidian-200 text-sm mb-4">Steps: <span className="font-medium text-obsidian-50">{automation.steps.length}</span></p>

        <div className="flex-grow">
          {automation.steps.length > 0 ? (
            <ul className="space-y-2 text-sm text-obsidian-300 max-h-24 overflow-y-auto custom-scrollbar">
              {automation.steps.slice(0, 3).map((step, idx) => {
                const component = componentMap[step.componentId];
                return component ? (
                  <li key={step.id} className="flex items-center gap-2">
                    {React.createElement(component.icon, { className: "h-4 w-4 text-obsidian-400" })}
                    <span>{component.name}</span>
                  </li>
                ) : null;
              })}
              {automation.steps.length > 3 && (
                <li className="text-obsidian-400 italic">+ {automation.steps.length - 3} more steps...</li>
              )}
            </ul>
          ) : (
            <p className="text-obsidian-400 italic text-sm">No steps defined yet. Click "Edit Workflow" to get started!</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 border-t border-obsidian-800 pt-4">
          <Button variant="ghost" size="icon" onClick={() => handleToggleAutomationStatus(automation.id)}
            className={cn(
              automation.status === 'active' ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"
            )}
          >
            {automation.status === 'active' ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedAutomation(automation)} className="text-blue-400 hover:text-blue-300">
            <Settings className="h-5 w-5 mr-2" /> Edit Workflow
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteAutomation(automation.id)} className="text-red-400 hover:text-red-300">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-12">
      <motion.h1
        className="text-5xl font-extrabold text-gold-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Automation Builder
      </motion.h1>

      <p className="text-xl text-obsidian-200 mb-8 max-w-3xl">
        Design and deploy powerful AI-driven automation flows. Drag, drop, and connect steps to build custom enterprise workflows.
      </p>

      {/* Automation List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass p-6 rounded-2xl shadow-lg animated-border"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-obsidian-50">Your Automations</h2>
          <Dialog.Root open={openNewAutomationDialog} onOpenChange={setOpenNewAutomationDialog}>
            <Dialog.Trigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" /> New Automation
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-obsidian-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 animated-border glass custom-scrollbar overflow-y-auto">
                <Dialog.Title className="text-2xl font-bold text-gold-500 mb-6 border-b border-obsidian-800 pb-3">Create New Automation</Dialog.Title>
                <form onSubmit={handleSubmit(handleAddAutomation)} className="space-y-6">
                  <div>
                    <label htmlFor="automationName" className="block text-obsidian-100 text-sm font-medium mb-2">Automation Name</label>
                    <input
                      id="automationName"
                      {...register('name')}
                      className={cn(
                        "w-full p-3 rounded-lg bg-obsidian-800 border",
                        errors.name ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                        "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
                      )}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-2">{errors.name.message}</p>}
                  </div>
                  <div className="flex justify-end gap-4 mt-8">
                    <Dialog.Close asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <Loader className="h-5 w-5 animate-spin mr-2" /> : <PlusCircle className="h-5 w-5 mr-2" />}
                      Create
                    </Button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.length === 0 ? (
            <div className="lg:col-span-3 text-center p-8 text-obsidian-200">
              <Workflow className="h-12 w-12 mx-auto mb-4 text-obsidian-400" />
              <p className="text-xl font-medium">No automations created yet.</p>
              <p className="text-obsidian-300 mt-2">Click "New Automation" to get started!</p>
            </div>
          ) : (
            automations.map(auto => <AutomationCard key={auto.id} automation={auto} />)
          )}
        </div>
      </motion.div>

      {/* Workflow Builder Area (conditional rendering based on selectedAutomation) */}
      {selectedAutomation && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="glass p-8 rounded-2xl shadow-lg animated-border mt-12"
        >
          <div className="flex justify-between items-center mb-6 border-b border-obsidian-800 pb-4">
            <h2 className="text-3xl font-bold text-gold-500 flex items-center gap-3">
              <Workflow className="h-8 w-8" /> Editing Workflow: {selectedAutomation.name}
            </h2>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleSaveAutomation()} disabled={isSubmitting}>
                {isSubmitting ? <Loader className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />} Save
              </Button>
              <Button variant="outline" onClick={() => setSelectedAutomation(null)}>
                Close Editor
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Component Palette */}
            <div className="lg:col-span-1 glass p-6 rounded-2xl animated-border h-full max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-xl font-bold text-obsidian-50 mb-4 border-b border-obsidian-800 pb-3">Components</h3>
              <div className="space-y-4">
                {workflowComponents.map(comp => (
                  <Tooltip.Provider key={comp.id}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <motion.div
                          draggable
                          onDragStart={(e) => handleDragStart(e, comp)}
                          onDragEnd={handleDragEnd}
                          className="flex items-center space-x-3 p-4 rounded-lg bg-obsidian-800 border border-obsidian-700 cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:bg-obsidian-700 hover:border-gold-500 hover:scale-[1.02]"
                          whileHover={{ x: 5 }}
                        >
                          {React.createElement(comp.icon, { className: "h-5 w-5 text-gold-400" })}
                          <span className="text-obsidian-100 font-medium text-lg">{comp.name}</span>
                        </motion.div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent bg-obsidian-800 text-obsidian-100 px-3 py-2 rounded-md shadow-md text-sm z-50">
                          {comp.description}
                          <Tooltip.Arrow className="TooltipArrow fill-obsidian-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                ))}
              </div>
            </div>

            {/* Workflow Canvas */}
            <motion.div
              ref={workflowAreaRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={cn(
                "lg:col-span-3 min-h-[500px] glass p-8 rounded-2xl animated-border border-dashed border-2 flex flex-col items-center justify-center relative",
                isDragging ? "border-gold-500 bg-obsidian-800/50" : "border-obsidian-700 bg-obsidian-900/30"
              )}
            >
              {selectedAutomation.steps.length === 0 ? (
                <div className="text-center text-obsidian-400">
                  <Workflow className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-medium">Drag components here to build your workflow!</p>
                </div>
              ) : (
                <div className="space-y-8 w-full max-w-2xl">
                  {selectedAutomation.steps.map((step, index) => {
                    const component = workflowComponents.find(c => c.id === step.componentId);
                    if (!component) return null;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="glass p-5 rounded-xl shadow-md border border-obsidian-700 relative group flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 flex flex-col items-center">
                          {React.createElement(component.icon, { className: "h-7 w-7 text-gold-500 mb-1" })}
                          <span className="text-obsidian-400 text-xs uppercase font-semibold">{component.type}</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-bold text-obsidian-50 mb-1">{component.name}</h4>
                          <p className="text-obsidian-300 text-sm">{component.description}</p>
                          {/* Config options (simplified) */}
                          <div className="mt-3 space-y-2">
                            {component.id === 'action-crm-update' && (
                              <input
                                type="text"
                                placeholder="CRM Field (e.g., status)"
                                value={step.config.field || ''}
                                onChange={(e) => handleUpdateStepConfig(step.id, 'field', e.target.value)}
                                className="w-full p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 text-sm"
                              />
                            )}
                            {component.id === 'action-crm-update' && (
                              <input
                                type="text"
                                placeholder="Value (e.g., 'Qualified')"
                                value={step.config.value || ''}
                                onChange={(e) => handleUpdateStepConfig(step.id, 'value', e.target.value)}
                                className="w-full p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 text-sm"
                              />
                            )}
                             {component.id === 'action-email-send' && (
                              <input
                                type="text"
                                placeholder="Email Template Name"
                                value={step.config.template || ''}
                                onChange={(e) => handleUpdateStepConfig(step.id, 'template', e.target.value)}
                                className="w-full p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 text-sm"
                              />
                            )}
                            {component.id === 'logic-wait' && (
                              <input
                                type="number"
                                placeholder="Wait Duration (minutes)"
                                value={step.config.duration || ''}
                                onChange={(e) => handleUpdateStepConfig(step.id, 'duration', Number(e.target.value))}
                                className="w-full p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 text-sm"
                              />
                            )}
                            {component.id === 'logic-if' && (
                              <input
                                type="text"
                                placeholder="Condition (e.g., lead.score > 70)"
                                value={step.config.condition || ''}
                                onChange={(e) => handleUpdateStepConfig(step.id, 'condition', e.target.value)}
                                className="w-full p-2 bg-obsidian-800 border border-obsidian-700 rounded-md text-obsidian-100 text-sm"
                              />
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteStep(step.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}