import { type ReactNode, useMemo } from 'react';
import { DataContext, type Video } from '../hooks/useData';
import data from '../data.json';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const videos = data as Video[];

  const randomSortedShorts = useMemo(() => shuffleArray(videos), [videos]);

  return (
    <DataContext.Provider value={{ videos, randomSortedShorts }}>
      {children}
    </DataContext.Provider>
  );
}
