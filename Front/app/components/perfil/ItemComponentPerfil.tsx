import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ItemComponentProps {
    title: string;
    content: string | number | null;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ title, content }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text>{content  !== null ? content : 'Não à registro'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        marginTop: 20,
        height: 80,
        borderRadius: 20,
        padding:5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      },
      itemTitle: {
        fontSize: 15,
        fontWeight:600,
        borderBottomWidth: 2,
        borderBottomColor: '#555',
        paddingBottom: 5
      }
});

export default ItemComponent;
