import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_ORDER, ORDER_STATUSES } from '../constants/orderStatuses';

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <View style={styles.container}>
      {STATUS_ORDER.map((status, index) => {
        const info      = ORDER_STATUSES[status];
        const isDone    = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <View key={status} style={styles.stepRow}>
            {/* Vertical line above dot (except first) */}
            {index > 0 && (
              <View style={[styles.lineAbove, isDone && styles.lineActive]} />
            )}

            <View style={styles.dotRow}>
              <View style={[
                styles.dot,
                isDone    && { backgroundColor: info.color, borderColor: info.color },
                isCurrent && styles.dotCurrent,
              ]}>
                {isDone && <Text style={styles.dotIcon}>{info.icon}</Text>}
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepLabel, isDone && { color: info.color }]}>
                  {info.label}
                </Text>
                {isCurrent && <Text style={styles.stepCurrent}>● Current</Text>}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  stepRow:   { alignItems: 'flex-start' },
  lineAbove: { width: 2, height: 20, backgroundColor: '#334155', marginLeft: 18 },
  lineActive:{ backgroundColor: '#6366f1' },
  dotRow:    { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  dot: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#1e293b', borderWidth: 2, borderColor: '#334155',
    justifyContent: 'center', alignItems: 'center',
  },
  dotCurrent: { borderColor: '#6366f1', shadowColor: '#6366f1', shadowOpacity: 0.8, shadowRadius: 6, elevation: 6 },
  dotIcon:    { fontSize: 18 },
  stepText:   { marginLeft: 12 },
  stepLabel:  { color: '#64748b', fontSize: 15, fontWeight: '600' },
  stepCurrent:{ color: '#6366f1', fontSize: 12, marginTop: 2 },
});
