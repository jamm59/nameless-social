// app/order/[id].tsx  (or any modal route)
import { Link, useLocalSearchParams, router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function OrderTrackingModal() {
  const { id } = useLocalSearchParams();
  const isPresented = router.canGoBack();
  const [showInformation, setShowInformation] = useState<boolean>(false);

  // Mock route coordinates (London area)
  const routeCoordinates = [
    { latitude: 51.5074, longitude: -0.1278 },
    { latitude: 51.5124, longitude: -0.1328 },
    { latitude: 51.518, longitude: -0.14 },
  ];

  return (
    <View className="flex-1">
      {/* Full Screen Map */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.5124,
          longitude: -0.1328,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation>
        {/* Route Line */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#10B981"
          strokeWidth={6}
          lineCap="round"
          lineJoin="round"
        />

        {/* Pickup Marker */}
        <Marker coordinate={routeCoordinates[0]}>
          <View className="items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Text className="text-lg font-bold text-white">A</Text>
            </View>
          </View>
        </Marker>

        {/* Dropoff Marker */}
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
          <View className="items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
              <Text className="text-lg font-bold text-white">B</Text>
            </View>
          </View>
        </Marker>
      </MapView>

      {/* Top Status Bar */}
      {showInformation ? (
        <View className="absolute left-0 right-0 top-[6.5rem] px-5">
          <View className="rounded-2xl bg-white p-4 shadow-xl">
            <Text className="text-xs text-gray-500">Pickup point</Text>
            <Text className="mt-1 text-base font-semibold text-gray-900">
              456 Elm Street, London
            </Text>
          </View>

          <View className="mt-3 rounded-2xl bg-white p-4 shadow-xl">
            <Text className="text-xs text-gray-500">Where to go?</Text>
            <Text className="mt-1 text-base font-semibold text-gray-900">
              Office — 739 Main Street, London
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}

      {/* Driver Card (Bottom Sheet Style) */}
      <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              className="h-16 w-16 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-lg font-bold text-gray-900">Budi Susanto</Text>
              <Text className="text-sm text-gray-500">Driver</Text>
            </View>
          </View>

          <View className="items-end">
            <Text className="text-sm text-gray-700">Toyota Avanza Black</Text>
            <Text className="text-sm font-medium text-gray-900">B 1233 YH</Text>
          </View>
        </View>

        <View className="mt-5 flex-row justify-between border-t border-gray-100 pt-5">
          <View>
            <Text className="text-xs text-gray-500">Rating</Text>
            <Text className="text-lg font-bold text-yellow-500">5.0 ★</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Payment Method</Text>
            <Text className="text-sm font-medium text-gray-900">e-Wallet</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Travel Duration</Text>
            <Text className="text-sm font-medium text-gray-900">30 Minutes</Text>
          </View>
        </View>

        <View className="mt-4 flex-row justify-between">
          <View>
            <Text className="text-xs text-gray-500">Ride Fare</Text>
            <Text className="text-xl font-bold text-gray-900">£14.00</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Total fare</Text>
            <Text className="text-xl font-bold text-green-600">£4.00</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-sm italic text-gray-600">
            "Driver was friendly and the ride was smooth."
          </Text>
        </View>
      </View>

      {/* Close Button (top-left) */}
      {isPresented && (
        <View className="absolute top-0 z-10 h-[7rem] w-full flex-row items-center justify-between px-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-full bg-white p-3 shadow-lg">
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowInformation(!showInformation)}
            className="rounded-full bg-white p-3 shadow-lg">
            <Ionicons name="information" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
