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
        <View>
            <Text style={styles.label}>{label}</Text>
                <View style={styles.inputContainer}>
                    
                    <TextInput
                        style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                        keyboardType="default"
                        autoCapitalize="none"
                        value={value} 
                        onChangeText={setValue}
                        placeholderTextColor="#ccc"
                        placeholder={label}
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
        padding:20
    },
});

export default InputAddFunc;