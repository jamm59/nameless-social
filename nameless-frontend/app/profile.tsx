import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import type { MenuItem, CartItem } from '../types';

const mockMenu: MenuItem[] = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, image: 'https://picsum.photos/400?random=30' },
  { id: '2', name: 'Pepperoni Feast', price: 15.99, image: 'https://picsum.photos/400?random=31' },
];

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-sm">
      <Image source={{ uri: item.image }} className="h-40 w-full rounded-xl" />
      <Text className="mt-3 text-lg font-bold text-gray-800">{item.name}</Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => addToCart(item)}
          className="rounded-full bg-[#B8E6A0] px-6 py-3">
          <Text className="font-bold text-gray-800">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: 'https://picsum.photos/400/300?random=25' }}
          className="h-64 w-full"
        />
        <View className="-mt-6 rounded-t-3xl bg-white px-6 pb-10 pt-6">
          <Text className="text-3xl font-bold text-gray-800">Pizza Palace</Text>
          <Text className="mt-1 text-gray-600">★ 4.8 • Italian • $$</Text>

          <FlatList
            data={mockMenu}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            className="mt-6"
          />
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/cart')}
          className="absolute bottom-0 left-0 right-0 mx-6 mb-8 rounded-2xl bg-[#A7C7E7] py-5">
          <Text className="text-center text-lg font-bold text-white">
            View Cart • {cart.reduce((sum, i) => sum + i.qty, 0)} items
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
