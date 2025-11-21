import React, { useState } from "react";
import { TextInput, Text, StyleSheet, Alert } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }

    // TODO: вызвать backend через fetch/axios
    login("dummy-token", { id: 1, name, email });

    // Переход на Home с возможностью вернуться назад
    navigation.navigate("Home");
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Зарегистрироваться" onPress={handleRegister} />
      <Button
        title="Уже есть аккаунт?"
        onPress={() => navigation.navigate("Login")}
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
