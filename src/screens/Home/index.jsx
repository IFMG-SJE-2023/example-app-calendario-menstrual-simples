import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.calendario]}>
                <CalendarPicker onDateChange={onDateChange} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    calendario: {
        marginTop: 100, 
        marginHorizontal: 50,
    }   
}); 