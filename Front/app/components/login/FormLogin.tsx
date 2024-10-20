import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, useWindowDimensions  } from 'react-native';
import { AuthContext } from '@/contexts/Auth';

const FormLogin = () => {
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongInput, setWrongInput] = useState(false);
    const [mensagem, setMensagem] = useState('')
    const authContext = useContext(AuthContext);

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
                // navigation.navigate('Home', { email });
                setMensagem('E-mail ou senha incorretos!');
                setWrongInput(true);
            }
        } catch (error) {
            setMensagem('Erro ao tentar logar. Tente novamente.');
            setWrongInput(true);
        }
    };
    
    return (
        <View style={[styles.loginContainer, {width: width * 0.85, padding: width >= 768 ? 20:0}]}>
            <Text style={styles.loginTitle}>Entrar</Text>
            <View style={[styles.areaLogin, {width: width >= 768 ? '80%': "90%", padding: width >= 768 ? 30:15}]}>
                <Text>Email</Text>
                <TextInput
                    placeholder='Email'
                    style={[styles.input, {padding: width >= 768 ? 10:5}]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text>Senha</Text>
                <TextInput
                    placeholder='Senha'
                    style={[styles.input, {padding: width >= 768 ? 10:5}]}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.alertContainer}>
                    {wrongInput && <Text style={styles.alertText}>{mensagem}</Text>}
                </View>
                <TouchableOpacity testID="loginButton" style={[styles.button, {padding: width >= 768 ? 15:10}]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        flex: 2,
    },
    areaLogin: {
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    loginTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#8A79AF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alertContainer: {
        minHeight: 30,
        justifyContent: 'center'
    },
    alertText: {
        color: 'red',
        marginHorizontal: 'auto',
        fontSize: 12
    }
});

export default FormLogin