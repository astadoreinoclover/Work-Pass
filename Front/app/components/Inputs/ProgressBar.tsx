import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;

    return (
        <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0df',
        borderRadius: 5,
        marginVertical: 20,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#8A79AF',
    },
});

export default ProgressBar;