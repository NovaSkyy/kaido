import axios from "axios";

const url = `${BASE_URL}/watch/${animeId}?ep=${episodeId}`;

const { data } = await axios.get(url, {
  params: {
    server: "vidstreaming",
    category: "sub",
  },
});

console.log(data);
