import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Perfil from "../(screens)/Perfil";
import Tasks from "../(screens)/Tasks";
import Rankings from "../(screens)/Rankings";
import Relatorios from "../(screens)/Relatorios";
import Funcionarios from "../(screens)/Funcionarios";
import TrocaDeSenha from "../(screens)/TrocaDeSenha";
import EditarDados from "../(screens)/EditarDados";
import RemoverFuncionario from "../(screens)/RemoverFuncionario";
import AddFuncionario from "../(screens)/AdicionarFuncionario";
import Funcionario from "../(screens)/Funcionario";
import AdicionarTask from "../(screens)/AdicionarTask";

const Stack = createNativeStackNavigator();

export function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={Perfil} options={{headerShown: false}}/>
            <Stack.Screen name="Tasks" component={Tasks} options={{headerShown: false}}/>
            <Stack.Screen name="Rankings" component={Rankings} options={{headerShown: false}}/>
            <Stack.Screen name="Relatorios" component={Relatorios} options={{headerShown: false}}/>
            <Stack.Screen name="Funcionarios" component={Funcionarios} options={{headerShown: false}}/>
            <Stack.Screen name="TrocaDeSenha" component={TrocaDeSenha} options={{headerShown: false}}/>
            <Stack.Screen name="EditarDados" component={EditarDados} options={{headerShown: false}}/>
            <Stack.Screen name="RemoverFuncionario" component={RemoverFuncionario} options={{headerShown: false}}/>
            <Stack.Screen name="AddFuncionario" component={AddFuncionario} options={{headerShown: false}}/>
            <Stack.Screen name="Funcionario" component={Funcionario} options={{headerShown: false}}/>
            <Stack.Screen name="AdicionarTask" component={AdicionarTask} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}