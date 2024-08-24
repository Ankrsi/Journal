// app/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/Button';

export default function Home() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        loadEntries();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadEntries();
        }, [])
    );

    const loadEntries = async () => {
        try {
            const stored = await AsyncStorage.getItem('journalEntries');
            if (stored) {
                setEntries(JSON.parse(stored));
            }
        } catch (error) {
            console.log('Failed to load entries');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Journals</Text>
            {entries.length === 0 ? (
                <Text style={styles.noEntriesText}>No entries yet.</Text>
            ) : (
                <View style={styles.list}>
                    <FlatList
                        data={entries}
                        renderItem={({ index, item }) => (
                            <TouchableOpacity onPress={() => router.push({ pathname: 'detailsScreen', params: item })} key={index}>
                                <View style={styles.entry}>
                                    <Text style={styles.entryTitle}>{item.title}</Text>
                                    <Text style={styles.entryDate}>{new Date(item.date).toLocaleDateString()}</Text>
                                    <Text numberOfLines={1} ellipsizeMode="tail">{item.body}</Text>
                                    <Text style={styles.entryEdit} onPress={() => router.push({ pathname: 'editEntryScreen', params: { ...item, index } })}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    //keyExtractor={(item) => item.id}
                    />
                </View>
            )}
            <Button
                title="Add New Entry"
                onPress={() => router.push('newEntryScreen')}
                style={styles.addButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    noEntriesText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginBottom: 20,
    },
    entry: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 7,
        marginTop: 15,
        position: 'relative',
        gap: 6,
    },
    entryTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    entryDate: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 5,
        position: 'absolute',
        right: 10,
        top: -8,
        backgroundColor: '#525ef1',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 5,
    },
    entryEdit: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 5,
        position: 'absolute',
        right: 85,
        top: -8,
        backgroundColor: '#525ea3',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 5,
    },
    addButton: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },
    list: {
        flex: 1,
    }
});
