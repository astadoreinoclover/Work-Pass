import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";

const images = [
  {
    id: 1,
    source: require("@/assets/images/login.jpg"),
    text: "A Work Pass transforma seu ambiente de trabalho com inovação e gamificação!",
  },
  {
    id: 2,
    source: require("@/assets/images/login.jpg"),
    text: "Motivação é a chave para o sucesso! Nossa plataforma premia o desempenho.",
  },
  {
    id: 3,
    source: require("@/assets/images/login.jpg"),
    text: "Gamificação para aumentar produtividade e engajamento da sua equipe.",
  },
];

const CarouselPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={[styles.container, {width: width*0.95}]}>
      <Text style={styles.title}>Funcionalidades</Text>
      <View 
        style={[styles.imageContainer, { width: width >=1024?width * 0.80:width*0.90, height:  width >=1024? width * 0.30:width*0.45 }]} 
        onMouseEnter={() => setShowText(true)} 
        onMouseLeave={() => setShowText(false)}
      >
        <Image source={images[currentIndex].source} style={[styles.image, {width:width >=1024?width * 0.80:width*0.90, height:  width >=1024? width * 0.30:width*0.45 }]} />
        {showText && (
          <View style={styles.textOverlay}>
            <Text style={styles.text}>{images[currentIndex].text}</Text>
          </View>
        )}
        <TouchableOpacity onPress={prevImage} style={[styles.controlButton, styles.leftButton]}>
          <Text style={styles.controlText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextImage} style={[styles.controlButton, styles.rightButton]}>
          <Text style={styles.controlText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10
  },
  title: {
    marginHorizontal: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 35,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    
  },
  textOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  controlButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -15 }],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  controlText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#bbb",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
});

export default CarouselPage;
