// app/index.tsx
import { Stack } from 'expo-router';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Search, Megaphone, Users, Plus, Scroll } from 'lucide-react-native';
// import { Ionicons } from '@expo/vector-icons';
import Feed from '~/components/Feed';
import Stories from '~/components/Stories';
import ProfileHeader from '~/components/ProfileHeader';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const post: any[] = [
    {
      id: 1,
      username: 'Annette',
      handle: '@annette_dev',
      text: 'Hello my friends! Testing out this new feed layout. Let’s see if everything works smoothly 😄',
      likes: 12,
      comments: 3,
      reposts: 1,
      views: '245',
      image: null,
      liked: false,
    },
    {
      id: 2,
      username: 'Sajon Islam',
      handle: '@sajonislam',
      text: 'A trip to the mountains 🌄 Nothing beats the peace and cold breeze up there!',
      likes: 204,
      comments: 18,
      reposts: 5,
      views: '3.4k',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
      liked: true,
    },
    {
      id: 3,
      username: 'Daniel Green',
      handle: '@dan_green',
      text: 'Just finished building my first React Native app! 🚀 Super proud of this milestone.',
      likes: 89,
      comments: 10,
      reposts: 2,
      views: '1.1k',
      image: null,
      liked: true,
    },
    {
      id: 4,
      username: 'Maria Lopez',
      handle: '@maria_lopez',
      text: 'Coffee + coding = perfect morning ☕👩‍💻',
      likes: 56,
      comments: 6,
      reposts: 1,
      views: '980',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
      liked: false,
    },
    {
      id: 5,
      username: 'Chris Allen',
      handle: '@chrisallen',
      text: 'The city lights never get old. 🌃',
      likes: 320,
      comments: 25,
      reposts: 9,
      views: '4.8k',
      image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade',
      liked: true,
    },
    {
      id: 6,
      username: 'Jane Doe',
      handle: '@jane.codes',
      text: 'Weekend hackathon success! Built a small AI that writes poetry 🤖✍️',
      likes: 110,
      comments: 12,
      reposts: 4,
      views: '2.2k',
      image: null,
      liked: true,
    },
    {
      id: 7,
      username: 'Liam Turner',
      handle: '@liamturner',
      text: 'Nothing but blue skies today! ☀️',
      likes: 43,
      comments: 2,
      reposts: 0,
      views: '512',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      liked: false,
    },
    {
      id: 8,
      username: 'Sophia Kim',
      handle: '@sophiakim',
      text: 'Experimenting with a new camera lens 📸 Loving the results so far!',
      likes: 92,
      comments: 8,
      reposts: 2,
      views: '1.5k',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      liked: true,
    },
    {
      id: 9,
      username: 'Alex Chen',
      handle: '@alexchen',
      text: 'If you’re learning React Native in 2025 — keep going! It’s worth it 💪🔥',
      likes: 178,
      comments: 22,
      reposts: 10,
      views: '3.9k',
      image: null,
      liked: true,
    },
    {
      id: 10,
      username: 'Olivia Martin',
      handle: '@oliviam',
      text: 'Late night debugging session… again 😅',
      likes: 67,
      comments: 9,
      reposts: 3,
      views: '1.3k',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769',
      liked: false,
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />

      <SafeAreaView className="flex-1 bg-black">
        <ScrollView className="flex-1 pt-3 " showsVerticalScrollIndicator={false}>
          <View className="h-[20rem] p-2">
            <View className="flex-row items-center justify-between px-5 py-3">
              <ProfileHeader />
              <NavIcon Icon={Search} label="Search" />
            </View>
            <Stories />
          </View>
          <View className="pb-20">
            {post.map((post) => (
              <Feed key={post.id} {...post} />
            ))}
          </View>
        </ScrollView>
        <FloatingNavigationBar />
      </SafeAreaView>
    </>
  );
}

function NavIcon({ Icon, label, active = false }: { Icon: any; label?: string; active?: boolean }) {
  return (
    <TouchableOpacity className="items-center">
      <Icon color={active ? '#FBBF24' : '#9CA3AF'} size={26} />
      <Text className={`mt-1 text-xs ${active ? 'text-yellow-400' : 'text-gray-400'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

type NavItem = {
  label: string;
  Icon: any;
};

const navItems: NavItem[] = [
  { label: 'Feed', Icon: User },
  { label: 'Ads', Icon: Megaphone },
  { label: 'Stories', Icon: Scroll },
  { label: 'Search', Icon: Search },
  // { label: 'Recommended', Icon: Users },
];

function FloatingNavigationBar() {
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
    <View className="absolute bottom-8 left-0 right-0 flex flex-row items-center justify-start">
      <View className="relative flex w-[70%] flex-row items-center justify-around overflow-hidden rounded-[2rem] bg-white px-2 py-4">
        <View className="absolute inset-0 p-2">
          <Animated.View
            onLayout={find_dimesions}
            style={{
              transform: [{ translateX }],
            }}
            className="h-full w-1/4 rounded-3xl bg-rose-400 p-2 shadow-lg"
          />
        </View>

        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center rounded-2xl"
            onPress={() => handlePress(index)}
            activeOpacity={0.8}>
            <item.Icon color={activeIndex === index ? 'white' : 'black'} size={27} />
            <Text className={`text-md ${activeIndex === index ? 'text-white' : 'text-black'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className="absolute right-4 flex items-center rounded-full bg-white px-5 py-4"
        activeOpacity={0.8}>
        <Users color={'black'} size={27} />
        <Text className={`text-md text-black`}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}
