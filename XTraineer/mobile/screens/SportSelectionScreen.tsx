import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";

const sports = ["Зал", "ММА", "Лёгкая атлетика", "Йога"];

export default function SportSelectionScreen({ navigation }: any) {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Выберите вид спорта</Text>
      <FlatList
        data={sports}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, selectedSport === item && styles.selectedItem]}
            onPress={() => setSelectedSport(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
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
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedItem: { borderColor: "#1E90FF", borderWidth: 2 },
  itemText: { fontSize: 16 },
});
