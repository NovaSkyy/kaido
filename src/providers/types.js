/**
 * Standard interface all providers must implement
 * This ensures consistency regardless of which provider is active
 */
export const ProviderInterface = {
  // Search for anime
  search: async (query) => {
    // Must return: { results: [{ id, title, image, subOrDub }] }
  },

  // Get anime details (episodes, genre, etc)
  getAnimeInfo: async (id) => {
    // Must return: { id, title, description, episodes: [...], image }
  },

  // Get available streaming servers for an episode
  getServers: async (episodeId) => {
    // Must return: [{ id, name }]
  },

  // Get video sources from a server
  getSources: async (episodeId, serverId) => {
    // Must return: { sources: [{ url, quality }], subtitles: [...] }
  },
};