import { useState, useEffect, useCallback } from 'react';
import notificationService from '@/services/notificationService';

export const usePushNotifications = () => {
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [scheduledNotifications, setScheduledNotifications] = useState<any[]>([]);

  useEffect(() => {
    initializeNotifications();
    setupNotificationChannel();
  }, []);

  const initializeNotifications = async () => {
    try {
      const hasPermission = await notificationService.requestPermissions();
      setPermissionStatus(hasPermission ? 'granted' : 'denied');
      
      if (hasPermission) {
        const token = await notificationService.getPushToken();
        setPushToken(token);
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      setPermissionStatus('denied');
    }
  };

  const setupNotificationChannel = async () => {
    await notificationService.setupNotificationChannel();
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const granted = await notificationService.requestPermissions();
      setPermissionStatus(granted ? 'granted' : 'denied');
      
      if (granted) {
        const token = await notificationService.getPushToken();
        setPushToken(token);
      }
      
      return granted;
    } catch (error) {
      console.error('Failed to request permission:', error);
      return false;
    }
  };

  const sendNotification = useCallback(async (title: string, body: string, delaySeconds?: number) => {
    try {
      const notificationId = await notificationService.scheduleNotification(title, body, delaySeconds || 0);
      await refreshScheduledNotifications();
      return notificationId;
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }, []);

  const cancelNotification = useCallback(async (notificationId: string) => {
    try {
      await notificationService.cancelNotification(notificationId);
      await refreshScheduledNotifications();
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      throw error;
    }
  }, []);

  const cancelAllNotifications = useCallback(async () => {
    try {
      await notificationService.cancelAllNotifications();
      await refreshScheduledNotifications();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      throw error;
    }
  }, []);

  const scheduleRepeatingNotification = useCallback(async (title: string, body: string, intervalSeconds: number) => {
    try {
      await notificationService.scheduleRepeatingNotification(title, body, intervalSeconds);
      await refreshScheduledNotifications();
    } catch (error) {
      console.error('Failed to schedule repeating notification:', error);
      throw error;
    }
  }, []);

  const refreshScheduledNotifications = async () => {
    try {
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
    }
  };

  return {
    permissionStatus,
    pushToken,
    scheduledNotifications,
    requestPermission,
    sendNotification,
    cancelNotification,
    cancelAllNotifications,
    scheduleRepeatingNotification,
    refreshScheduledNotifications,
  };
};
