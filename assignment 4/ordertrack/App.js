import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AppNavigator from './app/navigation/AppNavigator';
import { notificationService } from './app/notifications/notificationService';

// Global handler: controls how notifications appear when app is in FOREGROUND
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const navigationRef = useRef(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Initialize: request permissions + register push token
    notificationService.initialize();

    // Foreground listener: notification arrives while app is open
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Foreground notification:', notification);
        // You can update global state / show toast here
      });

    // Tap listener: user taps a notification (foreground OR background)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        // Navigate to the correct screen using deep-link data
        if (data?.screen && navigationRef.current) {
          navigationRef.current.navigate(data.screen, { orderId: data.orderId });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
}
