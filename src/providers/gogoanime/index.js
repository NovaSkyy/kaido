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