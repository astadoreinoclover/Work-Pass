import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import VoltarFuncionarios from '@/components/funcionarios/BotaoVoltarFuncionarios';
import FuncionarioProfile from '@/components/perfilFuncionario/PerfilFuncionario';
import { AuthContext } from '@/contexts/Auth';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

export default function Funcionario() {

    const {authData} = useContext(AuthContext);
    const authContext = useContext(AuthContext);

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
            <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
            <View style={{position: 'absolute', bottom:10}}>
                <Text style={styles.title}>Perfil do Funcionario</Text>
                <FuncionarioProfile />
            </View>
            <VoltarFuncionarios />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginHorizontal: 'auto',
      color: '#2C3E50',
      fontWeight: 700
    },
});