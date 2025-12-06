import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Assume installed

export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={{ uri: 'https://example.com/splash-bg.jpg' }} // Placeholder hero image
        resizeMode="cover"
        className="items-center justify-center flex-1 px-6">
        <LinearGradient
          colors={['rgba(167,199,231,0.8)', 'rgba(255,255,255,0.9)']}
          className="items-center justify-center flex-1 px-6 mx-4 rounded-3xl"
          style={{ flex: 0.8 }}>
          <Text className="mb-4 text-4xl font-bold text-center text-gray-800">Comfort Food</Text>
          <Text className="mb-8 text-xl font-medium text-center text-gray-600">
            Every day, foodie.
          </Text>
          <View className="flex-row p-1 mb-8 rounded-full bg-white/20">
            <TouchableOpacity
              className="flex-1 px-6 py-3 bg-white rounded-full"
              onPress={() => router.push('/(tabs)/index?mode=delivery')}>
              <Text className="font-semibold text-center text-gray-800">Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 px-6 py-3 bg-transparent rounded-full"
              onPress={() => router.push('/(tabs)/index?mode=pickup')}>
              <Text className="font-semibold text-center text-white">Pickup</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="rounded-full bg-[#B8E6A0] px-8 py-4"
            onPress={() => router.push('/(tabs)/index')}>
            <Text className="text-lg font-bold text-gray-800">Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
