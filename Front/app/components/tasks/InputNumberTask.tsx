import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputNumberProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void;
}

const InputNumberTask: React.FC<InputNumberProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    const handleChange = (text: string) => {
        const onlyNumbers = text.replace(/\D/g, '');
        setValue(onlyNumbers);
        if (onChange) {
            onChange(onlyNumbers);
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
                    accessibilityLabel={label}
                    accessibilityHint="Enter a number"
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

export default InputNumberTask;
