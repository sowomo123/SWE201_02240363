import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  private static instance: NotificationService;
  private notificationInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'web') {
      console.warn('Notifications are not supported on web platform');
      return false;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async scheduleAssignmentReminders(): Promise<void> {
    // Clear any existing interval
    this.stopAssignmentReminders();

    // Request permissions first
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      console.warn('Notification permissions not granted');
      return;
    }

    // Schedule notifications every 10 seconds
    this.notificationInterval = setInterval(async () => {
      await this.sendDueAssignmentNotification();
    }, 10000);
  }

  stopAssignmentReminders(): void {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
      this.notificationInterval = null;
    }
  }

  private async sendDueAssignmentNotification(): Promise<void> {
    try {
      // Get current assignments (you can modify this to fetch from your data source)
      const dueAssignments = this.getDueAssignments();

      if (dueAssignments.length > 0) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Assignment Reminder! 📚',
            body: `You have ${dueAssignments.length} assignment${dueAssignments.length > 1 ? 's' : ''} due soon!`,
            data: {
              assignments: dueAssignments,
            },
          },
          trigger: null, // Show immediately
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  private getDueAssignments(): any[] {
    // This is a mock implementation - you should replace this with your actual data fetching logic
    const mockAssignments = [
      {
        title: 'Complete React Native Assignment',
        dueDate: 'Dec 15, 2024',
        priority: 'high',
      },
      {
        title: 'Study for Calculus Midterm',
        dueDate: 'Dec 18, 2024',
        priority: 'high',
      },
      {
        title: 'Physics Lab Report',
        dueDate: 'Dec 12, 2024',
        priority: 'medium',
      },
    ];

    // Filter assignments that are due soon (within next 7 days for demo)
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return mockAssignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate <= sevenDaysFromNow && dueDate >= today;
    });
  }

  async sendCustomNotification(title: string, body: string): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      console.warn('Notification permissions not granted');
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending custom notification:', error);
    }
  }

  // Get notification channel for Android
  async getNotificationChannel(): Promise<void> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('assignment-reminders', {
        name: 'Assignment Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        enableLights: true,
        enableVibrate: true,
      });
    }
  }
}

export default NotificationService.getInstance();
