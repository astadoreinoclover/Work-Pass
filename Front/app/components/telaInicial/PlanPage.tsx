import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

const PlanosComponent = () => {
  const { width } = useWindowDimensions();

  const planos = [
    { nome: 'Plano Básico', descricao: ['Cadastro de funcionários e tarefas.', 'Gráfico de entregas.', 'Tabela mensal de desempenho.', 'Funcionalidades para adicionar skills e interesses de novas funções.'], valor: 100 },
    { nome: 'Plano Básico Anual', descricao: ['Inclui todas as funcionalidades da assinatura mensal.', 'Desconto de 10% no valor da assinatura.'], valor: 1200 },
    { nome: 'Plano Premium', descricao: ['Inclui todas as funcionalidades da assinatura mensal.', 'Gráfico de entregas mais detalhado e com relatório.', 'Tabela de desempenho semanal, mensal e anual.'], valor: 200 },
    { nome: 'Plano Premium Anual', descricao: ['Inclui todas as funcionalidades da assinatura mensal premium.', 'Desconto de 10% no valor da assinatura.'], valor: 2400 },
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
                <View key={index} style={[styles.planoCard, { width: width<1024?200:300}]}>
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
                    <Text style={styles.planoDesc}>{plano.descricao.map((desc, index) => (
                      <Text key={index}>⭐ {desc}{"\n"}</Text>
                    ))}</Text>
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
    backgroundColor: '#efefef',
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3
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
    color: '#111',
    marginBottom: 7
  },
  planoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
    marginHorizontal: 'auto'
  },
  valorVermelho: {
    color: 'red',
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontWeight: 'light',
    marginHorizontal: 'auto'
  },        
});

export default PlanosComponent;
