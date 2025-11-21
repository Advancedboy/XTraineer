import React, { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { progressApi } from "../api/progress";

export default function ProgressScreen() {
  const { token } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    progressApi
      .getAll(token)
      .then((data) => setProgress(data))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Прогресс</Text>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <FlatList
          data={progress}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card>
              <Text>Упражнение: {item.exercise.name}</Text>
              <Text>Повторения: {item.reps || 0}</Text>
              <Text>Сеты: {item.sets || 0}</Text>
              <Text>Вес: {item.weight || 0} кг</Text>
              <Text>Время: {item.duration || 0} сек</Text>
              <Text>Заметки: {item.notesText || "Нет"}</Text>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
});
