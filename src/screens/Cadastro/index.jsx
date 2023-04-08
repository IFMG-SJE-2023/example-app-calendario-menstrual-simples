import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fundo from '../../../assets/fundo.png';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  return (
    <ImageBackground style={styles.container} source={Fundo}>
      <View>
        <Text style={styles.titulo}>Texto no meio da tela</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Selecionar data</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 30,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
