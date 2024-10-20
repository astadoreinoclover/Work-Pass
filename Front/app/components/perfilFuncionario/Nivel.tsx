import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

type Funcionario = {
    xp: number;
    xpNescessario: number;
};
  
type NivelHabilidadeProps = {
    funcionario: Funcionario;
};

const Nivel: React.FC<NivelHabilidadeProps> = ({ funcionario }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.headerContainer, { flexDirection: width >= 768 ? 'row' : 'column', width: width * 0.9 }]}>
      <View style={styles.profileImageContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color={'#2C3E50'}
          width={125}
          height={125}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      </View>
      <View style={[styles.progressBarContainer, { width: width >= 768 ? width * 0.6 : width * 0.7 }]}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(funcionario.xp / funcionario.xpNescessario) * 100}%` }]} />
        </View>
        <Text style={{ marginLeft: 20 }}>{funcionario.xp}/{funcionario.xpNescessario}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        marginBottom: 20,
    },
    profileImageContainer: {
        marginHorizontal: 'auto'
    },
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

export default Nivel;
