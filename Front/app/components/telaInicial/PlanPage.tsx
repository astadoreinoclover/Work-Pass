import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

const PlanosComponent = () => {
  const { width } = useWindowDimensions();

  const planos = [
    { nome: 'Plano Básico', descricao: ['Plano inicial com recursos limitados'], valor: 100 },
    { nome: 'Plano Básico Anual', descricao: ['Plano inicial com recursos limitados'], valor: 1200 },
    { nome: 'Plano Premium', descricao: ['Plano inicial com recursos limitados'], valor: 200 },
    { nome: 'Plano Premium Anual', descricao: ['Plano inicial com recursos limitados'], valor: 2400 },
  ];

  return (
    <View style={[styles.container, {width: width*0.95}]}>
        <Text style={styles.title}>Planos</Text>
        <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        >
            {planos.map((plano, index) => (
                <View key={index} style={styles.planoCard}>
                    <Text style={styles.planoTitle}>{plano.nome}</Text>
                    <Text
                        style={[
                        styles.planoValor,
                        ]}
                    >
                        {plano.valor > 1000 && 'De: '}
                        <Text style={plano.valor > 1000 && styles.valorVermelho}>
                            {plano.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>
                    </Text>
                    <Text style={styles.planoValor}>
                        {plano.valor > 1000 && `Por: ${(plano.valor * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                    </Text>
                    <Text style={styles.planoDesc}>⭐ {plano.descricao}</Text>
                </View>
            ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    marginHorizontal: 'auto',
    borderRadius: 10,
    padding: 40, 
    marginBottom: 30
  },
  title: {
    marginHorizontal: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 35,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 'auto'
  },
  planoCard: {
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  planoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', 
    color: '#2c3e50'
  },
  planoDesc: {
    fontSize: 14,
    color: '#666',
  },
  planoValor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
    marginHorizontal: 'auto'
  },
  valorVermelho: {
    color: 'red',
    textDecorationLine: 'line-through',
    fontSize: 14,
    fontWeight: 'light',
    marginHorizontal: 'auto'
  },        
});

export default PlanosComponent;
