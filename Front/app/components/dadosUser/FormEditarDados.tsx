import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import InputWithIcon from './RenderForm';
import EmailIcon from './icons/EmailIcon';
import PhoneIcon from './icons/PhoneIcon';
import { AuthContext } from '@/contexts/Auth';

export default function FormEditarDados() {
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setEmail(authContext.authData?.email || '');
        setPhone(authContext.authData?.numero || '');
    }, [authContext.authData]);

    const handleSubmit = () => {
        if (!email || !phone) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setError(null);
        console.log({
            email,
            phone,
        });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.posicao, { width: width >= 768 ? width * 0.8 : width * 0.9, top: width >= 768 ? 0 : 100 }]}>
                <Text style={[styles.title, { fontSize: width >= 768 ? 30 : 22 }]}>
                    Editar dados
                </Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <View style={[styles.containerInputs, { flexDirection: width >= 768 ? 'row' : 'column' }]}>
                    <View style={{ padding: 5, width: width >= 768 ? width * 0.4 : width * 0.9 }}>
                        <Text>Email</Text>
                        <InputWithIcon label="Email" IconComponent={EmailIcon} value={email || ''} setValue={setEmail} />
                        <Text>Número (Celular)</Text>
                        <InputWithIcon label="Número (Celular)" IconComponent={PhoneIcon} value={phone || ''} setValue={setPhone} />
                    </View>
                </View>
                <TouchableOpacity
                    testID="loginButton"
                    style={[styles.button, { padding: width >= 768 ? 15 : 10, width: width >= 768 ? width * 0.3 : width * 0.8 }]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    posicao: {
        position: 'relative',
    },
    title: {
        color: '#2C3E50',
        margin: 'auto',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    containerInputs: {
        display: 'flex',
    },
    button: {
        backgroundColor: '#8A79AF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        margin: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
