import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputDateProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputDate: React.FC<InputDateProps> = ({ label, value, setValue, onChange }) => {
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
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value} 
                onChangeText={handleChange}
                placeholder='xx/xx/xxxx'
                placeholderTextColor="#ccc"
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

export default InputDate;