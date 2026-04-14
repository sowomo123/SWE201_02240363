import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

// Reusable card component for contact list items
const ContactCard = ({ item, onPress }) => (
    <TouchableOpacity style={getStyles().card} onPress={() => onPress(item)}>
        <View style={getStyles().avatar}>
            <Text style={getStyles().avatarText}>{item.name[0]}</Text>
        </View>
        <View style={getStyles().info}>
            <Text style={getStyles().name}>{item.name}</Text>
            <Text style={getStyles().role}>{item.role}</Text>
        </View>
            </TouchableOpacity>
);

const getStyles = () => StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.sm,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
            android: { elevation: 3 },
        }),
    },
    avatar: {
        width: 46, height: 46, borderRadius: 23,
        backgroundColor: colors.primary,
        justifyContent: 'center', alignItems: 'center',
        marginRight: spacing.md,
    },
    avatarText: { color: '#fff', fontSize: typography.h3.fontSize, fontWeight: 'bold' },
    info: { flex: 1 },
    name: { fontSize: typography.h3.fontSize, fontWeight: '600', color: colors.text },
    role: { fontSize: typography.caption.fontSize, color: colors.subText, marginTop: 2 },
    });

export default ContactCard;