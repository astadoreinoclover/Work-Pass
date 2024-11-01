import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import BarInferior from '@/components/bars/BarInferior';
import FilterTasks from '@/components/tasks/FilterTasks';
import { TaskContext } from '@/contexts/TaskContaxt';
import Task from '@/components/tasks/Task';
import AddTaskButton from '@/components/tasks/ButtonAddTask';

export default function Tasks() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const {filterTask} = useContext(TaskContext)

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      {(authContext.authData?.role === 'ADMIN' || authContext.authData?.role === 'MANAGER') && (
        <>
        <Text style={styles.title}>Tasks</Text>
          <View style={[styles.area,{width: width >=768? width*0.6:width*0.9, height: height *0.6}]}>
            <FilterTasks />
            <Task />
          </View>
          <AddTaskButton />
        </>
      )}
      {authContext.authData?.role === 'USER' && (
        <>
          <View style={{display: 'flex', flexDirection: 'column', height: height * 0.8, alignItems: 'center'}}>
            <Text style={[styles.title, {fontSize: width >= 768 ? 32 : 22}]}>Tela em Desenvolvimento</Text>
          </View>
        </>
      )}
      <View style={{position: 'absolute', bottom:0}}><BarInferior /></View>
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
    fontSize: 24,
    marginHorizontal: 'auto',
    fontWeight: 600,
    marginVertical: 10,
    color: '#2c3e50'
  },
  area: {
    backgroundColor: '#fff',
    borderRadius:20,
    shadowColor: '#ccc'
  }
});

