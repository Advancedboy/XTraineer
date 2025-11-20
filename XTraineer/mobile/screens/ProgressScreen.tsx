import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";

export default function ProgressScreen() {
  const [progress, setProgress] = useState([
    { week: 1, workouts: 3 },
    { week: 2, workouts: 4 },
  ]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Прогресс</Text>
      {progress.map((p) => (
        <Text key={p.week} style={styles.item}>
          Неделя {p.week}: {p.workouts} тренировок
        </Text>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
