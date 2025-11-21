import React, { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { historyApi } from "../api/history";

export default function HistoryScreen() {
  const { token } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    historyApi
      .getAll(token)
      .then((data) => setHistory(data))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>История тренировок</Text>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card>
              <Text>Дата: {new Date(item.startedAt).toLocaleDateString()}</Text>
              <Text>План: {item.plan?.name || "Без плана"}</Text>
              <Text>Заметки: {item.notes || "Нет"}</Text>
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
