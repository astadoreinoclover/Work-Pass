import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import BarInferior from '@/components/bars/BarInferior';
import FilterTabela from '@/components/funcionarios/FilterTabela';
import TabelaFuncionarios from '@/components/funcionarios/TabelaFuncionarios';
import BotaoAddFunc from '@/components/funcionarios/BotaoAddFunc';
import BotaoRemoverFuncionario from '@/components/funcionarios/BotaoRemoverFuncionario';
import { AuthContext } from '@/contexts/Auth';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';

export default function Funcionarios() {
  const { height, width } = useWindowDimensions()
  const authContext = useContext(AuthContext);

  const { authData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      console.log(authData?.token)
      const fetchFuncionario = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/protected', {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          });

          console.log('>>> RESPONSE RECEBIDO:', response);

          const data = response.data;
          console.log('data.message:', data.message);

          if (data.message?.toLowerCase().includes('acesso permitido')) {
            console.log('aleluia');
          } else {
            console.log('ENTROU NO ELSE');
            authContext.logout();
          }
        } catch (error) {
          console.error('>>> CATCH:', error);
          authContext.logout();
        }
      };
      fetchFuncionario();
    }, [authData])
  )

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0 }}><BarSuperior /></View>
      {(authContext.authData?.role === 'ADMIN' || authContext.authData?.role === 'MANAGER') && (
        <>
          <View style={{ display: 'flex', flexDirection: width >= 768 ? 'row' : 'column', height: width >= 768 ? height * 0.6 : height * 0.8 }}>
            <View style={{ width: width * 0.5, right: 0, position: 'relative', alignItems: 'center' }}>
              <Text style={[styles.title, { fontSize: width >= 768 ? 32 : 22 }]}>Funcionarios</Text>
              <FilterTabela />
            </View>
            <View style={{ width: width * 0.5, left: 0, position: 'relative', alignItems: 'center' }}><TabelaFuncionarios /></View>
          </View>
          <View style={{ position: 'absolute', bottom: width >= 768 ? 120 : 50, left: width >= 768 ? 20 : 0, width: width >= 768 ? 'auto' : '100%', display: 'flex', flexDirection: width >= 768 ? 'column' : 'row', justifyContent: 'space-around' }}>
            <BotaoAddFunc />
            <BotaoRemoverFuncionario />
          </View>
        </>
      )}
      {authContext.authData?.role === 'USER' && (
        <>
          <View style={{ display: 'flex', flexDirection: 'column', height: height * 0.8, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: width >= 768 ? 32 : 22 }]}>Tela em Desenvolvimento</Text>
          </View>
        </>
      )}
      <View style={{ position: 'absolute', bottom: 0 }}><BarInferior /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2c3e50',
    fontWeight: 'bold'
  },
});
