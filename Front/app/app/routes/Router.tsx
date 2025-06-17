import React, { useCallback, useContext } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { AuthContext } from "@/contexts/Auth";
import axios from "axios";

export function Router() {
    const {authData} = useContext(AuthContext);
    const authContext = useContext(AuthContext);

    return(
        <NavigationContainer independent={true}>
            {authData?.token ? <AppStack /> : <AuthStack/>}
        </NavigationContainer>
    )
}
