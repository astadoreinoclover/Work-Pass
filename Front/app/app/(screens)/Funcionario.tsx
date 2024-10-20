import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import VoltarFuncionarios from '@/components/funcionarios/BotaoVoltarFuncionarios';
import FuncionarioProfile from '@/components/perfilFuncionario/PerfilFuncionario';

export default function Funcionario() {
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