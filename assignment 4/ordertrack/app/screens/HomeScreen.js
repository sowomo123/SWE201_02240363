import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiService } from '../api/apiService';

// Mock data for development (replace with real API call)
const MOCK_ORDERS = [
  { id: 'ord-001abc', name: 'Pizza Margherita Combo', restaurant: 'Mario\'s Pizza', total: 24.99, status: 'OUT_FOR_DELIVERY', notificationsEnabled: true,  createdAt: new Date().toISOString() },
  { id: 'ord-002def', name: 'Sushi Platter',          restaurant: 'Tokyo Kitchen',  total: 45.00, status: 'PREPARING',        notificationsEnabled: true,  createdAt: new Date().toISOString() },
  { id: 'ord-003ghi', name: 'Burger & Fries',         restaurant: 'Burger Barn',    total: 15.50, status: 'DELIVERED',         notificationsEnabled: false, createdAt: new Date().toISOString() },
];

export default function HomeScreen({ navigation }) {
  const [orders,      setOrders]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);

  const loadOrders = async () => {
    try {
      // const data = await apiService.getOrders();   // uncomment for real backend
      setOrders(MOCK_ORDERS);
    } catch (e) {
      Alert.alert('Error', 'Could not load orders. Is the backend running?');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { loadOrders(); }, []));

  const handleToggleNotifications = async (orderId, enabled) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, notificationsEnabled: enabled } : o));
    // await apiService.toggleOrderNotifications(orderId, enabled); // uncomment for real backend
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadOrders(); }} tintColor="#6366f1" />}
        ListEmptyComponent={<Text style={styles.empty}>No orders yet. Create one!</Text>}
        renderItem={({ item }) => {
          // Inline OrderCard to keep it simple — or import the component
          const { ORDER_STATUSES } = require('../constants/orderStatuses');
          const { View: V, Text: T, TouchableOpacity: TO, Switch, StyleSheet: SS } = require('react-native');
          const s = ORDER_STATUSES[item.status];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{s.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardSub}>#{item.id.slice(-6).toUpperCase()} · {item.restaurant}</Text>
                </View>
                <View style={[styles.badge, { borderColor: s.color }]}>
                  <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardDetail}>💰 ${item.total.toFixed(2)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.cardDetail, { marginRight: 8 }]}>🔔</Text>
                  <Switch
                    value={item.notificationsEnabled !== false}
                    onValueChange={v => handleToggleNotifications(item.id, v)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={
          <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateOrder')}>
            <Text style={styles.createBtnText}>＋  Place New Order</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#0f172a' },
  centered:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  list:        { padding: 16 },
  empty:       { color: '#64748b', textAlign: 'center', marginTop: 40, fontSize: 16 },
  createBtn:   { backgroundColor: '#6366f1', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 },
  createBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  card:        { backgroundColor: '#1e293b', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  cardHeader:  { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardIcon:    { fontSize: 26, marginRight: 10 },
  cardName:    { color: '#f1f5f9', fontSize: 15, fontWeight: '700' },
  cardSub:     { color: '#64748b', fontSize: 12, marginTop: 2 },
  badge:       { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, backgroundColor: 'transparent' },
  badgeText:   { fontSize: 11, fontWeight: '700' },
  cardFooter:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 10 },
  cardDetail:  { color: '#94a3b8', fontSize: 13 },
});
