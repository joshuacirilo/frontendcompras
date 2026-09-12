import { useCallback, useEffect, useState } from "react";

export function useData(fetcher, options = {}) {
  const { enabled = true, initialData = null, params = null } = options;
  const paramsKey = JSON.stringify(params ?? null);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const refetch = useCallback(
    async (nextParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const resolvedParams =
          nextParams === undefined ? (paramsKey ? JSON.parse(paramsKey) : null) : nextParams;
        const result = await fetcher(resolvedParams || {});
        setData(result);
        return result;
      } catch (fetchError) {
        setError(fetchError);
        throw fetchError;
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, paramsKey],
  );

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    refetch().catch(() => {});
  }, [enabled, refetch]);

  return {
    data,
    error,
    isEmpty: data?.hasApiData === false,
    isLoading,
    refetch,
  };
}
