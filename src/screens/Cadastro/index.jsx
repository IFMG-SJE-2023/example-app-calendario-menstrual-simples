import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, ViewComponent, TextInput} from 'react-native';
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
          <View style={styles.internal}>
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
          <TouchableOpacity style={styles.button} onPress={() => {
            onSelecionarData();
            changeForm();
          }}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <Text style={styles.dataSelecionada}>{dataSelecionada}</Text>
        </KeyboardAvoidingView>
      ) : step === 1 ? (
        <View style={styles.internal2}>
          <Text style={styles.titulo2}>SUA MENSTRUAÇÃO E DESREGULADA ?</Text>
          <View style={[styles.botoesContainer, {flexDirection: 'row'}]}>
            <TouchableOpacity
              style={[
                styles.button2,
                respostaSelecionada === 'Sim' && styles.botaoSelecionado,
              ]}
              onPress={() => {
                handlePressBotao('Sim');
                changeForm();
              }
              }
              disabled={respostaSelecionada !== null && respostaSelecionada !== 'Sim'}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button2,
                respostaSelecionada === 'Não' && styles.botaoSelecionado,
              ]}
              onPress={() => {
                handlePressBotao('Não');
                changeForm();
              }
              }
              disabled={respostaSelecionada !== null && respostaSelecionada !== 'Não'}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.internal2}>
          <Text style={styles.titulo2}>SUAS MENSTRUAÇÕES CUSTAM TER INTERVALO DE QUANTOS DIAS?</Text>
          <TextInput
            style={styles.input}
            placeholder="Intervalo em dias"
          />
          <TouchableOpacity style={styles.button2} onPress={() => {
            
          }}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
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

  internal: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 40,
  },
  titulo: {
    fontSize : 16,
    color: 'white',
    textAlign: 'center', 
  },
  calendario: {
    paddingHorizontal: 10,
    width : '100%',
  },
  button: {
    backgroundColor: '#c60052',
    height: 40,
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  titulo2: {
    fontSize : 16,
    color: 'white',
    textAlign: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  internal2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botoesContainer: {
    marginTop: 20,
  },
  button2: {
    backgroundColor: '#c60052',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  botaoSelecionado: {
    backgroundColor: '#ff5b8b',
  },
  input: {
    backgroundColor: '#fff',
    width: '60%',
    height: 40,
    borderRadius: 20,
    fontWeight: 'bold',
    paddingLeft: 20
  },
});
