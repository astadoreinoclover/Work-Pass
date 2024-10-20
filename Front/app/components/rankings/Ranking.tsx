// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
// import { AuthContext } from '@/contexts/Auth';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
// import ScrollViewIndicator from 'react-native-scroll-indicator';
// import { getRanking } from '@/services/RankingService';

// type Employee = {
//   id: number;
//   name: string;
//   department: string;
//   points: number;
// };

// // export const employees = [
// //   { id: 1, name: 'Ana Silva', department: 'Marketing', points: 150 },
// //   { id: 2, name: 'Carlos Souza', department: 'Financeiro', points: 200 },
// //   { id: 3, name: 'Maria Oliveira', department: 'TI', points: 300 },
// //   { id: 4, name: 'João Ferreira', department: 'Vendas', points: 250 },
// //   { id: 5, name: 'Roberto Lima', department: 'Marketing', points: 180 },
// //   { id: 6, name: 'Fernanda Costa', department: 'Financeiro', points: 220 },
// //   { id: 7, name: 'Paulo Santos', department: 'TI', points: 270 },
// //   { id: 8, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 9, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 10, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 11, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 12, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 13, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// //   { id: 14, name: 'Juliana Martins', department: 'Vendas', points: 230 },
// // ];

// export default function Ranking() {
//   const { width, height } = useWindowDimensions();
//   const [email, setEmail] = useState<string | null>(null);
//   const [name, setName] = useState<string | null>(null);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [filter, setFilter] = useState<string | null>(null);
//   const [period, setPeriod] = useState<string | null>(null);
//   const authContext = useContext(AuthContext);

//   useEffect(() => {
//     setEmail(authContext.authData?.email || null);
//     setName(authContext.authData?.name || null);
    
//     const fetchFilter = async () => {
//       try {
//         const department = await AsyncStorage.getItem('Departament-Ranking');
//         const period = await AsyncStorage.getItem('Period-Ranking');
//         setFilter(department);
//         setPeriod(period);
//       } catch (e) {
//         console.error('Erro ao recuperar filtro:', e);
//       }
//     };

//     const fetchRanking = async () => {
//       try {
//         const data = await getRanking(filter || 'Geral', period || 'Mês'); // Chama a API simulada
//         setEmployees(data);
//       } catch (error) {
//         console.error('Erro ao buscar ranking:', error);
//       }
//     };

//     fetchFilter();
//     fetchRanking();
//   }, [authContext.authData, filter, period]);

//   // const filteredEmployees = filter === 'Geral' || !filter
//   //   ? employees
//   //   : employees.filter(employee => employee.department === filter);

//   // const sortedEmployees = filteredEmployees.sort((a, b) => b.points - a.points);

//   const renderEmployee = ({ item, index }: { item: Employee; index: number }) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{index + 1}</Text>
//       <Text style={styles.cell}>{item.name}</Text>
//       <Text style={styles.cell}>{item.department}</Text>
//       <Text style={styles.cell}>{item.points}</Text>
//     </View>
//   );

//   return (
//     <View style={[styles.container, {width: width >=768? width*0.4: width*0.9, height: width >=768? height*0.6 : height*0.4}]}>
//       <View style={styles.tableHeader}>
//         <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Posição</Text>
//         <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Nome</Text>
//         <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Departamento</Text>
//         <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Pontos</Text>
//       </View>
//       <ScrollViewIndicator 
//         shouldIndicatorHide={false}
//         flexibleIndicator={true}
//         scrollIndicatorStyle={{backgroundColor: "#2c3e50"}}
//         scrollIndicatorContainerStyle={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
//       >
//         <FlatList
//           data={employees}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderEmployee}
//           scrollEnabled={true}
//         />
//       </ScrollViewIndicator>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingRight: 2
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: '#2C3E50',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20, 
//   },
//   headerCell: {
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   cell: {
//     fontSize: 16,
//     flex: 1,
//     textAlign: 'center',
//   }
// });

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getRanking } from '@/services/RankingService';
import { useFocusEffect } from '@react-navigation/native';
import { RankingContext } from '@/contexts/RankingContext'; // Adicione isso

type Employee = {
  id: number;
  name: string;
  department: string;
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

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRanking(filter, period);
        console.log('Dados do ranking recebidos:', data);
        setEmployees(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    fetchRanking();
  }, [filter, period]);

  const renderEmployee = ({ item, index }: { item: Employee; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.department}</Text>
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
