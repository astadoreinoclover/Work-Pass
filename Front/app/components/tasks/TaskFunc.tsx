import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView, TouchableOpacity, Modal, Dimensions, Platform, Alert, TextInput, Linking } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { TaskContext } from '@/contexts/TaskContaxt';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import InputTextTask from './InputTextTask';

type AuthData = {
  email: string | null;
  name: string | null;
  departamento: string;
  id_empresa: number;
  id: number;
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
  delivery_type: string;
  meta_value: string;
  entrega: string;
  meta_type: string;
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
  const [file, setFile] = useState<string | null>(null)


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

          const response = await axios.post('http://localhost:3000/api/tasksFunc', {
            status: status,
            departamento: department,
            id_empresa: empresa,
            id: authContext.authData?.id
          });
          setEmployeesTask(response.data);
        } catch (error) {
          console.error('Erro ao buscar tasks:', error);
        }
      };

      fetchRanking();
    }, [authContext?.authData, filterTask])
  );

  const fetchRanking = async () => {
        try {
          const department = authContext?.authData?.departamento || 'Geral';
          const empresa = authContext?.authData?.id_empresa || 0;
          const status = filterTask;

          const response = await axios.post('http://localhost:3000/api/tasksFunc', {
            status: status,
            departamento: department,
            id_empresa: empresa,
            id: authContext.authData?.id
          });
          setEmployeesTask(response.data);
        } catch (error) {
          console.error('Erro ao buscar tasks:', error);
        }
    };

  const openModal = (task: EmployeeTask) => {
    setSelectedTask(task);
    setModalVisible(true);
    setFile('')
  };

  if (!employeesTask || employeesTask.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Não há dados disponíveis.</Text>
      </View>
    );
  }

  const pickImage = async () => {
    try {
        if (Platform.OS !== 'web') {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para selecionar uma foto.');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.8,
            base64: Platform.OS === 'web',
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            if (Platform.OS === 'web') {
                setFile(`data:image/jpeg;base64,${result.assets[0].base64}`);
            } else {
                setFile(result.assets[0].uri);
            }
        }
    } catch (error) {
        console.error('Error picking image:', error);
    }
  };

    const pickPdf = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
            multiple: false,
            });

            if (result.assets && result.assets.length > 0) {
            const pdfFile = result.assets[0];
            setFile(pdfFile.uri);
            }
        } catch (error) {
            console.error('Erro ao selecionar PDF:', error);
        }
    };

  const uploadFiles = async () => {
    if ((!file) || !authContext.authData?.id) return;

    try {
        const formData = new FormData();

        if (selectedTask?.delivery_type == 'IMG') {
        if (Platform.OS === 'web') {
            const response = await fetch(file);
            const blob = await response.blob();
            formData.append('task', blob, `user_${authContext.authData.id}.jpg`);
        } else {
            const filename = file.split('/').pop() || `user_${authContext.authData.id}.jpg`;
            formData.append('task', {
            uri: file,
            name: filename,
            type: 'image/jpeg',
            } as any);
        }
        }

        if (selectedTask?.delivery_type == 'PDF') {
        if (Platform.OS === 'web') {
            const response = await fetch(file);
            const blob = await response.blob();
            formData.append('task', blob, `user_${authContext.authData.id}.pdf`);
        } else {
            const filename = file.split('/').pop() || `user_${authContext.authData.id}.pdf`;
            formData.append('pdf', {
            uri: file,
            name: filename,
            type: 'application/pdf',
            } as any);
        }
        }

        await axios.put(`http://localhost:3000/api/users/${selectedTask?.id_task}/task`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        setModalVisible(false)
        fetchRanking()
        setFile('')
    } catch (error) {
        console.error('Erro ao enviar arquivos:', error);
        throw error;
    }
    };

  const handleValorChange = (text: string) => {
      const numericValue = text.replace(/\D/g, '');
      const number = parseFloat(numericValue) / 100;
      const formatted = number.toFixed(2).replace('.', ',');
      setFile(formatted);
      console.log(file)
  };


  const uploadValue = async () => {
    if ((!file) || !authContext.authData?.id) return;

    if  (selectedTask?.delivery_type == 'LINK') {
      try {
        await axios.put(
          'http://localhost:3000/api/users/task/entrega',
          {
            id: selectedTask.id_task,
            deliveryType: selectedTask.delivery_type,
            value: file,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setModalVisible(false)
        fetchRanking()
        setFile('')
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível entregar a tarefa.');
      }
    } else if(selectedTask?.delivery_type == 'META'){
      console.log(file)
      try {
        await axios.put(
          'http://localhost:3000/api/users/task/entregaMeta',
          {
            id: selectedTask.id_task,
            deliveryType: selectedTask.delivery_type,
            value: file,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        await axios.put(
          'http://localhost:3000/api/status/atualiza',
          {
            id: selectedTask.id_task,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setModalVisible(false)
        fetchRanking()
        setFile('')
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível entregar a tarefa.');
      }
    }
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

            {/* Botão de fechar (X) no canto superior direito */}
            <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.closeIconText}>×</Text>
            </TouchableOpacity>

            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedTask?.titulo}</Text>
                <Text style={styles.modalSubtitle}>
                {selectedTask?.pts} pontos • {selectedTask?.fechamento}
                </Text>
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
                    {selectedTask?.delivery_type}
                </Text>
                <Text style={styles.modalInfoText}>
                    <Text style={styles.modalInfoLabel}>Status: </Text>
                    {filterTask}
                </Text>
                </View>

                {selectedTask?.status === 'EM_ANDAMENTO' && selectedTask?.delivery_type === 'IMG' && (
                <TouchableOpacity style={styles.closeButton} onPress={pickImage}>
                    <Text style={styles.closeButtonText}>{file ? 'Imagem Selecionada'  : 'Selecionar Imagem'}</Text>
                </TouchableOpacity>
                )}

                {selectedTask?.status === 'EM_ANDAMENTO' && selectedTask?.delivery_type === 'PDF' && (
                <TouchableOpacity style={styles.closeButton} onPress={pickPdf}>
                    <Text style={styles.closeButtonText}>{file ? 'PDF Selecionada'  : 'Selecionar PDF'}</Text>
                </TouchableOpacity>
                )}

                {selectedTask?.status === 'EM_ANDAMENTO' && selectedTask?.delivery_type === 'LINK' && (
                    <InputTextTask label="Link" value={file || ''} setValue={setFile} />
                )}

                {selectedTask?.status === 'EM_ANDAMENTO' && selectedTask?.delivery_type === 'META' && 
                  selectedTask.meta_type === 'VALUE' && (
                    <>
                      <Text style={styles.modalInfoText}>
                        <Text style={styles.modalInfoLabel}>{selectedTask.meta_value} / </Text>
                        {parseFloat(selectedTask.entrega).toFixed(2).replace('.', ',')}
                      </Text>
                      <InputTextTask
                        label="Valor"
                        value={file || ''}
                        setValue={handleValorChange}
                      />
                    </>
                )}

                {selectedTask?.status === 'EM_ANDAMENTO' &&
                  selectedTask?.delivery_type === 'META' &&
                  selectedTask.meta_type === 'ENTREGA' && (
                    <>
                      <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        <Text style={{ fontWeight: 'bold' }}>{selectedTask.meta_value} / </Text>
                        {selectedTask.entrega}
                      </Text>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, marginRight: 8 }}>Valor:</Text>

                        <TouchableOpacity
                          onPress={() => {
                            const current = parseInt(file || '0', 10);
                            setFile(String(Math.max(0, current - 1)));
                          }}
                          style={{
                            padding: 10,
                            backgroundColor: '#2C3E50',
                            borderRadius: 5,
                            marginRight: 5,
                          }}
                        >
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>-</Text>
                        </TouchableOpacity>

                        <TextInput
                          value={file || '0'}
                          onChangeText={(text: string) => {
                            const numeric = text.replace(/\D/g, '');
                            setFile(numeric);
                          }}
                          keyboardType="numeric"
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 8,
                            width: 80,
                            textAlign: 'center',
                            borderRadius: 5,
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            const current = parseInt(file || '0', 10);
                            setFile(String(current + 1));
                          }}
                          style={{
                            padding: 10,
                            backgroundColor: '#2C3E50',
                            borderRadius: 5,
                            marginLeft: 5,
                          }}
                        >
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                )}

                {selectedTask?.status === 'CONCLUIDA' && selectedTask?.delivery_type === 'LINK' && (
                  <>
                    <Text style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>Conteudo entregue: </Text>
                      <Text
                        style={[styles.modalInfoText, { color: 'blue', textDecorationLine: 'underline' }]}
                        onPress={() => Linking.openURL(selectedTask.entrega)}
                      >
                        {selectedTask.entrega}
                      </Text>
                    </Text>
                  </>
                )}

                {selectedTask?.status === 'CONCLUIDA' && selectedTask?.delivery_type === 'PDF' && (
                  <>
                    <Text style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>Conteudo entregue: </Text>
                      <Text
                        style={[styles.modalInfoText, { color: 'blue', textDecorationLine: 'underline' }]}
                        onPress={() => Linking.openURL( `http://localhost:3000/Middlewares${selectedTask.entrega}`)}
                      >
                        {`${selectedTask.titulo} - ${selectedTask.funcionario}`}
                      </Text>
                    </Text>
                  </>
                )}

                {selectedTask?.status === 'CONCLUIDA' && selectedTask?.delivery_type === 'IMG' && (
                  <>
                    <Text style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>Conteudo entregue: </Text>
                      <Text
                        style={[styles.modalInfoText, { color: 'blue', textDecorationLine: 'underline' }]}
                        onPress={() => Linking.openURL( `http://localhost:3000/Middlewares${selectedTask.entrega}`)}
                      >
                        {`${selectedTask.titulo} - ${selectedTask.funcionario}`}
                      </Text>
                    </Text>
                  </>
                )}

                {selectedTask?.status === 'CONCLUIDA' && selectedTask?.delivery_type === 'META' && (
                  <>
                    <Text style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>{selectedTask.meta_value} / </Text>
                      {parseFloat(selectedTask.entrega).toFixed(2).replace('.', ',')}
                    </Text>
                  </>
                )}

            </ScrollView>

            {selectedTask?.status === 'EM_ANDAMENTO' && selectedTask?.delivery_type === 'IMG' &&  (
                <TouchableOpacity style={styles.closeButton} onPress={uploadFiles}>
                <Text style={styles.closeButtonText}>Enviar</Text>
                </TouchableOpacity>
            )}

            {selectedTask?.delivery_type === 'PDF' && selectedTask?.status === 'EM_ANDAMENTO' && (
                <TouchableOpacity style={styles.closeButton} onPress={uploadFiles}>
                <Text style={styles.closeButtonText}>Enviar</Text>
                </TouchableOpacity>
            )}

            {selectedTask?.delivery_type === 'LINK' && selectedTask?.status === 'EM_ANDAMENTO' && (
                <TouchableOpacity style={styles.closeButton} onPress={uploadValue}>
                <Text style={styles.closeButtonText}>Enviar</Text>
                </TouchableOpacity>
            )}

            {selectedTask?.delivery_type === 'META' && selectedTask?.status === 'EM_ANDAMENTO' && (
                <TouchableOpacity style={styles.closeButton} onPress={uploadValue}>
                <Text style={styles.closeButtonText}>Enviar</Text>
                </TouchableOpacity>
            )}
            </View>
        </View>
        </Modal>

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
    backgroundColor: '#2c3e50',
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
    backgroundColor: '#449dfc',
  },
  deleteButton: {
    backgroundColor: '#9fbbda',
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
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});