import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Install if needed: expo install expo-linear-gradient
// Optional: import Icon from 'react-native-vector-icons/MaterialIcons'; for icons

import { CartItem } from '~/types';

const mockMenu: CartItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 1500,
    image: 'https://picsum.photos/500',
    qty: 1,
  },
  {
    id: '2',
    name: 'Cheeseburger',
    price: 900,
    image: 'https://picsum.photos/500',
    qty: 1,
  },
  // Add more
];

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    // Placeholder: API add to cart
  };

  const renderMenuItem = ({ item }: { item: CartItem }) => (
    <>
      <View
        // onPress={() => router.push(`/restaurant/${item.id}` as `/restaurant/${string}`)}
        className="relative mb-5 mr-4 items-center rounded-lg bg-white px-2 py-2">
        {/* <View className="relative mb-2 aspect-video h-[10rem] items-center justify-center shadow-xl">
          <Image source={{ uri: item.image }} className="w-full h-full rounded-lg" />
        </View> */}
        <View className="items-left flex w-full justify-start gap-1 p-1">
          <View className="w-full flex-row items-center justify-between px-2">
            <Text className="text-xl font-semibold text-gray-800" numberOfLines={1}>
              {item.name}
            </Text>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://img.icons8.com/ios/50/info--v1.png' }}
                className="rounded-full shadow-lg"
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text className="mb-3 text-sm text-gray-600">Fresh ingredients, classic taste</Text>
        </View>
        <View className="w-full flex-row items-center justify-between rounded-lg bg-white px-2 py-2 shadow-xl">
          <View className="flex-row items-center justify-center">
            <Text className="text-md font-black text-gray-700">XAF </Text>
            <Text className="text-lg font-normal text-gray-700">{item.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => addToCart(item)}
            className="rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white">
            <Text className="font-semibold text-white">{'+  '}Add to basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const [search, setSearch] = useState('');
  const categories = ['Recommended', 'Pizza', 'Burger', 'Asian', 'Dessert', 'Drinks'] as const;
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const renderCategoryChip = ({ item }: { item: (typeof categories)[number] }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      className={`mx-2 rounded-full px-4 py-2 ${
        selectedCategory === item ? 'bg-[#A7C7E7]' : 'bg-gray-100'
      }`}>
      <Text className={`font-medium ${selectedCategory === item ? 'text-white' : 'text-gray-700'}`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="relative flex-1">
      {/* Hero section with gradient overlay, inspired by DashBite */}
      <View className="h-[30%] flex-1 bg-rose-500">
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="mb-1 text-2xl font-black text-white">Pizza Palace</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-yellow-300">★</Text>
              <Text className="ml-1 text-lg font-bold text-white">4.8</Text>
              <Text className="ml-1 text-gray-200">(120 reviews)</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="mr-1 text-green-300">●</Text>
              <Text className="text-sm font-semibold text-white">25-35 min</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu section with rounded top */}
      <View className="relative -mt-4 h-[70%] py-2 pb-[10rem]">
        <View className="px-4 pt-6">
          {/* <Text className="mb-4 text-xl font-bold text-gray-800">Menu</Text> */}
          <View className="w-full flex-row items-center justify-center p-3">
            <View className="w-[85%] flex-row items-center rounded-2xl bg-gray-50 px-4 py-4">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="ml-3 flex-1 text-base text-gray-700"
                placeholder="Search dishes"
                value={search}
                onChangeText={setSearch}
              />
              {search ? (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity className="px-5" onPress={() => router.push('/checkout')}>
              <Ionicons name="cart" size={32} color="#A7C7E7" />
              <Text className="mr-2 font-bold text-gray-500">{cartItems.length}</Text>
            </TouchableOpacity>
          </View>

          {/* <View className="px-6 mb-6">
            <FlatList
              data={categories}
              horizontal
              renderItem={renderCategoryChip}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          <FlatList
            data={mockMenu}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} // Space for floating button
          />
        </View>
      </View>
    </View>
  );
}
