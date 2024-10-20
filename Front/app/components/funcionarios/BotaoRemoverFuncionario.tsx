import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

const BotaoRemoverFuncionario: React.FC = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const animatedWidth = useRef(new Animated.Value(isLargeScreen ? 50 : 130)).current;
    const [isHovered, setIsHovered] = useState(false);
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    const animateButton = (expand: boolean) => {
        if (expand) {
            Animated.timing(animatedWidth, {
                toValue: isLargeScreen ? 220 : 130,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(animatedOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        } else {
            Animated.timing(animatedOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(animatedWidth, {
                    toValue: isLargeScreen ? 50 : 130,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        }
    };

    return (
        <Pressable
            onPress={() => {navigation.navigate('RemoverFuncionario')}}
            onHoverIn={() => {
                if (isLargeScreen) {
                    setIsHovered(true);
                    animateButton(true);
                }
            }}
            onHoverOut={() => {
                if (isLargeScreen) {
                    setIsHovered(false);
                    animateButton(false);
                }
            }}
            style={[styles.pressableContainer]}
        >
            <Animated.View style={[styles.button, { width: isLargeScreen ? animatedWidth : 160 }]}>
                <View style={styles.iconContainer}>
                    <Svg width={isLargeScreen ? 24 : 16} height={isLargeScreen ? 24 : 16} viewBox="0 0 24 24" fill="none">
                        <Path 
                            d="M12 14c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6zm0-10a3 3 0 100 6 3 3 0 000-6zm6 5h-6v2h6v2h-8v-2h2v-2h-2V9h2v2h6v-2h-2v-2h2z"
                            fill={"#fff"}
                        />
                    </Svg>
                </View>
                <Animated.Text style={[styles.buttonText, { fontSize: isLargeScreen ? 16 : 10, opacity: isLargeScreen ? animatedOpacity : 1 }]}>
                    Remover Funcionario
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        // position: 'absolute',
        // bottom: 5,
        // left: 20,
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        height: 50,
        backgroundColor: '#2C3E50',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2C3E50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BotaoRemoverFuncionario;