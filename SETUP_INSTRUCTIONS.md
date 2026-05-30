# Provider Refactor - Missing Files Instructions

## Critical Issue ⚠️

The provider implementation files failed to create automatically. You need to manually create these 7 files on the `refactor/provider-abstraction` branch:

---

## File 1: `src/providers/hianime/index.js`

```javascript
import axios from "axios";

const BASE_URL = "https://api.consumet.org/anime/hianime";

export const hianimeProvider = {
  search: async (query) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${query}`);
      return data;
    } catch (err) {
      console.error("HiAnime search failed:", err);
      throw err;
    }
  },

  getAnimeInfo: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/info/${id}`);
      return data;
    } catch (err) {
      console.error("HiAnime getAnimeInfo failed:", err);
      throw err;
    }
  },

  getServers: async (episodeId) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/servers/${episodeId}`);
      return data;
    } catch (err) {
      console.error("HiAnime getServers failed:", err);
      throw err;
    }
  },

  getSources: async (episodeId, serverId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/watch/${episodeId}?server=${serverId}`
      );
      return data;
    } catch (err) {
      console.error("HiAnime getSources failed:", err);
      throw err;
    }
  },
};
```

---

## File 2: `src/providers/hianime/servers.js`

```javascript
export const hianimeServers = [
  { id: "vidstreaming", name: "Vidstreaming" },
  { id: "megacloud", name: "Megacloud" },
  { id: "filemoon", name: "Filemoon" },
];
```

---

## File 3: `src/providers/gogoanime/index.js`

```javascript
import axios from "axios";

const BASE_URL = "https://api.consumet.org/anime/gogoanime";

export const gogoanimeProvider = {
  search: async (query) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${query}`);
      return data;
    } catch (err) {
      console.error("GogoAnime search failed:", err);
      throw err;
    }
  },

  getAnimeInfo: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/info/${id}`);
      return data;
    } catch (err) {
      console.error("GogoAnime getAnimeInfo failed:", err);
      throw err;
    }
  },

  getServers: async (episodeId) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/servers/${episodeId}`);
      return data;
    } catch (err) {
      console.error("GogoAnime getServers failed:", err);
      throw err;
    }
  },

  getSources: async (episodeId, serverId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/watch/${episodeId}?server=${serverId}`
      );
      return data;
    } catch (err) {
      console.error("GogoAnime getSources failed:", err);
      throw err;
    }
  },
};
```

---

## File 4: `src/providers/gogoanime/servers.js`

```javascript
export const gogoanimeServers = [
  { id: "streamwish", name: "Streamwish" },
  { id: "gogocdn", name: "Gogo server" },
  { id: "vidstreaming", name: "Vidstreaming" },
  { id: "mp4upload", name: "Mp4Upload" },
];
```

---

## File 5: `src/providers/animekai/index.js`

```javascript
import axios from "axios";

const BASE_URL = "https://api.consumet.org/anime/animekai";

export const animekaiProvider = {
  search: async (query) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${query}`);
      return data;
    } catch (err) {
      console.error("AnimeKai search failed:", err);
      throw err;
    }
  },

  getAnimeInfo: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/info/${id}`);
      return data;
    } catch (err) {
      console.error("AnimeKai getAnimeInfo failed:", err);
      throw err;
    }
  },

  getServers: async (episodeId) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/servers/${episodeId}`);
      return data;
    } catch (err) {
      console.error("AnimeKai getServers failed:", err);
      throw err;
    }
  },

  getSources: async (episodeId, serverId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/watch/${episodeId}?server=${serverId}`
      );
      return data;
    } catch (err) {
      console.error("AnimeKai getSources failed:", err);
      throw err;
    }
  },
};
```

---

## File 6: `src/providers/animekai/servers.js`

```javascript
export const animekaiServers = [
  { id: "vidstreaming", name: "Vidstreaming" },
  { id: "megacloud", name: "Megacloud" },
];
```

---

## File 7: `src/hooks/useStreamingProvider.js`

```javascript
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
```

---

## File 8: `src/hooks/useConsumet.jsx` (REPLACE ENTIRE FILE)

```javascript
import { useQuery } from "react-query";
import {
  useSearchProvider,
  useAnimeInfoProvider,
  useServersProvider,
  useSourcesProvider,
} from "./useStreamingProvider";

/**
 * REFACTORED: Now uses modular provider system
 * Search for anime by name
 */
export function useSearch(name) {
  const { data, isLoading, isError } = useSearchProvider(
    name?.toLowerCase()
  );

  if (!data?.results) {
    return { isLoading, isError };
  }

  const results = data.results;
  let subAnime, dubAnime;

  if (results.length === 0) {
    return { noAnime: true };
  }

  if (results.length === 1) {
    if (results[0].id.endsWith("dub")) {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  }

  if (results.length > 1) {
    const isDub = results[0].id.endsWith("dub");

    if (!isDub) {
      subAnime = results[0];
      dubAnime =
        results.find((el) => el.id === subAnime.id + "-dub") || results[1];
    } else {
      dubAnime = results[0];
      subAnime = results.find(
        (el) => el.id === dubAnime.id.slice(0, -4)
      );
    }
  }

  if (!isLoading) {
    return {
      dub: dubAnime,
      sub: subAnime,
      isLoading,
      isError,
    };
  }
}

/**
 * Get detailed anime information including episodes
 */
export function useAnimeInfo(id) {
  const { data, isLoading } = useAnimeInfoProvider(id);
  return isLoading ? null : data;
}

/**
 * Get available streaming servers for an episode
 */
export function useServers(episodeId) {
  const { data: servers } = useServersProvider(episodeId);
  return servers;
}

/**
 * Get video sources and streaming links from a specific server
 */
export function useEpisodeFiles({ server, id }) {
  const { data, isLoading } = useSourcesProvider(id, server?.id);

  if (isLoading) {
    return { isLoading: true };
  }

  return {
    sources: data?.sources,
    isLoading,
  };
}
```

---

## How to Add Files on GitHub

1. Go to: https://github.com/NovaSkyy/kaido/tree/refactor/provider-abstraction
2. Click **"Add file"** → **"Create new file"**
3. Paste the file path (e.g., `src/providers/hianime/index.js`)
4. Paste the code from above
5. Click **"Commit changes"**
6. Repeat for all 8 files

## Summary Checklist

- [ ] File 1: `src/providers/hianime/index.js`
- [ ] File 2: `src/providers/hianime/servers.js`
- [ ] File 3: `src/providers/gogoanime/index.js`
- [ ] File 4: `src/providers/gogoanime/servers.js`
- [ ] File 5: `src/providers/animekai/index.js`
- [ ] File 6: `src/providers/animekai/servers.js`
- [ ] File 7: `src/hooks/useStreamingProvider.js`
- [ ] File 8: `src/hooks/useConsumet.jsx` (REPLACE)

After adding all files, your streaming will work with the new provider system! 🚀
