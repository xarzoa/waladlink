import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useUser(endpoint) {
  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    refreshInterval: 10000,
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
