import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { colors, typography } from '../styles/theme';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const cards = [
    { id: 1, title: 'BE (Civil)', description: 'Civil Engineering Program' },
    { id: 2, title: 'BE (Electrical)', description: 'Electrical Engineering Program' },
    { id: 3, title: 'BE (ECE)', description: 'Electronics & Communication Engineering' },
    { id: 4, title: 'BE (IT)', description: 'Information Technology Program' },
    { id: 5, title: 'B (Architecture)', description: 'Architecture Program' },
    { id: 6, title: 'BE (Engineering Geology)', description: 'Engineering Geology Program' },
    { id: 7, title: 'BE (ICE)', description: 'Instrumentation & Control Engineering' },
    { id: 8, title: 'BE (Water Resources)', description: 'Water Resources Engineering' },
    { id: 9, title: 'BE (Mechanical)', description: 'Mechanical Engineering Program' },
    { id: 10, title: 'BE (Software)', description: 'Software Engineering Program' },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>COLLEGE OF SCIENCE AND TECHNOLOGY</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../public/images/OIP.webp')} style={styles.logo} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor={colors.subText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          contentContainerStyle={styles.cardList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingTop: 5,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 12,
    color: colors.text,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.subText,
    marginTop: 2,
    fontFamily: 'Times New Roman',
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Times New Roman',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardList: {
    paddingBottom: 20,
  },
  cardRow: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    margin: 4,
    flex: 1,
    maxWidth: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'Times New Roman',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: colors.subText,
    textAlign: 'center',
    fontFamily: 'Times New Roman',
    lineHeight: 14,
  },
});

export default HomeScreen;