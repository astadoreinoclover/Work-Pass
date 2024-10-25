import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, useWindowDimensions, TextInput } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { FuncionariosContext } from '@/contexts/FuncionariosContext';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

type Funcionarios = {
  id: number;
  name: string;
  funcao: string;
  departamento: string;
};

export default function TabelaRemoverFuncionario() {
  const { width, height } = useWindowDimensions();
  const [nameFilter, setNameFilter] = useState<string>('');
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { filterFunc } = useContext(FuncionariosContext);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [departamento, setDepartamento] = useState<string | null>(null);
  const [empresa, setEmpresa] = useState<number | undefined>(undefined);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    setRole(authContext.authData?.role || null);
    setEmpresa(authContext.authData?.id_empresa);
    setDepartamento(authContext.authData?.departamento || null);
    setUserId(authContext.authData?.id);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      if (!userId || !role || !empresa) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/funcionariosExclussao`, {
          params: {
            departamento: departamento || '',
            id_empresa: empresa,
            userId,
            role,
          },
        });
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        setError('Erro ao buscar funcionários. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, [userId, role, empresa, departamento, filterFunc]);

  const confirmRemoval = (id: number) => {
    setConfirmDeleteId(id);
  };

  const handleDelete = async () => {
    if (confirmDeleteId !== null) {
      try {
        await axios.delete(`http://localhost:3000/api/funcionariosDelete/${confirmDeleteId}`);
        setFuncionarios(prev => prev.filter(funcionario => funcionario.id !== confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error('Erro ao remover funcionário:', error);
        setError('Erro ao remover funcionário. Tente novamente mais tarde.');
      }
    }
  };

  const renderFuncionarios = ({ item }: { item: Funcionarios }) => (
    <View style={styles.row}>
      <TouchableOpacity 
        style={styles.cell} 
        onPress={() => navigation.navigate('Funcionario', { itemName: item.name, itemDepartament: item.departamento, itemId: item.id })}
      >
        <Text style={{ color: '#2C3E50', fontWeight: '700', marginHorizontal: 'auto' }}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.funcao}</Text>
      <Text style={styles.cell}>{item.departamento}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemoval(item.id)}>
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
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Nome</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Função</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 768 ? 12 : 10 }]}>Departamento</Text>
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

      {/* AwesomeAlert para confirmação de exclusão */}
      <AwesomeAlert
        show={confirmDeleteId !== null}
        title="Confirmação de Exclusão"
        message="Você tem certeza que deseja remover este funcionário?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Remover"
        cancelText="Cancelar"
        confirmButtonColor="#f00"
        onCancelPressed={() => setConfirmDeleteId(null)}
        onConfirmPressed={handleDelete}
      />
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
  errorText: {
    color: 'red',
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
