import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { ORDER_STATUSES } from '../constants/orderStatuses';

export default function OrderCard({ order, onPress, onToggleNotifications }) {
  const statusInfo = ORDER_STATUSES[order.status] || ORDER_STATUSES.PLACED;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>{statusInfo.icon}</Text>
        <View style={styles.headerText}>
          <Text style={styles.name}>{order.name}</Text>
          <Text style={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusInfo.color + '22', borderColor: statusInfo.color }]}>
          <Text style={[styles.badgeText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={[styles.detail, { marginRight: 12 }]}>🕐 {new Date(order.createdAt).toLocaleDateString()}</Text>
        <Text style={[styles.detail, { marginRight: 12 }]}>💰 ${order.total?.toFixed(2)}</Text>
        <Text style={styles.detail}>🏪 {order.restaurant}</Text>
      </View>

      {/* Notification toggle */}
      <View style={styles.notifRow}>
        <Text style={styles.notifLabel}>🔔 Notifications</Text>
        <Switch
          value={order.notificationsEnabled !== false}
          onValueChange={(val) => onToggleNotifications(order.id, val)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon:   { fontSize: 28, marginRight: 10 },
  headerText: { flex: 1 },
  name:   { color: '#f1f5f9', fontSize: 16, fontWeight: '700' },
  orderId:{ color: '#64748b', fontSize: 12, marginTop: 2 },
  badge: {
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  details:  { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  detail:   { color: '#94a3b8', fontSize: 13 },
  notifRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 10 },
  notifLabel: { color: '#94a3b8', fontSize: 14 },
});
