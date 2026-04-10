import { Appbar, ListItem } from '@/components/customs';
import useMovies from '@/hooks/useMovies';
import { useSession } from '@/providers/SessionContext';
import { getPoster } from '@/services/API/tmdb';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme, Searchbar } from 'react-native-paper';



export default function HomeScreen() {
  const { signOut } = useSession() as { signOut: any };
  const router = useRouter();
  const theme = useTheme();
  const { movies, page, listMovies, setPage, setSearch, search } = useMovies()  as { movies: any[], page: any, setPage: any, listMovies: any, setSearch: any, search: any };
  const [query, setQuery] = useState('');
  const navigate = useRouter();

  useEffect(() => {
    listMovies();
  }, [page, search]);

  return  <>
            <Appbar 
              title="Home"
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
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.title || item.original_title}
                    subtitle={item.release_date}
                    poster={getPoster(item.poster_path)}
                    onPress={() => router.push({ pathname: '/movie', params: { id: item.id, item: JSON.stringify(item) } })}
                    onLongPress={() => alert("Press mais tempo")}
                  />
                )}
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
              /> 
            }
          </>;
}

