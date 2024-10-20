import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getFuncionarios } from '@/services/FuncionariosService';
import { FuncionariosContext } from '@/contexts/FuncionariosContext';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

type Funcionarios = {
  id: number;
  name: string;
  department: string;
  entregue: number;
  naoentregue: number;
  emdesenvolvimento: number;
};

export default function TabelaFuncionarios() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const { filterFunc } = useContext(FuncionariosContext);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        const data = await getFuncionarios(filterFunc);
        console.log('Dados do ranking recebidos:', data);
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    fetchFuncionarios();
  }, [filterFunc]);

  const renderFuncionarios = ({ item }: { item: Funcionarios }) => (
    <View style={styles.row}>
       <TouchableOpacity 
        style={styles.cell} 
        onPress={() => navigation.navigate('Funcionario', { itemName: item.name, itemDepartament: item.department, itemId: item.id })}
      >
        <Text style={{color: '#2C3E50', fontWeight: '700'}}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.entregue}</Text>
      <Text style={styles.cell}>{item.emdesenvolvimento}</Text>
      <Text style={styles.cell}>{item.naoentregue}</Text>
    </View>
  );

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
          keyExtractor={(item) => item.id.toString()}
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