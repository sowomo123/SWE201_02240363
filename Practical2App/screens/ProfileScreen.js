import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProfileScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isLarge = width >= 768;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenContainer}>


          <View style={[styles.profileContainer, isLarge && styles.profileContainerLarge]}>
            <View style={styles.profileHeader}>
              <Image
                source={require('../public/images/profile.jpeg')}
                style={styles.avatar}
              />
              <Text style={styles.profileName}>Sonam Wangmo</Text>
              <Text style={styles.profileEmail}>jojosonam222@gmail.com</Text>
            </View>

            <View style={styles.infoGrid}>
              {[
                { title: 'Account', text: 'Manage your account settings and preferences' },
                { title: 'Privacy', text: 'Control your privacy and security options' },
                { title: 'Notifications', text: 'Configure notification preferences' },
                { title: 'Help', text: 'Get help and support' }
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.infoCard}>
                  <Text style={styles.infoTitle}>{item.title}</Text>
                  <Text style={styles.infoText}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.navButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  scrollContent: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#7f8c8d',
    fontFamily: 'Times New Roman',
  },

  // Profile Styles
  profileContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    marginBottom: 24,
  },
  profileContainerLarge: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  profileEmail: {
    color: '#7f8c8d',
    fontFamily: 'Times New Roman',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    width: '48%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  infoText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontFamily: 'Times New Roman',
  },

  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  navButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  navButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Times New Roman',
  },
});

export default ProfileScreen;
