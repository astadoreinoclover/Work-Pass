import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

const LockButton: React.FC = () => {
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
            onPress={() => {navigation.navigate('TrocaDeSenha')}}
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
                            d="M12 2a4 4 0 00-4 4v4H7a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V11a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 4a2 2 0 014 0v4h-4V6zm5 10a1 1 0 11-2 0 1 1 0 012 0zm-3 1v2h2v-2h-2z"
                            fill="#fff"
                        />
                    </Svg>
                </View>
                <Animated.Text style={[styles.buttonText, { fontSize: isLargeScreen ? 16 : 10, opacity: isLargeScreen ? animatedOpacity : 1 }]}>
                    Troca de senha
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        position: 'absolute',
        bottom: 5,
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

export default LockButton;
