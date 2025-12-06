import '../global.css';
import { AuthProvider } from '~/context/AuthContext';
import { Stack } from 'expo-router';
import BottomNavBAr from '~/components/BottomNavBar';

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {/* <BottomNavBAr /> */}
    </AuthProvider>
  );
}
