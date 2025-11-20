import React from "react";
import { Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Добро пожаловать в XTraineer</Text>
      <Button title="Войти" onPress={() => navigation.navigate("Login")} />
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
    marginBottom: 40,
    textAlign: "center",
  },
});
