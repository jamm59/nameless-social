import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header({ title, rightAction }: any) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-2xl text-gray-400">←</Text>
      </TouchableOpacity>
      <Text className="text-xl font-bold text-gray-800">{title}</Text>
      <TouchableOpacity onPress={rightAction}>
        <Text className="font-medium text-[#A7C7E7]">{rightAction ? 'Edit' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
}
