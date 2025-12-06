// app/index.tsx
import { Link, Stack } from 'expo-router';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Search, Megaphone, Users, Plus, Scroll } from 'lucide-react-native';
// import { Ionicons } from '@expo/vector-icons';

import { useRef, useState } from 'react';
type NavItem = {
  label: string;
  Icon: any;
};

const navItems: NavItem[] = [
  { label: 'Home', Icon: User },
  { label: 'Ads', Icon: Megaphone },
  { label: 'Discouts', Icon: Scroll },
  { label: 'Search', Icon: Search },
  // { label: 'Recommended', Icon: Users },
];

export default function BottomNavBAr() {
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

  const handlePress = (index: number) => {
    setActiveIndex(index);
    Animated.spring(translateX, {
      toValue: index * sliderDimensions.width,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  return (
    <View className="absolute bottom-8 left-0 right-0 flex flex-row items-center justify-start py-1 pl-5">
      <View className="relative w-[70%] flex-row items-center justify-around overflow-hidden rounded-[2.2rem] bg-white px-2 py-4 shadow-xl">
        <View className="absolute inset-0 p-2">
          <Animated.View
            onLayout={find_dimesions}
            style={{
              transform: [{ translateX }],
            }}
            className="h-full w-1/4 rounded-[1.65rem] bg-[#A7C7E7] shadow-lg"
          />
        </View>

        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center rounded-2xl"
            onPress={() => handlePress(index)}
            activeOpacity={0.8}>
            <item.Icon color={activeIndex === index ? 'white' : 'black'} size={25} />
            <Text className={`text-sm ${activeIndex === index ? 'text-white' : 'text-black'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className="absolute right-4 flex items-center rounded-full bg-white px-5 py-4 shadow-md"
        activeOpacity={0.8}>
        <Users color={'black'} size={24} />
        <Text className={`text-sm text-black`}>Basket</Text>
      </TouchableOpacity>
    </View>
  );
}
