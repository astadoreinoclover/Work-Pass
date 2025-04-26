import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { TaskContext } from '@/contexts/TaskContaxt';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

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
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [employeesTask, setEmployeesTask] = useState<EmployeeTask[]>([]);
  const { filterTask } = useContext(TaskContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertConf, setShowAlertConf] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<EmployeeTask | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const numColumns = width >= 992 ? 3 : width >= 600 ? 2 : 1;

  useEffect(() => {
    if (authContext?.authData) {
      setEmail(authContext.authData.email);
      setName(authContext.authData.name);
    }
  }, [authContext?.authData]);

  useFocusEffect(
    useCallback(() => {
      const fetchRanking = async () => {
        try {
          const department = authContext?.authData?.departamento || 'Geral';
          const empresa = authContext?.authData?.id_empresa || 0;
          const status = filterTask;

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
    }, [authContext?.authData, filterTask])
  );

  const confirmDelete = (taskId: number) => {
    setSelectedTaskId(taskId);
    setShowAlert(true);
  };

  const deleteTask = async () => {
    try {
      if (selectedTaskId) {
        const response = await axios.delete(`http://localhost:3000/api/deleteTask/${selectedTaskId}`);
        if(response.status === 200) {
          setShowAlertConf(true)
        }
        setEmployeesTask((prevTasks) => prevTasks.filter(task => task.id_task !== selectedTaskId));
      }
    } catch (error) {
      console.error('Erro ao excluir a task:', error);
    } finally {
      setShowAlert(false);
      setSelectedTaskId(null);
    }
  };

  const openModal = (task: EmployeeTask) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  if (!employeesTask || employeesTask.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Não há dados disponíveis.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: EmployeeTask }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.titulo}</Text>
        <Text style={styles.cardPoints}>{item.pts} pts</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardEmployee} numberOfLines={1}>Responsável: {item.funcionario}</Text>
        <Text style={styles.cardDate}>Prazo: {item.fechamento}</Text>

        <TouchableOpacity 
          style={styles.descButton} 
          onPress={() => openModal(item)}
        >
          <Text style={styles.descButtonText}>Ver Descrição Completa</Text>
        </TouchableOpacity>
      </View>

      {filterTask === 'EM_ANDAMENTO' && (
        <View style={styles.cardFooter}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]} 
            onPress={() => navigation.navigate('EditeTask', {id_taskUser: item.id_task})}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => confirmDelete(item.id_task)}
          >
            <Text style={styles.actionButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employeesTask}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_task.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        key={numColumns}
      />
      
      {/* Modal para descrição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedTask?.titulo}</Text>
              <Text style={styles.modalSubtitle}>{selectedTask?.pts} pontos • {selectedTask?.fechamento}</Text>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalDescriptionTitle}>Descrição completa:</Text>
              <Text style={styles.modalDescription}>{selectedTask?.descricao}</Text>
              
              <View style={styles.modalInfoContainer}>
                <Text style={styles.modalInfoText}>
                  <Text style={styles.modalInfoLabel}>Responsável: </Text>
                  {selectedTask?.funcionario}
                </Text>
                <Text style={styles.modalInfoText}>
                  <Text style={styles.modalInfoLabel}>Forma de Entrega: </Text>
                  {selectedTask?.department}
                </Text>
                <Text style={styles.modalInfoText}>
                  <Text style={styles.modalInfoLabel}>Status: </Text>
                  {filterTask}
                </Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Alertas */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta task?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Não"
        confirmText="Sim"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={deleteTask}
      />
      
      <AwesomeAlert
        show={showAlertConf}
        showProgress={false}
        title="Exclusão confirmada"
        message="Task cancelada com sucesso."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#2C3E50"
        onCancelPressed={() => setShowAlertConf(false)}
        onConfirmPressed={() => setShowAlertConf(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 150, 
    maxWidth: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  cardPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  cardBody: {
    marginBottom: 12,
  },
  cardEmployee: {
    fontSize: 13,
    color: '#34495e',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: '#e74c3c',
    marginBottom: 8,
  },
  descButton: {
    backgroundColor: '#3498db',
    padding: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  descButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2ecc71',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    maxHeight: '80%',
    padding: 20,
    maxWidth: 600
  },
  modalHeader: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  modalScroll: {
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  modalDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 15,
  },
  modalInfoContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 6,
  },
  modalInfoLabel: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});