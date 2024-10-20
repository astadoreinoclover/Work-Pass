import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { AuthContext } from "@/contexts/Auth";

export function Router() {

    const {authData} = useContext(AuthContext);

    return(
        <NavigationContainer independent={true}>
            {authData?.token ? <AppStack /> : <AuthStack/>}
        </NavigationContainer>
    )
}
