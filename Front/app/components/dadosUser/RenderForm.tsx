import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';

interface InputWithIconProps {
    label: string;
    IconComponent: React.FC;
    value: string;
    setValue: (value: string) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, IconComponent, value, setValue }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.inputContainer}>
            <View style={styles.containerIcon}><IconComponent /></View>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="default"
                autoCapitalize="none"
                value={value} 
                onChangeText={setValue}
                placeholder={value}
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
    containerIcon: {
        paddingLeft:3
    },
    input: {
        flex: 1,
        padding: 10,
        marginLeft: 10,
        height: 40,
    },
});

export default InputWithIcon;
