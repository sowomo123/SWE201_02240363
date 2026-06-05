import React, { useState, useEffect } from 'react';
import {
  View, Text, Switch, TouchableOpacity, ScrollView,
  StyleSheet, Alert, ActivityIndicator, Linking,
} from 'react-native';
import { notificationService } from '../notifications/notificationService';

export default function SettingsScreen() {
  const [permStatus,      setPermStatus]      = useState('unknown');
  const [pushToken,       setPushToken]       = useState(null);
  const [dailyReminder,   setDailyReminder]   = useState(false);
  const [dailyReminderId, setDailyReminderId] = useState(null);
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {
    (async () => {
      const status = await notificationService.getPermissionStatus();
      const token  = notificationService.pushToken;
      setPermStatus(status);
      setPushToken(token);
      setLoading(false);
    })();
  }, []);

  const handleRequestPermission = async () => {
    setLoading(true);
    const status = await notificationService.requestPermissions();
    if (status === 'denied') {
      Alert.alert(
        'Notifications Blocked',
        'Please enable notifications in your device Settings to receive order updates.',
        [
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else if (status === 'granted') {
      const token = await notificationService.registerPushToken();
      setPushToken(token);
    }
    setPermStatus(status);
    setLoading(false);
  };

  const handleToggleDailyReminder = async (enabled) => {
    setDailyReminder(enabled);
    if (enabled) {
      const id = await notificationService.scheduleDailyReminder(8, 0);
      setDailyReminderId(id);
      Alert.alert('Daily Reminder Set ✅', 'You\'ll get a reminder every day at 8:00 AM.');
    } else if (dailyReminderId) {
      await notificationService.cancelNotification(dailyReminderId);
      setDailyReminderId(null);
      Alert.alert('Reminder Cancelled', 'Daily reminder has been turned off.');
    }
  };

  const handleCancelAll = async () => {
    Alert.alert('Cancel All?', 'This will remove all scheduled notifications.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: async () => {
          await notificationService.cancelAllNotifications();
          setDailyReminder(false);
          setDailyReminderId(null);
          Alert.alert('Done', 'All scheduled notifications cancelled.');
        },
      },
    ]);
  };

  const permColor = permStatus === 'granted' ? '#10b981' : permStatus === 'denied' ? '#ef4444' : '#f59e0b';
  const permLabel = permStatus === 'granted' ? '✅ Granted' : permStatus === 'denied' ? '❌ Denied' : '⚠️ Not Requested';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Permission status card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notification Permissions</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.permBadge, { color: permColor }]}>{permLabel}</Text>
        </View>
        {permStatus !== 'granted' && (
          <TouchableOpacity style={styles.btn} onPress={handleRequestPermission} disabled={loading ? true : false}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Request Permission</Text>}
          </TouchableOpacity>
        )}
        {permStatus === 'denied' && (
          <Text style={styles.hint}>Notifications are blocked. Tap "Request Permission" to open Settings.</Text>
        )}
      </View>

      {/* Push token card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Push Token</Text>
        {pushToken
          ? <Text style={styles.token} numberOfLines={2} selectable>{pushToken}</Text>
          : <Text style={styles.hint}>No token — grant permissions and restart the app.</Text>
        }
      </View>

      {/* Daily reminder */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Reminder</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Remind me every day at 8:00 AM</Text>
          <Switch
            value={dailyReminder}
            onValueChange={handleToggleDailyReminder}
          />
        </View>
        {permStatus !== 'granted' && (
          <Text style={styles.hint}>Grant notification permissions first.</Text>
        )}
      </View>

      {/* Danger zone */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manage Notifications</Text>
        <TouchableOpacity style={styles.btnDanger} onPress={handleCancelAll}>
          <Text style={styles.btnDangerText}>Cancel All Scheduled Notifications</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content:   { padding: 16, paddingBottom: 40 },
  card:      { backgroundColor: '#1e293b', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  cardTitle: { color: '#f1f5f9', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  row:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label:     { color: '#94a3b8', fontSize: 14, flex: 1 },
  permBadge: { fontSize: 14, fontWeight: '700' },
  token:     { color: '#6366f1', fontSize: 12, fontFamily: 'monospace', marginTop: 4 },
  hint:      { color: '#64748b', fontSize: 13, marginTop: 8 },
  btn:       { backgroundColor: '#6366f1', borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 12 },
  btnText:   { color: '#fff', fontWeight: '700' },
  btnDanger: { borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ef4444', marginTop: 4 },
  btnDangerText: { color: '#ef4444', fontWeight: '700' },
});
