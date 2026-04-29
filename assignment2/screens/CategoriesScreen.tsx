import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, Layout } from 'react-native-reanimated';

import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AnimatedView, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TaskItem } from '@/components/ui/TaskItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BackNavigation } from '@/components/BackNavigation';
import { mockTasks, mockCategories } from '@/constants/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function CategoriesScreen() {
  const colorScheme = useColorScheme();
  const { category: selectedCategory } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredTasks = mockTasks.filter(task => {
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = selectedFilter === 'all' || task.priority === selectedFilter;
    return matchesCategory && matchesSearch && matchesPriority;
  });

  const tasksByCategory = mockCategories.map(category => ({
    ...category,
    tasks: mockTasks.filter(task => task.category === category.name),
  }));

  const renderCategoryGrid = () => (
    <View style={styles.categoryGrid}>
      {tasksByCategory.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInUp.delay(index * 100).duration(500)}
          layout={Layout.springify()}
        >
          <Card
            onPress={() => router.push(`/categories?category=${category.name}`)}
            style={[styles.categoryCard, { borderLeftColor: category.color, borderLeftWidth: 4 }]}
            margin={8}
          >
            <View style={styles.categoryHeader}>
              <IconSymbol name={category.icon} size={32} color={category.color} />
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryName, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryCount, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {category.taskCount} tasks
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
            </View>
            <View style={styles.categoryProgress}>
              <Text style={[styles.progressText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                {Math.round((category.tasks.filter(t => t.progress === 1).length / category.tasks.length) * 100)}% Complete
              </Text>
            </View>
          </Card>
        </Animated.View>
      ))}
    </View>
  );

  const renderTaskList = () => (
    <View style={styles.taskList}>
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.filterChip,
                selectedFilter === priority && {
                  backgroundColor: colorScheme === 'dark' ? '#4f46e5' : '#6366f1',
                },
              ]}
              onPress={() => setSelectedFilter(priority)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === priority && { color: '#ffffff' },
                { color: selectedFilter === priority ? '#ffffff' : (colorScheme === 'dark' ? '#9ca3af' : '#6b7280') }
              ]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredTasks.map((task, index) => (
        <Animated.View
          key={task.id}
          entering={FadeInUp.delay(index * 50).duration(400)}
          layout={Layout.springify()}
        >
          <TaskItem
            {...task}
            onPress={() => router.push(`/task-detail?id=${task.id}`)}
          />
        </Animated.View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <BackNavigation 
        title={(selectedCategory as string) || 'Categories'}
        showBackButton={true}
        onBackPress={selectedCategory ? () => router.push('/categories') : () => router.push('/')}
        rightAction={{
          icon: 'plus',
          onPress: () => router.push('/task-detail')
        }}
      />

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }]}>
          <IconSymbol 
            name="magnifyingglass" 
            size={20} 
            color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} 
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}
            placeholder="Search tasks..."
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!selectedCategory ? renderCategoryGrid() : renderTaskList()}
      </ScrollView>

      <View style={styles.fabContainer}>
        <Button
          title="+"
          onPress={() => router.push('/task-detail')}
          variant="primary"
          style={styles.fab}
        />
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryGrid: {
    paddingHorizontal: 8,
  },
  categoryCard: {
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 14,
    marginTop: 4,
  },
  categoryProgress: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskList: {
    paddingHorizontal: 16,
  },
  filterRow: {
    marginBottom: 16,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    fontSize: 24,
    fontWeight: '700',
  },
});
