import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, useWindowDimensions, TextInput } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { FuncionariosContext } from '@/contexts/FuncionariosContext';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import { getFuncionariosRemove } from '@/services/FuncionariosService';

type Funcionarios = {
  id: number;
  name: string;
  funcao: string;
  department: string;
};

export default function TabelaRemoverFuncionario() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { filterFunc } = useContext(FuncionariosContext);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      setLoading(true);
      try {
        const data = await getFuncionariosRemove(authContext.authData?.departament || 'Geral');
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, [filterFunc]);

  const removeFuncionario = (id: number) => {
    navigation.navigate('Funcionarios')
  };

  const renderFuncionarios = ({ item }: { item: Funcionarios }) => (
    <View style={styles.row}>
      <TouchableOpacity 
        style={styles.cell} 
        onPress={() => navigation.navigate('Funcionario', { itemName: item.name, itemDepartament: item.department, itemId: item.id })}
      >
        <Text style={{ color: '#2C3E50', fontWeight: '700', marginHorizontal: 'auto' }}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.funcao}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFuncionario(item.id)}>
        <Text style={styles.removeText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.35 }]}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome"
        value={nameFilter}
        onChangeText={setNameFilter}
      />
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Nome</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Função</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Remover</Text>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#2C3E50" />
      ) : (
        <FlatList
          data={funcionarios.filter(funcionario => funcionario.name.toLowerCase().includes(nameFilter.toLowerCase()))}
          renderItem={renderFuncionarios}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  removeButton: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    textAlign: 'center',
  },
});