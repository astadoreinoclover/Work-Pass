import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

type Funcionario = {
    xp: number;
    xpNecessarioParaSubirNivel: number;
};

type NivelHabilidadeProps = {
    funcionario: Funcionario;
};

const NivelUser: React.FC<NivelHabilidadeProps> = ({ funcionario }) => {
  const { width } = useWindowDimensions();

  return (
      <View style={[styles.progressBarContainer, { width: width >= 768 ? width * 0.6 : width * 0.7 }]}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(funcionario.xp / funcionario.xpNecessarioParaSubirNivel) * 100}%` }]} />
        </View>
        <Text style={{ marginLeft: 20 }}>{funcionario.xp}/{funcionario.xpNecessarioParaSubirNivel}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 'auto'
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