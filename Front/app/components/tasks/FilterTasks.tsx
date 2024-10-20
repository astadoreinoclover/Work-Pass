import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TaskContext } from '@/contexts/TaskContaxt';

export default function FilterTasks() {
  const { width } = useWindowDimensions();
  const [selectedstatus, setSelectedstatus] = useState<string>('Em Desenvolvimento');
  const { setFilterTask} = useContext(TaskContext);

  useEffect(() => {
    setFilterTask(selectedstatus);
  }, [selectedstatus, setFilterTask]);

  return (
    <View style={[styles.container, {width: width >=768? width*0.6:width*0.9}]}>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('Não Entregue')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'Não Entregue'?'#fff':'#999'}]}>Não Entregue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('Em Desenvolvimento')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'Em Desenvolvimento'?'#fff':'#999'}]}>Em Desenvolvimento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('Entregue')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'Entregue'?'#fff':'#999'}]}>Entregues</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#2c3e50',
    padding: 10
  },
  button: {
    cursor: 'pointer',
  },
  text: {
    fontWeight:600,
  }
});