import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { borderWidth: 1, marginVertical: 10, padding: 8 },
});

const Edit = ({ navigation, route }) => {
    const [editedBook, setEditedBook] = useState(JSON.parse(route.params.data)[route.params.index]);

    const saveChanges = async () => {
        const currentData = JSON.parse(route.params.data);
        currentData[route.params.index] = editedBook;
        await AsyncStorage.setItem('bookList', JSON.stringify(currentData));
        navigation.navigate('Home');
    };

    const deleteBook = async () => {
        const currentData = JSON.parse(route.params.data);
        currentData.splice(route.params.index, 1);
        await AsyncStorage.setItem('bookList', JSON.stringify(currentData));
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text>Title</Text>
            <TextInput
                style={styles.input}
                value={editedBook.key}
                onChangeText={(text) => setEditedBook({ ...editedBook, key: text })}
            />
            <Text>ISBN</Text>
            <TextInput
                style={styles.input}
                value={editedBook.ISBN}
                onChangeText={(text) => setEditedBook({ ...editedBook, ISBN: text })}
            />
            <Text>Copies</Text>
            <TextInput
                style={styles.input}
                value={editedBook.copies.toString()}
                onChangeText={(text) =>
                    setEditedBook({ ...editedBook, copies: parseInt(text) })
                }
                keyboardType="numeric"
            />
            <Button title="Save" onPress={saveChanges} />
            <Button title="Delete" onPress={deleteBook} />
        </View>
    );
};

export default Edit;
