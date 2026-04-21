import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function DashboardScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const isSmall = width < 360;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenContainer}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            Responsive analytics dashboard with adaptive layouts
          </Text>

          <View style={styles.cardContainer}>
            {[
              { title: 'Revenue', text: 'Track income and earnings' },
              { title: 'Users', text: 'Monitor user activity' },
              { title: 'Orders', text: 'View order statistics' },
              { title: 'Performance', text: 'Analyze system metrics' }
            ].map((item, index) => (
              <View key={index} style={[
                styles.card,
                isSmall && styles.cardSmall
              ]}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.navButton, isSmall && styles.navButtonSmall]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.navButtonText}>Go Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, isSmall && styles.navButtonSmall]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.navButtonText}>Go to Profile</Text>
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

  // Dashboard Styles
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  cardSmall: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  cardText: {
    fontSize: 14,
    color: '#7f8c8d',
    opacity: 0.9,
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
  navButtonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Times New Roman',
  },
});

export default DashboardScreen;
