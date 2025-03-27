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

    const formatPhone = (phone: string) => {
        const numbersOnly = phone.replace(/\D/g, '').slice(0, 11);
        let formattedPhone = numbersOnly;

        if (numbersOnly.length > 10) {
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7, 11)}`;
        } else if (numbersOnly.length > 6) {
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6, 10)}`;
        } else if (numbersOnly.length > 2) {
            formattedPhone = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`;
        } else if (numbersOnly.length > 0) {
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
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={handleChange}
                    placeholder="(XX) XXXXX-XXXX"
                    maxLength={15}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C3E50',
        borderRadius: 50, 
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        borderRadius: 50,
        padding:10
    },
});

export default InputPhone;
