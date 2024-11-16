import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputAddFuncProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputCNPJ: React.FC<InputAddFuncProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    const handleChange = (text: string) => {
        const onlyNumbers = text.replace(/\D/g, '');

        if (onlyNumbers.length <= 14) {
            let formattedCnpj = onlyNumbers;

            if (onlyNumbers.length > 12) {
                formattedCnpj = `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}.${onlyNumbers.slice(5, 8)}/${onlyNumbers.slice(8, 12)}-${onlyNumbers.slice(12, 14)}`;
            } else if (onlyNumbers.length > 8) {
                formattedCnpj = `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}.${onlyNumbers.slice(5, 8)}/${onlyNumbers.slice(8, 12)}`;
            } else if (onlyNumbers.length > 5) {
                formattedCnpj = `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}.${onlyNumbers.slice(5, 8)}`;
            } else if (onlyNumbers.length > 2) {
                formattedCnpj = `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}`;
            } else if (onlyNumbers.length > 0) {
                formattedCnpj = onlyNumbers.slice(0, 2);
            }

            setValue(formattedCnpj);
            if (onChange) {
                onChange(formattedCnpj);
            }
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
                placeholder="xx.xxx.xxx/xxxx-xx"
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

export default InputCNPJ;
