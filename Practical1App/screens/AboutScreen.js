import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';

function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/arrietty.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Arrietty</Text>
          <Text style={styles.cardContent}>Ghibli anime </Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/marine.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Marine</Text>
          <Text style={styles.cardContent}>Ghibli anime</Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/chihiro.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Chihiro</Text>
          <Text style={styles.cardContent}>Ghili anime </Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/sophie.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Shophie</Text>
          <Text style={styles.cardContent}>Ghibli anime </Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/nako.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Nako</Text>
          <Text style={styles.cardContent}>Ghibli anime </Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('../public/images/kiki.jpeg')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Kiki</Text>
          <Text style={styles.cardContent}>Ghibli anime</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            color="#939952ff"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
});

export default AboutScreen;
