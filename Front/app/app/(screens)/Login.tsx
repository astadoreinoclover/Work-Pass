import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, ImageBackground, Text,TouchableOpacity, Image, Pressable } from 'react-native';
import LogoSubTitle from '@/components/login/Logo-SubTitle';
import FormLogin from '@/components/login/FormLogin';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { width, height } = useWindowDimensions();
  const [hoverIndex, setHoverIndex] = useState<number | null>(0);
  const options = [
    { label: 'Home', navigateTo: 'Home' },
    { label: 'Cadastro', navigateTo: 'Register' },
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

          
          <FormLogin navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
});

export default LoginScreen;