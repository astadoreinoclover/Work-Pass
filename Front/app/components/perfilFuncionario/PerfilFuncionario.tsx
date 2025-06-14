import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ItemPerfilComponent from './ItemComponenteFuncionario';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import HabilidadeCard from './HabilidadeCard';
import Nivel from './Nivel';
import { RouteParams, Funcionario, Gaming } from './Types';
import axios from 'axios';

const FuncionarioProfile: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const heigthCards = width >= 768 ? height * 0.4 : 210;
    const widthCards = width >= 768 ? width * 0.25 : width * 0.8;
    const authContext = useContext(AuthContext);
    const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
    const [gaming, setGaming] = useState<Gaming | null>(null);
    const [foto, setFoto]= useState<String| null>(null);

    const route = useRoute();
    const { itemName, itemDepartament, itemId } = route.params as RouteParams;

    useFocusEffect(
       useCallback(() => {
        const fetchFuncionario = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${itemId}`);
                const data = response.data;
                console.log('Dados do funcionário recebidos:', data);
                setFuncionario(data);
                setFoto(funcionario?.foto || null)
                const responseGame = await axios.get(`http://localhost:3000/api/gaming/${itemId}`);
                const dataGame = responseGame.data;
                console.log('Dados do funcionário recebidos:', dataGame);
                setGaming(dataGame[0]);
            } catch (error) {
                console.error('Erro ao buscar funcionário:', error);
            }
        };

        fetchFuncionario();
        }, [ itemId])
    );

    if (!funcionario) {
        return (
            <View style={styles.container}>
                <Text>Nenhum funcionário encontrado.</Text>
            </View>
        );
    }
    return (
        <ScrollView>
            <View style={{ height: height * 0.75, width: width * 0.95, paddingBottom: 20 }}>
                {gaming ? <Nivel funcionario={gaming} foto={funcionario?.foto} /> : null}
                <View style={[styles.headerContainer, { flexDirection: width >=768?'row': 'column', width:width*0.9, justifyContent:width>=768?'space-around':'center', alignItems:width>=768?'baseline':'center'}]}>
                    <View style={{flexDirection: width >=768?'row': 'column'}}>
                       <Text style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: 20, marginRight:10 }}>Habilidades:</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {funcionario.habilidades?.map((habilidade, index) => (
                                <HabilidadeCard 
                                    key={index} 
                                    title={habilidade.habilidade.nome} 
                                    content={habilidade.nivel} 
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={{fontWeight: 'bold', color: '#2C3E50', fontSize:20}}>Nivel: {gaming ? gaming.nivel : 'N/A'}</Text>
                </View>
                <View style={[styles.container, { flexDirection: width >= 768 ? 'row' : 'column' }]}>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Nome Completo" content={funcionario.name} />
                        <ItemPerfilComponent title="Data de Nascimento" content={funcionario.dataNascimento} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Email" content={funcionario.email} />
                        <ItemPerfilComponent title="Número" content={funcionario.numero} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Departamento" content={funcionario.departamento} />
                        <ItemPerfilComponent title="Função" content={funcionario.funcao} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    headerContainer: {
        display: 'flex',
        marginBottom: 20,
    },
    areaItem: {
        paddingTop: 20,
        margin: 'auto',
    },
});

export default FuncionarioProfile;