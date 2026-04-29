/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: 1,
    title: "Quantum Flux",
    artist: "Synth-AI Core",
    duration: "3:45",
    cover: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Neural Echo",
    artist: "DeepMind Beats",
    duration: "4:02",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Silicon Sunset",
    artist: "Binary Dreamer",
    duration: "2:58",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&q=80"
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
export const INITIAL_DIRECTION = { x: 0, y: -1 };
export const GAME_SPEED = 150;
