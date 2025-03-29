import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

interface ItemComponentProps {
    title: string;
    content: string | number | null;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ title, content }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.item, { width: width >768?width*0.3:width*0.8}]}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemContent}>
        {content !== null ? content : 'Não há registro'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 8,
  },
  itemContent: {
    fontSize: 14,
    color: '#555',
  }
});

export default ItemComponent;

