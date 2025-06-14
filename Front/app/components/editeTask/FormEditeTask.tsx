import AwesomeAlert from 'react-native-awesome-alerts';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Switch, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '@/contexts/Auth';
import { useNavigation } from 'expo-router';
import { NavigationProp, useRoute } from '@react-navigation/native'; 
import { RouteParams } from './Types';
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';
import InputTextTask from '../tasks/InputTextTask';
import InputNumberTask from '../tasks/InputNumberTask';
import InputDataTask from '../tasks/InputDataTask';

type Funcionario = {
    id: number;
    name: string;
    departamento: string;
    funcao: string;
    id_empresa: number;
    role: string;
};

type Habilidade = {
    id: number;
    nome: string;
};

const FormEditeTask = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    const [deadline, setDeadline] = useState('');
    const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
    const [selectedHabilidade, setSelectedHabilidade] = useState<Habilidade | null>(null);
    const [employees, setEmployees] = useState<Funcionario[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<{ [id: number]: boolean }>({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const authContext = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { width } = useWindowDimensions();
    const [searchText, setSearchText] = useState('');
    const [searchHabilidade, setSearchHabilidade] = useState('');
    const [habilidadeNotFound, setHabilidadeNotFound] = useState(false);

    const route = useRoute();
    const { id_taskUser } = route.params as RouteParams;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/users', {
                    departamento: authContext.authData?.departamento,
                    id_empresa: authContext.authData?.id_empresa,
                    role: "USER"
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        };

        const fetchHabilidades = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/habilidades');
                const habilidadesFromApi = response.data.map((item: { nome: string, id: number }) => ({
                    id: item.id,
                    nome: item.nome,
                }));
                setHabilidades(habilidadesFromApi);
            } catch (error) {
                console.error('Erro ao buscar habilidades:', error);
            }
        };

        const fetchTask = async () => {
            const responseTask = await axios.post('http://localhost:3000/api/taskEdite', {
                id_empresa: authContext.authData?.id_empresa,
                id: id_taskUser
            });
            setTaskName(responseTask.data.taskName)
            setDescription(responseTask.data.taskDetails)
            setPoints(responseTask.data.valorEntrega)
            toggleEmployeeSelection(responseTask.data.idUser)
            setDeadline(responseTask.data.dataFinal)
            toggleHabilidadeSelection({id:responseTask.data.habilidadeId, nome: 'vazio'})
            setSelectedOption(responseTask.data.deliveryType)
            setSelectedOption2(responseTask.data.metaType)
            setValorMeta(responseTask.data.metaValue)
        }
        fetchTask();
        fetchEmployees();
        fetchHabilidades();
    }, []);

    const handleSubmit = async () => {
        if(!taskName || !description || !points || !selectedHabilidade || !deadline || !selectedOption) {
            setAlertMessage('Preencha todos os campos. Tente novamente.');
            setAlertVisible(true);
            return
        }

        const selectedEmployeeIds = employees
            .filter(emp => selectedEmployees[emp.id])
            .map(emp => emp.id);

        if(selectedEmployeeIds.length === 0) {
            setAlertMessage('A task deve ser atribuida a um funcionario. Tente novamente.');
            setAlertVisible(true);
            return
        }

        const newTask = {
            titulo: taskName,
            descricao: description,
            valorEntrega: parseInt(points),
            habilidadeId: selectedHabilidade ? selectedHabilidade.id : null,
            dataFinal: deadline
        };

        try {
            const response = await axios.delete(`http://localhost:3000/api/deleteTask/${id_taskUser}`);
            console.log(response.status)
        } catch (error) {
            console.error('Erro ao excluir a task:', error);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/task', newTask);
            const taskId = response.data.id;

            await Promise.all(selectedEmployeeIds.map(async (employeeId) => {
                await axios.post('http://localhost:3000/api/taskUser', {
                    user_id: employeeId,
                    task_id: taskId,
                    delivery_type: selectedOption,
                    meta_type: selectedOption2,
                    meta_value: valorMeta,
                });
            }));

            setAlertMessage('Tarefa cadastrada e atribuída com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar a tarefa ou associar funcionários:', error);
            setAlertMessage('Erro ao cadastrar a tarefa. Tente novamente.');
        } finally {
            setAlertVisible(true);
            resetForm();
        }
    };

    const resetForm = () => {
        setTaskName('');
        setDescription('');
        setPoints('');
        setDeadline('');
        setSelectedEmployees({});
        setSelectedHabilidade(null);
        setSearchHabilidade('');
        setHabilidadeNotFound(false);
    };

    const toggleEmployeeSelection = (id: number) => {
        setSelectedEmployees(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleHabilidadeSelection = (habilidade: Habilidade) => {
        if (selectedHabilidade && selectedHabilidade.id !== habilidade.id) return;
        setSelectedHabilidade(prevState => (prevState?.id === habilidade.id ? null : habilidade));
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredHabilidades = habilidades.filter(hab =>
        hab.nome.toLowerCase().includes(searchHabilidade.toLowerCase())
    );

    const checkHabilidadeExists = () => {
        setHabilidadeNotFound(filteredHabilidades.length === 0 && searchHabilidade.trim() !== '');
    };

    const addNewHabilidade = async () => {
        if (searchHabilidade && !habilidades.some(h => h.nome.toLowerCase() === searchHabilidade.toLowerCase())) {
            try {
                const response = await axios.post('http://localhost:3000/api/habilidades', {
                    nome: searchHabilidade
                });
                if (response.status === 201) {
                    const newHabilidade = { id: response.data.id, nome: searchHabilidade };
                    setHabilidades([...habilidades, newHabilidade]);
                    setSelectedHabilidade(newHabilidade);
                    setSearchHabilidade('');
                    setHabilidadeNotFound(false);
                }
            } catch (error) {
                console.error('Erro ao adicionar nova habilidade:', error);
            }
        }
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] =  useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [valorMeta, setValorMeta] = useState('')

    const handleValorChange = (text: string) => {
        const numericValue = text.replace(/\D/g, '');
        const number = parseFloat(numericValue) / 100;
        const formattedValue = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setValorMeta(formattedValue);
    };
    const handleValorChange2 = (text: string) => {
        const numericValue = text.replace(/\D/g, '');
        setValorMeta(numericValue);
    };

    return (
        <ScrollView style={[styles.container, { width: width >= 768 ? width * 0.6 : width * 0.9 }]} showsVerticalScrollIndicator={false}>
         {currentStep === 1 && (
            <View>
            <InputTextTask label="Task" value={taskName || ''} setValue={setTaskName} />
            <InputTextTask label="Desc" value={description} setValue={setDescription} />
            <InputNumberTask label="Pts" value={points} setValue={setPoints} />
            <InputDataTask label="Fechamento" value={deadline} setValue={setDeadline} />
            </View>
         )}
          {currentStep === 2 && (
            <View>
                <Text style={styles.label}>Metodo de entrega:</Text>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- Selecione uma opção --" value="" enabled={false} />
                <Picker.Item label="PDF" value="PDF" />
                <Picker.Item label="LINK" value="LINK" />
                <Picker.Item label="IMAGEM" value="IMAGEM" />
                <Picker.Item label="META" value="META" />
            </Picker>
            {selectedOption == "META" &&(
                <View>
                    <Text style={styles.label}>Tipo de meta:</Text>
                    <Picker
                        selectedValue={selectedOption2}
                        onValueChange={(itemValue) => setSelectedOption2(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Selecione uma opção --" value="" enabled={false} />
                        <Picker.Item label="Valor (R$)" value="VALUE" />
                        <Picker.Item label="Entregas/Ações" value="ENTREGA" />
                    </Picker>
                    {selectedOption2 == "VALUE" &&(
                        <View>
                            <TextInput
                                style={[styles.searchInput, {marginTop: 10}]}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                accessibilityHint="Enter a number"
                                placeholder='00,00'
                                placeholderTextColor={'#ccc'}
                                value={valorMeta}
                                onChangeText={handleValorChange}
                            />
                        </View>
                    )}
                    {selectedOption2 == "ENTREGA" &&(
                        <View>
                            <TextInput
                                style={[styles.searchInput, {marginTop: 10}]}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                accessibilityHint="Enter a number"
                                placeholder='Número de entregas'
                                placeholderTextColor={'#ccc'}
                                value={valorMeta}
                                onChangeText={handleValorChange2}
                            />
                        </View>
                    )}
                </View>
            )}
            </View>
          )}
          {currentStep === 3 && (
            <View>
            <Text style={styles.label}>Habilidades:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar habilidade..."
                value={searchHabilidade}
                onChangeText={text => {
                    setSearchHabilidade(text);
                    checkHabilidadeExists();
                }}
            />

            <ScrollView style={{ height: 100 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {filteredHabilidades.map(hab => (
                    <View key={hab.id} style={styles.employeeItem}>
                        <Switch
                            value={selectedHabilidade?.id === hab.id}
                            onValueChange={() => toggleHabilidadeSelection(hab)}
                        />
                        <Text style={styles.text}>{hab.nome}</Text>
                    </View>
                ))}
            </ScrollView>

            {habilidadeNotFound && (
                <TouchableOpacity style={styles.button} onPress={addNewHabilidade}>
                    <Text style={styles.buttonText}>Cadastrar: {searchHabilidade}</Text>
                </TouchableOpacity>
            )}
            </View>
            )}
            {currentStep === 4 && (
            <View>
            <Text style={styles.label}>Funcionários:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar funcionário..."
                value={searchText}
                onChangeText={setSearchText}
            />

            <ScrollView style={{ height: 100 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {filteredEmployees.map(emp => (
                    <View key={emp.id} style={styles.employeeItem}>
                        <Switch
                            value={selectedEmployees[emp.id] || false}
                            onValueChange={() => toggleEmployeeSelection(emp.id)}
                        />
                        <Text style={styles.text}>{emp.name} ({emp.departamento})</Text>
                    </View>
                ))}
            </ScrollView>
            </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                {currentStep > 1 && (
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#95a5a6' }]} onPress={() => setCurrentStep(prev => prev - 1)}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                )}
                {currentStep < 4 && (
                    <TouchableOpacity style={styles.button_proximo} onPress={() => setCurrentStep(prev => prev + 1)}>
                        <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                )}
                {currentStep == 4 && (
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Cadastrar Task</Text>
                    </TouchableOpacity>
                )}
            </View>

            <AwesomeAlert
                show={alertVisible}
                title="Notificação"
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setAlertVisible(false);
                    navigation.navigate('Tasks')
                }}
                overlayStyle={{ backgroundColor: 'transparent' }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
      label: {
        fontSize: 18,
        marginVertical: 10,
        color: '#2c3e50',
        fontWeight: '700'
      },
      employeeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: '#2c3e50',
      },
      text: {
        color: '#ecf0f1',
        marginLeft: 10,
        fontSize: 16,
      },
      button: {
        backgroundColor: '#2C3E50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
        width: '40%',
        alignSelf: 'center'
      },
      button_proximo: {
        backgroundColor: '#2C3E50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
        width: '40%',
        alignSelf: 'center',
        position: 'absolute',
        right: 0
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
      },

      picker: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding:5
      },
      selected: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default FormEditeTask;