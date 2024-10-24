import React, { useContext, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, Switch } from 'react-native';
import InputAddFunc from './RenderAddFunc';
import ProgressBar from './ProgressBar';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import InputCPF from './CpfInput';
import InputDate from './DataInput';
import InputPhone from './PhoneInput';
import axios from 'axios';
import { AuthContext } from '@/contexts/Auth';


export default function FormAddFunc() {
    const { width } = useWindowDimensions();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const authContext = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [funcao, setFuncao] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [complement, setComplement] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [isGerente, setIsGerente] = useState(false);

    const [dia, mes, ano] = dataNasc.split('/');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (cpf.length < 13) {
            alert('CPF invalido');
            return;
        }

        if (!validateEmail(email)) {
            alert('Email invalido');
            return;
        }

        if (!nome || !sobrenome || !departamento || !email || !phone || !neighborhood || !street || !complement || !houseNumber || !dataNasc || !cpf) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                name: nome + " " + sobrenome,
                email: email,
                password: nome + "*@*" + ano,
                funcao: isGerente ? 'Gerente' : funcao,
                cpf: cpf,
                numero: phone,
                departamento: isGerente ? authContext.authData?.departamento : departamento,
                dataNascimento: dataNasc,
                role: isGerente ? 'ADMIN' : 'USER',
                id_empresa: authContext.authData?.id_empresa,
            });

            const responseLocation = await axios.post('http://localhost:3000/api/createEndereco', {
                id_user: response.data.id,
                bairro: neighborhood,
                numero: houseNumber,
                rua: street,
                complemento: complement,
                cidade: cidade,
                estado: estado,
                pais: pais
            })

            if(response.status === 201 && responseLocation.status === 201) {
                navigation.navigate('Funcionarios')
            }
        } catch (error) {
            console.log("Erro")
            console.error(error.response)
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Nome" value={nome} setValue={setNome} />
                        <InputAddFunc label="Sobrenome" value={sobrenome} setValue={setSobrenome} />
                        <InputDate label="Data Nasc." value={dataNasc} setValue={setDataNasc} />
                        <InputCPF label="CPF" value={cpf} setValue={setCpf} />
                        {authContext.authData?.role === "MANAGER" && (
                            <View style={styles.switchContainer}>
                                <Text style={styles.label}>Você está cadastrando um Gerente?</Text>
                                <Switch
                                    value={isGerente}
                                    onValueChange={(value) => setIsGerente(value)}
                                    trackColor={{ false: '#D3D3D3', true: '#2C3E50' }}
                                    thumbColor={isGerente ? '#FFF' : '#FFF'}
                                />
                            </View>
                        )}

                    </View>
                );
            case 2:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Email" value={email} setValue={setEmail} />
                        <InputPhone label="Telefone" value={phone} setValue={setPhone} />
                        {authContext.authData?.role === "MANAGER" && (
                            <InputAddFunc label="Departamento" value={departamento} setValue={setDepartamento} />    
                        )}
                        {!isGerente && (
                            <InputAddFunc label="Função" value={funcao} setValue={setFuncao} />
                        )}
                    </View>
                );
            case 3:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Bairro" value={neighborhood} setValue={setNeighborhood} />
                        <InputAddFunc label="Rua" value={street} setValue={setStreet} />
                        <InputAddFunc label="Complemento" value={complement} setValue={setComplement} />
                        <InputAddFunc label="Número" value={houseNumber} setValue={setHouseNumber} />
                    </View>
                );
            case 4:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Cidade" value={cidade} setValue={setCidade} />
                        <InputAddFunc label="Estado" value={estado} setValue={setEstado} />
                        <InputAddFunc label="Pais" value={pais} setValue={setPais} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={[styles.posicao, { width: width >= 768 ? width * 0.5 : width * 0.9, paddingTop:50}]}>
            <Text style={[styles.title, { fontSize: width >= 768 ? 30 : 22 }]}>Cadastro de Funcionário</Text>

            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {renderStep()}

            <View style={styles.buttonContainer}>
                {currentStep > 1 && (
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.2 : width * 0.3 }]}
                        onPress={prevStep}
                    >
                        <Text style={styles.buttonText}>Anterior</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.2 : width * 0.3 }]}
                        onPress={currentStep < totalSteps ? nextStep : handleSubmit}
                    >
                        <Text style={styles.buttonText}>{currentStep < totalSteps ? 'Próximo' : 'Concluir'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    posicao: {
        position: 'relative',
    },
    title: {
        color: '#2C3E50',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#8A79AF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#2C3E50',
        marginRight: 10,
    },
});