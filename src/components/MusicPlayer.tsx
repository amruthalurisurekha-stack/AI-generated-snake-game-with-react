/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DUMMY_TRACKS, Track } from '../constants';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">AI Generated Playlist</h2>
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-md rounded border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#00f3ff] animate-pulse shadow-[0_0_8px_#00f3ff]' : 'bg-white/20'}`} />
            <span className="text-[10px] text-white font-mono uppercase tracking-wider">{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
        </div>

        <div className="flex flex-col text-center">
          <motion.h3 
            key={`${currentTrack.id}-title`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold text-[#00f3ff] tracking-tight truncate"
          >
            {currentTrack.title}
          </motion.h3>
          <motion.p 
            key={`${currentTrack.id}-artist`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-white/60 font-medium uppercase tracking-widest"
          >
            {currentTrack.artist}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-[#ff00ff]/20 bg-[#ff00ff]/5 p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[10px] font-mono text-[#ff00ff] uppercase tracking-tighter">
            <span>0:42</span>
            <span>{currentTrack.duration}</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"
              animate={{ width: isPlaying ? '100%' : '35%' }}
              transition={{ duration: isPlaying ? 225 : 0.5, ease: "linear" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 mt-2">
          <button onClick={prevTrack} className="text-white/40 hover:text-white transition-colors p-2">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff]/10 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)]"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button onClick={nextTrack} className="text-white/40 hover:text-white transition-colors p-2">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {DUMMY_TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => setCurrentTrackIndex(idx)}
            className={`flex items-center justify-between p-3 rounded-lg transition-all border ${
              currentTrackIndex === idx 
                ? 'bg-[#00f3ff]/10 border-[#00f3ff]/30 text-white' 
                : 'hover:bg-white/5 border-transparent text-white/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 bg-black border rounded flex items-center justify-center ${currentTrackIndex === idx ? 'border-[#00f3ff]/50' : 'border-white/20'}`}>
                {currentTrackIndex === idx && isPlaying ? (
                  <div className="w-3 h-3 bg-[#00f3ff] animate-pulse rounded-full shadow-[0_0_8px_#00f3ff]" />
                ) : (
                  <span className="text-[10px] font-mono opacity-50">{String(track.id).padStart(2, '0')}</span>
                )}
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${currentTrackIndex === idx ? 'text-[#00f3ff]' : 'text-white/80'}`}>{track.title}</p>
                <p className="text-[10px] opacity-60 uppercase">{track.artist}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono opacity-50">{track.duration}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 group mt-2">
        <Volume2 className="w-4 h-4 text-white/40 group-hover:text-[#00f3ff] transition-colors" />
        <div className="flex-1 h-1 bg-white/10 rounded-full">
          <div className="w-2/3 h-full bg-white/40 group-hover:bg-[#00f3ff] group-hover:shadow-[0_0_5px_#00f3ff] transition-all rounded-full" />
        </div>
      </div>
    </div>
  );
}
