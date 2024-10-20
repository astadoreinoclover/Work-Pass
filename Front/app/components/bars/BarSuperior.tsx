import React, { useContext } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { AuthContext } from '@/contexts/Auth';

const BarSuperior = () => {
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);

    function logout() {
        authContext.logout()
    }
    return (
        <View style={[styles.top, {width: width,height: width >= 768 ? 70:50, display: 'flex', justifyContent:'center'}]}>
            <SimpleLineIcons name="logout" size={24} color="red" onPress={logout} style={{ right: 25, position:'absolute'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: "#2C3E50",
    }
});

export default BarSuperior