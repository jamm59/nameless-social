import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import type { Restaurant } from '../types';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://picsum.photos/400/300?random=20',
    rating: 4.8,
    eta: '20–30 min',
    deals: 'Buy 1 Get 1 Free',
  },
  {
    id: '2',
    name: 'Burger Haven',
    image: 'https://picsum.photos/400/300?random=21',
    rating: 4.6,
    eta: '15–25 min',
  },
];

export default function Restaurants() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/restaurant/[id]',
          params: { id: item.id },
        })
      }
      className="mx-4 mb-4 overflow-hidden rounded-2xl bg-white shadow-md">
      <Image source={{ uri: item.image }} className="h-48 w-full" />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="mr-1 text-yellow-500">★</Text>
            <Text className="font-medium text-gray-700">{item.rating}</Text>
          </View>
          <Text className="text-gray-600">{item.eta}</Text>
        </View>
        {item.deals && (
          <View className="mt-3 self-start rounded-full bg-[#A7C7E7]/20 px-3 py-1">
            <Text className="font-medium text-[#A7C7E7]">{item.deals}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <Text className="mb-4 px-6 text-2xl font-bold text-gray-800">All Restaurants</Text>
      <FlatList
        data={mockRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
