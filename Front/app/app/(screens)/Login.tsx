import React from 'react';
import { View, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import LogoSubTitle from '@/components/login/Logo-SubTitle';
import FormLogin from '@/components/login/FormLogin';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { width, height } = useWindowDimensions();
  
  return (
    <ImageBackground 
      source={require('@/assets/images/login.jpg')} 
      style={[styles.background, {width: width, height: height}]}
    >
      <View style={styles.overlay} />
      <View style={[styles.container, { flexDirection: width >= 768 ? 'row':'column'}]}>

        
        <FormLogin navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajuste a opacidade conforme necessário
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoginScreen;