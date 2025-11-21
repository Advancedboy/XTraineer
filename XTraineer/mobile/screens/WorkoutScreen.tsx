import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import WorkoutForm from "../components/WorkoutForm";
import { workoutApi } from "../api/workout";

export default function WorkoutScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  const fetchWorkouts = async () => {
    const data = await workoutApi.getWorkouts();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <ScrollView>
      <WorkoutForm onCreated={fetchWorkouts} />
      <Text style={{ fontSize: 20, marginTop: 16, marginLeft: 16 }}>
        История тренировок:
      </Text>
      {workouts.map((w) => (
        <View
          key={w.id}
          style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}
        >
          <Text>Тренировка #{w.id}</Text>
          <Text>Заметки: {w.notes}</Text>
          <Text>Результаты: {w.results.length} упражнений</Text>
        </View>
      ))}
    </ScrollView>
  );
}
