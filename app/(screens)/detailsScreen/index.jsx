import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailsScreen() {
    const item = useLocalSearchParams();
    console.log(item)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details</Text>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemDate}>on: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.itemDetails}>{item.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: '#444',
    },
    itemDate: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
        color: '#333',
    },
    itemDetails: {
        fontSize: 16,
        color: '#666',
    },
});
