import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Dicas() {
    
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Dicas para você</Text>
          <Text style={styles.subtitle}>Dor menstrual:</Text>
          <Text style={styles.content}>
            Para aliviar a dor menstrual, experimente fazer exercícios leves,
            como caminhar ou fazer ioga. Aplicar calor na região do abdômen com
            uma bolsa térmica também pode ajudar.
          </Text>
          <Text style={styles.subtitle}>Sangramento:</Text>
          <Text style={styles.content}>
            Use absorventes adequados ao seu fluxo e troque-os a cada 4-6 horas.
            Evite absorventes internos se estiver com corrimento vaginal.
          </Text>
          <Text style={styles.subtitle}>Auto-cuidado:</Text>
          <Text style={styles.content}>
            Tire um tempo para si mesma durante o período menstrual e faça coisas
            que te deixem feliz, como ler um livro, tomar um banho relaxante ou
            assistir a um filme.
          </Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
      content: {
        fontSize: 16,
        marginBottom: 10,
      },
    });