// app/cart.tsx
import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Motorbike, PackageOpen } from 'lucide-react-native';

type DeliveryType = 'delivery' | 'pickup';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

const mockCart: CartItem[] = [
  { id: '1', name: 'Melting Cheese Pizza', price: 35.0, qty: 2 },
  { id: '2', name: 'Spinach & Chicken', price: 16.0, qty: 1 },
  { id: '3', name: 'Fresh Watermelon', price: 10.0, qty: 2 },
  { id: '4', name: 'Organic Spinach', price: 4.0, qty: 3 },
];

export default function Cart() {
  const router = useRouter();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Los Angeles, CA',
    phone: '+1 555-123-4567',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCart);

  // Load saved info (in real app you'd pull from AsyncStorage or your backend)
  useEffect(() => {
    // Example: AsyncStorage.getItem('@user_info')...
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = deliveryType === 'delivery' ? 4.99 : 0;
  const total = subtotal + deliveryFee;

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <View className="flex-row">
        {/* You can replace this with real images */}
        <View className="w-28 items-center justify-center bg-gray-100">
          <Text className="text-xs text-gray-400">Image</Text>
        </View>

        <View className="flex-1 justify-between p-4">
          <View>
            <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
            <Text className="mt-1 text-sm text-green-600">XAF {item.price.toFixed(2)}</Text>
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center rounded-full bg-gray-100">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, -1)}
                className="h-9 w-9 items-center justify-center">
                <Text className="text-xl font-bold text-gray-600">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 w-8 bg-white px-2 text-center text-lg font-semibold">
                {item.qty}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, 1)}
                className="h-9 w-9 items-center justify-center">
                <Text className="text-xl font-bold text-gray-600">+</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-md font-bold text-gray-900">
              XAF {(item.price * item.qty).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  type NavItem = {
    label: DeliveryType;
    Icon: any;
  };

  const navItems: NavItem[] = [
    { label: 'delivery', Icon: Motorbike },
    { label: 'pickup', Icon: PackageOpen },
  ];

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

  const handleCapitalise = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-[5rem]" showsVerticalScrollIndicator={false}>
        {/* Delivery / Pickup Toggle */}

        <View className="mb-2 flex-row items-center justify-center pt-[2rem]">
          <Text className="w-full text-center text-2xl font-bold text-gray-900">Order Basket</Text>
        </View>
        <View className="flex w-full items-center justify-center bg-white p-5">
          <View className="relative w-[70%] flex-row items-center justify-around overflow-hidden rounded-[2.2rem] px-2 py-3">
            <View className="absolute inset-0 p-2">
              <Animated.View
                onLayout={find_dimesions}
                style={{
                  transform: [{ translateX }],
                }}
                className="h-full w-1/2 rounded-[1.65rem] bg-white shadow-lg"
              />
            </View>

            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-1 items-center gap-1 rounded-2xl"
                onPress={() => {
                  handlePress(index);
                  setDeliveryType(item.label);
                }}
                activeOpacity={0.8}>
                <item.Icon color={'black'} size={24} />
                <Text className={`text-xs text-black`}>{handleCapitalise(item.label)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Confirm Details */}
        <View className="mb-6 bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-gray-800">Personal Details</Text>
          <Text className="text-base text-gray-700">
            {userInfo.firstName} {userInfo.lastName}
          </Text>
          {deliveryType === 'delivery' && (
            <Text className="mt-2 text-base text-gray-600">{userInfo.address}</Text>
          )}
          <Text className="mt-2 text-base text-gray-600">{userInfo.phone}</Text>

          <TouchableOpacity className="mt-4">
            <Text className="text-right text-sm font-medium text-gray-700">Change →</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <Text className="mb-4 text-xl font-bold text-gray-800">Your Items</Text>
        {cartItems.map((item) => (
          <View key={item.id}>{renderItem({ item })}</View>
        ))}
      </ScrollView>

      {/* Sticky Total Bar */}
      <View className="border-t border-gray-200 bg-white px-10 py-8 shadow-xl">
        <View className="mb-3 flex-row justify-between">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-md font-semibold">XAF {subtotal.toFixed(2)}</Text>
        </View>
        {deliveryType === 'delivery' && (
          <View className="mb-3 flex-row justify-between">
            <Text className="text-gray-600">Delivery Fee</Text>
            <Text className="text-sm font-semibold">XAF {deliveryFee.toFixed(2)}</Text>
          </View>
        )}
        <View className="flex-row justify-between py-5">
          <Text className="text-lg font-bold text-gray-900">Total</Text>
          <Text className="text-xl font-bold text-black">XAF {total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/checkout')}
          className="w-full rounded-[1.65rem] bg-[#A7C7E7] py-4 shadow-lg">
          <Text className="text-center text-base font-semibold text-white">
            Proceed to Checkout →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
