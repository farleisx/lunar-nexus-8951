"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Building2, User } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../../../src/lib/utils'; // Relative path
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

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

const registerSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required." }),
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      // Simulate API call
      const response = await new Promise((resolve) => setTimeout(() => {
        if (data.email === 'existing@example.com') { // Simulate existing user
          resolve({ success: false, message: 'Email already registered.' });
        } else {
          resolve({ success: true, message: 'Registration successful!' });
        }
      }, 1500));

      if (response.success) {
        console.log('Registration success:', data);
        router.push('/login?registered=true'); // Redirect to login with a success message
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <motion.h2
        className="text-4xl font-extrabold text-gold-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Register for SOVEREIGN X
      </motion.h2>
      <p className="text-obsidian-200 mb-8 max-w-sm">Join the future of autonomous enterprise operations.</p>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/20 border border-destructive text-destructive-foreground p-3 rounded-lg mb-6 w-full max-w-xs md:max-w-sm text-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
        <div>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" size={20} />
            <input
              type="text"
              placeholder="Your Company Name"
              {...register("companyName")}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg bg-obsidian-800 border",
                errors.companyName ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
              )}
            />
          </div>
          {errors.companyName && <p className="text-destructive text-sm mt-2">{errors.companyName.message}</p>}
        </div>

        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" size={20} />
            <input
              type="text"
              placeholder="Your Full Name"
              {...register("fullName")}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg bg-obsidian-800 border",
                errors.fullName ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
              )}
            />
          </div>
          {errors.fullName && <p className="text-destructive text-sm mt-2">{errors.fullName.message}</p>}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" size={20} />
            <input
              type="email"
              placeholder="Enterprise Email"
              {...register("email")}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg bg-obsidian-800 border",
                errors.email ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
              )}
            />
          </div>
          {errors.email && <p className="text-destructive text-sm mt-2">{errors.email.message}</p>}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" size={20} />
            <input
              type="password"
              placeholder="Create Password"
              {...register("password")}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg bg-obsidian-800 border",
                errors.password ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
              )}
            />
          </div>
          {errors.password && <p className="text-destructive text-sm mt-2">{errors.password.message}</p>}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg bg-obsidian-800 border",
                errors.confirmPassword ? "border-destructive focus:ring-destructive" : "border-obsidian-700 focus:ring-gold-500",
                "text-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 transition-all duration-200"
              )}
            />
          </div>
          {errors.confirmPassword && <p className="text-destructive text-sm mt-2">{errors.confirmPassword.message}</p>}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 shadow-gold-glow"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-obsidian-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <div className="mt-8 text-sm text-obsidian-300">
        Already have an account?{' '}
        <a href="/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
          Sign In
        </a>
      </div>
    </div>
  );
}