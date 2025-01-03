import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
    bookContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    bookImage: {
        width: 80, // Larger image
        height: 120, // Larger image
        marginRight: 15,
        borderRadius: 5,
    },
    bookInfo: { flex: 1 },
    bookTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    bookText: { fontSize: 14, color: '#555' },
    header: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
    },
    headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    button: { marginVertical: 10 },
});

const Home = ({ navigation }) => {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const storedData = await AsyncStorage.getItem('bookList');
            if (storedData) {
                setBookData(JSON.parse(storedData));
            } else {
                setBookData([]);
            }
        };
        fetchData();
    }, []);

    const renderBook = ({ item, index }) => (
        <TouchableOpacity
            style={styles.bookContainer}
            onPress={() => navigation.navigate('Edit', { data: JSON.stringify(bookData), index })}
        >
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.key}</Text>
                <Text style={styles.bookText}>ISBN: {item.ISBN}</Text>
                <Text style={styles.bookText}>Copies Owned: {item.copies}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>NEW BOOK</Text>
            </View>
            <FlatList
                data={bookData}
                renderItem={renderBook}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Button
                title="Add New Book"
                onPress={() => navigation.navigate('Add', { data: JSON.stringify(bookData) })}
            />
        </View>
    );
};

export default Home;
