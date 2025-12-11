import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Checkout() {
  const [readyToVerifyPayment, SetReadyToVerifyPayment] = useState<boolean>(false);
  const router = useRouter();

  const subtotal = 2000;
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handleStartPaymentProcess = () => {
    SetReadyToVerifyPayment(true);
  };
  return (
    <View className="flex-1 items-center justify-center bg-gray-200 p-2 pt-20">
      <ScrollView>
        {readyToVerifyPayment ? (
          <ScrollView className="min-h-[10rem] w-full bg-white p-3">
            <View className="flex-1 justify-between bg-white px-6 py-8">
              <View>
                <Text className="mb-4 text-xl font-bold text-gray-800">
                  Complete Payment on Your Phone
                </Text>

                <Text className="mb-2 text-base text-gray-700">
                  Dial this USSD code on your MTN phone
                </Text>

                <View className="mb-6 rounded-lg border border-yellow-400 bg-yellow-100 p-4">
                  <Text className="text-center text-lg font-semibold text-yellow-800">*126#</Text>
                </View>

                <Text className="mb-2 text-base font-semibold text-gray-800">
                  Steps to complete payment:
                </Text>

                {[
                  'Dial *126# on your MTN phone',
                  'Enter your Mobile Money PIN when prompted',
                  'Confirm the payment amount',
                  'Wait for confirmation SMS',
                ].map((step, index) => (
                  <Text key={index} className="mb-1 text-sm text-gray-700">
                    {index + 1}. {step}
                  </Text>
                ))}

                <Text className="mt-4 text-xs text-gray-500">
                  Note: You will be automatically redirected once payment is confirmed
                </Text>
              </View>

              <View className="mt-8 flex-row justify-between">
                <TouchableOpacity className="w-full rounded bg-rose-400 py-4 shadow-lg">
                  <Text className="text-center text-lg text-white">Cancel Payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            <TravelexCard />
            <View className="w-full flex-row items-center justify-around gap-1 bg-white p-5">
              <Text className="rounded bg-white px-2 py-2 shadow-md">MTN Mobile Money</Text>
              <Text className="rounded bg-white px-2 py-2 shadow-md">Orange Mobile Money</Text>
            </View>
            <View className="flex min-h-[10rem] w-full items-center justify-center gap-3 border-t border-t-gray-100 bg-white p-3">
              <TextInput
                className="w-full rounded bg-white px-3 py-4 text-base text-gray-700 shadow-lg"
                placeholder="Input Phone Number (e.g +237650564049)"
              />
              <TouchableOpacity
                onPress={() => handleStartPaymentProcess()}
                className="w-full rounded bg-blue-500 py-4 shadow-lg">
                <Text className="text-center text-lg text-white">Continue to Payment</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-[0.1rem] w-full bg-white px-10 py-8">
              <View className="mb-3 flex-row justify-between">
                <Text className="text-gray-600">Subtotal</Text>
                <Text className="font-semibold">XAF {subtotal.toFixed(2)}</Text>
              </View>
              {'delivery' === 'delivery' && (
                <View className="mb-3 flex-row justify-between">
                  <Text className="text-gray-600">Delivery Fee</Text>
                  <Text className="text-sm font-semibold">XAF {deliveryFee.toFixed(2)}</Text>
                </View>
              )}
              <View className="flex-row justify-between py-5">
                <Text className="text-xl font-bold text-gray-900">Total</Text>
                <Text className="text-2xl font-bold text-black">XAF {total.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function TravelexCard() {
  return (
    <View className="h-[17rem] w-full bg-white p-5">
      <View className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0a1d37] shadow-2xl">
        {/* Top text */}
        <View className="absolute left-6 top-6 z-10">
          <Text className="text-sm font-medium tracking-wider text-white">MTN | ORANGE</Text>
          <Text className="text-lg font-bold tracking-widest text-white">Mobile Money</Text>
        </View>

        {/* Top-right badge */}
        <View className="absolute right-6 top-6 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
          <Text className="text-xs font-semibold tracking-wider text-white">platinum prepaid</Text>
        </View>

        {/* Card number */}
        <View className="absolute bottom-16 left-6">
          <Text className="text-sm tracking-wider text-white/70">···· ···· ····</Text>
          <Text className="text-2xl font-medium tracking-widest text-white">1234</Text>
        </View>

        {/* Mastercard logo */}
        <View className="absolute bottom-12 right-6">
          <View className="flex-row">
            <View className="-mr-4 h-12 w-12 rounded-full bg-red-500" />
            <View className="h-12 w-12 rounded-full bg-yellow-500" />
          </View>
        </View>

        {/* Bottom checkmark (optional, if you want the confirmation style) */}
        <View className="absolute bottom-0 left-0 right-0 h-12 flex-row items-center justify-center bg-white/10">
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Text className="text-xl text-white">✓</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
