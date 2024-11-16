import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { NavigationProp } from '@react-navigation/native';

const LogoSubTitle = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={[styles.logoContainer, {marginBottom: width>=768 ? 40:10, flex: width >= 768 ? 2:1, marginTop:10}]}>
        <View style={styles.logo}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={ require('../../assets/images/Logo.png')}
              style={{ width: width>=768? 350:200, height: width>=768?175:100 }}
              resizeMode="contain" 
            />
        </TouchableOpacity>
        </View>
        <Text style={[styles.welcomeText, {fontSize: width >= 768 ? 35:20, textAlign: width >= 768 ? 'center': 'left'}]}>Transforme a cultura da sua empresa com a maior plataforma de endomarketing e gamificação para empresas.</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2C3E50', // Azul escuro
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      // marginBottom: 40,
      // flex: 2,
    },
    logo: {
      padding: 5,
      borderRadius: 20,
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFD700', // Cor para destacar o logo
    },
    welcomeText: {
      color: '#FFFFFF', // Texto branco
      fontSize: 35,
      textAlign: 'center',
    }
});

export default LogoSubTitle