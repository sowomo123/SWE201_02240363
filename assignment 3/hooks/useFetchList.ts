// Custom hook for fetching lists with retry mechanism
import { useState, useEffect, useCallback } from 'react';

interface UseFetchListOptions<T> {
  fetchFn: () => Promise<T[]>;
  autoFetch?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface UseFetchListReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  retry: () => void;
}

export function useFetchList<T>({
  fetchFn,
  autoFetch = true,
  retryCount = 3,
  retryDelay = 1000,
}: UseFetchListOptions<T>): UseFetchListReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRetryAttempt(0);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      // Auto retry logic
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          setRetryAttempt(prev => prev + 1);
          fetchData();
        }, retryDelay);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, retryCount, retryDelay, retryAttempt]);

  const retry = useCallback(() => {
    setRetryAttempt(0);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    retry,
  };
}
