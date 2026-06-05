import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Switch, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import StatusTimeline from '../components/StatusTimeline';
import { apiService } from '../api/apiService';
import { notificationService } from '../notifications/notificationService';
import { ORDER_STATUSES, STATUS_MESSAGES, STATUS_ORDER } from '../constants/orderStatuses';

// Mock order — replace with apiService.getOrder(orderId)
const MOCK_ORDER = {
  id: 'ord-001abc',
  name: 'Pizza Margherita Combo',
  restaurant: "Mario's Pizza",
  total: 24.99,
  status: 'OUT_FOR_DELIVERY',
  notificationsEnabled: true,
  createdAt: new Date().toISOString(),
  items: ['1x Margherita Pizza', '1x Garlic Bread', '2x Cola'],
  estimatedDelivery: '30-40 min',
};

export default function OrderDetailScreen({ route }) {
  const { orderId } = route.params;
  const [order,           setOrder]           = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [reminderSending, setReminderSending] = useState(false);

  useEffect(() => {
    // const apiService.getOrder(orderId).then(setOrder) for real backend
    setTimeout(() => { setOrder(MOCK_ORDER); setLoading(false); }, 500);
  }, [orderId]);

  const handleToggleNotifications = async (enabled) => {
    setOrder(prev => ({ ...prev, notificationsEnabled: enabled }));
    // await apiService.toggleOrderNotifications(orderId, enabled);
  };

  // Simulate advancing status (admin action — in production this comes from backend push)
  const handleAdvanceStatus = async () => {
    const currentIndex = STATUS_ORDER.indexOf(order.status);
    if (currentIndex >= STATUS_ORDER.length - 1) return Alert.alert('Already delivered!');

    const nextStatus = STATUS_ORDER[currentIndex + 1];
    setOrder(prev => ({ ...prev, status: nextStatus }));

    // Send a LOCAL notification to simulate what backend would push remotely
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${ORDER_STATUSES[nextStatus].icon} Order Update`,
        body: STATUS_MESSAGES[nextStatus] || `Status: ${ORDER_STATUSES[nextStatus].label}`,
        data: { screen: 'OrderDetail', orderId: order.id },
        sound: 'default',
      },
      trigger: null, // immediate
    });
  };

  // Schedule a "rate your order" reminder in 1 hour
  const handleScheduleReminder = async () => {
    setReminderSending(true);
    try {
      const id = await notificationService.scheduleOrderReminder(order.id, order.name, 5); // 5 sec for demo
      Alert.alert('Reminder Set ✅', `You'll be reminded to rate your order in 5 seconds (demo).\nNotification ID: ${id}`);
    } catch (e) {
      Alert.alert('Error', 'Could not schedule reminder.');
    } finally {
      setReminderSending(false);
    }
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator color="#6366f1" size="large" /></View>;
  if (!order)  return <View style={styles.centered}><Text style={styles.err}>Order not found.</Text></View>;

  const statusInfo = ORDER_STATUSES[order.status];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Hero status */}
      <View style={[styles.heroCard, { borderColor: statusInfo.color }]}>
        <Text style={styles.heroIcon}>{statusInfo.icon}</Text>
        <Text style={[styles.heroStatus, { color: statusInfo.color }]}>{statusInfo.label}</Text>
        <Text style={styles.heroName}>{order.name}</Text>
        <Text style={styles.heroSub}>🏪 {order.restaurant}  ·  ⏱ {order.estimatedDelivery}</Text>
      </View>

      {/* Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {order.items.map((item, i) => (
          <Text key={i} style={styles.item}>• {item}</Text>
        ))}
        <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Progress</Text>
        <StatusTimeline currentStatus={order.status} />
      </View>

      {/* Notification toggle */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <Switch
            value={order.notificationsEnabled}
            onValueChange={handleToggleNotifications}
          />
        </View>
        <Text style={styles.hint}>Receive push alerts for every status change on this order.</Text>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleAdvanceStatus}>
          <Text style={styles.btnText}>⚡ Simulate Next Status (Demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnSecondary, reminderSending && styles.btnDisabled]}
          onPress={handleScheduleReminder}
          disabled={reminderSending ? true : false}
        >
          {reminderSending
            ? <ActivityIndicator color="#6366f1" />
            : <Text style={[styles.btnText, { color: '#6366f1' }]}>⏰ Schedule Review Reminder (5s demo)</Text>
          }
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

// Lazy import to avoid circular dep issue in demo
const Notifications = require('expo-notifications');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content:   { padding: 16, paddingBottom: 40 },
  centered:  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  err:       { color: '#ef4444' },
  heroCard:  { backgroundColor: '#1e293b', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 2, marginBottom: 16 },
  heroIcon:  { fontSize: 52, marginBottom: 8 },
  heroStatus:{ fontSize: 20, fontWeight: '800', marginBottom: 4 },
  heroName:  { color: '#f1f5f9', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  heroSub:   { color: '#64748b', fontSize: 13, marginTop: 6 },
  section:   { backgroundColor: '#1e293b', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  sectionTitle: { color: '#f1f5f9', fontSize: 15, fontWeight: '700', marginBottom: 10 },
  item:      { color: '#94a3b8', fontSize: 14, marginBottom: 4 },
  total:     { color: '#6366f1', fontWeight: '700', marginTop: 8, fontSize: 15 },
  row:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hint:      { color: '#64748b', fontSize: 13, marginTop: 4 },
  btnPrimary:   { backgroundColor: '#6366f1', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 10 },
  btnSecondary: { borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#6366f1' },
  btnDisabled:  { opacity: 0.5 },
  btnText:      { color: '#fff', fontWeight: '700', fontSize: 15 },
});
