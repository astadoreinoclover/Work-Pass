import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text,View, StyleSheet, useWindowDimensions, ScrollView, Image } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ItemComponent from './ItemComponentPerfil';
import axios from 'axios';
import NivelUser from './NivelUser';
import Habilidade from './Habilidade';
import { useFocusEffect } from 'expo-router';

type Gaming = {
    xp: number;
    xpNecessarioParaSubirNivel: number;
    nivel: number
}

export type Habilidade = {
    habilidade: {
        nome: string;
    }
    nivel: number;
};

export type Funcionario = {
    habilidades?: Habilidade[];
    id: number;
    name: string;
    departamento: string;
    funcao: string;
    numero: string;
    dataNascimento: string;
    email: string;
    gaming?:Gaming[];
    foto: string;
};

const UserProfile: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null)
    const [dataNas, setDataNas] = useState<string | null>(null)
    const [cpf, setCpf] = useState<string | null>(null)
    const [numero, setNumero] = useState<string | null>(null)
    const [departament, setDepartament] = useState<string | null>(null)
    const [funcao, setFuncao] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [gaming, setGaming] = useState<Gaming | null>(null);
    const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
    const [foto, setFoto] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            setEmail(authContext.authData?.email || null);
            setName(authContext.authData?.name || null);
            setDataNas(authContext.authData?.dataNascimento || null)
            setCpf(authContext.authData?.cpf || null)
            setNumero(authContext.authData?.numero || null)
            setDepartament(authContext.authData?.departamento || null)
            setFuncao(authContext.authData?.funcao || null)
            setRole(authContext.authData?.role || null)
            setFoto(authContext.authData?.foto || null)

            const fetchFuncionario = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/user/${authContext.authData?.id}`);
                    const data = response.data;
                    console.log('Dados do funcionário recebidos:', data);
                    setFuncionario(data);
                    const responseGame = await axios.get(`http://localhost:3000/api/gaming/${authContext.authData?.id}`);
                    const dataGame = responseGame.data;
                    console.log('Dados do funcionário recebidos:', dataGame);
                    setGaming(dataGame[0]);
                } catch (error) {
                    console.error('Erro ao buscar funcionário:', error);
                }
            };
            fetchFuncionario();
        }, [authContext.authData])
    )
    console.log(foto)

    return (
        <ScrollView>
            <View style={[styles.container, {height: height *0.75, width: width*0.95, flexDirection: 'column',}]}>
                <View style={[{ width: width*0.95, display: 'flex', alignItems:'center', flexDirection: width >768?'row':'column'}]}>
                    {foto ? (
                        <Image 
                            source={{ uri: `http://localhost:3000/Middlewares/uploads/tasks${foto}` }} 
                            style={{ width: 125, height: 125, borderRadius: 62.5 }} 
                        />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" color={'#2C3E50'} width={125} height={125} viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                     )}
                    {role === 'USER' && gaming && <NivelUser funcionario={gaming} />}
                </View>
                <View style={[styles.areaItem, { flexDirection: width>768?'row':'column', margin: width>768?0:'auto'}]}>
                    <ItemComponent title="Nome Completo" content={name} />
                    <ItemComponent title="CPF" content={cpf} />
                    <ItemComponent title="Data de Nascimento" content={dataNas} />
                </View>
                <View style={[styles.areaItem, {  flexDirection: width>768?'row':'column', margin: width>768?0:'auto'}]}>
                    <ItemComponent title="Email" content={email} />
                    <ItemComponent title="Número" content={numero} />
                    <ItemComponent title="Departamento" content={departament} />
                </View>
                <View style={[styles.areaItem, { justifyContent: 'flex-start',flexDirection: width>768?'row':'column', margin: width>768?0:'auto'}]}>
                    <ItemComponent title="Função" content={funcao} />
                    {role === 'USER' && (
                        <View style={{ flexDirection: width >= 768 ? 'row' : 'column' }}>
                            <Text style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: 20, marginHorizontal: 10, marginTop:10 }}>
                                Habilidades:
                            </Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                                {funcionario?.habilidades?.map((habilidade, index) => (
                                    <Habilidade key={index} title={habilidade.habilidade.nome} content={habilidade.nivel} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
  capa: {
    backgroundColor: 'rgba(44, 62, 80, 0.5)',
    borderRadius: 25,
    paddingVertical: 20
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  areaItem: {
    justifyContent: 'space-between',
    display: 'flex',
  },
});

export default UserProfile;
