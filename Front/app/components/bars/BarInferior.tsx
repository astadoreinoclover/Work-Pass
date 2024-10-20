import { useNavigation } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Pressable, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';
import { useNavigationState } from '@react-navigation/native';

const BarInferior = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const routeName = useNavigationState((state) => {
        const route = state.routes[state.index]; 
        return route.name;
    });

    const tamanho = width >= 768 ? 32:22;

    return (
        <View style={[styles.top, {width: width,height: width >= 768 ? 80:50}]}>
            <View style={{width: '100%',display: 'flex',alignItems: 'center', justifyContent:'space-around', flexDirection:'row', height: '100%'}}>
                <Pressable onPress={() => {navigation.navigate('Funcionarios')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={tamanho} height={tamanho} color={routeName === 'Funcionarios' ? '#999' : '#fff'} fill="none">
                        <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M19.5 4V9M22 6.5L17 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Pressable>
                <Pressable style={{cursor:'pointer'}} onPress={()=> navigation.navigate('Relatorios')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={tamanho} height={tamanho} color={routeName === 'Relatorios' ? '#999' : '#fff'} fill="none" transform="rotate(270)">
                        <path d="M20.4999 14V10C20.4999 6.22876 20.4999 4.34315 19.3284 3.17157C18.1568 2 16.2712 2 12.4999 2H11.5C7.72883 2 5.84323 2 4.67166 3.17156C3.50008 4.34312 3.50007 6.22872 3.50004 9.99993L3.5 13.9999C3.49997 17.7712 3.49995 19.6568 4.67153 20.8284C5.8431 22 7.72873 22 11.5 22H12.4999C16.2712 22 18.1568 22 19.3284 20.8284C20.4999 19.6569 20.4999 17.7712 20.4999 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 7H16M8 12H16M8 17L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Pressable>
                <Pressable style={{cursor:'pointer'}} onPress={()=> navigation.navigate('Tasks')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={tamanho} height={tamanho} color={routeName === 'Tasks' ? '#999' : '#fff'} fill="none">
                        <path d="M19.5 13V9.36842C19.5 5.89491 19.5 4.15816 18.4749 3.07908C17.4497 2 15.7998 2 12.5 2H9.5C6.20017 2 4.55025 2 3.52513 3.07908C2.5 4.15816 2.5 5.89491 2.5 9.36842V14.6316C2.5 18.1051 2.5 19.8418 3.52513 20.9209C4.55025 22 6.20017 22 9.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.5 20C13.5 20 14.5 20 15.5 22C15.5 22 18.6765 17 21.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 2L7.0822 2.4932C7.28174 3.69044 7.38151 4.28906 7.80113 4.64453C8.22075 5 8.82762 5 10.0414 5H11.9586C13.1724 5 13.7793 5 14.1989 4.64453C14.6185 4.28906 14.7183 3.69044 14.9178 2.4932L15 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M7 16H11M7 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </Pressable>
                <Pressable style={{cursor:'pointer'}} onPress={()=> navigation.navigate('Rankings')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={tamanho} height={tamanho} color={routeName === 'Rankings' ? '#999' : '#fff'} fill="none">
                        <path d="M3.5 18C3.5 16.5858 3.5 15.8787 3.93934 15.4393C4.37868 15 5.08579 15 6.5 15H7C7.94281 15 8.41421 15 8.70711 15.2929C9 15.5858 9 16.0572 9 17V22H3.5V18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 19C15 18.0572 15 17.5858 15.2929 17.2929C15.5858 17 16.0572 17 17 17H17.5C18.9142 17 19.6213 17 20.0607 17.4393C20.5 17.8787 20.5 18.5858 20.5 20V22H15V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 16C9 14.5858 9 13.8787 9.43934 13.4393C9.87868 13 10.5858 13 12 13C13.4142 13 14.1213 13 14.5607 13.4393C15 13.8787 15 14.5858 15 16V22H9V16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.6911 2.57767L13.395 3.99715C13.491 4.19475 13.7469 4.38428 13.9629 4.42057L15.2388 4.6343C16.0547 4.77141 16.2467 5.36824 15.6587 5.957L14.6668 6.95709C14.4989 7.12646 14.4069 7.4531 14.4589 7.68699L14.7428 8.925C14.9668 9.90492 14.4509 10.284 13.591 9.77185L12.3951 9.05808C12.1791 8.92903 11.8232 8.92903 11.6032 9.05808L10.4073 9.77185C9.5514 10.284 9.03146 9.90089 9.25543 8.925L9.5394 7.68699C9.5914 7.4531 9.49941 7.12646 9.33143 6.95709L8.33954 5.957C7.7556 5.36824 7.94358 4.77141 8.75949 4.6343L10.0353 4.42057C10.2473 4.38428 10.5033 4.19475 10.5993 3.99715L11.3032 2.57767C11.6872 1.80744 12.3111 1.80744 12.6911 2.57767Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Pressable>
                <Pressable style={{cursor:'pointer'}} onPress={()=> navigation.navigate('Perfil')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={tamanho} height={tamanho} color={routeName === 'Perfil' ? '#999' : '#fff'} fill="none">
                        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: "#2C3E50",
    }
});

export default BarInferior
