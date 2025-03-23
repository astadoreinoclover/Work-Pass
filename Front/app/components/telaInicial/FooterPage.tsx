import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FooterPage = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width: width*0.95}]}>
      <Text style={styles.title}>Work Pass</Text>
      <Text style={styles.subtitle}>
        Transformando o ambiente de trabalho com inovação e motivação.
      </Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="linkedin" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="instagram" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.contact}>📩 contato@workpass.com</Text>
      <Text style={styles.contact}>📞 +55 (11) 99999-9999</Text>

      <Text style={styles.copyright}>© 2024 Work Pass. Todos os direitos reservados.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c3e50",
    padding: 20,
    alignItems: "center",
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginBottom: 30
  },
  title: {
    color: "#ecf0f1",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#bdc3c7",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  contact: {
    color: "#ecf0f1",
    fontSize: 14,
    marginTop: 5,
  },
  copyright: {
    color: "#bdc3c7",
    fontSize: 12,
    marginTop: 15,
  },
});

export default FooterPage;
