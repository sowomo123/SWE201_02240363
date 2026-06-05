import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { apiService } from '../api/apiService';

export default function CreateOrderScreen({ navigation }) {
  const [name,       setName]       = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [total,      setTotal]      = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !restaurant.trim() || !total.trim()) {
      return Alert.alert('Missing Fields', 'Please fill in all fields.');
    }

    setSubmitting(true);
    try {
      // const newOrder = await apiService.createOrder({ name, restaurant, total: parseFloat(total) });
      // Simulate creation
      const newOrder = {
        id: 'ord-' + Math.random().toString(36).slice(2, 8),
        name, restaurant, total: parseFloat(total), status: 'PLACED', notificationsEnabled: true,
        createdAt: new Date().toISOString(), items: [name], estimatedDelivery: '30-45 min',
      };
      Alert.alert('Order Placed! 🎉', `Order #${newOrder.id.slice(-6).toUpperCase()} has been placed.`, [
        { text: 'View Order', onPress: () => navigation.replace('OrderDetail', { orderId: newOrder.id }) },
        { text: 'Go Home',    onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Error', 'Could not place order. Check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Order</Text>

      <Text style={styles.label}>Order Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Pizza Margherita Combo" placeholderTextColor="#475569" />

      <Text style={styles.label}>Restaurant / Store</Text>
      <TextInput style={styles.input} value={restaurant} onChangeText={setRestaurant} placeholder="e.g. Mario's Pizza" placeholderTextColor="#475569" />

      <Text style={styles.label}>Total Amount ($)</Text>
      <TextInput style={styles.input} value={total} onChangeText={setTotal} placeholder="e.g. 24.99" placeholderTextColor="#475569" keyboardType="decimal-pad" />

      <TouchableOpacity
        style={[styles.btn, submitting && styles.btnDisabled]}
        onPress={handleCreate}
        disabled={submitting ? true : false}
      >
        {submitting
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>Place Order</Text>
        }
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content:   { padding: 20 },
  title:     { color: '#f1f5f9', fontSize: 24, fontWeight: '800', marginBottom: 24 },
  label:     { color: '#94a3b8', fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#1e293b', borderRadius: 12, padding: 14,
    color: '#f1f5f9', fontSize: 15, borderWidth: 1, borderColor: '#334155',
  },
  btn:       { backgroundColor: '#6366f1', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 28 },
  btnDisabled:{ opacity: 0.5 },
  btnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
});
