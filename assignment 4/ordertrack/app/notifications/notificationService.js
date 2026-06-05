import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { apiService } from '../api/apiService';

class NotificationService {
  pushToken = null;

  // ─── Setup ───────────────────────────────────────────────────────────────

  async initialize() {
    await this.registerAndroidChannel();
    await this.requestPermissions();
    await this.registerPushToken();
  }

  // Create Android notification channel (required for Android 8+)
  async registerAndroidChannel() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('order-updates', {
        name: 'Order Updates',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6366f1',
        sound: 'default',
        description: 'Notifications for order status changes',
      });

      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
        description: 'Scheduled order reminders',
      });
    }
  }

  // ─── Permissions ─────────────────────────────────────────────────────────

  async requestPermissions() {
    if (!Device.isDevice) {
      console.warn('Push notifications require a physical device.');
      return 'unavailable';
    }

    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return 'granted';

    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  }

  async getPermissionStatus() {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  // ─── Push Token ──────────────────────────────────────────────────────────

  async registerPushToken() {
    try {
      if (!Device.isDevice) return null;

      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') return null;

      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-eas-project-id', // replace with your EAS project ID
      });

      this.pushToken = tokenData.data;
      console.log('Expo Push Token:', this.pushToken);

      // Send token to your backend for storage
      await apiService.registerToken(this.pushToken);

      return this.pushToken;
    } catch (error) {
      console.error('Failed to get push token:', error);
      return null;
    }
  }

  // ─── Local Notifications ─────────────────────────────────────────────────

  // Schedule a one-time reminder (e.g. "Rate your order in 1 hour")
  async scheduleOrderReminder(orderId, orderName, delaySeconds = 3600) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⭐ How was your order?',
        body: `Tap to rate your order: ${orderName}`,
        data: { screen: 'OrderDetail', orderId },
        sound: 'default',
        categoryIdentifier: 'order-review',
      },
      trigger: {
        seconds: delaySeconds,
        channelId: 'reminders',
      },
    });
    return id;
  }

  // Schedule a daily tracking reminder at a specific hour
  async scheduleDailyReminder(hour = 8, minute = 0) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: '📦 OrderTrack',
        body: 'Check your active orders and deliveries!',
        data: { screen: 'Home' },
        sound: 'default',
      },
      trigger: {
        hour,
        minute,
        repeats: true,
        channelId: 'reminders',
      },
    });
    return id;
  }

  // Cancel a specific scheduled notification
  async cancelNotification(notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Cancel ALL scheduled notifications
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get all pending scheduled notifications
  async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}

export const notificationService = new NotificationService();
