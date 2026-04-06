import api from "./Client";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const getMovies = async (page = 1) => {

  try {

    const response = await api.get("/movie/popular", {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        page: page
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return { results: [] };
  }
};

export const searchMovies = async (query, page = 1) => {

  try {

    const response = await api.get("/search/movie", {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
        language: "pt-BR"
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return { results: [] };
  }

};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`);

  return response.data;
};

export const getPoster = (path) => {
  return `https://image.tmdb.org/t/p/w200${path}`;
};