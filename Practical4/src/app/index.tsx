import React, { useState } from 'react';
import { Platform, StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const {
    permissionStatus,
    pushToken,
    scheduledNotifications,
    requestPermission,
    sendNotification,
    cancelNotification,
    cancelAllNotifications,
    scheduleRepeatingNotification,
    refreshScheduledNotifications,
  } = usePushNotifications();

  const [notificationTitle, setNotificationTitle] = useState('Test Notification');
  const [notificationBody, setNotificationBody] = useState('This is a test push notification!');
  const [delaySeconds, setDelaySeconds] = useState('5');

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      Alert.alert('Success', 'Notification permissions granted!');
    } else {
      Alert.alert('Error', 'Notification permissions denied');
    }
  };

  const handleSendNotification = async () => {
    try {
      const delay = parseInt(delaySeconds) || 0;
      await sendNotification(notificationTitle, notificationBody, delay);
      Alert.alert('Success', `Notification scheduled in ${delay} seconds`);
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification');
    }
  };

  const handleSendImmediate = async () => {
    try {
      await sendNotification(notificationTitle, notificationBody, 0);
      Alert.alert('Success', 'Notification sent immediately');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification');
    }
  };

  const handleScheduleRepeating = async () => {
    try {
      const interval = parseInt(delaySeconds) || 10;
      await scheduleRepeatingNotification(
        'Repeating Notification',
        'This notification repeats every ' + interval + ' seconds',
        interval
      );
      Alert.alert('Success', `Repeating notification scheduled every ${interval} seconds`);
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule repeating notification');
    }
  };

  const handleCancelAll = async () => {
    try {
      await cancelAllNotifications();
      Alert.alert('Success', 'All notifications cancelled');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel notifications');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <ThemedText type="title" style={styles.title}>
            Push Notifications Demo
          </ThemedText>

          <ThemedText type="subtitle" style={styles.subtitle}>
            Android & iOS Support
          </ThemedText>

          {/* Permission Status */}
          <View style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Permission Status
            </ThemedText>
            <View style={[styles.statusBadge, { 
              backgroundColor: permissionStatus === 'granted' ? '#10b981' : 
                             permissionStatus === 'denied' ? '#ef4444' : '#f59e0b' 
            }]}>
              <ThemedText style={styles.statusText}>
                {permissionStatus.toUpperCase()}
              </ThemedText>
            </View>
            {permissionStatus !== 'granted' && (
              <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
                <ThemedText style={styles.buttonText}>Request Permission</ThemedText>
              </TouchableOpacity>
            )}
          </View>

          {/* Push Token */}
          {pushToken && (
            <View style={styles.section}>
              <ThemedText type="default" style={styles.sectionTitle}>
                Push Token
              </ThemedText>
              <ThemedText type="small" style={styles.tokenText}>
                {pushToken}
              </ThemedText>
            </View>
          )}

          {/* Notification Form */}
          <View style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Send Notification
            </ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText type="small" style={styles.label}>Title</ThemedText>
              <TextInput
                style={styles.input}
                value={notificationTitle}
                onChangeText={setNotificationTitle}
                placeholder="Notification title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText type="small" style={styles.label}>Body</ThemedText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notificationBody}
                onChangeText={setNotificationBody}
                placeholder="Notification body"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText type="small" style={styles.label}>Delay (seconds)</ThemedText>
              <TextInput
                style={styles.input}
                value={delaySeconds}
                onChangeText={setDelaySeconds}
                placeholder="5"
                keyboardType="number-pad"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
              <ThemedText style={styles.buttonText}>Schedule Notification</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleSendImmediate}>
              <ThemedText style={styles.buttonText}>Send Immediately</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.accentButton]} onPress={handleScheduleRepeating}>
              <ThemedText style={styles.buttonText}>Schedule Repeating</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Scheduled Notifications */}
          <View style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Scheduled Notifications ({scheduledNotifications.length})
            </ThemedText>
            
            {scheduledNotifications.length === 0 ? (
              <ThemedText type="small" style={styles.emptyText}>
                No scheduled notifications
              </ThemedText>
            ) : (
              scheduledNotifications.map((notification: any, index: number) => (
                <View key={index} style={styles.notificationItem}>
                  <ThemedText type="small">{notification.content.title}</ThemedText>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => cancelNotification(notification.identifier)}
                  >
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                </View>
              ))
            )}

            {scheduledNotifications.length > 0 && (
              <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleCancelAll}>
                <ThemedText style={styles.buttonText}>Cancel All</ThemedText>
              </TouchableOpacity>
            )}
          </View>

          {/* Platform Info */}
          <View style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Platform Info
            </ThemedText>
            <ThemedText type="small">Platform: {Platform.OS}</ThemedText>
            <ThemedText type="small">
              Notifications: {Platform.OS === 'web' ? 'Not Supported' : 'Supported'}
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.four,
    opacity: 0.7,
  },
  section: {
    marginBottom: Spacing.four,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  statusBadge: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    alignSelf: 'flex-start',
    marginBottom: Spacing.two,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: Spacing.three,
  },
  label: {
    marginBottom: Spacing.one,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Spacing.two,
    padding: Spacing.two,
    fontSize: 16,
    color: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#208AEF',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#4f46e5',
  },
  accentButton: {
    backgroundColor: '#10b981',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  tokenText: {
    fontSize: 10,
    opacity: 0.7,
    fontFamily: 'monospace',
  },
  emptyText: {
    opacity: 0.5,
    fontStyle: 'italic',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.one,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
