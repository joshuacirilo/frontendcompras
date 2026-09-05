import { useCallback, useEffect, useState } from "react";

export function useData(fetcher, options = {}) {
  const { enabled = true, initialData = null, params } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const refetch = useCallback(
    async (nextParams = params) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetcher(nextParams);
        setData(result);
        return result;
      } catch (fetchError) {
        setError(fetchError);
        throw fetchError;
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, params],
  );

  useEffect(() => {
    if (!enabled) return;

    refetch().catch(() => {});
  }, [enabled, refetch]);

  return {
    data,
    error,
    isEmpty: Array.isArray(data) && data.length === 0,
    isLoading,
    refetch,
  };
}
