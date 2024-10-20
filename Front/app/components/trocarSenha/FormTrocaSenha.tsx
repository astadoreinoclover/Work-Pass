import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function FormTrocaSenha() {
    const { width } = useWindowDimensions();
    const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
    const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
    const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);

    const EyeIcon = ({ visible }: { visible: boolean }) => (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            {visible ? (
                // Olho aberto
                <Path
                    d="M12 4.5C7.305 4.5 3.507 7.44 2 12c1.507 4.56 5.305 7.5 10 7.5s8.493-2.94 10-7.5c-1.507-4.56-5.305-7.5-10-7.5zM12 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"
                    fill="#000"
                />
            ) : (
                // Olho cortado
                <Path
                    d="M12 4.5c4.695 0 8.493 2.94 10 7.5-1.507 4.56-5.305 7.5-10 7.5S3.507 16.56 2 12c1.507-4.56 5.305-7.5 10-7.5zm5.5 7.5c-.027-.131-.06-.26-.1-.387L5.88 17.129A9.874 9.874 0 0 1 2 12c1.507-4.56 5.305-7.5 10-7.5.757 0 1.493.069 2.2.2L7.45 10.55a2.02 2.02 0 1 0 2.95 2.95L17.7 6.28A9.856 9.856 0 0 1 22 12c-1.506 4.56-5.304 7.5-10 7.5a9.866 9.866 0 0 1-3.68-.71L17.9 9.13c.048.117.092.236.13.358l.47.358Z"
                    fill="#000"
                />
            )}
        </Svg>
    );

    return (
        <View style={{ width: width >= 768 ? width * 0.4 : width * 0.7 }}>
            <Text style={[styles.title, { fontSize: width >= 768 ? 30 : 22 }]}>
                Troca de Senha
            </Text>
            <Text>Senha Atual</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                    secureTextEntry={!senhaAtualVisivel}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
                >
                    <EyeIcon visible={senhaAtualVisivel} />
                </TouchableOpacity>
            </View>
            <Text>Nova Senha</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                    secureTextEntry={!novaSenhaVisivel}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setNovaSenhaVisivel(!novaSenhaVisivel)}
                >
                    <EyeIcon visible={novaSenhaVisivel} />
                </TouchableOpacity>
            </View>
            <Text>Confirme sua senha</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                    secureTextEntry={!confirmaSenhaVisivel}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                >
                    <EyeIcon visible={confirmaSenhaVisivel} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity testID="loginButton" style={[styles.button, { padding: width >= 768 ? 15 : 10 }]}>
                <Text style={[styles.buttonText, { fontSize: width >=768 ? 18 : 12 }]}>Trocar Senha</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#2C3E50',
        margin: 'auto',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
    button: {
        width: '50%',
        backgroundColor: '#8A79AF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        margin: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
