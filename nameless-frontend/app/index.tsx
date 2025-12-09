import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { Restaurant, Promo } from '~/types';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBAr from '~/components/BottomNavBar';

const categories = ['Recommended', 'Pizza', 'Burger', 'Asian', 'Dessert', 'Drinks'] as const;

const mockPromos: Promo[] = [
  { id: 1, title: '20% Off First Order', image: 'https://picsum.photos/400/200?random=10' },
  {
    id: 2,
    title: 'Free Delivery on Orders Over $15',
    image: 'https://picsum.photos/400/200?random=11',
  },
];

const mockQuickPicks: Restaurant[] = [
  {
    id: 'qp1',
    name: 'Fresh Pizza Co.',
    image: 'https://picsum.photos/160/160?random=40',
    rating: 4.9,
    eta: '20 min',
    deals: 'New Arrival',
  },
  {
    id: 'qp2',
    name: 'Burger Bliss',
    image: 'https://picsum.photos/160/160?random=41',
    rating: 4.7,
    eta: '15 min',
  },
  {
    id: 'qp3',
    name: 'Sushi Spot',
    image: 'https://picsum.photos/160/160?random=42',
    rating: 4.8,
    eta: '25 min',
    deals: 'Limited Time',
  },
];

const mockNearby: Restaurant[] = [
  {
    id: 'n1',
    name: 'Local Grill',
    image: 'https://picsum.photos/300/200?random=50',
    rating: 4.6,
    eta: '18 min',
    deals: '10% Off',
  },
  {
    id: 'n2',
    name: 'Veggie Delight',
    image: 'https://picsum.photos/300/200?random=51',
    rating: 4.5,
    eta: '22 min',
  },
  {
    id: 'n3',
    name: 'Taco Haven',
    image: 'https://picsum.photos/300/200?random=52',
    rating: 4.9,
    eta: '12 min',
  },
];

export default function Home() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: 'delivery' | 'pickup' }>();
  const [search, setSearch] = useState('');
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

  const renderPromo = ({ item }: { item: Promo }) => (
    <View className="mx-2 mb-6 overflow-hidden rounded-2xl shadow-sm">
      <Image source={{ uri: item.image }} className="h-32 w-80" />
      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 p-3">
        <Text className="text-base font-semibold text-white">{item.title}</Text>
      </View>
    </View>
  );

  const renderQuickPick = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/restaurant/[id]',
          params: { id: item.id },
        })
      }
      className="mr-4 items-center">
      <Image
        source={{ uri: item.image }}
        className="mb-2 h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-md "
      />
      <Text className="text-center text-xs font-medium text-gray-800" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="mt-1 text-xs text-gray-500">{item.eta}</Text>
    </TouchableOpacity>
  );

  const renderNearby = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/restaurant/[id]',
          params: { id: item.id },
        })
      }
      className="mr-4 items-center">
      <View className="relative mb-2 aspect-video h-[10rem] items-center justify-center shadow-xl">
        <Image source={{ uri: item.image }} className="h-full w-full rounded-lg" />
        {item.deals && (
          <View className="absolute right-2 top-2 flex-row items-center justify-center gap-2 rounded-lg bg-rose-500 px-2 py-1 blur-sm">
            <Image
              source={{ uri: 'https://img.icons8.com/dotty/80/FFFFFF/sale-price-tag.png' }}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
            <Text className="text-sm text-white">{item.deals}</Text>
          </View>
        )}
      </View>
      <Text className="my-1 rounded-md bg-white p-2 text-gray-500 shadow-xl">About {item.eta}</Text>
      <View className="items-left flex w-full justify-start gap-1 p-2">
        <Text className="text-xl font-semibold text-gray-800" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="mt-1 text-gray-500">$0.7 Delivery fee . 0.7mi</Text>
        <Text className="text-gray-700 ">{item.rating}★(420)</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pb-6 pt-14">
        <View className="mb-2 flex-row items-center justify-between pt-[4rem]">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Good morning, Foodie!</Text>
            <Text className="text-sm text-gray-500">
              {mode === 'pickup' ? 'Pickup from' : 'Deliver to'} • 123 Foodie St
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#A7C7E7" />
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row items-center rounded-2xl bg-gray-50 px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder="Search dishes or restaurants"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={true}>
        <View className="mb-6 px-6">
          <FlatList
            data={categories}
            horizontal
            renderItem={renderCategoryChip}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mb-8 px-6">
          <Image
            source={{ uri: 'https://picsum.photos/600/300?random=90' }}
            className="h-40 w-full rounded-3xl"
          />
          <View className="absolute left-10 top-10 w-40">
            <Text className="text-xl font-bold text-white">A special dish</Text>
            <Text className="mt-1 text-white/80">Prepared just for you</Text>
          </View>
        </View>

        <View className="mb-6 px-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900">Quick Picks</Text>
          <FlatList
            data={mockQuickPicks}
            horizontal
            renderItem={renderQuickPick}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mb-6">
          <Text className="mb-4 px-6 text-lg font-semibold text-gray-900">Special Offers</Text>
          <FlatList
            data={mockPromos}
            horizontal
            renderItem={renderPromo}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 6 }}
          />
        </View>

        <View className="px-3 pb-[10rem]">
          <Text className="mb-4 ml-2 text-lg font-semibold text-gray-900">Nearby Restaurants</Text>
          <FlatList
            className="p-2"
            data={mockNearby}
            horizontal
            renderItem={renderNearby}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <BottomNavBAr></BottomNavBAr>
    </View>
  );
}
