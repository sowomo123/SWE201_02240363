import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Switch, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BackNavigation } from '@/components/BackNavigation';
import { mockTasks } from '@/constants/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TaskDetailScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(() => {
    const foundTask = mockTasks.find(t => t.id === id);
    return foundTask || {
      id: 'new',
      title: '',
      description: '',
      category: 'Assignments',
      progress: 0,
      priority: 'medium' as const,
      dueDate: '',
      createdAt: new Date().toISOString().split('T')[0],
      subtasks: [],
    };
  });

  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    setTask(editedTask);
    setIsEditing(false);
    Alert.alert('Success', 'Task saved successfully!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => router.back()
        },
      ]
    );
  };

  const toggleSubtask = (subtaskId: string) => {
    if (isEditing) return;
    
    const updatedSubtasks = task.subtasks?.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    );
    
    const completedCount = updatedSubtasks?.filter(st => st.completed).length || 0;
    const totalCount = updatedSubtasks?.length || 1;
    const newProgress = completedCount / totalCount;
    
    setTask({ ...task, subtasks: updatedSubtasks, progress: newProgress });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'assignments': return 'doc.text.fill';
      case 'study': return 'book.fill';
      case 'projects': return 'folder.fill';
      case 'exams': return 'calendar.badge.clock';
      default: return 'circle.fill';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <BackNavigation 
        title={task.id === 'new' ? 'New Task' : 'Task Details'}
        rightAction={{
          icon: isEditing ? 'checkmark' : 'pencil',
          onPress: () => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Animated.View entering={FadeIn.duration(600)}>
          <Card style={styles.mainCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskTitleRow}>
                <IconSymbol
                  name={getCategoryIcon(task.category)}
                  size={24}
                  color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                />
                {isEditing ? (
                  <TextInput
                    style={[styles.titleInput, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}
                    value={editedTask.title}
                    onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
                    placeholder="Task title"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                  />
                ) : (
                  <Text style={[styles.title, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                    {task.title}
                  </Text>
                )}
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
              </View>
            </View>

            {isEditing ? (
              <TextInput
                style={[styles.descriptionInput, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}
                value={editedTask.description}
                onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
                placeholder="Task description"
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                multiline
              />
            ) : (
              task.description && (
                <Text style={[styles.description, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {task.description}
                </Text>
              )
            )}

            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <IconSymbol name="folder" size={16} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <Text style={[styles.metaText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {task.category}
                </Text>
              </View>
              {task.dueDate && (
                <View style={styles.metaItem}>
                  <IconSymbol name="calendar" size={16} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <Text style={[styles.metaText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                    {task.dueDate}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(600)}>
          <Card style={styles.progressCard}>
            <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
              Progress
            </Text>
            <View style={styles.progressContainer}>
              <Text style={[styles.progressPercentage, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                {Math.round(task.progress * 100)}%
              </Text>
              <ProgressBar progress={task.progress} height={12} />
            </View>
          </Card>
        </Animated.View>

        {task.subtasks && task.subtasks.length > 0 && (
          <Animated.View entering={FadeInUp.delay(400).duration(600)}>
            <Card style={styles.subtasksCard}>
              <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                Subtasks
              </Text>
              {task.subtasks.map((subtask, index) => (
                <View key={subtask.id} style={styles.subtaskItem}>
                  <TouchableOpacity
                    style={styles.subtaskCheckbox}
                    onPress={() => toggleSubtask(subtask.id)}
                    disabled={isEditing}
                  >
                    <View style={[
                      styles.checkbox,
                      subtask.completed && styles.checkboxChecked,
                      { borderColor: colorScheme === 'dark' ? '#6b7280' : '#d1d5db' }
                    ]}>
                      {subtask.completed && (
                        <IconSymbol name="checkmark" size={12} color="#ffffff" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={[
                    styles.subtaskText,
                    subtask.completed && styles.subtaskTextCompleted,
                    { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }
                  ]}>
                    {subtask.title}
                  </Text>
                </View>
              ))}
            </Card>
          </Animated.View>
        )}

        {isEditing && (
          <Animated.View entering={SlideInRight.delay(600).duration(600)}>
            <View style={styles.editActions}>
              <Button
                title="Save Task"
                onPress={handleSave}
                variant="primary"
                style={styles.saveButton}
              />
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCard: {
    padding: 20,
    marginBottom: 16,
  },
  taskHeader: {
    marginBottom: 16,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginLeft: 12,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginLeft: 12,
    padding: 0,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  descriptionInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    marginLeft: 8,
  },
  progressCard: {
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtasksCard: {
    padding: 20,
    marginBottom: 16,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subtaskCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  subtaskText: {
    fontSize: 16,
    flex: 1,
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  editActions: {
    paddingVertical: 20,
  },
  saveButton: {
    marginBottom: 20,
  },
});
