import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';
import ScrollViewIndicator from 'react-native-scroll-indicator';

const LandingPage = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const options = [
    { label: 'Cadastrar', navigateTo: 'Register' },
    { label: 'Login', navigateTo: 'Login' },
  ];

  return (
    <ScrollViewIndicator>
    <View style={styles.container}>
        <View style={[styles.header, { width: width, height: height * 0.1 }]}>
            <Image
                source={require('../../assets/images/Logo.png')}
                style={styles.logo}
            />
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
        <View style={[styles.banner, { backgroundColor: '#2c3e50' }]}>
            <Text style={styles.message}>Bem-vindo à Work Pass, onde a inovação encontra a motivação!</Text>
            <Text style={{fontSize: 16, color: '#fff', width: width>= 600? width*0.6:width, textAlign: 'center', paddingTop: 15}}>
            A Work Pass é uma plataforma que busca transformar o ambiente de trabalho em um espaço mais dinâmico. 
            Acreditamos que a motivação é o principal fator para o sucesso de uma equipe, por isso buscamos desenvolver 
            soluções que motivem e recompensem os colaboradores através da gamificação.
            </Text>
        </View>
        <View style={styles.containerPlanos}>
            <Text style={styles.title}>Escolha o seu plano</Text>
            <View style={[styles.cardsContainer, { flexDirection: width >= 600 ? 'row' : 'column' }]}>
                <View style={[styles.card, { marginRight: width >= 600 ? 20 : 0, marginBottom: width < 600 ? 20 : 0 }]}>
                    <Text style={styles.cardTitle}>Plano Básico</Text>
                    <Text style={styles.cardDescription}>
                        Ideal para pequenas empresas. Acesso limitado às funcionalidades básicas.
                    </Text>
                    <Text style={styles.cardPrice}>R$ 99,90/mês</Text>
                    <Text style={styles.cardFeaturesTitle}>Funcionalidades:</Text>
                    <Text style={styles.cardFeatures}>• Acesso a funcionalidades básicas</Text>
                    <Text style={styles.cardFeatures}>• Suporte via email</Text>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Mais informações sobre o Plano Básico')}>
                        <Text style={styles.buttonText}>Saiba Mais</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, { marginRight: width >= 600 ? 20 : 0, marginBottom: width < 600 ? 20 : 0 }]}>
                    <Text style={styles.cardTitle}>Plano Plus</Text>
                    <Text style={styles.cardDescription}>
                        Para empresas em crescimento. Acesso completo às funcionalidades avançadas.
                    </Text>
                    <Text style={styles.cardPrice}>R$ 149,90/mês</Text>
                    <Text style={styles.cardFeaturesTitle}>Funcionalidades:</Text>
                    <Text style={styles.cardFeatures}>• Acesso a funcionalidades avançadas</Text>
                    <Text style={styles.cardFeatures}>• Suporte telefônico 24/7</Text>
                    <Text style={styles.cardFeatures}>• Treinamento personalizado</Text>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Mais informações sobre o Plano Plus')}>
                        <Text style={styles.buttonText}>Saiba Mais</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, { marginRight: width >= 600 ? 20 : 0, marginBottom: width < 600 ? 20 : 0 }]}>
                    <Text style={styles.cardTitle}>Plano Básico Anual</Text>
                    <Text style={styles.cardDescription}>
                        Solução completa para grandes empresas. Suporte dedicado e recursos exclusivos.
                    </Text>
                    <Text style={styles.cardPrice}>
                        R$ 1198,80 /ano
                    </Text>
                    <Text style={styles.cardDiscountedPrice}>
                        Agora por: R$ 950,00 /ano
                    </Text>
                    <Text style={styles.cardFeaturesTitle}>Funcionalidades:</Text>
                    <Text style={styles.cardFeatures}>• Acesso a funcionalidades básicas</Text>
                    <Text style={styles.cardFeatures}>• Suporte via email</Text>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Mais informações sobre o Plano Básico/Anual')}>
                        <Text style={styles.buttonText}>Saiba Mais</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Plano Plus Anual</Text>
                    <Text style={styles.cardDescription}>
                        Solução completa para grandes empresas. Suporte dedicado e recursos exclusivos.
                    </Text>
                    <Text style={styles.cardPrice}>
                        R$ 1798,80 /ano
                    </Text>
                    <Text style={styles.cardDiscountedPrice}>
                        Agora por: R$ 1400,00 /ano
                    </Text>
                    <Text style={styles.cardFeaturesTitle}>Funcionalidades:</Text>
                    <Text style={styles.cardFeatures}>• Acesso a funcionalidades avançadas</Text>
                    <Text style={styles.cardFeatures}>• Suporte telefônico 24/7</Text>
                    <Text style={styles.cardFeatures}>• Treinamento personalizado</Text>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Mais informações sobre o Plano Plus/Anual')}>
                        <Text style={styles.buttonText}>Saiba Mais</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.footer}>
            <View style={styles.linksContainer}>
                <TouchableOpacity>
                    <Text style={styles.link}>Sobre</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>Política de Privacidade</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>Termos de Serviço</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>Contatos</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.copyRight}>© 2024 Work-Pass. Todos os direitos reservados.</Text>
        </View>
    </View>
    </ScrollViewIndicator>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
  },
  header: {
    backgroundColor: '#2c3e50',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
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
  banner: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  message: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
  },
  containerPlanos: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
  },
  cardsContainer: {
      width: '100%',
      justifyContent: 'center',
      // alignItems: 'center',
  },
  card: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      alignItems: 'center',
  },
  cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 15,
      color: '#333',
  },
  cardDescription: {
      fontSize: 14,
      textAlign: 'center',
      color: '#777',
      marginTop: 10,
  },
  cardPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#333',
  },
  cardDiscountedPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00C853',
      marginTop: 5,
  },
  cardFeaturesTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 15,
      color: '#333',
  },
  cardFeatures: {
      fontSize: 12,
      color: '#777',
      textAlign: 'left',
      marginTop: 5,
  },
  button: {
      marginTop: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#007BFF',
      borderRadius: 5,
  },
  buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  linksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%',
      marginBottom: 10,
  },
  link: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginHorizontal: 15,
      marginBottom:15
  },
  copyRight: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'left',
      marginTop:20
  },
});

export default LandingPage;
