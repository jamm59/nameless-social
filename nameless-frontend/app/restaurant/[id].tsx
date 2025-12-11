import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
];

export default function RestaurantDetail() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  // ---------- RENDER MENU ITEM ----------
  const renderMenuItem = ({ item }: { item: CartItem }) => (
    <MenuItem item={item} addToCart={addToCart} />
  );

  return (
    <View className="relative flex-1">
      <View className="absolute bottom-0 flex h-[8rem] w-full items-center justify-center bg-white px-8">
        <TouchableOpacity
          className="w-full rounded-[1.65rem] bg-blue-500 py-4 shadow-lg"
          onPress={() => router.push('/cart')}>
          <Text className="text-center text-xl font-bold text-white">Open Shopping Cart</Text>
          {/* <View className="flex items-center justify-center h-full font-bold bg-red-400 rounded aspect-square">
            <Text className="text-sm">{cartItems.length}</Text>
          </View> */}
        </TouchableOpacity>
      </View>
      <View className="h-[30%] bg-rose-500">
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

      {/* Menu Area */}
      <View className="-mt-4 h-[70%] py-2">
        <View className="flex items-center justify-center px-4 pt-6">
          {/* Search Bar */}
          <View className="mb-4 flex-row items-center rounded-2xl bg-gray-50 px-4 py-4">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-700"
              placeholder="Search dishes"
              value={search}
              onChangeText={setSearch}
            />

            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Menu List */}
          {mockMenu.length === 0 ? (
            <View className="w-1/2 items-center justify-center ">
              <Text className="text-center text-lg text-gray-600">
                No menu items available for this shop
              </Text>
            </View>
          ) : (
            <FlatList
              data={mockMenu}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

interface MenuItemProps {
  item: CartItem;
  addToCart: (item: CartItem) => void;
}

export function MenuItem({ item, addToCart }: MenuItemProps) {
  const [qty, setQty] = useState(item.qty ?? 1);

  const handleInc = () => setQty((q) => q + 1);
  const handleDec = () => setQty((q) => (q > 1 ? q - 1 : q));

  return (
    <View className="relative mb-5 items-center rounded-lg border border-gray-200 bg-white px-2 py-2">
      <View className="items-left flex w-full justify-start gap-1 p-1">
        <View className="w-full flex-row items-center justify-between py-1">
          <Text className="text-xl font-semibold text-gray-800" numberOfLines={1}>
            {item.name}
          </Text>

          <TouchableOpacity
            onPress={() => addToCart({ ...item, qty })}
            className="rounded bg-white px-3 py-1 shadow-xl">
            <Text className="text-xs font-semibold text-gray-600">+ Add to basket</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-3 text-sm text-gray-600">Fresh ingredients, classic taste</Text>
      </View>

      <View className="w-full flex-row items-center justify-between rounded-lg px-2 py-2">
        <View className="flex-row items-center rounded-full border border-neutral-200 bg-white shadow-sm">
          <Pressable onPress={handleDec} className="rounded-l-full bg-neutral-100 px-3 py-1">
            <Text className="text-lg font-semibold text-neutral-700">−</Text>
          </Pressable>

          <Text className="px-4 text-base font-bold text-neutral-900">{qty}</Text>

          <Pressable onPress={handleInc} className="rounded-r-full bg-neutral-100 px-3 py-1">
            <Text className="text-lg font-semibold text-neutral-700">+</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm font-black text-gray-700">XAF </Text>
          <Text className="text-xl font-normal text-gray-700">{item.price}</Text>
        </View>
      </View>
    </View>
  );
}
