import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, TouchableOpacity, KeyboardAvoidingView, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Calendario from '../../../assets/calendario.png'
import Fundo from '../../../assets/fundo.png'
import Usuarios from '../../services/sqlite/Usuarios';
import { StatusBar } from 'react-native';
import { AuthContext } from '../../../src/contexts/auth';


export default function Login() {
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [repeatpassword, setRepeatPassword] = useState('');

  /* const usuario = {
    nome: name,
    email: email,
    data_nascimento: format(new Date(selectedDate), 'dd/MM/yyyy'),
    senha: password,
  } */


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  }

  const handleSubmit = (email, password) => {
    if (email === '') {
      Alert.alert('Informe seu email');
      return;
    }
    if (password === '') {
      Alert.alert('Informe sua senha');
      return;
    }
    signIn(email, password);
  }
  function validateForm() {
    if (name === '') {
      Alert.alert('Informe seu nome');
      return;
    }
    if (email === '') {
      Alert.alert('Preencha o campo E-mail');
      return;
    }
    if (password === '') {
      Alert.alert('Preencha o campo senha');
      return;
    }
    if (repeatpassword === '') {
      Alert.alert('Repita sua senha');
      return;
    }
    if (password !== repeatpassword) {
      Alert.alert('As senhas nao conferem');
      return;
    }
    Usuarios.findByEmailandName(email, name)
      .then((id) => Alert.alert('Usuario Existente.'))
      .catch((error) => {
        Usuarios.create(usuario)
          .then((id) => console.log("Objeto inserido com sucesso! ID: ", id))
          .catch((error) => console.error(error));
        navigation.navigate('Cadastro');
        changeForm();
      });
  }
  function changeForm() {
    if (step === 0) {
      setStep(1);
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
      <StatusBar hidden={true} />

      <Image style={styles.iconecalendario} source={Calendario} resizeMode="contain" />


      <Text style={styles.title}>SEJÁ BEM-VINDA AO
        NOSSO APP </Text>

      <Text style={styles.subtitle}>Monitore e preveja sua menstruação, anticoncepcionais,
        tente engravidar e acompanhe a gravidez em um só app.
        Atinja todas as suas metas</Text>

      {step == 0 ? (
        <KeyboardAvoidingView style={styles.form} behavior="padding">

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder=" Digite seu E-mail"
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder=" Sua senha secreta"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={() => handleSubmit(email, password)}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {<TouchableOpacity onPress={changeForm}>
            <Text style={[styles.label, { textAlign: 'center' }]}>Já tem conta ? FAÇA LOGIN</Text>
          </TouchableOpacity>
          }
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.form, { marginTop: 170 }]}>
          <Text style={styles.label}>Nome</Text>

          <TextInput
            style={styles.input}
            placeholder=" Seu nome completo"
            keyboardAppearance='default'
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder=" Digite seu usuário"
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={selectedDate.toLocaleDateString('pt-BR')}
            onTouchStart={() => setShowDatePicker(true)}
            onChangeText={setEmail}
          />

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              display="spinner"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />
          )}
          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder=" Sua senha secreta"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>Repita sua senha</Text>

          <TextInput
            style={styles.input}
            placeholder=" Sua senha secreta"
            secureTextEntry={true}
            value={repeatpassword}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity style={styles.button} onPress={validateForm}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={changeForm}>
            <Text style={[styles.label, { textAlign: 'center' }]}>Ja possuo conta!</Text>
          </TouchableOpacity>
        </View>
      )}

    </ImageBackground>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },

  iconecalendario: {

    marginBottom: -100,
    marginTop: 25,
    height: '20%',

  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: -150,
    marginTop: 75,
    textAlign: 'center',
    marginHorizontal: 15,
  },

  subtitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: -180,
    marginTop: 150,
    textAlign: 'center',
    marginHorizontal: 50,

  },

  form: {
    marginTop: 200,
    width: '65%',
    alignSelf: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 20,
    fontWeight: 'bold',
    paddingLeft: 20
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
}); 