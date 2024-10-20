import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getTasks } from '@/services/TaskService';
import { TaskContext } from '@/contexts/TaskContaxt';

type EmployeeTask = {
  id: number;
  name: string;
  department: string;
  points: number;
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
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Verifica se o valor de authContext.authData está correto antes de chamar getTasks
        const department = authContext.authData?.departamento || 'Geral';
        const empresa = authContext.authData?.id_empresa || 0;
        const status = filterTask;
  
        console.log('Chamando getTasks com:', { department, status, empresa }); // Debug para verificar os parâmetros
  
        const data = await getTasks(department, status, empresa);
        console.log('Dados do ranking recebidos:', data);
        setEmployeesTask(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };
  
    fetchRanking();
  }, [authContext.authData, filterTask]);

  const renderEmployee = ({ item, index }: { item: EmployeeTask; index: number }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?170:120 }]}>{item.name}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 13 : 10, minWidth: width>=581?170:120 }]}>{item.descricao}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?170:120 }]}>{item.funcionario}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?170:120 }]}>{item.fechamento}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?170:120 }]}>{item.points}</Text>
      {item.status === 'Não Entregue' && (
        <TouchableOpacity style={[styles.botao, { backgroundColor: "#00f"}]}><Text style={[styles.cell, { color: "#fff", fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?160:100 }]}>Relançar</Text></TouchableOpacity>
      )}
      {item.status === 'Em Desenvolvimento' && (
        <>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#0f0"}]}><Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?160:100, color: "#fff" }]}>Editar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#f00"}]}><Text style={[styles.cell, { fontSize: width >= 990 ? 15 : 12, minWidth: width>=581?160:100, color: "#fff" }]}>Cancelar</Text></TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
  <ScrollView horizontal showsHorizontalScrollIndicator={true}>
    <View style={[styles.container, {height: height * 0.5 }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Task</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Descrição</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Funcionario</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Fechamento</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Pts Possiveis</Text>
        {filterTask === 'Não Entregue' && (
          <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Relançar</Text>
        )}
        {filterTask === 'Em Desenvolvimento' && (
          <>
            <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:120 }]}>Editar</Text>
            <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12,minWidth: width>=581?180:120 }]}>Cancelar</Text>
          </>
      )}
      </View>

      <ScrollViewIndicator>
        <FlatList
          data={employeesTask}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id.toString()}
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
    // flex: 1,
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
    borderRadius: 5
  }
});
