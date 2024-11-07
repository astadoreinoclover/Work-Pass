import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getFuncionarios } from '@/services/FuncionariosService';
import { FuncionariosContext } from '@/contexts/FuncionariosContext';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';

type Funcionarios = {
  userId: number;
  userName: string;
  userDepartament: string;
  taskCounts: {
    CONCLUIDA: number;
    EM_ANDAMENTO: number;
    NAO_ENTREGUE: number;
  };
};

export default function TabelaFuncionarios() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const { filterFunc } = useContext(FuncionariosContext);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const storedFilter = await AsyncStorage.getItem('Departament-Funcionarios');
      } catch (e) {
        console.error('Erro ao recuperar filtros:', e);
      }
    };

      fetchFilters();
    }, [])

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/countStatus', {
          params: { departamento: filterFunc, id_empresa: authContext.authData?.id_empresa }
        });
        const data = response.data
        setFuncionarios(data.taskCounts);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, [filterFunc]);

  const renderFuncionarios = ({ item }: {item:Funcionarios}) => (
    <View style={styles.row}>
      <TouchableOpacity 
        style={styles.cell} 
        onPress={() => navigation.navigate('Funcionario', { 
          itemName: item.userName, 
          itemDepartament: item.userDepartament, 
          itemId: item.userId 
        })}
      >
        <Text style={{ color: '#2C3E50', fontWeight: '700' }}>{item.userName}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.taskCounts.CONCLUIDA}</Text>
      <Text style={styles.cell}>{item.taskCounts.EM_ANDAMENTO}</Text>
      <Text style={styles.cell}>{item.taskCounts.NAO_ENTREGUE}</Text>
    </View>
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.35 }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Nome</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Concluidas</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Em andamento</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Não entregue</Text>
      </View>

      <ScrollViewIndicator>
        <FlatList
          data={funcionarios}
          renderItem={renderFuncionarios}
          keyExtractor={(item) => item.userId.toString()}
          showsVerticalScrollIndicator={false}
        />
      </ScrollViewIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 10,
  },
});