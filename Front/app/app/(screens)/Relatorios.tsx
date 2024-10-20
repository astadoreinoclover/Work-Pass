import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions,Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import BarInferior from '@/components/bars/BarInferior';
import RelatorioFilter from '@/components/relatorios/RelatorioFilter';
import RelatorioGrafico from '@/components/relatorios/RelatorioGrafico';

export default function Rankings() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);
  
  
  console.log(authContext.authData?.token);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      <View style={{display: 'flex',flexDirection: width >=768 ? 'row' : 'column', height: width >=768 ? height*0.6: height*0.8}}>
        <View style={{width: width*0.5, right:0, position: 'relative', alignItems: 'center'}}>
          <Text style={[styles.title,{fontSize: width>=768 ?25:18}]}>Relatorio</Text>
          <RelatorioGrafico />
        </View>
        <View style={{width: width*0.5, left:0, position: 'relative', alignItems: 'center'}}><RelatorioFilter /></View>
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
    color: '#2c3e50',
    fontWeight: 'bold'
  },
});