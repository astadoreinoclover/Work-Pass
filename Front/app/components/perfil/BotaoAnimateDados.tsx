import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

const DadosButton: React.FC = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const animatedWidth = useRef(new Animated.Value(isLargeScreen ? 50 : 100)).current;
    const [isHovered, setIsHovered] = useState(false);
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    const animateButton = (expand: boolean) => {
        if (expand) {
            Animated.timing(animatedWidth, {
                toValue: isLargeScreen ? 200 : 100,
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
                    toValue: isLargeScreen ? 50 : 100,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        }
    };

    return (
        <Pressable
        onPress={() => {navigation.navigate('EditarDados')}}
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
            style={styles.pressableContainer}
        >
            <Animated.View style={[styles.button, { width: isLargeScreen ? animatedWidth : 150 }]}>
                <View style={styles.iconContainer}>
                    <Svg width={isLargeScreen ? 24 : 16} height={isLargeScreen ? 24 : 16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M14.69 2.86l1.96 1.96-9.83 9.83L4.86 12.7l9.83-9.83zm3.54 3.54l-2.12-2.12L19.27 1a.996.996 0 011.41 0l2.12 2.12c.39.39.39 1.02 0 1.41l-2.12 2.12-2.45-2.45zM2 17.25V21h3.75L17.81 8.94l-3.75-3.75L2 17.25zm3.71 1.79L3 18.34v2.37h2.37l1.79-1.79H5.71z"
                            fill="#fff"
                        />
                        <Path
                            d="M3 20.5h2.37v-2.37l-1.96 1.96-1.41 1.41c-.39.39-.39 1.02 0 1.41l.29.29c.39.39 1.02.39 1.41 0L3 20.5z"
                            fill="#000" opacity="0.5"
                        />
                    </Svg>
                </View>
                <Animated.Text style={[styles.buttonText, { fontSize: isLargeScreen ? 16 : 10, opacity: isLargeScreen ? animatedOpacity : 1 }]}>
                    Editar dados
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        position: 'absolute', 
        bottom: 60,
        right: 20,
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

export default DadosButton;