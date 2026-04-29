import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
  margin?: number;
  shadow?: boolean;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  padding = 16,
  margin = 0,
  shadow = true,
  variant = 'default',
}) => {
  const colorScheme = useColorScheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
      borderRadius: 16,
      padding,
      margin,
    };

    const variantStyles = {
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: shadow ? 0.1 : 0,
        shadowRadius: shadow ? 4 : 0,
        elevation: shadow ? 3 : 0,
      },
      elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...style,
    };
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={getCardStyle()}>{children}</View>;
};
