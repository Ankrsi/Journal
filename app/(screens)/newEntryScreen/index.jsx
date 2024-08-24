// app/new-entry.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/Button';

export default function NewEntry() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const saveEntry = async () => {
        if (title.trim() === '' || body.trim() === '') {
            Alert.alert('Error', 'Both title and body are required.');
            return;
        }
        try {
            const newEntry = { id, title, body, date: new Date().toISOString() };
            const existingEntries = await AsyncStorage.getItem('journalEntries');
            const entries = existingEntries ? JSON.parse(existingEntries) : [];
            entries.push(newEntry);
            await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
            router.push('/');
        } catch (error) {
            Alert.alert('Error', 'Failed to save the entry.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Write Your Todays Activitys
                </Text>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Entry Title"
                    onChangeText={setTitle}
                    value={title}
                />
                <TextInput
                    style={styles.bodyInput}
                    placeholder="Write your journal entry..."
                    onChangeText={setBody}
                    value={body}
                    multiline
                />
                <Button title="Save Entry" onPress={saveEntry} style={styles.saveButton} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        height: Dimensions.get('window').height - 55,
    },
    heading: {
        marginVertical: 20,
        fontSize: 30,
        fontWeight: '700',
    },
    titleInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    bodyInput: {
        height: 350,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    saveButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginVertical: 20,
        marginHorizontal: 10,
    },
});
