import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import InputWithIcon from './RenderForm';
import { AuthContext } from '@/contexts/Auth';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';


export default function FormEditarDados() {
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authContext.authData) {
            setEmail(authContext.authData.email || '');
            setPhone(authContext.authData.numero || '');
        }
    }, [authContext.authData]);

    const pickImage = async () => {
        try {
            // Request permissions (only needed for mobile)
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
                base64: Platform.OS === 'web', // Get base64 for web
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                if (Platform.OS === 'web') {
                    // For web, use base64 or blob
                    setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
                } else {
                    // For mobile, use the URI directly
                    setPhoto(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            setError('Erro ao selecionar a imagem');
        }
    };

    const handleSubmit = async () => {
        if (!email || !phone) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Then handle photo upload if a new photo was selected
            if (photo && !photo.startsWith('http')) {
                await uploadPhoto();
            }

            await authContext.updateUserData()
            navigation.navigate('Perfil')
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Erro ao atualizar dados. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const uploadPhoto = async () => {
        if (!photo || !authContext.authData?.id) return;

        try {
            const formData = new FormData();
            
            if (Platform.OS === 'web') {
                // Web handling
                if (photo.startsWith('data:')) {
                    // Convert base64 to blob
                    const response = await fetch(photo);
                    const blob = await response.blob();
                    formData.append('foto', blob, `user_${authContext.authData.id}.jpg`);
                } else {
                    // Regular file URI (unlikely on web)
                    const response = await fetch(photo);
                    const blob = await response.blob();
                    formData.append('foto', blob, `user_${authContext.authData.id}.jpg`);
                }
            } else {
                // Native handling
                const filename = photo.split('/').pop() || `user_${authContext.authData.id}.jpg`;
                formData.append('foto', {
                    uri: photo,
                    name: filename,
                    type: 'image/jpeg',
                } as any);
            }

            await axios.put(`http://localhost:3000/api/users/${authContext.authData.id}/foto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading photo:', error);
            throw error;
        }
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
                        <InputWithIcon 
                            label="Email" 
                            value={email} 
                            setValue={setEmail} 
                        />
                    </View>
                    <View style={{ padding: 5, width: width >= 768 ? width * 0.3 : width * 0.9 }}>
                        <Text style={{ color: '#fff' }}>Número (Celular)</Text>
                        <InputWithIcon 
                            label="Número (Celular)" 
                            value={phone} 
                            setValue={setPhone} 
                        />
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
                    style={[
                        styles.button, 
                        { 
                            padding: width >= 768 ? 15 : 10, 
                            width: width >= 768 ? width * 0.3 : width * 0.8,
                            opacity: isLoading ? 0.7 : 1 
                        }
                    ]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Processando...' : 'Concluir'}
                    </Text>
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