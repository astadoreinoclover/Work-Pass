import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';

const FormLogin = () => {
    const { width } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongInput, setWrongInput] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const authContext = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setWrongInput(false);

        if (!validateEmail(email)) {
            setMensagem('Por favor, insira um e-mail válido.');
            setWrongInput(true);
            return;
        }

        if (password.length < 8) {
            setMensagem('A senha deve ter no mínimo 8 caracteres.');
            setWrongInput(true);
            return;
        }

        try {
            const authData = await authContext.login(email, password);
            if (!authData?.token) {
                setMensagem('E-mail ou senha incorretos!');
                setWrongInput(true);
            }
        } catch (error) {
            setMensagem('Erro ao tentar logar. Tente novamente.');
            setWrongInput(true);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const toHome = () => {
        navigation.navigate('Home');
    };

    return (
        <>
            <View style={[styles.formContainer, { width: width >= 768 ? 400 : '100%' }]}>
                <Text style={styles.logo}>WP</Text>
                <Text style={styles.formTitle}>Login</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder='Digite seu e-mail'
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Digite sua senha'
                            style={styles.input}
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                            <Text>{isPasswordVisible ? '👁️' : '🙈'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {wrongInput && <Text style={styles.errorMessage}>{mensagem}</Text>}
                <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                    <Text style={styles.buttonTextEnter}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        textAlign: 'center',
        maxWidth: 400,
        position: 'relative',
        zIndex: 1,
        marginVertical: 0,
        marginHorizontal: 'auto',
        marginTop: 50,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '45%',
        transform: 'translateY(-50%)',
        backgroundColor: 'transparent',
        color: '#FFF',
        fontSize: 20,
        cursor: 'pointer',
        width: 'auto',
    },
    logo: {
        fontSize: 20,
        marginBottom: 20,
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 'auto',
        fontWeight: 'light',  
        padding: 5,   
        borderWidth: 2,
        width:100,
        textAlign: 'center' 
    },
    formTitle: {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
        textAlign: 'left',
    },
    label: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 3,
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 5,
        backgroundColor: '#2C3E50',
        color: '#FFF',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextEnter: {
        color: '#2C3E50',
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#FFF',
        color: '#000',
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#2C3E50',
        color: '#FFF',
        border: '1px solid #FFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default FormLogin;