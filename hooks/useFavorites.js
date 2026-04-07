import { useCallback, useState } from "react";
import Database from "@/services/Database";

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState(null);

    const listFavorites = useCallback(async () => {
        setLoading(true);
        let data;

        // TODO: Pegar locais por id_user
        if (search) {
            data = await Database.getData("favorites_movies", 1, limit, search);
        } else {
            data = await Database.getData("favorites_movies", page, limit);
        }

        if (page === 1) {
            setFavorites(data?.data || []);
        } else {
            setFavorites(prev => [...prev, ...(data?.data || [])]);
        }
        setLoading(false);
    }, [page, limit, search]);

    return {
        page,
        favorites,
        loading,
        listFavorites,
        setPage,
        setLimit,
        setSearch
    }
};

export default useFavorites;