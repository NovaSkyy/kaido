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