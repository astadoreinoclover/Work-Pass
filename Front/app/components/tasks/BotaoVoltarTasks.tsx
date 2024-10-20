import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

const BackToTaskButton: React.FC = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const animatedWidth = useRef(new Animated.Value(isLargeScreen ? 50 : 100)).current;
    const [isHovered, setIsHovered] = useState(false);
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    const animateButton = (expand: boolean) => {
        if (expand) {
            Animated.timing(animatedWidth, {
                toValue: isLargeScreen ? 210 : 100,
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
            onPress={() => { navigation.navigate('Tasks') }} // Navega para o perfil
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
            style={[styles.pressableContainer, {top: width >=768 ? 80:60}]}
        >
            <Animated.View style={[styles.button, { width: isLargeScreen ? animatedWidth : 160 }]}>
                <View style={styles.iconContainer}>
                    <Svg width={isLargeScreen ? 24 : 16} height={isLargeScreen ? 24 : 16} viewBox="0 0 24 24" fill="none">
                        <Path 
                            d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" 
                            fill="#fff"
                        />
                    </Svg>
                </View>
                <Animated.Text style={[styles.buttonText, { fontSize: isLargeScreen ? 16 : 10, opacity: isLargeScreen ? animatedOpacity : 1 }]}>
                    Voltar para Tasks
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        position: 'absolute',
        left: 20,
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

export default BackToTaskButton;
