import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  onPress?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  category,
  progress,
  priority,
  dueDate,
  onPress,
}) => {
  const colorScheme = useColorScheme();

  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return colorScheme === 'dark' ? '#ef4444' : '#dc2626';
      case 'medium':
        return colorScheme === 'dark' ? '#f59e0b' : '#d97706';
      case 'low':
        return colorScheme === 'dark' ? '#10b981' : '#059669';
    }
  };

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'assignments':
        return 'doc.text.fill';
      case 'study':
        return 'book.fill';
      case 'projects':
        return 'folder.fill';
      case 'exams':
        return 'calendar.badge.clock';
      default:
        return 'circle.fill';
    }
  };

  return (
    <Card onPress={onPress} margin={4} shadow={true}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <IconSymbol
            name={getCategoryIcon()}
            size={20}
            color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            style={styles.categoryIcon}
          />
          <Text style={[styles.title, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            {title}
          </Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
          <Text style={styles.priorityText}>{priority.toUpperCase()}</Text>
        </View>
      </View>

      {description && (
        <Text style={[styles.description, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
          {description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
            {Math.round(progress * 100)}%
          </Text>
          <ProgressBar progress={progress} height={6} />
        </View>
        {dueDate && (
          <Text style={[styles.dueDate, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
            {dueDate}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: '500',
  },
});
