import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { TaskContext } from '@/contexts/TaskContaxt';
import axios from 'axios';

type AuthData = {
  email: string | null;
  name: string | null;
  departamento: string;
  id_empresa: number;
};

type AuthContextType = {
  authData: AuthData | null;
};

type EmployeeTask = {
  id_task: number;
  titulo: string;
  department: string;
  pts: number;
  funcionario: string;
  descricao: string;
  fechamento: string;
  status: string;
};

export default function Ranking() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [employeesTask, setEmployeesTask] = useState<EmployeeTask[]>([]);
  const { filterTask } = useContext(TaskContext);
  const authContext = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (authContext?.authData) {
      setEmail(authContext.authData.email);
      setName(authContext.authData.name);
    }
  }, [authContext?.authData]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const department = authContext?.authData?.departamento || 'Geral';
        const empresa = authContext?.authData?.id_empresa || 0;
        const status = filterTask;

        console.log('Chamando getTasks com:', { department, status, empresa });

        const response = await axios.post('http://localhost:3000/api/tasks', {
          status: status,
          departamento: department,
          id_empresa: empresa,
        });

        setEmployeesTask(response.data);
      } catch (error) {
        console.error('Erro ao buscar tasks:', error);
      }
    };

    fetchRanking();
  }, [authContext?.authData, filterTask]);

  if (!employeesTask || employeesTask.length === 0) {
    return (
      <View style={styles.container}>
        <Text  style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 170 : 120 }]}>Não há dados disponíveis.</Text>
      </View>
    );
  }

  const renderEmployee = ({ item }: { item: EmployeeTask }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 170 : 120 }]}>{item.titulo}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 13 : 10, minWidth: width >= 581 ? 170 : 120 }]}>{item.descricao}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 170 : 120 }]}>{item.funcionario}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 170 : 120 }]}>{item.fechamento}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 170 : 120 }]}>{item.pts}</Text>
      {filterTask === 'NAO_ENTREGUE' && (
        <TouchableOpacity style={[styles.botao, { backgroundColor: "#00f" }]}>
          <Text style={[styles.cell, { color: "#fff", fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 160 : 100 }]}>Relançar</Text>
        </TouchableOpacity>
      )}
      {filterTask === 'EM_ANDAMENTO' && (
        <>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#0f0" }]}>
            <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 160 : 100, color: "#fff" }]}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#f00" }]}>
            <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width >= 581 ? 160 : 100, color: "#fff" }]}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={[styles.container, { height: height * 0.5 }]}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Task</Text>
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Descrição</Text>
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Funcionario</Text>
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Fechamento</Text>
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Pts Possiveis</Text>
          {filterTask === 'NAO_ENTREGUE' && (
            <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Relançar</Text>
          )}
          {filterTask === 'EM_ANDAMENTO' && (
            <>
              <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Editar</Text>
              <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width >= 581 ? 180 : 120 }]}>Cancelar</Text>
            </>
          )}
        </View>

        <ScrollViewIndicator>
          <FlatList
            data={employeesTask}
            renderItem={renderEmployee}
            keyExtractor={(item) => item.id_task.toString()}
            showsVerticalScrollIndicator={false}
          />
        </ScrollViewIndicator>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  botao: {
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
