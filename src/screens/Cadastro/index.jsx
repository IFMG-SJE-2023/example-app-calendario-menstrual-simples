import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, ViewComponent, TextInput, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Fundo from '../../../assets/fundo.png';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../../store';
import store from '../../../store';
import moment from 'moment';
import config from '../../../config/config.json';

const App = ({ currentUser }) => {
  const navigation = useNavigation();
  const [ultMenstruacao, setultMenstruacao] = useState('');
  const [step, setStep] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [intervalo, setIntervalo] = useState('');

  async function addCicloMenstrual(id_usuario, dataInicio, dataFim, intervalo) {
    try {
      const response = await fetch(config.urlRootNode + 'add-ciclo-menstrual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario,
          dataInicio,
          dataFim, 
          intervalo
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const handlePressBotao = (resposta) => {
    if (resposta == 'Não') {
      setIntervalo('28');
      const dtInicio = moment(ultMenstruacao).format('YYYY-MM-DD');
      const dtFim = moment(ultMenstruacao).add(4, 'days').format('YYYY-MM-DD');
      addCicloMenstrual(currentUser.id, dtInicio, dtFim, intervalo);
    } else {
      changeForm();
    }
  };
  const handleNextPress = () => {
    if (ultMenstruacao) {
      console.log(ultMenstruacao);
      changeForm();
    } else {
      Alert.alert('Selecione a data para continuar.');
    }
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
  const handleConfirmarPress = (valor) => {
    if (valor) {
      setIntervalo(valor);
      addCicloMenstrual(currentUser.id, ultMenstruacao, ultMenstruacao+4, intervalo);
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
            <Text style={styles.titulo2}>EM QUAL DIA OCORREU SUA ULTIMA MENSTRUAÇÃO ?</Text>
          </View>
          <View style={styles.calendario}>
            <Calendar
              locale='pt-br'
              monthFormat='MMMM yyyy'
              onDayPress={(day) => setultMenstruacao(day.dateString)}
              markedDates={{ [ultMenstruacao]: { selected: true } }}
            />
          </View>
          <TouchableOpacity style={styles.button}
            onPress={handleNextPress}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : step === 1 ? (
        <View style={styles.internal2}>
          <Text style={styles.titulo2}>SUA MENSTRUAÇÃO E DESREGULADA ?</Text>
          <View style={[styles.botoesContainer, { flexDirection: 'row' }]}>
            <TouchableOpacity
              style={[
                styles.button2,
                respostaSelecionada === 'Sim' && styles.botaoSelecionado,
              ]}
              onPress={() => {
                handlePressBotao('Sim');
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
                handlePressBotao("Não");
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
            onChangeText={text => setIntervalo(text)}
            keyboardType='numeric'
            value={intervalo}
          />
          <TouchableOpacity style={styles.button2} disabled={!intervalo} onPress={() => handleConfirmarPress(intervalo)}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )
      }
    </ImageBackground >
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);

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
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  calendario: {
    paddingHorizontal: 10,
    width: '100%',
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
    fontSize: 16,
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
    marginVertical: 20,
    borderRadius: 20,
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
