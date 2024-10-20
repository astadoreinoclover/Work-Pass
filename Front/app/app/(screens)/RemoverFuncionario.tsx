import React from 'react';
import { View, StyleSheet } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import VoltarFuncionarios from '@/components/funcionarios/BotaoVoltarFuncionarios';
import TabelaRemoverFuncionario from '@/components/removerFuncionario/TabelaRemoverFuncionario';

export default function RemoverFuncionario() {
    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TabelaRemoverFuncionario />
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
    },
});