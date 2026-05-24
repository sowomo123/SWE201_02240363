import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './store/AuthContext';
import { ProductProvider } from './store/ProductContext';
import { LoginScreen } from './screens/LoginScreen';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { ProductFormScreen } from './screens/ProductFormScreen';

const Stack = createStackNavigator();

// Auth wrapper component
const AuthWrapper: React.FC = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return null; // You could add a loading screen here
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {state.isAuthenticated ? (
        <>
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ title: 'Product Details' }}
          />
          <Stack.Screen
            name="ProductForm"
            component={ProductFormScreen}
            options={({ route }) => ({
              title: route.params?.productId ? 'Edit Product' : 'New Product',
            })}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AuthWrapper />
        </NavigationContainer>
      </ProductProvider>
    </AuthProvider>
  );
}
