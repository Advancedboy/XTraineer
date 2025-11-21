import React, { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import WorkoutForm from "../components/WorkoutForm";
import { useAuth } from "../context/AuthContext";
import { workoutApi } from "../api/workout";

export default function WorkoutScreen() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    if (!token) return;
    setLoading(true);
    try {
      await workoutApi.create(token, formData);
      Alert.alert("Успешно", "Тренировка сохранена");
    } catch (err: any) {
      console.error(err);
      Alert.alert(
        "Ошибка",
        err.response?.data?.message || "Не удалось сохранить тренировку"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Новая тренировка</Text>
      <WorkoutForm onSubmit={handleSubmit} loading={loading} />
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
