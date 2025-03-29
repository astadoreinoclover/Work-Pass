import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';

interface InputProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

const InputWithIcon: React.FC<InputProps> = ({ label, value, setValue }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="default"
                autoCapitalize="none"
                value={value} 
                onChangeText={setValue}
                placeholder={value}
                placeholderTextColor="#ccc"
            />
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
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        borderRadius: 50,
        padding:10
    },
});

export default InputWithIcon;
