// app/edit-entry.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditEntryScreen() {
    const item = useLocalSearchParams();
    const [title, setTitle] = useState(item.title);
    const [body, setBody] = useState(item.body);

    const saveEdit = async () => {
        const savedEntries = await AsyncStorage.getItem('journalEntries');
        const entries = savedEntries ? JSON.parse(savedEntries) : [];
        const updatedEntries = entries.map((entry, idx) => {
            if (idx == item.index) {
                return { ...entry, title, body };
            }
            return entry;
        });

        await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Journal Entry</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Entry Title"
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                value={body}
                onChangeText={setBody}
                placeholder="Entry Details"
                multiline
                numberOfLines={4}
            />
            <Button title="Save" onPress={() => saveEdit()} />
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
