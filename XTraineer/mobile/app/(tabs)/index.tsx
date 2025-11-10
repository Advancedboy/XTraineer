import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function WelcomeScreen() {
  const handleLogin = () => {
    alert("Переход к авторизации");
  };

  const handleRegister = () => {
    alert("Переход к регистрации");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.main_text}>
          Start building the body of your dreams
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main_text: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2196f3",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 64,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 6,
  },
});
