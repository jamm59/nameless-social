import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

export default function Tracking() {
  const { orderId } = useLocalSearchParams();
  const [status, setStatus] = useState('preparing'); // preparing, out-for-delivery, delivered

  useEffect(() => {
    // Placeholder: Poll API for status
    const interval = setInterval(() => {
      if (status === 'preparing') setStatus('out-for-delivery');
      else if (status === 'out-for-delivery') setStatus('delivered');
    }, 5000);
    return () => clearInterval(interval);
  }, [status]);

  const steps = [
    { title: 'Order Confirmed', completed: true },
    { title: 'Preparing', completed: status !== 'preparing' },
    { title: 'Out for Delivery', completed: status === 'delivered' },
    { title: 'Delivered', completed: status === 'delivered' },
  ];

  return (
    <View className="flex-1 px-4 pt-8 bg-white">
      <Text className="mb-8 text-2xl font-bold text-gray-800">Order #{orderId}</Text>
      <View className="items-center mb-8">
        <View className="mb-2 h-20 w-20 items-center justify-center rounded-full bg-[#B8E6A0]">
          <Text className="text-2xl font-bold">✓</Text>
        </View>
        <Text className="text-lg font-bold text-gray-800">
          {status.replace('-', ' ').toUpperCase()}
        </Text>
      </View>
      <View className="mb-8">
        {steps.map((step, index) => (
          <View key={index} className="flex-row items-center mb-4">
            <View
              className={`h-8 w-8 rounded-full ${step.completed ? 'bg-[#A7C7E7]' : 'bg-gray-200'} mr-4 items-center justify-center`}>
              <Text className={`${step.completed ? 'text-white' : 'text-gray-400'}`}>
                {index + 1}
              </Text>
            </View>
            <Text className={`${step.completed ? 'text-gray-600' : 'text-gray-300'}`}>
              {step.title}
            </Text>
          </View>
        ))}
      </View>
      <Image
        source={{ uri: 'https://example.com/map-placeholder.jpg' }}
        className="w-full h-40 mb-4 rounded-lg"
      />
      <Text className="text-center text-gray-600">ETA: 10 min</Text>
    </View>
  );
}
