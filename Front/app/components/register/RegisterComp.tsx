import React, { useContext, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, Switch } from 'react-native';
import InputAddFunc from '../Inputs/RenderAddFunc';
import ProgressBar from '../Inputs/ProgressBar';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import InputCPF from '../Inputs/CpfInput';
import InputDate from '../Inputs/DataInput';
import InputPhone from '../Inputs/PhoneInput';
import axios from 'axios';
import { AuthContext } from '@/contexts/Auth';
import AwesomeAlert from 'react-native-awesome-alerts';  
import InputCNPJ from '../Inputs/CnpjInput';
import PasswordDefinition from '../Inputs/SenhaCadastro';

export default function FormRegister() {
    const { width } = useWindowDimensions();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const authContext = useContext(AuthContext);

    const [empresaName, setEmpresaName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState({ senha: "", confirmacao: "" });;

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [dia, mes, ano] = dataNasc.split('/');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (cpf.length < 13) {
            setAlertMessage('CPF inválido');
            setShowAlert(true);
            return;
        }

        if(phone.length < 15) {
            setAlertMessage('Número inválido');
            setShowAlert(true);
            return;
        }

        if(dataNasc.length < 10) {
            setAlertMessage('Data inválida');
            setShowAlert(true);
            return;
        }

        if (!validateEmail(email)) {
            setAlertMessage('E-mail inválido');
            setShowAlert(true);
            return;
        }

        if (!nome || !sobrenome || !email || !phone || !dataNasc || !cpf) {
            setAlertMessage('Por favor, preencha todos os campos.');
            setShowAlert(true);
            return;
        }

        try {
            const responseEmpresa = await axios.post('http://localhost:3000/api/empresa', {
                nome: empresaName,
                cnpj: cnpj,
            });

            const response = await axios.post('http://localhost:3000/api/register', {
                name: nome + " " + sobrenome,
                email: email,
                password: nome + "@@@" + ano,
                funcao: "Admin Geral",
                cpf: cpf,
                numero: phone,
                departamento: "Geral",
                dataNascimento: dataNasc,
                role: "MANAGER",
                id_empresa: responseEmpresa.data.id,
            });

            const responseGaming = await axios.post('http://localhost:3000/api/gaming', {
                user_id: response.data.id
            })

            if(response.status === 201 && responseGaming.status ===201) {
                // navigation.navigate('Login');
                const authData = await authContext.login(email, nome + "@@@" + ano);
            }
        } catch (error) {
            setAlertMessage(error.response?.data?.error || 'Erro ao criar usuário');
            setShowAlert(true);
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
                return(
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Empresa" value={empresaName} setValue={setEmpresaName} />
                        <InputCNPJ label="CNPJ" value={cnpj} setValue={setCnpj} />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.containerInputs}>
                        

                    </View>
                );
            case 3:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Nome" value={nome} setValue={setNome} />
                        <InputAddFunc label="Sobrenome" value={sobrenome} setValue={setSobrenome} />
                        <InputDate label="Data Nasc." value={dataNasc} setValue={setDataNasc} />
                        <InputCPF label="CPF" value={cpf} setValue={setCpf} />
                    </View>
                );
            case 4:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Email" value={email} setValue={setEmail} />
                        <InputPhone label="Telefone" value={phone} setValue={setPhone} />
                    </View>
                );
            case 5:
                return (
                    <View style={styles.containerInputs}>
                        <PasswordDefinition senha={senha} setSenha={setSenha} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={[styles.formContainer, { width: width >= 1024 ? width*0.5 : width*0.95, maxHeight: 700 }]}>
        <View style={[styles.posicao, { width: width >= 1024 ? width * 0.45 : width * 0.9, paddingTop:50}]}>
            <Text style={[styles.title, { fontSize: width >= 1024 ? 30 : 22 }]}>Cadastro de Empresa</Text>

            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {renderStep()}

            <View style={styles.buttonContainer}>
                {currentStep > 1 && (
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.1 : width * 0.3, maxWidth: 150 }]}
                        onPress={prevStep}
                    >
                        <Text style={styles.buttonText}>Anterior</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.1 : width * 0.3, maxWidth: 150 }]}
                        onPress={currentStep < totalSteps ? nextStep : handleSubmit}
                    >
                        <Text style={styles.buttonText}>{currentStep < totalSteps ? 'Próximo' : 'Concluir'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Erro"
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                overlayStyle={{ backgroundColor: 'transparent' }}
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
                contentContainerStyle={{
                    width: '70%',
                    padding: 20,
                    borderRadius: 10,
                }}
                titleStyle={{
                    fontSize: 24,
                    fontWeight: 'bold',
                }}
                messageStyle={{
                    fontSize: 18,
                    textAlign: 'center',
                }}
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        textAlign: 'center',
        maxWidth: 700,
        position: 'relative',
        zIndex: 1,
        marginVertical: 0,
        marginHorizontal: 'auto',
        marginTop: 50,
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    posicao: {
        position: 'relative',
        maxWidth: 600
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 600
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