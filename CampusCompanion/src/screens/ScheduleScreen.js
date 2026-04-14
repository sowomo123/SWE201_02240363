import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const SCHEDULE = {
  Mon: [
    { time: '9:00 - 10:00', subject: 'DSO101', room: 'IT 6' },
    { time: '10:15 - 11:15', subject: 'DSO101', room: 'IT 6' },
    { time: '11:15 - 12:15', subject: 'DIS303', room: 'IT 6' },
    { time: '13:15 - 14:15', subject: 'CTE205', room: 'IT 6' },
    { time: '14:15 - 15:15', subject: 'DIS303', room: 'IT 6' },
    { time: '15:15 - 16:15', subject: 'DIS303', room: 'IT 6' },
    { time: '16:15 - 17:15', subject: 'DIS303', room: 'IT 6' },
  ],
  Tue: [
    { time: '9:00 - 10:00', subject: 'SWE201', room: 'IT 6' },
    { time: '10:15 - 11:15', subject: 'SWE201', room: 'IT 6' },
    { time: '11:15 - 12:15', subject: 'SDA202', room: 'IT 6' },
    { time: '13:15 - 14:15', subject: 'SDA202', room: 'IT 6' },
    { time: '14:15 - 15:15', subject: 'SDA202', room: 'IT 6' },
  ],
  Wed: [
    { time: '9:00 - 10:00', subject: 'SDA202', room: 'IT 6' },
    { time: '10:15 - 11:15', subject: 'SDA202', room: 'IT 6' },
    { time: '11:15 - 12:15', subject: 'SWE201', room: 'IT 6' },
    { time: '13:15 - 14:15', subject: 'SWE201', room: 'IT 6' },
  ],
  Thu: [
    { time: '9:00 - 10:00', subject: 'CTE205', room: 'IT 6' },
    { time: '10:15 - 11:15', subject: 'DIS303', room: 'IT 6' },
    { time: '11:15 - 12:15', subject: 'DIS303', room: 'IT 6' },
    { time: '13:15 - 14:15', subject: 'DSO101', room: 'IT 6' },
    { time: '14:15 - 15:15', subject: 'DSO101', room: 'IT 6' },
  ],
  Fri: [
    { time: '9:00 - 10:00', subject: 'CTE205', room: 'IT 6' },
  ],
};

const ScheduleScreen = () => {
  // Dynamic style: selected day is highlighted
  const [selectedDay, setSelectedDay] = useState('Mon');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Weekly Timetable</Text>

      {/* Day selector tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.tab, selectedDay === day && styles.tabActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.tabText, selectedDay === day && styles.tabTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Classes for selected day */}
      <View style={styles.classes}>
        {(SCHEDULE[selectedDay] || []).map((cls, i) => (
          <View key={i} style={styles.classCard}>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{cls.time}</Text>
            </View>
            <Text style={styles.subject}>{cls.subject}</Text>
            <Text style={styles.room}>📍 {cls.room}</Text>
          </View>
        ))}
        {(!SCHEDULE[selectedDay] || SCHEDULE[selectedDay].length === 0) && (
          <Text style={styles.empty}>No classes today 🎉</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    fontSize: typography.h1.fontSize, fontWeight: 'bold',
    color: colors.text, padding: spacing.lg, paddingBottom: spacing.sm,
  },
  tabs: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  tab: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: 20, backgroundColor: colors.card,
    marginRight: spacing.sm, elevation: 1,
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: typography.caption.fontSize, color: colors.subText, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  classes: { padding: spacing.lg, paddingTop: 0 },
  classCard: {
    backgroundColor: colors.card, borderRadius: 12,
    padding: spacing.md, marginBottom: spacing.sm,
    borderLeftWidth: 4, borderLeftColor: colors.accent,
    elevation: 2,
  },
  timeBadge: {
    backgroundColor: colors.background, borderRadius: 6,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    alignSelf: 'flex-start', marginBottom: spacing.xs,
  },
  timeText: { fontSize: typography.caption.fontSize, color: colors.subText, fontWeight: '600' },
  subject: { fontSize: typography.body.fontSize, fontWeight: '700', color: colors.text, marginBottom: 4 },
  room: { fontSize: typography.caption.fontSize, color: colors.subText },
  empty: { fontSize: typography.body.fontSize, color: colors.subText, textAlign: 'center', marginTop: spacing.xl },
});

export default ScheduleScreen;