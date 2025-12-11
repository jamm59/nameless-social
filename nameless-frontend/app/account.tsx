// app/account.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccountScreen() {
  const user = {
    name: 'Ethan Cole',
    email: 'ethan.cole@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Account Information', route: '/account/info' },
    { icon: 'lock-closed-outline', title: 'Change Password', route: '/account/password' },
    { icon: 'phone-portrait-outline', title: 'Device', route: '/account/device' },
    { icon: 'card-outline', title: 'Connect to Banks', route: '/account/banks' },
    { icon: 'settings-outline', title: 'Settings', route: '/settings' },
    { icon: 'help-circle-outline', title: 'Help & Support', route: '/support' },
    { icon: 'information-circle-outline', title: 'About', route: '/about' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center justify-center bg-rose-500 pt-[6rem]">
          <View className="w-full flex-row justify-between gap-1 rounded-xl p-5">
            <Image
              source={{ uri: user.avatar }}
              className="h-20 w-20 rounded-full border-4 border-white shadow-xl"
            />
            <View className="rounded-md p-2">
              <Text className="text-2xl font-bold text-white">{user.name}</Text>
              <Text className="text-white/80">{user.email}</Text>
            </View>

            <TouchableOpacity className="flex items-center justify-center rounded-full bg-white/20 px-7 py-2">
              <Text className="text-center font-medium text-white">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View className="px-6 pt-8">
          <Text className="mb-4 text-lg font-bold text-gray-800">Account Settings</Text>

          {menuItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center border-b border-gray-100 py-4">
              <Ionicons name={item.icon as any} size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-700">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View className="mx-6 mt-8">
          <Text className="mb-4 text-lg font-bold text-gray-800">Settings</Text>

          {menuItems.slice(4).map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center border-b border-gray-100 py-4 last:border-0">
              <Ionicons name={item.icon as any} size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-700">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-32" />
      </ScrollView>
    </View>
  );
}
