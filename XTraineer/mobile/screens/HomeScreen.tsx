import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";

export default function HomeScreen({ navigation }: any) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Главная панель</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Button
          title="Выбор спорта"
          onPress={() => navigation.navigate("SportSelectionScreen")}
        />
        <Button
          title="История тренировок"
          onPress={() => navigation.navigate("HistoryScreen")}
        />
        <Button
          title="Прогресс"
          onPress={() => navigation.navigate("ProgressScreen")}
        />
        <Button
          title="Рекомендации"
          onPress={() => navigation.navigate("RecommendationScreen")}
        />
        <Button
          title="Профиль"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
        <Button
          title="Тренировка"
          onPress={() => navigation.navigate("WorkoutScreen")}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  scroll: { paddingVertical: 10 },
});
