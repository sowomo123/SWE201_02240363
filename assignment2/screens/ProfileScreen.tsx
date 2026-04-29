import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, TouchableOpacity, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInUp, Layout } from 'react-native-reanimated';


import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BackNavigation } from '@/components/BackNavigation';
import { mockUserProfile } from '@/constants/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [autoSync, setAutoSync] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  type SwitchSetting = {
    icon: string;
    title: string;
    subtitle: string;
    type: 'switch';
    value: boolean;
    onToggle: (value: boolean) => void;
  };

  type ActionSetting = {
    icon: string;
    title: string;
    subtitle: string;
    type: 'action';
    onPress: () => void;
  };

  type SettingItem = SwitchSetting | ActionSetting;

  type SettingsSection = {
    title: string;
    items: SettingItem[];
  };

  const settingsSections: SettingsSection[] = [
    {
      title: 'Preferences',
      items: [
        {
          icon: 'bell.fill',
          title: 'Push Notifications',
          subtitle: 'Receive task reminders and updates',
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: 'moon.fill',
          title: 'Dark Mode',
          subtitle: 'Use dark theme across the app',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          icon: 'arrow.clockwise',
          title: 'Auto Sync',
          subtitle: 'Automatically sync data across devices',
          type: 'switch',
          value: autoSync,
          onToggle: setAutoSync,
        },
        {
          icon: 'faceid',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face to unlock',
          type: 'switch',
          value: biometricAuth,
          onToggle: setBiometricAuth,
        },
      ],
    },
    {
      title: 'Study Settings',
      items: [
        {
          icon: 'clock.fill',
          title: 'Study Reminders',
          subtitle: 'Daily study session reminders',
          type: 'action',
          onPress: () => Alert.alert('Study Reminders', 'Configure your study schedule'),
        },
        {
          icon: 'target',
          title: 'Daily Goals',
          subtitle: 'Set and track daily study goals',
          type: 'action',
          onPress: () => Alert.alert('Daily Goals', 'Configure your daily goals'),
        },
        {
          icon: 'chart.bar.fill',
          title: 'Progress Reports',
          subtitle: 'Weekly and monthly progress reports',
          type: 'action',
          onPress: () => Alert.alert('Progress Reports', 'View your study analytics'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'questionmark.circle.fill',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'action',
          onPress: () => Alert.alert('Help Center', 'Access help documentation'),
        },
        {
          icon: 'envelope.fill',
          title: 'Contact Us',
          subtitle: 'Send feedback or report issues',
          type: 'action',
          onPress: () => Alert.alert('Contact Us', 'support@studyapp.com'),
        },
        {
          icon: 'star.fill',
          title: 'Rate App',
          subtitle: 'Rate us on the app store',
          type: 'action',
          onPress: () => Alert.alert('Rate App', 'Thank you for using our app!'),
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => Alert.alert('Logged Out', 'You have been successfully logged out.')
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Deleted', 'Your account has been permanently deleted.')
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <BackNavigation 
        title="Profile & Settings"
        rightAction={{
          icon: 'house',
          onPress: () => router.push('/')
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.profileSection}>
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Image source={mockUserProfile.avatar} style={styles.avatarImage} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                  {mockUserProfile.name}
                </Text>
                <Text style={[styles.profileEmail, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {mockUserProfile.email}
                </Text>
                <Text style={[styles.profileCourse, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {mockUserProfile.course} • {mockUserProfile.studentId}
                </Text>
                <Text style={[styles.profileCollege, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                  {mockUserProfile.college}
                </Text>
                <View style={styles.profileStats}>
                  <View style={styles.statBadge}>
                    <IconSymbol name="flame.fill" size={16} color="#ef4444" />
                    <Text style={[styles.statText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      {mockUserProfile.studyStreak} days
                    </Text>
                  </View>
                  <View style={styles.statBadge}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color="#10b981" />
                    <Text style={[styles.statText, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                      {mockUserProfile.completedTasks} tasks
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Button
              title="Edit Profile"
              onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
              variant="outline"
            />
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.settingsSection}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={section.title} style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                {section.title}
              </Text>
              <Card style={styles.settingsCard}>
                {section.items.map((item, itemIndex) => (
                  <View key={item.title} style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                      <IconSymbol
                        name={item.icon as any}
                        size={20}
                        color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                      />
                      <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
                          {item.title}
                        </Text>
                        <Text style={[styles.settingSubtitle, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                    {item.type === 'switch' ? (
                      <Switch
                        value={(item as SwitchSetting).value}
                        onValueChange={(item as SwitchSetting).onToggle}
                        trackColor={{ false: '#e5e7eb', true: '#4f46e5' }}
                        thumbColor={(item as SwitchSetting).value ? '#ffffff' : '#ffffff'}
                      />
                    ) : (
                      <TouchableOpacity onPress={(item as ActionSetting).onPress}>
                        <IconSymbol
                          name="chevron.right"
                          size={20}
                          color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </Card>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.dangerSection}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#111827' }]}>
            Danger Zone
          </Text>
          <Card style={styles.dangerCard}>
            <TouchableOpacity style={styles.dangerItem} onPress={handleLogout}>
              <IconSymbol name="arrow.right.square" size={20} color="#f59e0b" />
              <Text style={[styles.dangerText, { color: '#f59e0b' }]}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.dangerDivider} />
            <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteAccount}>
              <IconSymbol name="trash.fill" size={20} color="#ef4444" />
              <Text style={[styles.dangerText, { color: '#ef4444' }]}>Delete Account</Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
            Made with ❤️ for students
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 24,
  },
  profileCard: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  profileCourse: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  profileCollege: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    padding: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  dangerSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  dangerCard: {
    padding: 8,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  dangerDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
});
