import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import FormRegister from '@/components/register/RegisterComp';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '@/components/navigation/types';
import { NavigationProp } from '@react-navigation/native';

export default function AddFuncionario() {
    const { width,height } = useWindowDimensions();
    const [hoverIndex, setHoverIndex] = useState<number | null>(0);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const options = [
      { label: 'Cadastrar', navigateTo: 'Register' },
      { label: 'Login', navigateTo: 'Login' },
    ];
    return (
        <View style={styles.container}>
            <View style={[styles.header, { width: width, height: height * 0.1 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                    source={require('../../assets/images/Logo.png')}
                    style={styles.logo}
                />
            </TouchableOpacity>
            <View style={styles.options}>
                {options.map((option, index) => (
                    <Pressable
                    key={index}
                    onPress={() => navigation.navigate(option.navigateTo)}
                    onHoverIn={() => setHoverIndex(index)}
                    onHoverOut={() => setHoverIndex(null)}
                    >
                    <Text
                    style={[
                    styles.option,
                    hoverIndex === index && styles.optionHover,
                    ]}
                    >
                    {option.label}
                    </Text>
                    </Pressable>
                ))}
            </View>
        </View>
            <View style={{height: height * 0.1,display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
                <FormRegister />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
    },
    header: {
        backgroundColor: '#2c3e50',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        position: 'absolute',
        top: 0
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
    option: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    optionHover: {
        color: '#1abc9c',
    },
});