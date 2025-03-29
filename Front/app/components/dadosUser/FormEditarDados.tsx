import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import InputWithIcon from './RenderForm';
import { AuthContext } from '@/contexts/Auth';

export default function FormEditarDados() {
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setEmail(authContext.authData?.email || '');
        setPhone(authContext.authData?.numero || '');
    }, [authContext.authData]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!email || !phone) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setError(null);
        console.log({
            email,
            phone,
            photo,
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
                    <View style={{ padding: 5, width: width >= 768 ? width * 0.3 : width * 0.9 }}>
                        <Text style={{ color: '#fff' }}>Email</Text>
                        <InputWithIcon label="Email" value={email || ''} setValue={setEmail} />
                    </View>
                    <View style={{ padding: 5, width: width >= 768 ? width * 0.3 : width * 0.9 }}>
                        <Text style={{ color: '#fff' }}>Número (Celular)</Text>
                        <InputWithIcon label="Número (Celular)" value={phone || ''} setValue={setPhone} />
                    </View>
                </View>
                <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.image} />
                    ) : (
                        <Text style={styles.photoPlaceholder}>Selecionar Foto</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
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
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 20,
        borderRadius: 25
    },
    title: {
        color: '#fff',
        margin: 'auto',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    containerInputs: {
        display: 'flex',
        justifyContent: 'space-around'
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
    photoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 'auto',
        backgroundColor: '#2C3E50'
    },
    photoPlaceholder: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
