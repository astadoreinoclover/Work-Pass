import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import BackToProfileButton from '@/components/voltar/VoltarPerfil';
import FormEditarDados from '@/components/dadosUser/FormEditarDados';
import { useFocusEffect } from 'expo-router';
import { AuthContext } from '@/contexts/Auth';
import axios from 'axios';

export default function EditarDados() {
    const { authData } = useContext(AuthContext);
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
            <View style={{ position: 'absolute', top: 0 }}><BarSuperior /></View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FormEditarDados />
            </View>
            <BackToProfileButton />
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
    },
});