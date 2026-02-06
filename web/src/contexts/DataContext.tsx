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

  // Stable key that only changes when shorts are added/removed, not when metadata (likes/views) changes
  const shortsKey = videos
    .filter(v => v.is_shorts)
    .map(v => v.id)
    .sort()
    .join(',');

  // Only reshuffle when the set of shorts changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shortsOrder = useMemo(() => shuffleArray(videos.filter(v => v.is_shorts).map(v => v.id)), [shortsKey]);

  // Derive sorted shorts using stable order + current video data (picks up metadata changes without reshuffling)
  const randomSortedShorts = useMemo(() => {
    const videoMap = new Map(videos.map(v => [v.id, v]));
    return shortsOrder
      .map(id => videoMap.get(id))
      .filter((v): v is Video => v != null);
  }, [videos, shortsOrder]);

  return (
    <DataContext.Provider value={{ videos, randomSortedShorts, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
}
