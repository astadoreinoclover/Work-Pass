import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

type Funcionario = {
    xp: number;
    xpNecessarioParaSubirNivel: number;
    nivel: number
};

type NivelHabilidadeProps = {
    funcionario: Funcionario;
};

const NivelUser: React.FC<NivelHabilidadeProps> = ({ funcionario }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ marginHorizontal: 'auto' }}>
      <Text style={{fontWeight: 'bold', color: '#2C3E50', fontSize:20, marginLeft: 20}}>Nivel: {funcionario.nivel ? funcionario.nivel : '1'}</Text>
      <View style={[styles.progressBarContainer, { width: width >= 768 ? width * 0.6 : width * 0.7 }]}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(funcionario.xp / funcionario.xpNecessarioParaSubirNivel) * 100}%` }]} />
        </View>
        <Text style={{ marginLeft: 20 }}>{funcionario.xp}/{funcionario.xpNecessarioParaSubirNivel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    areaItem: {
        paddingTop: 20,
        margin: 'auto',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        width: '80%',
    },
    progress: {
        height: '100%',
        backgroundColor: '#8A79AF',
    },
});

export default NivelUser;