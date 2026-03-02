"use client";

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-obsidian-950 to-obsidian-900 text-foreground p-4">
      <div className="absolute inset-0 z-0 opacity-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/4473250/4473250-sd_960_540_30fps.mp4"
        ></video>
      </div>
      <div className="absolute inset-0 bg-obsidian-950/70 z-10"></div>

      <motion.div
        className="relative z-20 w-full max-w-md mx-auto glass p-8 md:p-10 rounded-3xl shadow-2xl animated-border text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <a href="/" className="inline-block mb-8 text-4xl font-extrabold text-gold-500 font-mono tracking-wider">SOVEREIGN X</a>
        {children}
      </motion.div>
    </div>
  );
}