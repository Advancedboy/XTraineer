import React, { useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { HistoryItem } from "../api/types";

const dummyHistory: HistoryItem[] = [
  { id: 1, workoutId: 1, date: "2025-11-20", notes: "Лёгкая тренировка" },
  { id: 2, workoutId: 2, date: "2025-11-21", notes: "Силовая тренировка" },
];

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>(dummyHistory);

  return (
    <ScreenContainer>
      <Text style={styles.title}>История тренировок</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.date}: {item.notes}
          </Text>
        )}
      />
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
