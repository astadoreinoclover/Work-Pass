import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Switch, useWindowDimensions, TouchableOpacity } from 'react-native';
import { getFuncionarioTask } from '@/services/CadatroTaskService'; // Importa a função e o tipo de services
import { AuthContext } from '@/contexts/Auth';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import InputTextTask from './InputTextTask';
import InputDataTask from './InputDataTask';
import InputNumberTask from './InputNumberTask';

type Funcionario = {
    id: number;
    name: string;
    department: string;
    funcao: string;
    empresa: string;
};

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [deadline, setDeadline] = useState('');
  const [employees, setEmployees] = useState<Funcionario[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<{ [id: number]: boolean }>({});
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width, height } = useWindowDimensions();

  const fetchEmployees = async (empresa: string, department: string) => {
    const foundEmployees = await getFuncionarioTask(department, empresa);
    setEmployees(foundEmployees);

    const initialSelection: { [id: number]: boolean } = {};
    foundEmployees.forEach(emp => (initialSelection[emp.id] = false));
    setSelectedEmployees(initialSelection);
  };

  useEffect(() => {
    fetchEmployees(authContext.authData?.empresa||'Falha', authContext.authData?.departament || ''); 
  }, []);

  const handleSubmit = () => {
    const selectedEmployeeNames = employees
      .filter(emp => selectedEmployees[emp.id])
      .map(emp => emp.name);

    const newTask = {
      taskName,
      description,
      points,
      deadline,
      selectedEmployees: selectedEmployeeNames,
    };

    console.log('Nova Tarefa Cadastrada:', newTask);

    // Log individual para cada funcionário selecionado
    selectedEmployeeNames.forEach(employeeName => {
      console.log(`Funcionário associado à tarefa: ${employeeName}`);
    });
    setTaskName('');
    setDescription('');
    setPoints('');
    setDeadline('');
    setSelectedEmployees({});
    navigation.navigate('Tasks')
  };

  const toggleEmployeeSelection = (id: number) => {
    setSelectedEmployees(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <ScrollView style={[styles.container, {width: width>=768?width*0.6:width*0.9}]}>
      <InputTextTask label="Task" value={taskName || ''} setValue={setTaskName} />

      <InputTextTask label='Desc' value={description} setValue={setDescription} />

      <InputNumberTask label='Pts' value={points} setValue={setPoints} />

      <InputDataTask label='Fechamento' value={deadline} setValue={setDeadline} />

      <Text style={styles.label}>Funcionários:</Text>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {employees.map(emp => (
          <View key={emp.id} style={styles.employeeItem}>
            <Switch
              value={selectedEmployees[emp.id] || false}
              onValueChange={() => toggleEmployeeSelection(emp.id)}
            />
            <Text style={styles.text}>{emp.name} ({emp.department})</Text>
          </View>
        ))}
      </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar Task</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#2c3e50',
    fontWeight: '700'
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#34495e',
    flexWrap: 'wrap', 
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15, 
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  text: {
    color: '#ecf0f1', 
    marginLeft: 10, 
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 'auto',
    marginTop: 15,
    width:'60%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
},
});

export default TaskForm;
