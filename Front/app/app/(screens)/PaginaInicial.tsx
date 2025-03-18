import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/types';
import HeadPage from '@/components/telaInicial/HeadPage';
import HeroPage from '@/components/telaInicial/HeroPage';

const HomePage = () => {
  return (
    <View>
      <View style={ styles.prioridade}>
        <HeadPage />
      </View>
      <HeroPage />
    </View>
  );
};

const styles = StyleSheet.create({
  prioridade: {
    zIndex: 999,
  },
});

export default HomePage;
