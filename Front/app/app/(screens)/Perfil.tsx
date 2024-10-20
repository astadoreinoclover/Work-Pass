import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import BarInferior from '@/components/bars/BarInferior';
import UserProfile from '@/components/perfil/PerfilComp';
import LockButton from '@/components/perfil/BotaoAnimate';
import DadosButton from '@/components/perfil/BotaoAnimateDados';

export default function Perfil() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);
  
  console.log(authContext.authData?.token);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <UserProfile />
        <LockButton />
        <DadosButton />
      </View>
      <View style={{position: 'absolute', bottom:0}}><BarInferior /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

