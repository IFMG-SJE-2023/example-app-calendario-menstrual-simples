import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, ViewComponent } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fundo from '../../../assets/fundo.png';

export default function App() {
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [step, setStep] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const handlePressBotao = (resposta) => {
    setRespostaSelecionada(resposta);
  };
  function onSelecionarData() {
    console.log(`Data selecionada: ${dataSelecionada}`);
  }
  function changeForm() {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      setStep(0);
    }
  }


  return (
    <ImageBackground
      style={styles.container}
      source={
        Fundo
      }
      resizeMode="stretch"
    >
      {step === 0 ? (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.header}>
            <Text style={styles.titulo}>EM QUAL DIA OCORREU SUA ULTIMA MENSTRUAÇÃO ?</Text>
          </View>
          <View style={styles.calendario}>
            <Calendar
              locale='pt-br'
              monthFormat='MMMM yyyy'
              onDayPress={(day) => setDataSelecionada(day.dateString)}
              markedDates={{ [dataSelecionada]: { selected: true } }}
            />
          </View>
          <TouchableOpacity style={styles.botao} onPress={() => {
            onSelecionarData();
            changeForm();
          }}>
            <Text style={styles.textoBotao}>Confirmar</Text>
          </TouchableOpacity>
          <Text style={styles.dataSelecionada}>{dataSelecionada}</Text>
        </KeyboardAvoidingView>
      ) : step === 1 ? (
        <View style={styles.container}>
          <Text style={styles.pergunta}>SUA MENSTRUAÇÃO E DESREGULADA ?</Text>
          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[
                styles.botao,
                respostaSelecionada === 'Sim' && styles.botaoSelecionado,
              ]}
              onPress={() => {
                handlePressBotao('Sim');
                changeForm();
              }
              }
              disabled={respostaSelecionada !== null && respostaSelecionada !== 'Brasília'}
            >
              <Text style={styles.botaoTexto}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botao,
                respostaSelecionada === 'Não' && styles.botaoSelecionado,
              ]}
              onPress={() => {
                handlePressBotao('Sim');
                changeForm();
              }
              }
              disabled={respostaSelecionada !== null && respostaSelecionada !== 'São Paulo'}

            >
              <Text style={styles.botaoTexto}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.pergunta}>SUA MENSTRUAÇÃO E DESREGULADA ?</Text>
        </View>
      )
      }
    </ImageBackground >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
  },
  icone: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
  },
  calendario: {
    overflow: 'hidden',
    marginVertical: 20,
    padding: 10,
  },
  botao: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataSelecionada: {
    fontSize: 18,
  },
  botoesContainer: {
    flexDirection: 'row',
    paddingTop: 100,
  },
});
