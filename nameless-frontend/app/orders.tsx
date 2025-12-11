// app/orders/history.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { ArrowDownToDotIcon, MapPinCheck } from 'lucide-react-native';

interface Order {
  id: string;
  pickup: string;
  destination: string;
  distance: string;
  price: string;
  date: string;
  driver?: {
    name: string;
    avatar: string;
    car: string;
    plate: string;
    rating: number;
  };
  isActive?: boolean;
}

const mockOrders: Order[] = [
  {
    id: '1',
    pickup: '456 Elm Street, London',
    destination: '739 Main Street, London',
    distance: '12km',
    price: '£12',
    date: 'Today, 14:32',
    isActive: true,
  },
  {
    id: '2',
    pickup: '456 Elm Street, London',
    destination: '739 Main Street, London',
    distance: '12km',
    price: '£12',
    date: 'Yesterday, 19:15',
    driver: {
      name: 'Budi Susanto',
      avatar: 'https://i.pravatar.cc/150?img=12',
      car: 'Toyota Avanza Black',
      plate: 'B 1233 YH',
      rating: 4.9,
    },
  },
  {
    id: '3',
    pickup: '22 Baker Street, London',
    destination: '10 Downing Street, London',
    distance: '5km',
    price: '£8',
    date: 'Today, 09:45',
    driver: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=32',
      car: 'Honda Civic Blue',
      plate: 'LJ 45 CVB',
      rating: 4.7,
    },
  },
  {
    id: '4',
    pickup: 'Liverpool Street Station, London',
    destination: 'Canary Wharf, London',
    distance: '7km',
    price: '£10',
    date: 'Tomorrow, 08:00',
    isActive: false,
  },
  {
    id: '5',
    pickup: 'Oxford Street, London',
    destination: 'Heathrow Airport, London',
    distance: '25km',
    price: '£30',
    date: 'Last Monday, 16:20',
    driver: {
      name: 'Mohammed Ali',
      avatar: 'https://i.pravatar.cc/150?img=45',
      car: 'Mercedes E-Class Silver',
      plate: 'HX 88 MAA',
      rating: 5.0,
    },
  },
  {
    id: '6',
    pickup: 'Camden Market, London',
    destination: 'Greenwich Park, London',
    distance: '15km',
    price: '£18',
    date: 'Today, 18:10',
    driver: {
      name: 'Emily Carter',
      avatar: 'https://i.pravatar.cc/150?img=21',
      car: 'Tesla Model 3 White',
      plate: 'EV 2025 UK',
      rating: 4.8,
    },
  },
  {
    id: '7',
    pickup: 'King’s Cross Station, London',
    destination: 'Hyde Park, London',
    distance: '9km',
    price: '£11',
    date: 'Yesterday, 12:05',
    isActive: false,
  },
];

export default function OrderHistory() {
  const router = useRouter();
  const activeOrder = mockOrders.find((o) => o.isActive);
  const pastOrders = mockOrders.filter((o) => !o.isActive);

  const OrderCard = ({ order }: { order: Order }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
      onPress={() => router.push('/orders_modal')}>
      <View className="p-4">
        <View className="mb-4">
          <View className="flex-row items-center">
            <ArrowDownToDotIcon color={'green'} size={25} />
            <Text className="ml-3 flex-1 text-base font-medium text-gray-800">{order.pickup}</Text>
          </View>
          <View
            className="ml-6 mt-2 border-l-2 border-dashed border-gray-300"
            style={{ height: 20 }}
          />
          <View className="flex-row items-center">
            <MapPinCheck color={'blue'} size={25} />
            <Text className="ml-3 flex-1 text-base text-gray-600">{order.destination}</Text>
          </View>
        </View>

        {/* Info Row */}
        <View className="flex-row justify-between text-sm">
          <Text className="text-gray-500">Distance</Text>
          <Text className="font-medium text-gray-800">{order.distance}</Text>
        </View>
        <View className="mt-1 flex-row justify-between">
          <Text className="text-gray-500">Payment</Text>
          <Text className="font-bold text-green-600">{order.price}</Text>
        </View>

        {/* Active Order Tag */}
        {order.isActive && (
          <View className="mt-4 self-start rounded-full bg-green-100 px-3 py-1">
            <Text className="text-lg font-semibold text-green-700">In Progress</Text>
          </View>
        )}

        {/* Driver Info (only past orders) */}
        {/* {order.driver && (
          <View className="pt-4 mt-4 border-t border-gray-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image source={{ uri: order.driver.avatar }} className="w-12 h-12 rounded-full" />
                <View className="ml-3">
                  <Text className="font-bold text-gray-800">{order.driver.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {order.driver.car} • {order.driver.plate}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-bold text-yellow-500">{order.driver.rating} ★</Text>
              </View>
            </View>
          </View>
        )} */}

        {/* Map Preview for Past Orders
        {order.driver && (
          <View className="h-48 mt-4 overflow-hidden rounded-xl">
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 51.5074,
                longitude: -0.1278,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              scrollEnabled={false}
              zoomEnabled={false}>
              <Marker coordinate={{ latitude: 51.5074, longitude: -0.1278 }} />
              <Marker coordinate={{ latitude: 51.5124, longitude: -0.1328 }} />
            </MapView>
          </View>
        )} */}

        <Text className="mt-3 text-right text-xs text-gray-400">{order.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-[5rem]">
      {/* Header */}
      <View className="bg-white px-6 py-5">
        <Text className="text-2xl font-bold text-gray-900">Order History</Text>
        <Text className="mt-1 text-sm text-gray-500">Showing all your order history</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Active Order */}
        {activeOrder && (
          <>
            <Text className="mb-3 text-lg font-bold text-gray-800">Active orders</Text>
            <OrderCard order={activeOrder} />
          </>
        )}

        {/* Past Orders */}
        <Text className="mb-3 mt-6 text-lg font-bold text-gray-800">Past orders</Text>
        {pastOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        <View className="h-32" />
      </ScrollView>
    </View>
  );
}
