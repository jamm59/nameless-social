// app/index.tsx
import { RelativePathString, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Birdhouse, User, Scroll, ListOrdered, ShoppingBag } from 'lucide-react-native';
// import { Ionicons } from '@expo/vector-icons';<ListOrdered />

type AllowedPath = '/' | '/map' | '/orders' | '/ads' | '/cart' | '/account';

import { useRef, useState } from 'react';
type NavItem = {
  label: string;
  Icon: any;
  path: AllowedPath;
};

const navItems: NavItem[] = [
  { label: 'Home', Icon: Birdhouse, path: '/' },
  { label: 'Maps', Icon: Scroll, path: '/map' },
  { label: 'Orders', Icon: ListOrdered, path: '/orders' },
  { label: 'Account', Icon: User, path: '/account' },
  { label: 'Basket', Icon: ShoppingBag, path: '/cart' },
  // { label: 'Recommended', Icon: Users },
];

export default function BottomNavBAr() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const [sliderDimensions, setSliderDimensions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  function find_dimesions(event: any) {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSliderDimensions({
      x,
      y,
      width: Math.floor(width),
      height: Math.floor(height),
    });
  }

  const handlePress = (index: number, path: AllowedPath) => {
    if (!path) return;

    if (path === '/cart') return router.push(`${path}` as RelativePathString);

    router.replace(`${path}` as RelativePathString);
    setActiveIndex(index);
    Animated.spring(translateX, {
      toValue: index * sliderDimensions.width,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  // const redirectTo = (path: string) => router.push(`/${path.toLowerCase()}`);

  return (
    <View className="absolute bottom-0 left-0 right-0 flex h-[8rem] flex-row items-center justify-center bg-white py-2">
      <View className="relative w-[85%] flex-row items-center justify-around overflow-hidden rounded-[2.2rem] bg-white px-2 py-4">
        <View className="absolute inset-0 p-2">
          <Animated.View
            onLayout={find_dimesions}
            style={{
              transform: [{ translateX }],
            }}
            className="h-full w-1/5 rounded-[1.65rem] bg-[#A7C7E7] shadow-lg"
          />
        </View>

        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center rounded-2xl"
            onPress={() => handlePress(index, item.path)}
            activeOpacity={0.8}>
            <item.Icon color={activeIndex === index ? 'white' : 'black'} size={25} />
            <Text className={`text-sm ${activeIndex === index ? 'text-white' : 'text-black'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
