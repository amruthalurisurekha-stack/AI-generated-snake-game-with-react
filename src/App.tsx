/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Cpu, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-white selection:bg-[#00f3ff]/30 font-sans overflow-hidden flex flex-col relative">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00f3ff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f3ff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff00ff]/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation / Header */}
      <header className="h-16 relative z-10 flex items-center justify-between px-8 border-b border-[#00f3ff]/30 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00f3ff] rounded-sm shadow-[0_0_15px_#00f3ff] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-[#050505]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter uppercase italic text-[#00f3ff]">
              NEO-SYNTH ARCADE
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#ff00ff]">System Status</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono leading-none">ACTIVE</span>
              <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse shadow-[0_0_8px_#00f3ff]" />
            </div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Boost Mode</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden z-10 w-full relative">
        
        {/* Sidebar / Player */}
        <aside className="w-full lg:w-80 border-r border-[#00f3ff]/20 bg-[#0a0a0a]/40 p-6 flex flex-col gap-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MusicPlayer />
          </motion.div>

          {/* System Stats Widget */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 bg-[#0a0a0a]/60 border border-[#00f3ff]/30 rounded-xl backdrop-blur-sm"
          >
            <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-4">Neural Feedback</h4>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/60 font-mono">LATENCY</span>
                  <span className="text-xs text-white font-mono">14ms</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff] w-[15%]" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/60 font-mono">SYNCOPATON</span>
                  <span className="text-xs text-white font-mono">82%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] w-[82%]" />
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Game Section */}
        <section className="flex-1 flex items-center justify-center bg-black relative p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <SnakeGame />
          </motion.div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-[#00f3ff] font-bold">Neural-Link Active</div>
        </section>
      </main>

      {/* Footer / Meta */}
      <footer className="h-24 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between px-8 z-20">
        <div className="text-[10px] font-mono tracking-widest text-[#ff00ff] uppercase">
          © 2026 NEO-SYNTH ARCADE . ALL RIGHTS RESERVED
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white transition-colors uppercase">Documentation</a>
          <a href="#" className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white transition-colors uppercase">Terminal Shell</a>
          <a href="#" className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white transition-colors uppercase">System Logout</a>
        </div>
      </footer>
      
      {/* Global Vignette */}
      <div className="fixed inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none z-30" />
    </div>
  );
}
