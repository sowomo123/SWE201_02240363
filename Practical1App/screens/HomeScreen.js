import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ImageBackground } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../public/images/back.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Text style={styles.title}>Ghibli Character</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to About"
            onPress={() => navigation.navigate('About')}
            color="#939952ff"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontFamily: 'Times New Roman',
    marginBottom: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default HomeScreen;
