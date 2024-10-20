import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ItemPerfilComponent from './ItemComponenteFuncionario';
import { useRoute } from '@react-navigation/native';
import { getFuncionario } from '@/services/FuncionarioService';
import HabilidadeCard from './HabilidadeCard';
import Nivel from './Nivel';
import { RouteParams, Funcionario } from './Types';

const FuncionarioProfile: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const heigthCards = width >= 768 ? height * 0.4 : 210;
    const widthCards = width >= 768 ? width * 0.25 : width * 0.8;
    const authContext = useContext(AuthContext);
    const [funcionario, setFuncionario] = useState<Funcionario | null>(null);

    const route = useRoute();
    const { itemName, itemDepartament, itemId } = route.params as RouteParams;
    const dataFormatada = funcionario?.dataNasc
    ? new Date(funcionario.dataNasc).toLocaleDateString('pt-BR')
    : 'Data não disponível';

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const data = await getFuncionario(itemDepartament, itemName, itemId);
                console.log('Dados do funcionário recebidos:', data);
                setFuncionario(data.length > 0 ? data[0] : null);
            } catch (error) {
                console.error('Erro ao buscar funcionário:', error);
            }
        };

        fetchFuncionario();
    }, [itemDepartament, itemName, itemId]);

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
                <Nivel funcionario={funcionario}/>
                <View style={[styles.headerContainer, { flexDirection: width >=768?'row': 'column', width:width*0.9, justifyContent:width>=768?'space-around':'center', alignItems:width>=768?'baseline':'center'}]}>
                    <View style={{flexDirection: width >=768?'row': 'column'}}>
                       <Text style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: 20, marginRight:10 }}>Habilidades:</Text>
                        {funcionario.habilidades?.map((habilidade, index) => (
                            <HabilidadeCard 
                                key={index} 
                                title={habilidade.nome} 
                                content={habilidade.nivel} 
                            />
                        ))} 
                    </View>
                    <Text style={{fontWeight: 'bold', color: '#2C3E50', fontSize:20}}>Nivel: {funcionario.nivel}</Text>
                </View>
                <View style={[styles.container, { flexDirection: width >= 768 ? 'row' : 'column' }]}>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Nome Completo" content={funcionario.name} />
                        <ItemPerfilComponent title="Data de Nascimento" content={dataFormatada} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Email" content={funcionario.email} />
                        <ItemPerfilComponent title="Número" content={funcionario.numero} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Departamento" content={funcionario.department} />
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