import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import HomeScreen        from '../screens/HomeScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import CreateOrderScreen from '../screens/CreateOrderScreen';
import SettingsScreen    from '../screens/SettingsScreen';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }}>
      <Stack.Screen name="Home"        component={HomeScreen}        options={{ title: '📦 My Orders' }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
      <Stack.Screen name="CreateOrder" component={CreateOrderScreen} options={{ title: 'New Order' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tab.Screen name="Orders"   component={HomeStack}     options={{ tabBarIcon: () => <Text>📦</Text> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: () => <Text>⚙️</Text> }} />
    </Tab.Navigator>
  );
}
