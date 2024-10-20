import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import VoltarFuncionarios from '@/components/funcionarios/BotaoVoltarFuncionarios';
import FormAddFunc from '@/components/adicionarFuncionario/FormAddFunc';

export default function AddFuncionario() {
    const { height } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
            <View style={{height: height * 0.1,display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
                <FormAddFunc />
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