import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NoticeBoardScreen from '../screens/NoticeBoardScreen';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator wrapping the Contacts tab (for detail screen + param passing)
const ContactsStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}>
        <Stack.Screen name="ContactsList" component={ContactsScreen} options={{ title: 'Contacts' }} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: 'Contact Detail' }} />
    </Stack.Navigator>
);

// Home stack so HomeScreen can navigate into tab stacks if needed
const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Campus Companion' }} />
    </Stack.Navigator>
);

// Schedule stack
const ScheduleStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}>
        <Stack.Screen name="ScheduleList" component={ScheduleScreen} options={{ title: 'Schedule' }} />
    </Stack.Navigator>
);

// NoticeBoard stack
const NoticeBoardStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}>
        <Stack.Screen name="NoticeList" component={NoticeBoardScreen} options={{ title: 'Notices' }} />
    </Stack.Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.subText,
                tabBarStyle: { paddingBottom: 6, height: 58 },
                tabBarLabel: ({ color }) => (
                    <Text style={{ color, fontSize: 11, fontWeight: '600' }}>{route.name}</Text>
                ),
                tabBarIcon: ({ color }) => {
                    const icons = { Home: '🏠', Contacts: '📞', Schedule: '📅', NoticeBoard: '📌' };
                    return <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Contacts" component={ContactsStack} />
            <Tab.Screen name="Schedule" component={ScheduleStack} />
            <Tab.Screen name="NoticeBoard" component={NoticeBoardStack} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default AppNavigator;