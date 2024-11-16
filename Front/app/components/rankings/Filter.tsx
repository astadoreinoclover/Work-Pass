import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDepartments } from '@/services/RankingService';
import { RankingContext } from '@/contexts/RankingContext';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';

export default function Filter() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const { setFilter, setPeriod } = useContext(RankingContext);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Mês');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Geral');
  const [departments, setDepartments] = useState<string[]>(['Geral']);

  useFocusEffect(
    useCallback(() => {
      const fetchDepartments = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/empresa/${authContext.authData?.id_empresa}/departamentos`)
          setDepartments([ ...response.data]);
        } catch (error) {
          console.error('Erro ao recuperar departamentos:', error);
        }
      };

      const fetchStoredFilters = async () => {
        try {
          const storedDepartment = await AsyncStorage.getItem('Departament-Ranking');
          const storedPeriod = await AsyncStorage.getItem('Period-Ranking');
          setSelectedDepartment('Geral');
          setSelectedPeriod('Mês');
          setFilter('Geral')
          setPeriod('Mês')
        } catch (error) {
          console.error('Erro ao recuperar filtros armazenados:', error);
          setSelectedDepartment('Geral');
          setSelectedPeriod('Mês');
        }
      };

      setEmail(authContext.authData?.email || null);
      setName(authContext.authData?.name || null);
      fetchDepartments();
      fetchStoredFilters();
    }, [authContext.authData])
  );

  const updatePeriod = async (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
    await AsyncStorage.setItem('Period-Ranking', newPeriod);
    setPeriod(newPeriod);
  };

  const updateDepartment = async (department: string) => {
    setSelectedDepartment(department);
    await AsyncStorage.setItem('Departament-Ranking', department);
    setFilter(department);
  };

  return (
    <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.3 }]}>
      <Text style={[styles.title, { fontSize: width >= 768 ? 16 : 12 }]}>Período</Text>
      <View style={styles.grid}>
        <TouchableOpacity onPress={() => updatePeriod('Semana')} style={styles.departamentContainer}>
          <Text style={[styles.filterDepartament, selectedPeriod === 'Semana' && styles.selectedText, { fontSize: width >= 768 ? 15 : 10 }]}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updatePeriod('Mês')} style={styles.departamentContainer}>
          <Text style={[styles.filterDepartament, selectedPeriod === 'Mês' && styles.selectedText, { fontSize: width >= 768 ? 15 : 10 }]}>Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updatePeriod('Ano')} style={styles.departamentContainer}>
          <Text style={[styles.filterDepartament, selectedPeriod === 'Ano' && styles.selectedText, { fontSize: width >= 768 ? 15 : 10 }]}>Ano</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { fontSize: width >= 768 ? 16 : 12, marginTop: width >= 768 ? 20 : 8 }]}>Departamentos</Text>

      <View style={styles.grid}>
        {departments.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updateDepartment(item)}
            style={styles.departamentContainer}
          >
            <Text
              style={[
                styles.filterDepartament,
                item === selectedDepartment && styles.selectedText,
                { fontSize: width >= 768 ? 15 : 10 }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: '#2c3e50',
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 5,
    margin: 'auto'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  departamentContainer: {
    margin: 5,
  },
  filterDepartament: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 30,
    alignItems: 'center',
  },
  selectedText: {
    color: '#2c3e50',
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 30,
    alignItems: 'center',
  },
});









// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
// import { AuthContext } from '@/contexts/Auth';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getDepartments } from '@/services/RankingService'

// export default function Filter() {
//   const { width, height } = useWindowDimensions();
//   const [email, setEmail] = useState<string | null>(null);
//   const [name, setName] = useState<string | null>(null);
//   const authContext = useContext(AuthContext);
//   const [selectedPeriod, setSelectedPeriod] = useState<string>('Mês');
//   const [selectedDepartment, setSelectedDepartment] = useState<string>('Geral');
//   const [departments, setDepartments] = useState<string[]>(['Geral']); 

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const data = await getDepartments(); // Simulação da API
//         setDepartments(['Geral', ...data]);
//       } catch (error) {
//         console.error('Erro ao recuperar departamentos:', error);
//       }
//     };

//     const fetchStoredFilters = async () => {
//       try {
//         const storedDepartment = await AsyncStorage.getItem('Departament-Ranking');
//         const storedPeriod = await AsyncStorage.getItem('Period-Ranking');
//         setSelectedDepartment(storedDepartment || 'Geral');
//         setSelectedPeriod(storedPeriod || 'Mês');
//       } catch (error) {
//         console.error('Erro ao recuperar filtros armazenados:', error);
//       }
//     };

//     setEmail(authContext.authData?.email || null);
//     setName(authContext.authData?.name || null);
//     fetchDepartments();
//     fetchStoredFilters();
//   }, [authContext.authData]);

//   return (
//     <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.3 }]}>
//       <Text style={[styles.title, {fontSize: width >=768 ? 16:12}]}>Periodo</Text>
//       <View style={styles.grid}>
//         <TouchableOpacity onPress={async () => { setSelectedPeriod('Semana');await AsyncStorage.setItem('Period-Ranking', 'Semana');}} style={styles.departamentContainer}>
//             <Text style={[ styles.filterDepartament, selectedPeriod === 'Semana' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Semana</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={async () => { setSelectedPeriod('Mês');await AsyncStorage.setItem('Period-Ranking', 'Mês');}} style={styles.departamentContainer}>
//             <Text style={[ styles.filterDepartament, selectedPeriod === 'Mês' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Mês</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={async () => { setSelectedPeriod('Ano');await AsyncStorage.setItem('Period-Ranking', 'Ano');}} style={styles.departamentContainer}>
//             <Text style={[ styles.filterDepartament, selectedPeriod === 'Ano' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Ano</Text>    
//         </TouchableOpacity>
//       </View>

//       <Text style={[styles.title, {fontSize: width >=768 ? 16:12, marginTop: width >=768 ? 20:8}]}>Departamentos</Text>

//       <View style={styles.grid}>
//         {departments.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={async () => {
//                 setSelectedDepartment(item);
//                 await AsyncStorage.setItem('Departament-Ranking', item);
//             }}
//             style={styles.departamentContainer}
//           >
//             <Text
//               style={[
//                 styles.filterDepartament,
//                 item === selectedDepartment && styles.selectedText 
//               , {fontSize: width >= 768 ? 15:10}]}
//             >
//               {item}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   title: {
//     color: '#2c3e50',
//     fontWeight: '700',
//     marginTop:5,
//     marginBottom:5,
//     margin: 'auto'
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   departamentContainer: {
//     margin: 5,
//   },
//   filterDepartament: {
//     backgroundColor: '#2c3e50',
//     color: '#fff',
//     padding: 10,
//     paddingLeft:20,
//     paddingRight:20,
//     textAlign: 'center',
//     fontWeight: '600',
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   selectedText: {
//     color: '#2c3e50',
//     backgroundColor: '#fff',
//     padding: 10,
//     paddingLeft:20,
//     paddingRight:20,
//     textAlign: 'center',
//     fontWeight: '600',
//     borderRadius: 30,
//     alignItems: 'center',
//   },
// });
