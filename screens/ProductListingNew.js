import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from 'react';
import { Image, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { nanoid } from 'nanoid/non-secure';
import SearchBar from "../components/ProductSearchBar";
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Profile from './Profile';
import { loadMoreProduct,Search } from "../Utils/Slice";

const ProductListing = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.slice.theme);
  const products = useSelector(state => state.slice.products);
  const loadingMore = useSelector(state => state.slice.loadingMore);
  const [search, setSearch] = useState('');
 const searchResults = useSelector(state => state.slice.searchProduct);

  const [page, setPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    dispatch(loadMoreProduct({ limit, off: 0 }));
    setPage(1);
  }, []);

  const onSearch = async (input) => {
    setSearch(input);
    setPage(0);
    if (!input) {
      dispatch(loadMoreProduct({ limit, off: 0 }));
    } else {
    //   const res = await fetch(`https://dummyjson.com/products/search?q=${input}`);
    //   const json = await res.json();
    //   const productsWithHeight = json.products.map(p => ({
    //     ...p,
    //     cardHeight: Math.floor(Math.random() * 80) + 170,
    //     key: nanoid(),
    //   }));
    //   setSearchResults(productsWithHeight);
     dispatch(Search({ input}));

    }
  };

  const loadMore = () => {
    if (loadingMore || search) return;
    const off = page * limit;
    setPage(prev => prev + 1);
    dispatch(loadMoreProduct({ limit, off }));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#D0D0D0' : '#191818ff' }}>
        <View style={{ flexDirection: 'row' }}>
          <SearchBar search={search} onSearch={onSearch} />
          <Profile />
        </View>

        <MasonryList
          data={search ? searchResults : products}
          keyExtractor={(item) => item?.key}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 200, flexGrow: 1, marginBottom: 100 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                <ActivityIndicator size="small" color="white" />
                <Text style={{ color: 'white', marginTop: 8 }}>Loading more content...</Text>
              </View>
            ) : (
              <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                <Text style={{ color: '#969393' }}>No more content to load</Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <Pressable
              style={{ margin: 15, borderRadius: 30, overflow: 'hidden', backgroundColor: theme === 'light' ? '#ECEBF0' : '#121213ff', elevation: 4 }}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: item.cardHeight, borderRadius: 10 }} />
              <View style={{ padding: 10 }}>
                <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontWeight: '800', fontSize: 16 }} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={{ color: '#969393', fontWeight: '200', fontSize: 11 }} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontWeight: '700', fontSize: 18 }}>${item.price}</Text>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductListing;