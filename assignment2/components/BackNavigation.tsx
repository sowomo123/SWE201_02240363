import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface BackNavigationProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  transparent?: boolean;
}

export const BackNavigation: React.FC<BackNavigationProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightAction,
  transparent = false,
}) => {
  const colorScheme = useColorScheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[
        styles.container,
        { 
          backgroundColor: transparent 
            ? 'transparent' 
            : colorScheme === 'dark' ? '#1f2937' : '#ffffff'
        }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={[
                styles.backButton,
                { 
                  backgroundColor: colorScheme === 'dark' ? '#374151' : '#f3f4f6'
                }
              ]}
              activeOpacity={0.7}
            >
              <IconSymbol
                name="chevron.left"
                size={20}
                color={colorScheme === 'dark' ? '#ffffff' : '#111827'}
              />
            </TouchableOpacity>
          )}
        </View>

        {title && (
          <View style={styles.centerSection}>
            <Animated.Text
              entering={FadeIn.delay(200).duration(300)}
              style={[
                styles.title,
                { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }
              ]}
              numberOfLines={1}
            >
              {title}
            </Animated.Text>
          </View>
        )}

        <View style={styles.rightSection}>
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={[
                styles.rightButton,
                { 
                  backgroundColor: colorScheme === 'dark' ? '#374151' : '#f3f4f6'
                }
              ]}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={rightAction.icon as any}
                size={20}
                color={colorScheme === 'dark' ? '#ffffff' : '#111827'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44, // Status bar height
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
});
