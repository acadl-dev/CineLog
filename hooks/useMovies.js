import { useCallback, useState } from "react";
import { getMovies, searchMovies } from "@/services/API/tmdb";

const useMovies = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  const listMovies = useCallback(async () => {

    if (loading) return;

    setLoading(true);

    let data;

    if (search) {
      data = await searchMovies(search, page);
    } else {
      data = await getMovies(page);
    }

    if (page === 1) {
      setMovies(data?.results || []);
    } else {
      setMovies(prev => [...prev, ...(data?.results || [])]);
    }

    setLoading(false);

  }, [page, search]);

  return {
    movies,
    loading,
    page,
    listMovies,
    setPage,
    setSearch
  };
};

export default useMovies;