import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showBox, setShowBox] = useState(false);
    const onDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleFabPress = () => {
        setShowBox(!showBox);
    };
    return (
        <View style={[styles.container]}>
            <View style={[styles.calendario]}>
                <CalendarPicker onDateChange={onDateChange}
                    selectedDayStyle={{ backgroundColor: 'red' }}
                    selectedDayTextColor={'white'}
                />
            </View>

            {showBox && <View style={styles.box} />}
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

        </View>
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