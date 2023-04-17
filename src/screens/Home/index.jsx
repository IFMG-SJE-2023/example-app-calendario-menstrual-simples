import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showBox, setShowBox] = useState(false);
    const heartDates = ['2023-02-14', '2023-03-08', '2023-04-22'];
    const handleFabPress = () => {
        setShowBox(!showBox);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.calendario]}>
                <Calendar
                    minDate={'2023-01-01'}
                    maxDate={'2024-12-31'}
                    dayComponent={({ date, state }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                {/* Check if the current date is in the list of heart dates */}
                                {heartDates.includes(date.dateString) && (
                                    <Icon name="heart" size={28} color="#f00" style={{ position: 'absolute' }} />
                                )}
                                <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
                                    {date.day}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            {showBox && <View style={styles.box} />}
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    calendario: {
        marginTop: 20,
        elevation: 5,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        fontSize: 30,
        color: '#ffffff',
    },
    box: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: '80%',
        height: '90%',
        backgroundColor: 'white',
    },
}); 