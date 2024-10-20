import React from 'react';
import { View, StyleSheet, useWindowDimensions  } from 'react-native';
import LogoSubTitle from '@/components/login/Logo-SubTitle';
import FormLogin from '@/components/login/FormLogin';


const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { width } = useWindowDimensions();
  
  return (
    <View style={[styles.container, { flexDirection: width >= 768 ? 'row':'column'}]}>
      <View style={{marginTop: width >=768 ? 0:30, marginBottom: width >=768 ? 0:30, width: width >= 768 ? width* 0.5 : width*0.9}}>
        <LogoSubTitle />
      </View>
      
      <FormLogin navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50', // Azul escuro
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoginScreen;