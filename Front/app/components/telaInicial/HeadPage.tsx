import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';

const HeadPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToSignup = () => {
    navigation.navigate('Register');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    if (width >= 1024) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <View style={[styles.container, {width: width*0.95}]}>
      <View style={[styles.navbar, isMenuOpen && styles.expanded]}>
        <Image source={require('@/assets/images/Logo.png')} style={styles.navLogo} />
        
        {width < 1024 && (
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerMenu}>
            <Text style={[styles.hamburgerMenuText, { color: isMenuOpen ? '#eee' : '#000' }]}>☰</Text>
          </TouchableOpacity>
        )}

        {width >= 1024 && (
          <View style={styles.navbarmenus}>
            <TouchableOpacity onPress={() => {}} style={ {marginHorizontal: 7} }>
              <Text style={[{ fontSize: 15, fontWeight: 'semibold', color: '#2c3e50'}]}>Funcionalidades</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={ {marginHorizontal: 7} }>
              <Text style={[{ fontSize: 15, fontWeight: 'semibold', color: '#2c3e50'}]}>Planos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={ {marginHorizontal: 7} }>
              <Text style={[{ fontSize: 15, fontWeight: 'semibold', color: '#2c3e50'}]}>Desenvolvedores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={ {marginHorizontal: 7} }>  
              <Text style={[{ fontSize: 15, fontWeight: 'semibold', color: '#2c3e50'}]}>Fale conosco</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLogin} style={ {marginHorizontal: 10} }>
              <Text style={[{ fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToSignup} style={ {marginHorizontal: 10} }>
              <Text style={[{ fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }]}>Cadastro</Text>
            </TouchableOpacity>
          </View>
        )}

        {isMenuOpen && (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => {}} style={styles.navLink}>
              <Text style={styles.navLinkText}>Funcionalidades</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.navLink}>
              <Text style={styles.navLinkText}>Planos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.navLink}>
              <Text style={styles.navLinkText}>Desenvolvedores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.navLink}>
              <Text style={styles.navLinkText}>Fale conosco</Text>
            </TouchableOpacity>

            <View style={styles.navbarmenus}>
              <TouchableOpacity onPress={goToLogin} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToSignup} style={styles.signupButton}>
                <Text style={styles.buttonText}>Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginTop: 10
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10, 
    height: 99.2
  },
  expanded: {
    backgroundColor: '#2c3e50',
  },
  navLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  hamburgerMenu: {
    padding: 10,
  },
  hamburgerMenuText: {
    fontSize: 30,
  },
  navLinks: {
    flexDirection: 'column',
    alignItems: 'baseline',
    backgroundColor: '#2c3e50',
    opacity: 0.95,
    padding: 50,
    width: '100%',
    position: 'absolute',
    top: 75,
    right: 0,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  navLink: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  navLinkText: {
    color: '#fff',
    fontSize: 18,
  },
  navbarmenus: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
  },
});

export default HeadPage;
