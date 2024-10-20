import React from 'react';
import { View, StyleSheet } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import BackToProfileButton from '@/components/voltar/VoltarPerfil';
import FormTrocaSenha from '@/components/trocarSenha/FormTrocaSenha';

export default function TrocaDeSenha() {
    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FormTrocaSenha />
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