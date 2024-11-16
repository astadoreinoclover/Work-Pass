import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';

const LandingPage = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const options = [
    { label: 'Cadastrar', navigateTo: 'Register' },
    { label: 'Login', navigateTo: 'Login' },
  ];

  return (
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
    </View>
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
});

export default LandingPage;
