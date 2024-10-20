import React, { useContext, useEffect, useState } from 'react';
import { Text,View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ItemComponent from './ItemComponentPerfil';

const UserProfile: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const heigthCards = width >= 768 ?height *0.75 : 300;
    const widthCards = width >= 768?width*0.2:width*0.8;
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null)
    const [dataNas, setDataNas] = useState<string | null>(null)
    const [cpf, setCpf] = useState<string | null>(null)
    const [numero, setNumero] = useState<string | null>(null)
    const [departament, setDepartament] = useState<string | null>(null)
    const [funcao, setFuncao] = useState<string | null>(null)
    const [empresa, setEmpresa] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        setEmail(authContext.authData?.email || null);
        setName(authContext.authData?.name || null);
        setDataNas(authContext.authData?.dataNascimento || null)
        setCpf(authContext.authData?.cpf || null)
        setNumero(authContext.authData?.numero || null)
        setDepartament(authContext.authData?.departamento || null)
        setFuncao(authContext.authData?.funcao || null)
        setRole(authContext.authData?.role || null)
    }, [authContext.authData]);

    return (
        <ScrollView>
            <View style={[styles.container, {height: height *0.75, width: width*0.95, flexDirection: width >= 768 ? 'row':'column',}]}>
                <View style={{height: width >=768?height *0.65:150, width: width >= 768?width*0.15:width*0.95, display: 'flex', alignItems:'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" color={'#2C3E50'} width={125} height={125} viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </View>
                <View style={[styles.areaItem, {height: heigthCards, width: widthCards}]}>
                    <ItemComponent title="Nome Completo" content={name} />
                    <ItemComponent title="CPF" content={cpf} />
                    <ItemComponent title="Email" content={email} />
                    <ItemComponent title="Número" content={numero} />
                </View>
                <View style={[styles.areaItem, {height: heigthCards, width: widthCards}]}>
                    <ItemComponent title="Data de Nascimento" content={dataNas} />
                    <ItemComponent title="Departamento" content={departament} />
                    <ItemComponent title="Função" content={funcao} />
                </View>
                <View style={[styles.areaItem, {height: heigthCards, width: widthCards}]}>
                    <ItemComponent title="Nivel de Acesso" content={role} />
                    <ItemComponent title="------------" content={'---------'} />
                    <ItemComponent title="------------" content={'---------'} />
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  areaItem: {
    paddingTop:20, 
    margin:'auto'
  },
});

export default UserProfile;
