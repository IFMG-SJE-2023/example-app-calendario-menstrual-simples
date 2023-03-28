import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import Calendario from '../../../assets/calendario.png'

export default function Login() {

  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');


  function handleSubmit() {
    console.log({ usuario, password });
    navigation.navigate('Home');
  }
  function changeForm() {
    if (step === 0) {
      setStep(1);
    } else {
      setStep(0);
    }
  }

  function validateForm() {
    if (name === '') {
      Alert.alert('Informe seu nome');
      return;
    }
    if (usuario === '') {
      Alert.alert('Preencha o campo usuario');
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


  }

return (
  <ImageBackground
    style={styles.container}
    source={{
      uri:
    
        'https://img.freepik.com/fotos-gratis/ceu-estrelado_1048-11828.jpg?w=996&t=st=1679336646~exp=1679337246~hmac=2bdffdce3864ebb7fbbc671030a0fb7d0c7ed6c5e100f8680bd0b7b8bdb29989'

    }}
    resizeMode="stretch"
  >

    <Image style={styles.iconecalendario} source={Calendario} resizeMode="contain" />


    <Text style={styles.title}>SEJÁ BEM-VINDA AO 
     NOSSO APP </Text>

    {step == 0 ? (
      <KeyboardAvoidingView style={styles.form} behavior="padding">

        <Text style={styles.label}>Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder=" Digite seu usuário"
          keyboardType='email-address'
          value={usuario}
          onChangeText={setUsuario}

        />
        <Text style={styles.label}>Senha</Text>

        <TextInput
          style={styles.input}
          placeholder=" Sua senha secreta"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}


        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={changeForm}>
          <Text style={[styles.label, { textAlign: 'center' }]}>Já tem conta ? FAÇA LOGIN</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    ) : (
      <View style={[styles.form, {marginTop:170}]}>
        <Text style={styles.label}>Nome</Text>

        <TextInput
          style={styles.input}
          placeholder=" Seu nome completo"
          keyboardAppearance='default'
          value={name}
          onChangeText={setName}

        />
        <Text style={styles.label}>Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder=" Digite seu usuário"
          keyboardType='email-address'
          value={usuario}
          onChangeText={setUsuario}

        />
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
          <Text style={styles.buttonText}>Cadastrar
          </Text>
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
    //justifyContent: 'center',
  },
  
  iconecalendario:{

    marginTop: 150,
    height:'20%',

  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: -150,
    marginTop: 200,
    textAlign: 'center',
    marginHorizontal: 15,

  },
  form: {
    marginTop: 270,
    width: '90%',
    alignSelf: 'center',


  },
  label: {

    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    marginTop: 20,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 20,
    fontWeight: 'bold',
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

  }

});
