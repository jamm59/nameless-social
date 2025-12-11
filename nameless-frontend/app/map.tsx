// app/map.tsx or wherever your map screen is
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Callout } from 'react-native-maps';

import * as Location from 'expo-location';

interface Shop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
}

const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Tesco Express',
    latitude: 51.5074, // Central London
    longitude: -0.1278,
    address: '22-28 Broadway, Westminster, London SW1H 0BH',
    rating: 4.3,
  },
  {
    id: '2',
    name: 'Pret A Manger',
    latitude: 51.5149,
    longitude: -0.1357,
    address: '47-49 Oxford St, Soho, London W1D 2EF',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Dishoom Shoreditch',
    latitude: 51.5246,
    longitude: -0.0784,
    address: '7 Boundary St, Shoreditch, London E2 7JE',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Sainsbury’s Local',
    latitude: 51.5014,
    longitude: -0.192,
    address: '136 Victoria St, Westminster, London SW1E 5LA',
    rating: 4.2,
  },
  {
    id: '5',
    name: 'The Breakfast Club',
    latitude: 51.518,
    longitude: -0.0795,
    address: '12-16 Artillery Ln, Spitalfields, London E1 7LS',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'LEON - King’s Cross',
    latitude: 51.5316,
    longitude: -0.1235,
    address: 'Kings Cross Station, London N1C 4AL',
    rating: 4.4,
  },
];
export default function ShopMap() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 51.5316,
    longitude: -0.1235,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const isUserInteracting = useRef(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Location Permission', 'We need location access to show nearby shops.');
        setLoading(false);
        return;
      }

      // let loc = await Location.getCurrentPositionAsync({});
      // setLocation(loc);
      // const newRegion = {
      //   latitude: loc.coords.latitude,
      //   longitude: loc.coords.longitude,
      //   latitudeDelta: 0.02,
      //   longitudeDelta: 0.02,
      // };
      // setRegion(newRegion);
      // mapRef.current?.animateToRegion(newRegion, 1000);
      setLoading(false);
    })();
  }, []);

  const handleRecenter = () => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapRef.current?.animateToRegion(newRegion, 800);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        style={{
          flex: 1,
        }}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={false}
        loadingEnabled
        onRegionChange={() => (isUserInteracting.current = true)}
        onRegionChangeComplete={(r) => {
          if (isUserInteracting.current) {
            setRegion(r);
            isUserInteracting.current = false;
          }
        }}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            anchor={{ x: 0.5, y: 0.5 }}>
            <View className="items-center">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-blue-500 shadow-md">
                <View className="h-4 w-4 rounded-full bg-white" />
              </View>
            </View>
          </Marker>
        )}

        {/* Shop Pins */}
        {mockShops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            title={shop.name}
            description={shop.address}>
            <View className="h-30 w-30 flex gap-2 rounded-lg bg-gray-100 p-2">
              <View className="w-full flex-1 rounded-full bg-sky-500 px-3 py-1 shadow-lg">
                <Text className="text-sm font-bold text-white">{shop.rating} ★</Text>
              </View>
              <Image
                className="w-full flex-1 rounded-full bg-white p-2 shadow-lg"
                width={50}
                height={50}
                source={{ uri: 'https://img.icons8.com/plasticine/100/shop.png' }}
              />
            </View>
            <Callout tooltip>
              <View className="mb-5 w-[10rem] rounded-xl bg-gray-100 p-3 shadow-lg">
                <Text className="py-1 text-lg font-bold leading-none text-gray-800">
                  {shop.name}
                </Text>
                <Text className="text-gray-600">{shop.address}</Text>

                <View className="mt-2 rounded-lg bg-green-500 px-2 py-2">
                  <Text className="text-sm font-bold text-white">Rating: {shop.rating} ★</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: '/restaurant/[id]',
                      params: { id: shop.id },
                    });
                  }}
                  className="mt-2 rounded-lg bg-white px-2 py-2 shadow-lg">
                  <Text className="text-center text-sm">Visit Shop</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Recenter Button */}
      <TouchableOpacity
        onPress={handleRecenter}
        className="absolute bottom-[10rem] right-5 rounded-full bg-white p-3 shadow-xl">
        <Ionicons name="locate" size={28} color="#10B981" />
      </TouchableOpacity>

      {/* Loading Overlay */}
      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-white/80">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="mt-3 text-base text-gray-700">Finding your location...</Text>
        </View>
      )}

      {/* Error Message */}
      {errorMsg && !loading && (
        <View className="absolute inset-0 items-center justify-center bg-white/90 p-5">
          <Text className="text-center text-red-500">{errorMsg}</Text>
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="mt-4 rounded-xl bg-green-500 px-6 py-3">
            <Text className="font-bold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
