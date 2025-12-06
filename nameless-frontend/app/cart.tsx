import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CartItem } from '~/types';

const mockCart = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, qty: 1 },
  { id: '2', name: 'Cheeseburger', price: 8.99, qty: 2 },
];

export default function Cart() {
  const [items, setItems] = useState(mockCart);
  const router = useRouter();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateQty = (id: string, delta: number): void => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
          .filter((item) => item.qty > 0) // optional: remove item when qty reaches 0
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="mb-3 flex-row items-center justify-between rounded-xl bg-white p-4">
      <View className="flex-1">
        <Text className="font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-600">${item.price}</Text>
      </View>
      <View className="ml-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => updateQty(item.id, -1)}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Text className="text-gray-600">-</Text>
        </TouchableOpacity>
        <Text className="mx-3 font-bold">{item.qty}</Text>
        <TouchableOpacity
          onPress={() => updateQty(item.id, 1)}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Text className="text-gray-600">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="mb-4 text-2xl font-bold text-gray-800">Your Cart</Text>
      <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View className="mt-4 rounded-xl bg-white p-4">
        <View className="mb-2 flex-row justify-between">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="font-bold">${subtotal.toFixed(2)}</Text>
        </View>
        <View className="mb-4 flex-row justify-between">
          <Text className="text-gray-600">Delivery Fee</Text>
          <Text className="text-green-500">Free</Text>
        </View>
        <View className="border-t border-gray-200 pt-2">
          <Text className="text-lg font-bold text-gray-800">Total: ${subtotal.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="mt-6 rounded-xl bg-[#B8E6A0] py-4"
        onPress={() => router.push('/checkout')}>
        <Text className="text-center font-bold text-gray-800">Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
