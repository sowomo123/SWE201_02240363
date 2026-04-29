import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
  borderRadius?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor,
  progressColor,
  animated = true,
  borderRadius = 4,
}) => {
  const colorScheme = useColorScheme();
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated]);

  const defaultBackgroundColor = backgroundColor || (colorScheme === 'dark' ? '#374151' : '#e5e7eb');
  const defaultProgressColor = progressColor || (colorScheme === 'dark' ? '#6366f1' : '#4f46e5');

  return (
    <View style={[styles.container, { height, borderRadius, backgroundColor: defaultBackgroundColor }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            height,
            borderRadius,
            backgroundColor: defaultProgressColor,
            width: animated ? animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }) : `${progress * 100}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
