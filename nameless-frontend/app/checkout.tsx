import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Checkout() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-4 text-xl font-bold text-gray-800">Delivery Address</Text>
        <TextInput className="mb-2 rounded-lg bg-gray-100 px-4 py-3" placeholder="Street Address" />
        <View className="flex-row">
          <TextInput className="flex-1 rounded-l-lg bg-gray-100 px-4 py-3" placeholder="City" />
          <TextInput className="w-24 rounded-r-lg bg-gray-100 px-4 py-3" placeholder="ZIP" />
        </View>
      </View>
      <View className="mx-4 mb-8 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-4 text-xl font-bold text-gray-800">Payment</Text>
        <TouchableOpacity className="mb-2 rounded-lg bg-gray-100 p-4">
          <Text className="text-gray-600">**** **** **** 1234 (Visa)</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-lg border border-gray-300 p-4">
          <Text className="text-gray-600">Add New Card</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="mx-4 mb-8 rounded-xl bg-[#A7C7E7] py-4"
        onPress={() =>
          router.push({ pathname: '/tracking/[orderId]', params: { orderId: '123' } })
        }>
        <Text className="text-center font-bold text-white">Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
