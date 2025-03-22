import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image, Text, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import FormRegister from '@/components/register/RegisterComp';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '@/components/navigation/types';
import { NavigationProp } from '@react-navigation/native';

export default function AddFuncionario() {
    const { width,height } = useWindowDimensions();
    const [hoverIndex, setHoverIndex] = useState<number | null>(0);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const options = [
      { label: 'Home', navigateTo: 'Home' },
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
            <ImageBackground 
            source={require('@/assets/images/login.jpg')} 
            style={[styles.background, {width: width, height: height}]}
            >
            <View style={styles.overlay} />
            <View style={[styles.container, { flexDirection: width >= 768 ? 'row':'column'}]}>

                
                <FormRegister navigation={navigation} />
            </View>
            </ImageBackground>
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
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        position: 'absolute',
        top: 0,
        zIndex:99
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
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
});