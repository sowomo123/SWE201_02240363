import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, typography } from '../styles/theme';

const NoticeBoardScreen = () => {
  const notices = [
    { 
      id: '1', 
      title: 'Exam Schedule Released', 
      date: '2024-04-05',
      content: 'Final examination schedule has been released. Please check the official website for details.'
    },
    { 
      id: '2', 
      title: 'Holiday Notice', 
      date: '2024-04-03',
      content: 'University will remain closed on April 15th for the annual festival.'
    },
    { 
      id: '3', 
      title: 'Workshop on AI', 
      date: '2024-04-01',
      content: 'Computer Science department is organizing a workshop on Artificial Intelligence on April 20th.'
    },
    { 
      id: '4', 
      title: 'Library Hours Extended', 
      date: '2024-03-28',
      content: 'Library will remain open until 10 PM during the examination period.'
    },
  ];

  const renderNoticeItem = ({ item }) => (
    <View style={styles.noticeItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        renderItem={renderNoticeItem}
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
  noticeItem: {
    backgroundColor: colors.surface,
    marginVertical: 4,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    ...typography.caption,
    color: colors.subText,
    marginBottom: 8,
  },
  content: {
    ...typography.body,
    color: colors.text,
    lineHeight: 20,
  },
});

export default NoticeBoardScreen;