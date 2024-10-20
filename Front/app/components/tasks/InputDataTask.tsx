import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputDateProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputDataTask: React.FC<InputDateProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    const handleChange = (text: string) => {
        const onlyNumbers = text.replace(/\D/g, '');
    
        if (onlyNumbers.length <= 8) {
            
            let formattedData = onlyNumbers;
    
            if (onlyNumbers.length > 4) {
                formattedData = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}/${onlyNumbers.slice(4, 8)}`;
            } else if (onlyNumbers.length > 2) {
                formattedData = `${onlyNumbers.slice(0, 2)}/${Number(onlyNumbers.slice(2, 4)) > 12 ? "Data inesistente" : onlyNumbers.slice(2, 4)}`;
            } else if (onlyNumbers.length > 0) {
                formattedData = Number(onlyNumbers.slice(0, 2)) > 31 ? "Data inesistente" : onlyNumbers.slice(0, 2);

            }
    
            setValue(formattedData);
            if (onChange) {
                onChange(formattedData);
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
                placeholder='xx/xx/xxxx'
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

export default InputDataTask;