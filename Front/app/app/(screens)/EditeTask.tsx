import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import BackToTasksButton from '@/components/tasks/BotaoVoltarTasks';
import FormEditeTask from '@/components/editeTask/FormEditeTask';

export default function EditeTask() {
    const { width, height} = useWindowDimensions() 

    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
            <View style={{position: 'absolute', bottom:20 ,display: 'flex',flexDirection:'column', height: width >=768 ? height*0.8: height*0.8}}>
                <FormEditeTask />
            </View>
            <BackToTasksButton />
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