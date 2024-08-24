import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="homeScreen/index" options={{ headerTitle: 'Home' }} />
            <Stack.Screen name="newEntryScreen/index" options={{ headerTitle: 'New Journal' }} />
            <Stack.Screen name="detailsScreen/index" options={{ headerTitle: 'Journal Details' }} />
            <Stack.Screen name="editEntryScreen/index" options={{ headerTitle: 'Edit Journal Details' }} />
        </Stack>
    );
}
