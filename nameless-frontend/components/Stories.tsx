// components/Stories.tsx
import { ScrollView, View, Image, Text } from 'react-native';

const stories = [
  { id: 1, name: 'Savannah', avatar: 'https://i.pravatar.cc/80?img=1' },
  { id: 2, name: 'Cooper', avatar: 'https://i.pravatar.cc/80?img=2' },
  { id: 3, name: 'Howard', avatar: 'https://i.pravatar.cc/80?img=3' },
  { id: 4, name: 'Savannah', avatar: 'https://i.pravatar.cc/80?img=1' },
  { id: 5, name: 'Cooper', avatar: 'https://i.pravatar.cc/80?img=2' },
  // { id: 6, name: 'Howard', avatar: 'https://i.pravatar.cc/80?img=3' },
  // { id: 7, name: 'Savannah', avatar: 'https://i.pravatar.cc/80?img=1' },
  // { id: 8, name: 'Cooper', avatar: 'https://i.pravatar.cc/80?img=2' },
  // { id: 9, name: 'Howard', avatar: 'https://i.pravatar.cc/80?img=3' },
];

export default function Stories() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-3">
      <View className="mx-2 items-center overflow-hidden rounded-xl bg-white">
        <View className="flex h-20 w-40 flex-1 items-center justify-center bg-gray-400">
          <View className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
            {/* <Text className="text-lg">{'+'}</Text> */}
          </View>
        </View>
        <Text className="mt-1 p-2 text-xs">Add Stories</Text>
      </View>
      {stories.map((s) => (
        <View key={s.id} className="mx-2 items-center overflow-hidden rounded-xl bg-white">
          <View className="h-20 w-40 flex-1 bg-gray-400"></View>
          <Text className="mt-1 p-2 text-xs">{s.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
