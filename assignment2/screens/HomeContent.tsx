import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInUp, SlideInRight } from 'react-native-reanimated';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TaskItem } from '@/components/ui/TaskItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BackNavigation } from '@/components/BackNavigation';
import { mockTasks, mockUserProfile, mockCategories } from '@/constants/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');

export default function HomeContent() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <BackNavigation 
        title="Study Spark"
        showBackButton={false}
        rightAction={{
          icon: 'gear',
          onPress: () => router.push('/profile')
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Animated.View entering={FadeIn.duration(600)} style={styles.welcomeSection}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Image source={mockUserProfile.avatar} style={styles.avatarImage} />
              </View>
              <View style={styles.welcomeText}>
                <Text style={[styles.greeting, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  Hello My Beautiful,
                </Text>
                <Text style={[styles.userName, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {mockUserProfile.name}
                </Text>
                <Text style={[styles.courseInfo, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {mockUserProfile.course} • {mockUserProfile.studentId}
                </Text>
                <Text style={[styles.collegeInfo, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {mockUserProfile.college}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <IconSymbol name="flame.fill" size={24} color="#ef4444" />
                <Text style={[styles.statNumber, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {mockUserProfile.studyStreak}
                </Text>
                <Text style={[styles.statLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  Day Streak
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color="#10b981" />
                <Text style={[styles.statNumber, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {mockUserProfile.completedTasks}
                </Text>
                <Text style={[styles.statLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  Completed
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <IconSymbol name="list.bullet.clipboard.fill" size={24} color="#4f46e5" />
                <Text style={[styles.statNumber, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {mockUserProfile.totalTasks}
                </Text>
                <Text style={[styles.statLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  Total Tasks
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(400).duration(600)} style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Quick Actions
          </Text>
          <View style={styles.actionButtons}>
            <Button
              title="Add Task"
              onPress={() => router.push('/task-detail')}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title="Categories"
              onPress={() => router.push('/categories')}
              variant="outline"
              style={styles.actionButton}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {mockCategories.map((category, index) => (
              <Card
                key={category.id}
                onPress={() => router.push(`/categories?category=${category.name}`)}
                style={[styles.categoryCard, { borderLeftColor: category.color, borderLeftWidth: 4 } as any]}
                margin={4}
              >
                <IconSymbol name={category.icon as any} size={24} color={category.color} />
                <Text style={[styles.categoryName, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryCount, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {category.taskCount} tasks
                </Text>
              </Card>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  courseInfo: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  collegeInfo: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statsCard: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  quickActions: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  categoriesSection: {
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
