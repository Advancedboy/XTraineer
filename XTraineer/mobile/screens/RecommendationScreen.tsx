import React, { useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { Recommendation } from "../api/types";

const dummyRecommendations: Recommendation[] = [
  { id: 1, userId: 1, text: "Больше кардио" },
  { id: 2, userId: 1, text: "Увеличить вес на штанге" },
];

export default function RecommendationScreen() {
  const [recs, setRecs] = useState<Recommendation[]>(dummyRecommendations);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Рекомендации</Text>
      <FlatList
        data={recs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
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
