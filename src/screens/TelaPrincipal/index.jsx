import { connect } from 'react-redux';
import store from '../../../store';
import React, { useState } from 'react';

import { FontAwesome5 } from 'react-native-vector-icons';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const TelaPrincipal = ({ currentUser }) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('PT-BR', { month: 'long' });
  const dias = '20';
  const [iconName, setIconName] = useState('bell');

  const handlePress = () => {
    if (iconName === 'bell') {
      setIconName('check');
    } else {
      setIconName('bell');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <FontAwesome5 name="cog" size={30} color="#333" style={styles.cogIcon} />
        <Text style={styles.dataAtual}>{`${day}/${month}`}</Text>
        <FontAwesome5
          name={iconName}
          size={30}
          color="#333"
          style={styles.bellIcon}
          onPress={handlePress} />
      </View>
      

      <ScrollView>
        <Text style={styles.mensagem}>{
          "Menstruação em"
        }</Text>
        <Text style={styles.date}>{
          dias
        }</Text>
        <Text style={styles.mensagem}>{
          "Dias"
        }</Text>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Dados Menstruacao</Text>
        </View>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Dados Rela;oes</Text>
        </View>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Aniversario</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(TelaPrincipal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    margin: 10,
  },
  dataAtual: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cogIcon: {
    marginRight: 'auto',
  },
  bellIcon: {
    marginLeft: 'auto',
  },
  mensagem: {
    fontSize: 18,
    textAlign: 'center',
  },
  date: {
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retangulo: {
    backgroundColor: 'purple',
    padding: 100,
    marginVertical: 8,
    opacity: 0.3,
    alignItems: 'center',
    borderRadius: 17,
    marginHorizontal: 0.3,
    flex: 1,
  },
  textoRetangulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
