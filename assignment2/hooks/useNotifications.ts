import { useEffect, useState } from 'react';
import notificationService from '@/services/notificationService';
import { mockTasks } from '@/constants/mockData';

export const useNotifications = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [dueAssignments, setDueAssignments] = useState<any[]>([]);

  useEffect(() => {
    // Initialize notification channel on mount
    notificationService.getNotificationChannel();
  }, []);

  useEffect(() => {
    // Check for due assignments whenever tasks change
    const checkDueAssignments = () => {
      const today = new Date();
      const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const dueTasks = mockTasks.filter(task => {
        if (!task.dueDate || task.category !== 'Assignments') return false;
        
        const dueDate = new Date(task.dueDate);
        return dueDate <= sevenDaysFromNow && dueDate >= today;
      });

      setDueAssignments(dueTasks);
    };

    checkDueAssignments();
  }, []);

  const startNotifications = async () => {
    try {
      await notificationService.scheduleAssignmentReminders();
      setIsNotificationEnabled(true);
    } catch (error) {
      console.error('Failed to start notifications:', error);
      setIsNotificationEnabled(false);
    }
  };

  const stopNotifications = () => {
    notificationService.stopAssignmentReminders();
    setIsNotificationEnabled(false);
  };

  const sendTestNotification = async () => {
    await notificationService.sendCustomNotification(
      'Test Notification',
      'This is a test notification from your assignment app!'
    );
  };

  return {
    isNotificationEnabled,
    dueAssignments,
    dueAssignmentsCount: dueAssignments.length,
    startNotifications,
    stopNotifications,
    sendTestNotification,
  };
};
