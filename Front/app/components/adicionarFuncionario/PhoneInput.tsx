import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputAddFuncProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputPhone: React.FC<InputAddFuncProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    // Função para formatar o número de telefone
    const formatPhone = (phone: string) => {
        const numbersOnly = phone.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos
        let formattedPhone = numbersOnly;

        // Formatação do número de telefone
        if (numbersOnly.length > 10) {
            // Formato para celular com 9 dígitos: (XX) XXXXX-XXXX
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7, 11)}`;
        } else if (numbersOnly.length > 6) {
            // Formato para fixo com 8 dígitos: (XX) XXXX-XXXX
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6, 10)}`;
        } else if (numbersOnly.length > 2) {
            // Formato parcial: (XX) XXXX
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`;
        } else if (numbersOnly.length > 0) {
            // Formato parcial: (XX
            formattedPhone = `(${numbersOnly}`;
        }

        return formattedPhone;
    };

    const handleChange = (text: string) => {
        const formattedPhone = formatPhone(text);
        setValue(formattedPhone);
        if (onChange) {
            onChange(formattedPhone);
        }
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value}
                onChangeText={handleChange}
                placeholder="(XX) XXXXX-XXXX"
                maxLength={15} // Limita ao tamanho formatado máximo do telefone
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        padding: 10,
        color: '#fff',
        backgroundColor: '#2C3E50',
    },
    input: {
        flex: 1,
        height: 40,
    },
});

export default InputPhone;
