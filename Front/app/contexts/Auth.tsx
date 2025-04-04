import { authServise } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { RankingContext } from "./RankingContext";
import axios from 'axios';


 export interface AuthData {
    id: number;
    token:string;
    email:string;
    name: string;
    numero: string;
    cpf: string;
    dataNascimento: string;
    departamento: string;
    role: string;
    funcao: string;
    id_empresa: number;
    foto: string;
}

interface AuthContextData {
    authData?: AuthData;
    login: (email:string, senha:string) => Promise<AuthData | undefined>;
    logout: () => Promise<void>
    updateUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
    const { resetFilters } = useContext(RankingContext);

    useEffect(() => {
        loadFromSWtorage();
    }, [])

    async function loadFromSWtorage() {
        const auth = await AsyncStorage.getItem('@AuthData');
        if(auth) {
            setAuthData(JSON.parse(auth) as AuthData);
        }
    }

    async function login(email:string, senha: string): Promise<AuthData | undefined> {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password: senha,
            });


            const auth = response.data; // Obtenha os dados de autenticação da resposta
            setAuthData(auth); // Armazene os dados no contexto
            await AsyncStorage.setItem('@AuthData', JSON.stringify(auth)); // Armazene os dados no AsyncStorage
            return auth
            resetFilters(); // Resete os filtros (se aplicável)
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao realizar login');
        }

    }

    async function logout(): Promise<void> {
        setAuthData(undefined);
        AsyncStorage.removeItem("@AuthData")
        AsyncStorage.removeItem("Period-Ranking");
        AsyncStorage.removeItem("Departament-Ranking");
        resetFilters();
        return;
    }

    async function updateUserData(): Promise<void> {
        try {
            if (!authData?.id) {
                throw new Error('Usuário não autenticado');
            }

            // Faz uma requisição para obter os dados atualizados do usuário
            const response = await axios.get(`http://localhost:3000/api/user/${authData.id}`);

            // Atualiza os dados no estado e no AsyncStorage
            const updatedUserData = {
                ...authData,
                ...response.data,
                token: authData.token // Mantém o token original
            };

            setAuthData(updatedUserData);
            await AsyncStorage.setItem('@AuthData', JSON.stringify(updatedUserData));

        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível atualizar os dados do usuário');
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{authData, login, logout, updateUserData}}>
            {children}
        </AuthContext.Provider>
    )
}