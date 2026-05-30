import { useQuery } from "react-query";
import { activeProvider } from "../providers/config";

/**
 * Hook to access the active streaming provider
 * Maintains all React Query caching benefits
 */
export function useSearchProvider(query) {
  return useQuery(
    ["search", query],
    () => activeProvider.impl.search(query),
    { enabled: !!query }
  );
}

export function useAnimeInfoProvider(id) {
  return useQuery(
    ["animeInfo", id],
    () => activeProvider.impl.getAnimeInfo(id),
    { enabled: !!id }
  );
}

export function useServersProvider(episodeId) {
  const { data: apiServers, ...rest } = useQuery(
    ["servers", episodeId],
    () => activeProvider.impl.getServers(episodeId),
    { enabled: !!episodeId }
  );

  // Filter to only supported servers
  const usableServers = apiServers?.filter((server) =>
    activeProvider.servers.some((s) => s.id === server.id)
  ) || [];

  return { data: usableServers, ...rest };
}

export function useSourcesProvider(episodeId, serverId) {
  return useQuery(
    ["sources", episodeId, serverId],
    () => activeProvider.impl.getSources(episodeId, serverId),
    { enabled: !!episodeId && !!serverId }
  );
}