import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getRanking } from '@/services/RankingService';
import { useFocusEffect } from '@react-navigation/native';
import { RankingContext } from '@/contexts/RankingContext';
import axios from 'axios';

type Employee = {
  id: number;
  name: string;
  departament: string;
  points: number;
};

export default function Ranking() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { filter, period } = useContext(RankingContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const storedFilter = await AsyncStorage.getItem('Departament-Ranking');
        const storedPeriod = await AsyncStorage.getItem('Period-Ranking');
      } catch (e) {
        console.error('Erro ao recuperar filtros:', e);
      }
    };

      fetchFilters();
    }, [])

    useFocusEffect(
      useCallback(() => {
        const fetchRanking = async () => {
          try {
            const response = await axios.post(`http://localhost:3000/api/ranking`, {
              departamento: filter,
              id_empresa: authContext.authData?.id_empresa,
              periodo: period
            });
            setEmployees(response.data);
          } catch (error) {
            console.error('Erro ao buscar ranking:', error);
          }
        };

        fetchRanking();
      }, [filter, period])
    );

  const renderEmployee = ({ item, index }: { item: Employee; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.departament}</Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.4 }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 20 : 12 }]}>Ranking</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 20 : 12 }]}>Nome</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 20 : 12 }]}>Departamento</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 20 : 12 }]}>Pontos</Text>
      </View>

      <ScrollViewIndicator>
        <FlatList
          data={employees}
          renderItem={renderEmployee}
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
