import React, { useState } from 'react';
import { FontAwesome5 } from 'react-native-vector-icons';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TelaPrincipal = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  const dias = '10';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="cog" size={30} color="#333"  style={styles.cogIcon}/>
        <Text style={styles.dataAtual}>{`${day}/${month}`}</Text>
        <FontAwesome5 name="bell" size={30} color="#333" style={styles.bellIcon} />
      </View>
      
      <ScrollView>
        <Text style={styles.mensagem}>{
          "Menstruação em"
        }</Text>
        <Text style={styles.date}>{
          dias
        }</Text>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Conteúdo do Retângulo 1</Text>
        </View>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Conteúdo do Retângulo 2</Text>
        </View>
        <View style={styles.retangulo}>
          <Text style={styles.textoRetangulo}>Conteúdo do Retângulo 3</Text>
        </View>
      </ScrollView>

    </View>
  );
};

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
    marginBottom: 16,
  },
  date: {
    fontSize: 120,
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

export default TelaPrincipal;
