import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native';

const DevPage = () => {
  const { width } = useWindowDimensions();

  const developers = [
    { id: '1', name: 'Renato Cardozo', role: 'Full stack Developer', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTii4p1w-Vym4oKMHmvXxQt43B35wyI8JAfQ&s.com/photo1.jpg' },
    { id: '2', name: 'Vinicius Lemos', role: 'Full stack Developer', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTii4p1w-Vym4oKMHmvXxQt43B35wyI8JAfQ&s/photo2.jpg' },
  ];

  return (
    <View style={[styles.container, { width: width * 0.95 }]}>
      <Text style={styles.title}>Dev's</Text>
      <FlatList
        data={developers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.devContainer}>
            <Image source={{ uri: item.photo }} style={[styles.devPhoto, {width: width <1024? 50:150, height: width<1024?50:150}]} />
            <View style={styles.devInfo}>
              <Text style={styles.devName}>{item.name}</Text>
              <Text style={styles.devRole}>{item.role}</Text>
            </View>
          </View>
        )}
        horizontal 
        contentContainerStyle={styles.flatListContent} 
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    marginBottom: 30,
    backgroundColor: '#fff',
    marginHorizontal: 'auto',
    borderRadius: 10,
    padding: 40,
  },
  title: {
    marginHorizontal: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 35,
  },
  flatListContent: {
    marginHorizontal: 'auto'
  },
  devContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 50
  },
  devPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  devInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  devName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  devRole: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default DevPage;
