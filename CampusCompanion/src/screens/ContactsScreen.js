import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, typography } from '../styles/theme';

const ContactsScreen = ({ navigation }) => {
  const contacts = [
    { id: '1', name: 'Dean of Academic Affairs', phone: '(+975) 17548676', email: 'dean.academic@rub.edu.bt' },
    { id: '2', name: 'Head of Department (HoD)', phone: '(+975) 17548676', email: 'hod.cst@rub.edu.bt' },
    { id: '3', name: 'Lecturers / Instructors', phone: '(+975) 17548676', email: 'lecturers@rub.edu.bt' },
    { id: '4', name: 'Academic Advisor', phone: '(+975) 17548676', email: 'advisor@rub.edu.bt' },
    { id: '5', name: 'Student Affairs Office', phone: '(+975) 17548676', email: 'student.affairs@rub.edu.bt' },
    { id: '6', name: 'Student Counselor', phone: '(+975) 17548676', email: 'counselor@rub.edu.bt' },
    { id: '7', name: 'Registrar Office', phone: '(+975) 17548676', email: 'registrar@rub.edu.bt' },
    { id: '8', name: 'Admin Office', phone: '(+975) 17548676', email: 'admin@rub.edu.bt' },
    { id: '9', name: 'IT Support', phone: '(+975) 17548676', email: 'it.support@rub.edu.bt' },
  ];

  const renderContact = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => navigation.navigate('ContactDetail', { contact: item })}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  contactItem: {
    backgroundColor: colors.surface,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  contactPhone: {
    ...typography.body,
    color: colors.subText,
  },
});

export default ContactsScreen;