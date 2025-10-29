// components/ProfileHeader.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { ChevronDown } from 'lucide-react-native';

export default function ProfileHeader() {
  return (
    <TouchableOpacity className="">
      <View className="flex-row items-center gap-2 space-x-3">
        <Image source={{ uri: 'https://i.pravatar.cc/80' }} className="h-20 w-20 rounded-full" />
        <View>
          <Text className="font-bold text-white">Sajon Islam</Text>
          <Text className="text-xs text-gray-400">@sajon.co</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
