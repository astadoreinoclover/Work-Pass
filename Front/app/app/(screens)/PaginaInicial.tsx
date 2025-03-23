import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadPage from '@/components/telaInicial/HeadPage';
import HeroPage from '@/components/telaInicial/HeroPage';
import CarouselPage from '@/components/telaInicial/FuncPage';
import DevPage from '@/components/telaInicial/DevPage';
import PlanPage from '@/components/telaInicial/PlanPage'
import FooterPage from '@/components/telaInicial/FooterPage';

const HomePage = () => {
  return (
    <ScrollView>
      <View style={ styles.prioridade}>
        <HeadPage />
      </View>
      <View>
        <HeroPage />
      </View>
      <View>
        <CarouselPage />
      </View>
      <View>
        <DevPage />
      </View>
      <View>
        <PlanPage />
      </View>
      <View>
        <FooterPage />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  prioridade: {
    zIndex: 999, 
  },
});

export default HomePage;
