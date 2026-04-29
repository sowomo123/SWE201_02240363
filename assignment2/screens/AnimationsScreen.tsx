import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  FadeIn,
  FadeInUp,
  FadeInDown,
  FadeOut,
  SlideInRight,
  SlideInLeft,
  SlideOutRight,
  Layout,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BackNavigation } from '@/components/BackNavigation';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: screenWidth } = Dimensions.get('window');

export default function AnimationsScreen() {
  const colorScheme = useColorScheme();
  const [showFadeDemo, setShowFadeDemo] = useState(true);
  const [showSlideDemo, setShowSlideDemo] = useState(true);
  const [showScaleDemo, setShowScaleDemo] = useState(true);
  const [showBounceDemo, setShowBounceDemo] = useState(true);
  
  // Gesture animation values
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  
  // Progress animation
  const progress = useSharedValue(0);
  
  // Scale animation
  const scale = useSharedValue(1);
  
  // Rotation animation
  const rotation = useSharedValue(0);

  // Gesture handler
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = dragX.value;
      context.startY = dragY.value;
    },
    onActive: (event, context) => {
      dragX.value = context.startX + event.translationX;
      dragY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      dragX.value = withSpring(0);
      dragY.value = withSpring(0);
    },
  });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: dragX.value },
      { translateY: dragY.value },
    ],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseScale = useSharedValue(1);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
      true
    );
  }, []);

  const startProgressAnimation = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 2000 });
  };

  const startScaleAnimation = () => {
    scale.value = withSequence(
      withTiming(0.5, { duration: 200 }),
      withTiming(1.5, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
  };

  const startRotationAnimation = () => {
    rotation.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(0, { duration: 0 })
    );
  };

  const resetAnimations = () => {
    setShowFadeDemo(false);
    setShowSlideDemo(false);
    setShowScaleDemo(false);
    setShowBounceDemo(false);
    
    setTimeout(() => {
      setShowFadeDemo(true);
      setShowSlideDemo(true);
      setShowScaleDemo(true);
      setShowBounceDemo(true);
    }, 100);
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <BackNavigation 
        title="Animation Demos"
        rightAction={{
          icon: 'arrow.clockwise',
          onPress: resetAnimations
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Fade In/Out Animations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Fade Animations
          </Text>
          <View style={styles.animationRow}>
            {showFadeDemo && (
              <>
                <Animated.View entering={FadeIn.duration(800)}>
                  <Card style={styles.demoCard}>
                    <IconSymbol name="star.fill" size={24} color="#4f46e5" />
                    <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      Fade In
                    </Text>
                  </Card>
                </Animated.View>
                
                <Animated.View entering={FadeInUp.duration(800).delay(200)}>
                  <Card style={styles.demoCard}>
                    <IconSymbol name="arrow.up" size={24} color="#10b981" />
                    <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      Fade In Up
                    </Text>
                  </Card>
                </Animated.View>
                
                <Animated.View entering={FadeInDown.duration(800).delay(400)}>
                  <Card style={styles.demoCard}>
                    <IconSymbol name="arrow.down" size={24} color="#f59e0b" />
                    <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      Fade In Down
                    </Text>
                  </Card>
                </Animated.View>
              </>
            )}
          </View>
        </View>

        {/* Slide Animations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Slide Animations
          </Text>
          <View style={styles.animationRow}>
            {showSlideDemo && (
              <>
                <Animated.View entering={SlideInLeft.duration(800)}>
                  <Card style={styles.demoCard}>
                    <IconSymbol name="arrow.left" size={24} color="#ef4444" />
                    <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      Slide Left
                    </Text>
                  </Card>
                </Animated.View>
                
                <Animated.View entering={SlideInRight.duration(800).delay(200)}>
                  <Card style={styles.demoCard}>
                    <IconSymbol name="arrow.right" size={24} color="#8b5cf6" />
                    <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      Slide Right
                    </Text>
                  </Card>
                </Animated.View>
              </>
            )}
          </View>
        </View>

        {/* Scale and Bounce Animations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Scale & Bounce
          </Text>
          <View style={styles.animationRow}>
            {showScaleDemo && (
              <Animated.View entering={FadeIn.duration(800)}>
                <Animated.View style={[styles.demoCard, scaleStyle]}>
                  <IconSymbol name="square.resize" size={24} color="#06b6d4" />
                  <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                    Scale
                  </Text>
                </Animated.View>
              </Animated.View>
            )}
            
            {showBounceDemo && (
              <Animated.View entering={FadeIn.duration(800).delay(200)}>
                <Animated.View style={[styles.demoCard, pulseStyle]}>
                  <IconSymbol name="heart.fill" size={24} color="#ef4444" />
                  <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                    Pulse
                  </Text>
                </Animated.View>
              </Animated.View>
            )}
            
            <Animated.View entering={FadeIn.duration(800).delay(400)}>
              <Animated.View style={[styles.demoCard, rotationStyle]}>
                <IconSymbol name="arrow.clockwise" size={24} color="#4f46e5" />
                <Text style={[styles.demoText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  Rotate
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </View>

        {/* Interactive Animations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Interactive Animations
          </Text>
          
          {/* Draggable Card */}
          <Card style={styles.interactiveCard}>
            <Text style={[styles.interactiveTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
              Drag Me Around!
            </Text>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
              <Animated.View style={[styles.draggableCard, dragStyle]}>
                <IconSymbol name="hand.draw" size={32} color="#4f46e5" />
                <Text style={[styles.dragText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  Draggable
                </Text>
              </Animated.View>
            </PanGestureHandler>
          </Card>

          {/* Progress Animation */}
          <Card style={styles.interactiveCard}>
            <Text style={[styles.interactiveTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
              Progress Animation
            </Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb' }]}>
                <Animated.View style={[styles.progressFill, progressStyle]} />
              </View>
            </View>
            <Button
              title="Start Progress"
              onPress={startProgressAnimation}
              variant="primary"
              style={styles.actionButton}
            />
          </Card>

          {/* Control Buttons */}
          <Card style={styles.interactiveCard}>
            <Text style={[styles.interactiveTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
              Control Animations
            </Text>
            <View style={styles.buttonRow}>
              <Button
                title="Scale"
                onPress={startScaleAnimation}
                variant="outline"
                style={styles.controlButton}
              />
              <Button
                title="Rotate"
                onPress={startRotationAnimation}
                variant="outline"
                style={styles.controlButton}
              />
            </View>
          </Card>
        </View>

        {/* Layout Animation Demo */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Layout Animation
          </Text>
          <Card style={styles.layoutCard}>
            <Text style={[styles.layoutText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
              Cards automatically animate when they reposition
            </Text>
            <View style={styles.layoutGrid}>
              {[1, 2, 3, 4].map((item) => (
                <Animated.View
                  key={item}
                  entering={FadeIn.duration(600).delay(item * 100)}
                  layout={Layout.springify()}
                >
                  <Card style={styles.layoutItem}>
                    <Text style={[styles.layoutItemText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      {item}
                    </Text>
                  </Card>
                </Animated.View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  animationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12,
  },
  demoCard: {
    alignItems: 'center',
    padding: 20,
    minWidth: 100,
    maxWidth: 120,
  },
  demoText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  interactiveCard: {
    padding: 20,
    marginBottom: 16,
  },
  interactiveTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  draggableCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  dragText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  actionButton: {
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flex: 1,
  },
  layoutCard: {
    padding: 20,
  },
  layoutText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  layoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 12,
  },
  layoutItem: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
  },
  layoutItemText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
