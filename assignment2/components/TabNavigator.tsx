import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabNavigatorProps {
  activeTab: string;
  children: React.ReactNode;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, children }) => {
  const colorScheme = useColorScheme();

  const tabs = [
    { id: 'index', title: 'Home', icon: 'house.fill' },
    { id: 'categories', title: 'Categories', icon: 'folder.fill' },
    { id: 'animations', title: 'Animations', icon: 'sparkles' },
    { id: 'profile', title: 'Profile', icon: 'person.fill' },
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId === 'index') {
      router.push('/' as any);
    } else {
      router.push(`/${tabId}` as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <View style={styles.content}>
        {children}
      </View>
      
      <Animated.View entering={FadeIn.duration(500)} style={styles.tabBar}>
        <View style={[styles.tabBarContent, { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }]}>
          {tabs.map((tab) => (
            <Animated.View
              key={tab.id}
              layout={Layout.springify()}
              style={styles.tabItem}
            >
              <Button
                title=""
                onPress={() => handleTabPress(tab.id)}
                variant="outline"
                style={activeTab === tab.id ? [styles.tabButton, styles.activeTabButton] : styles.tabButton}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={activeTab === tab.id ? '#4f46e5' : (colorScheme === 'dark' ? '#9ca3af' : '#6b7280')}
                />
              </Button>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Space for tab bar
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBarContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 0,
  },
  activeTabButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
});
