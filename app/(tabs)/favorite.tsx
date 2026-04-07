import { Appbar, FAB, ListItem } from '@/components/customs';
import useFavorites from '@/hooks/useFavorites';
import { useSession } from '@/providers/SessionContext';
import { getPoster } from '@/services/API/tmdb';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';


export default function FavoritesScreen() {
  const { signOut } = useSession() as { signOut: any };
  const router = useRouter();
  const theme = useTheme();
  const {  favorites, loading, listFavorites, setPage, setLimit, setSearch, page } = useFavorites()  as { favorites: any[], loading: any, listFavorites: any, setPage: any, setLimit: any, setSearch: any, page: any };
  const [query, setQuery] = useState('');
  

  useEffect(() => {
    listFavorites();
  }, [page]);

  return  <>
            <Appbar 
              title="Favoritos"
              icons={[
                { name: 'cog-outline', onPress: () => router.push('/settings')   },
                { name: 'logout', onPress: () => signOut() },
              ]}
            />
            <Searchbar
              style={{ margin: 10, backgroundColor: theme.colors.secondary  }}
              placeholder="Buscar filme..."
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                setSearch(text);
                setPage(1);
              }}
              
            />
            {

              <FlatList
                style={{
                backgroundColor: theme.colors.tertiary,
              }}
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.title}
                    subtitle={item.release_date}
                    poster={getPoster(item.poster_path)}
                    onPress={() => alert("Press")}
                    onLongPress={() => alert("Press mais tempo")}
                  />
                )}
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
              />

              
            }
            
          </>;
}

