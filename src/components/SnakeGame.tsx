/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import { Trophy, RotateCcw, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Point {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  const directionRef = useRef<Point>(INITIAL_DIRECTION);
  
  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    directionRef.current = INITIAL_DIRECTION;
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newDir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y !== 1) newDir = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (directionRef.current.y !== -1) newDir = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (directionRef.current.x !== 1) newDir = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (directionRef.current.x !== -1) newDir = { x: 1, y: 0 };
          break;
        case ' ':
          setIsPaused(p => !p);
          return;
      }
      directionRef.current = newDir;
      setDirection(newDir);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    const padding = 2;
    ctx.fillRect(
      food.x * cellSize + padding,
      food.y * cellSize + padding,
      cellSize - padding * 2,
      cellSize - padding * 2
    );

    // Draw snake
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f3ff';
    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? '#ffffff' : '#00f3ff';
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[500px] mx-auto">
      <div className="flex items-center justify-between w-full px-4 text-center">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-widest text-[#ff00ff]">High Score</p>
          <p className="text-2xl font-mono leading-none text-white">{highScore}</p>
        </div>
        <button 
          onClick={resetGame}
          className="w-12 h-12 rounded-full border-2 border-[#ff00ff] flex items-center justify-center text-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:bg-[#ff00ff]/10 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-[#00f3ff]">Current Score</p>
          <p className="text-2xl font-mono leading-none text-white">{score}</p>
        </div>
      </div>

      <div className="relative group p-2 border-4 border-[#00f3ff]/20 shadow-[0_0_50px_rgba(0,243,255,0.1)] rounded-lg bg-[#050505]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-sm bg-[#050505]"
        />
        
        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/80 rounded-sm backdrop-blur-md z-10"
            >
              {isGameOver ? (
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-4xl font-black text-[#ff00ff] tracking-tighter uppercase italic drop-shadow-[0_0_15px_#ff00ff]">Game Over</h2>
                  <button 
                    onClick={resetGame}
                    className="flex items-center gap-2 px-8 py-3 border-2 border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff]/10 font-bold uppercase tracking-widest rounded-lg transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restart
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-4xl font-black text-[#00f3ff] tracking-tighter uppercase italic drop-shadow-[0_0_15px_#00f3ff]">Paused</h2>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="flex items-center gap-2 px-8 py-3 border-2 border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff]/10 font-bold uppercase tracking-widest rounded-lg transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                  >
                    <Play className="w-5 h-5" />
                    Resume
                  </button>
                  <p className="text-[#00f3ff]/60 text-[10px] font-mono tracking-[0.2em] uppercase mt-2">Press SPACE to play</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full px-4 mt-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-[10px] font-bold text-[#ff00ff] uppercase tracking-widest mb-2">Controls</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-start-2 w-full h-8 flex items-center justify-center bg-white/5 rounded border border-white/10 text-xs text-white/40 font-mono">↑</div>
            <div className="col-start-1 w-full h-8 flex items-center justify-center bg-white/5 rounded border border-white/10 text-xs text-white/40 font-mono">←</div>
            <div className="w-full h-8 flex items-center justify-center bg-white/5 rounded border border-white/10 text-xs text-white/40 font-mono">↓</div>
            <div className="w-full h-8 flex items-center justify-center bg-white/5 rounded border border-white/10 text-xs text-white/40 font-mono">→</div>
          </div>
          <p className="text-[10px] text-white/40 font-mono mt-3 text-center uppercase tracking-widest border-t border-white/10 pt-2">Space = Pause</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-[#00f3ff] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Status</p>
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-[#ff00ff] shadow-[0_0_8px_#ff00ff] animate-pulse' : 'bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]'}`} />
             <span className="text-[11px] text-white/80 font-mono uppercase tracking-widest">{isPaused ? 'Standby' : 'Operational'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
