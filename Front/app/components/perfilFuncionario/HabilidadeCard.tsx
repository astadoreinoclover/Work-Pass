// HabilidadeCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HabilidadeCardProps = {
    title: string;
    content: number;
};

const HabilidadeCard: React.FC<HabilidadeCardProps> = ({ title, content }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}: {content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 5,
        backgroundColor: '#2c3e50',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default HabilidadeCard;
