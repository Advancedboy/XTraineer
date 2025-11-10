import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 XTraineer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  text: {
    color: "#888",
    fontSize: 14,
  },
});
