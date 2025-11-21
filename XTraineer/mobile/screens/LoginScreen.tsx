import React, { useState } from "react";
import { TextInput, Text, StyleSheet, Alert } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Ошибка", "Введите email и пароль");
      return;
    }

    // Здесь нужно сделать вызов backend через fetch/axios
    login("dummy-token", { id: 1, email, name: "Пользователь" });

    // Переход на Home с возможностью вернуться назад
    navigation.navigate("Home");
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Войти</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Войти" onPress={handleLogin} />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate("Register")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
