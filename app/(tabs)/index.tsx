import { Appbar, FAB, ListItem } from '@/components/customs';
import useMovies from '@/hooks/useMovies';
import { useSession } from '@/providers/SessionContext';
import { getPoster } from '@/services/API/tmdb';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';


export default function HomeScreen() {
  const { signOut } = useSession() as { signOut: any };
  const router = useRouter();
  const theme = useTheme();
  const { movies, page, listMovies, setPage, setSearch, search } = useMovies()  as { movies: any[], page: any, setPage: any, listMovies: any, setSearch: any, search: any };
  const [query, setQuery] = useState('');

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
              placeholder="Buscar filme..."
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                setSearch(text);
                setPage(1);
              }}
              style={{ margin: 10 }}
            />
            {

              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    color={theme.colors.secondary}
                    title={item.title || item.original_title}
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
            <FAB 
              icon="plus"
              color= "white"
              style={{
                ...styles.fab,
                backgroundColor: theme.colors.secondary,
              }}
              onPress={() => router.push('/item')}
            />
          </>;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})