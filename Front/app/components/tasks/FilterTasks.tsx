import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TaskContext } from '@/contexts/TaskContaxt';

export default function FilterTasks() {
  const { width } = useWindowDimensions();
  const [selectedstatus, setSelectedstatus] = useState<string>('EM_ANDAMENTO');
  const { setFilterTask} = useContext(TaskContext);

  useEffect(() => {
    setFilterTask(selectedstatus);
  }, [selectedstatus, setFilterTask]);

  return (
    <View style={[styles.container, {width: width >=768? width*0.6:width*0.9}]}>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('NAO_ENTREGUE')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'NAO_ENTREGUE'?'#fff':'#999'}]}>Não Entregue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('EM_ANDAMENTO')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'EM_ANDAMENTO'?'#fff':'#999'}]}>Em Desenvolvimento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{setSelectedstatus('CONCLUIDA')}}>
            <Text style={[styles.text, {fontSize: width>=768? 18:12, color: selectedstatus == 'CONCLUIDA'?'#fff':'#999'}]}>Entregues</Text>
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