import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputAddFuncProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputCPF: React.FC<InputAddFuncProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    const handleChange = (text: string) => {
        const onlyNumbers = text.replace(/\D/g, '');
    
        if (onlyNumbers.length <= 11) {
            let formattedCpf = onlyNumbers;
    
            if (onlyNumbers.length > 9) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6, 9)}-${onlyNumbers.slice(9, 11)}`;
            } else if (onlyNumbers.length > 6) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6, 9)}`;
            } else if (onlyNumbers.length > 3) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}`;
            } else if (onlyNumbers.length > 0) {
                formattedCpf = onlyNumbers.slice(0, 3);
            }
    
            setValue(formattedCpf);
            if (onChange) {
                onChange(formattedCpf);
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
                    placeholder='xxx.xxx.xxx-xx'
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

export default InputCPF;
