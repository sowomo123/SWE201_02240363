import React from 'react';
import { View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

import { TabNavigator } from '@/components/TabNavigator';
import HomeContent from '@/screens/HomeContent';
import CategoriesScreen from '@/screens/CategoriesScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import AnimationsScreen from '@/screens/AnimationsScreen';

export default function HomeScreen() {
  const { screen } = useGlobalSearchParams();
  const activeTab = (screen as string) || 'index';

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoriesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'animations':
        return <AnimationsScreen />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabNavigator activeTab={activeTab}>
        {renderContent()}
      </TabNavigator>
    </View>
  );
}
