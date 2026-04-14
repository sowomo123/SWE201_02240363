import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

// Receives contact via navigation params (demonstrates param passing)
const ContactDetailScreen = ({ route }) => {
  const { contact } = route.params;

  const fields = [
    { label: 'Phone', value: contact.phone },
    { label: 'Email', value: contact.email },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.name[0]}</Text>
        </View>
        <Text style={styles.name}>{contact.name}</Text>
      </View>

      {fields.map((f) => (
        <View key={f.label} style={styles.row}>
          <Text style={styles.label}>{f.label}</Text>
          <Text style={styles.value}>{f.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  avatarBox: {
    backgroundColor: colors.primary, alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.accent,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm,
  },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: typography.h2.fontSize, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: typography.caption.fontSize, color: '#CBD5E1', marginTop: 4 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: colors.card, padding: spacing.md,
    marginHorizontal: spacing.lg, marginTop: spacing.sm,
    borderRadius: 10, elevation: 1,
  },
  label: { fontSize: typography.caption.fontSize, color: colors.subText, fontWeight: '600' },
  value: { fontSize: typography.caption.fontSize, color: colors.text, flex: 1, textAlign: 'right' },
});

export default ContactDetailScreen;