import React, { useState } from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { WorkoutPlan } from "../api/types";

const dummyPlans: WorkoutPlan[] = [
  { id: 1, title: "План 1", ownerId: 1 },
  { id: 2, title: "План 2", ownerId: 1 },
];

export default function WorkoutScreen() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(dummyPlans);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Тренировочные планы</Text>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
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
  itemText: { fontSize: 16 },
});
