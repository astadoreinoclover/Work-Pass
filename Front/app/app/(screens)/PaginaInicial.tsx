import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadPage from '@/components/telaInicial/HeadPage';
import HeroPage from '@/components/telaInicial/HeroPage';
import DevPage from '@/components/telaInicial/DevPage';
import PlanPage from '@/components/telaInicial/PlanPage'

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
        <DevPage />
      </View>
      <View>
        <PlanPage />
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
