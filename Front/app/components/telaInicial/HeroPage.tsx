import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';

const HeroPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();

  const goToSignup = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container, { minHeight: height * 0.5 }]}>
      <Image
        source={{ uri: 'https://blog.centralserver.com.br/wp-content/uploads/2018/05/post-gamificacao.png' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Transforme sua equipe com Gamificação</Text>
        <Text style={styles.subtitle}>
          Aumente o engajamento, produtividade e motivação do seu time com nossas soluções personalizadas.
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={goToSignup} style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    top: 100,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonOutlineText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default HeroPage;