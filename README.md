# React Native Journal App

A simple journal app built with React Native using Expo. The app allows users to create, view, edit journal entries stored locally on their devices using AsyncStorage. Navigation between screens is handled using expo-router, with a clean and user-friendly interface.

## Features

- **Journal Entry List**: View a list of all journal entries, truncated with ellipses if the text is too long.
- **Create New Entry**: Add a new journal entry with a title and body.
- **Edit Entry**: Edit the title and body of an existing journal entry.
- **Details Page**: View full details of a selected journal entry.
- **Local Storage**: Journal entries are saved locally using AsyncStorage.

## Screens

1. **HomeScreen**: Displays a list of all journal entries with options to edit or delete them.
2. **NewEntryScreen**: Allows users to create a new journal entry.
3. **EditEntryScreen**: Allows users to edit an existing journal entry.
4. **DetailsScreen**: Displays detailed information about a selected journal entry.

## Installation

1. **Clone the repository**:
   git clone https://github.com/yourusername/journal-app.git
   cd journal
   npx expo run:android
   npm start

