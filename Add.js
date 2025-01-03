import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { borderWidth: 1, marginVertical: 10, padding: 8 },
});

const Add = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');

    const saveData = async () => {
        const currentData = JSON.parse(route.params.data);
        currentData.push({ key: title, ISBN: isbn, copies: parseInt(copies), image });
        await AsyncStorage.setItem('bookList', JSON.stringify(currentData));
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />
            <Text>ISBN</Text>
            <TextInput style={styles.input} value={isbn} onChangeText={setIsbn} />
            <Text>Copies</Text>
            <TextInput
                style={styles.input}
                value={copies}
                onChangeText={setCopies}
                keyboardType="numeric"
            />
            <Text>Image URL</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} />
            <Button title="Save" onPress={saveData} />
        </View>
    );
};

export default Add;
