import { createContext, useContext } from 'react';

export interface Video {
  id: string;
  title: string;
  filename: string;
  length: string;
}

export interface DataContextType {
  videos: Video[];
  randomSortedShorts: Video[];
  isLoading: boolean;
  error: Error | null;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
