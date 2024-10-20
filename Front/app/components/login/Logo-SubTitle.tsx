import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

const LogoSubTitle = () => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.logoContainer, {marginBottom: width>=768 ? 40:10, flex: width >= 768 ? 2:1, marginTop:10}]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
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
      backgroundColor: '#8A79AF', // Roxo Lavanda
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
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
      paddingHorizontal: 20,
    }
});

export default LogoSubTitle