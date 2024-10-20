import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputAddFuncProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

const InputAddFunc: React.FC<InputAddFuncProps> = ({ label, value, setValue }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="default"
                autoCapitalize="none"
                value={value} 
                onChangeText={setValue}
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
        backgroundColor: '#2C3E50'
    },
    input: {
        flex: 1,
        height: 40,
    },
});

export default InputAddFunc;