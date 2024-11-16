import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../(screens)/Login";
import PaginaInicial from "../(screens)/PaginaInicial";
import Register from "../(screens)/Register";

const Stack = createNativeStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={PaginaInicial} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}