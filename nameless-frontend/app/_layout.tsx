import '../global.css';
import { AuthProvider } from '~/context/AuthContext';
import { Stack, usePathname } from 'expo-router';
import BottomNavBAr from '~/components/BottomNavBar';

export default function Layout() {
  const pathname = usePathname();

  // Routes where the bottom bar should appear
  const showTabsOn = ['/', '/map', '/ads', '/orders', '/account'];

  const shouldShowBottomNav = showTabsOn.includes(pathname);

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="orders_modal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>

      {shouldShowBottomNav && <BottomNavBAr />}
    </AuthProvider>
  );
}
