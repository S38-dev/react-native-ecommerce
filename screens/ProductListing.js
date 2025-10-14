import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from 'react';
import { Image, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { nanoid } from 'nanoid/non-secure';
import SearchBar from "../components/ProductSearchBar";
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Profile from './Profile'
import { loadMoreProduct } from "../Utils/Slice"

const ProductListing = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadingMore = useRef(true)
  const theme = useSelector((state) => state.slice.theme);
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchProduct = async () => {
      setData([])
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
;
      setPage(page + 1)

      const json = await res.json();

      const productsWithHeight = json.products.map(p => ({
        ...p,
        cardHeight: Math.floor(Math.random() * 80) + 170,
        key: nanoid()
      }));

      setData(productsWithHeight);
    };
    fetchProduct();
  }, []);


  
  const onSearch = async (input) => {
    setSearch(input)
    setPage(1);
    setOffset(0);

    if (!input || input == '') {

     const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
;
      const json = await res.json();
      const productsWithHeight = json.products.map(p => ({
        ...p,
        cardHeight: Math.floor(Math.random() * 80) + 170,
        key: nanoid()
      }));
      setData(productsWithHeight);
      return;
    }
    else {

      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);

      const json = await res.json();
      const productsWithHeight = json.products.map(p => ({
        ...p,
        cardHeight: Math.floor(Math.random() * 80) + 170,
        key: nanoid()
      }));
      setData(productsWithHeight);
    }

  }

  // const loadMore = async () => {

  //   setPage(page + 1)

  //   // setOffset((page - 1) * limit)
  //   const off = (page - 1) * limit
  //  console.log('off',off)
  //   setTimeout(async () => {
  //     const res = await fetch(https://dummyjson.com/products?limit=${limit}&skip=${off});
  //     const json = await res.json();
  //     const productsWithHeight = json.products.map(p => ({
  //       ...p,
  //       cardHeight: Math.floor(Math.random() * 80) + 170,
  //       key: nanoid()
  //     }));
  //     setData((prev) => [...prev, ...productsWithHeight]);
  //   }, 1000)
  //   // dispatch(loadMoreProduct({limit,off,setData}))

    


  // }
  const loadMore = async () => {
  if (isLoadingMore || search) return; 
  setIsLoadingMore(true);

  const off = page * limit; 
  setPage(prev => prev + 1);
   console.log('off',off)

  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);

    const json = await res.json();
    const productsWithHeight = json.products.map(p => ({
      ...p,
      cardHeight: Math.floor(Math.random() * 80) + 170,
      key: nanoid()
    }));
    setData(prev => [...prev, ...productsWithHeight]);
  } catch (err) {
    console.error('Error loading more products:', err);
  } finally {
    setIsLoadingMore(false);
  }
};


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#D0D0D0' : '#191818ff' }}>
        <View style={{ flexDirection: 'row', }}>

          <SearchBar search={search} onSearch={onSearch} />
          <Profile />
        </View>

        <MasonryList
          data={data}
          keyExtractor={(item, index) => item?.key}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 200,
            flexGrow: 1,
            marginBottom: 100,

          }}




          onEndReached={() => {
            console.log('Reached end, fetch more items!');
            loadMore()


          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore.current ? (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white mt-2">Loading more content...</Text>
              </View>
            ) : (
              <View className="py-4 items-center">
                <Text className="text-gray-400">No more content to load</Text>
              </View>
            )
          }

          renderItem={({ item, index }) => {


            const cardHeight = Math.floor(Math.random() * 80) + 170;

            return (
              <Pressable style={{ margin: 15, borderRadius: 30, overflow: 'hidden', backgroundColor: theme === 'light' ? '#ECEBF0' : '#121213ff', elevation: 4 }}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}

              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: '100%', height: item.cardHeight, borderRadius: 10 }}
                />
                <View style={{ padding: 10 }}>
                  <Text style={{ color: theme === 'light' ? '#000' : '#ffff', fontWeight: '800', fontSize: 16 }} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#969393', fontWeight: '200', fontSize: 11 }} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontWeight: '700', fontSize: 18 }}>${item.price}</Text>
                </View>
              </Pressable>
            );
          }
          }

        />

      </SafeAreaView>
    </SafeAreaProvider>

  );
};

export default ProductListing;