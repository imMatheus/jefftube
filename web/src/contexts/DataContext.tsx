import { type ReactNode, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataContext, type Video } from '../hooks/useData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function fetchVideos(): Promise<Video[]> {
  const response = await fetch(`${API_URL}/api/videos`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { data: videos = [], isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const randomSortedShorts = useMemo(() => shuffleArray(videos), [videos]);

  return (
    <DataContext.Provider value={{ videos, randomSortedShorts, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
}
