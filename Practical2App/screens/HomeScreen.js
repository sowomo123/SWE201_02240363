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

function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();

  // Responsive breakpoints
  const isSmall = width < 360;
  const isMedium = width >= 360 && width < 768;
  const isLarge = width >= 768;
  const isTablet = width >= 1024;

  // Dynamic font sizes
  const titleSize = isSmall ? 24 : isMedium ? 28 : 32;
  const subtitleSize = isSmall ? 14 : 16;
  const cardTitleSize = isSmall ? 16 : 18;
  const cardTextSize = isSmall ? 12 : 14;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenContainer}>
          <Text style={[styles.title, { fontSize: titleSize }]}>Welcome Home</Text>


          <View style={[
            styles.featureGrid,
            isLarge && styles.featureGridLarge,
            isTablet && styles.featureGridTablet
          ]}>
            <TouchableOpacity
              style={[styles.featureCard, isSmall && styles.featureCardSmall]}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={[styles.featureTitle, { fontSize: cardTitleSize }]}>Dashboard</Text>
              <Text style={[styles.featureText, { fontSize: cardTextSize }]}>
                View analytics and responsive layouts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, isSmall && styles.featureCardSmall]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={[styles.featureTitle, { fontSize: cardTitleSize }]}>Profile</Text>
              <Text style={[styles.featureText, { fontSize: cardTextSize }]}>
                Manage your account settings
              </Text>
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
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#7f8c8d',
    fontFamily: 'Times New Roman',
  },

  // Home Screen Styles
  featureGrid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 24,
  },
  featureGridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureGridTablet: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  featureCardSmall: {
    padding: 12,
    height: 180,
    width: 180,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
    fontFamily: 'Times New Roman',
  },
  featureText: {
    color: '#7f8c8d',
    fontFamily: 'Times New Roman',
  },
});

export default HomeScreen;
