import { useState, useEffect } from 'react';

interface CacheConfig {
  key: string;
  ttl: number;
}

export const useContentCache = <T>(
  fetcher: () => Promise<T>,
  config: CacheConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(config.key);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < config.ttl) {
            setData(data);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data
        const freshData = await fetcher();
        
        // Update cache
        localStorage.setItem(config.key, JSON.stringify({
          data: freshData,
          timestamp: Date.now()
        }));

        setData(freshData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config.key, config.ttl]);

  return { data, loading, error };
};