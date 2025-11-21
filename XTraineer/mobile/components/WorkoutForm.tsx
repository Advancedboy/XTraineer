import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Button from "./Button";
import { workoutApi } from "../api/workout";
import { useAuth } from "../context/AuthContext";

export default function WorkoutForm({ onCreated }: { onCreated?: () => void }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState([
    { exerciseId: 1, setsDone: 0, repsPerSet: 0 },
  ]);

  const handleAddResult = () => {
    setResults([...results, { exerciseId: 1, setsDone: 0, repsPerSet: 0 }]);
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    const newResults = [...results];
    newResults[index][field as keyof (typeof newResults)[index]] =
      Number(value);
    setResults(newResults);
  };

  const handleSubmit = async () => {
    try {
      await workoutApi.createWorkout({
        userId: user.id,
        startedAt: new Date().toISOString(),
        notes,
        results,
      });
      Alert.alert("Успешно", "Тренировка сохранена");
      setNotes("");
      setResults([{ exerciseId: 1, setsDone: 0, repsPerSet: 0 }]);
      onCreated?.();
    } catch (err: any) {
      console.error(err);
      Alert.alert(
        "Ошибка",
        err.response?.data?.message || "Не удалось сохранить тренировку"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Новая тренировка</Text>
      {results.map((r, i) => (
        <View key={i} style={styles.resultBlock}>
          <Text>Упражнение ID:</Text>
          <TextInput
            style={styles.input}
            value={String(r.exerciseId)}
            onChangeText={(v) => handleResultChange(i, "exerciseId", v)}
            keyboardType="numeric"
          />
          <Text>Сеты:</Text>
          <TextInput
            style={styles.input}
            value={String(r.setsDone)}
            onChangeText={(v) => handleResultChange(i, "setsDone", v)}
            keyboardType="numeric"
          />
          <Text>Повторения:</Text>
          <TextInput
            style={styles.input}
            value={String(r.repsPerSet)}
            onChangeText={(v) => handleResultChange(i, "repsPerSet", v)}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Button title="Добавить упражнение" onPress={handleAddResult} />
      <Text>Заметки:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button title="Сохранить тренировку" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  resultBlock: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});
