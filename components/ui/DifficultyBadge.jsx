import React from "react";
import { View, StyleSheet, Text } from "react-native";

function DifficultyBadge({ difficulty }) {
  const badgeText =
    difficulty === "hard"
      ? "Dificil"
      : difficulty === "medium"
      ? "Media"
      : "Fácil";

  const badgeStyle =
    difficulty === "hard"
      ? styles.hard
      : difficulty === "medium"
      ? styles.medium
      : styles.easy;

  return (
    <View style={styles.badge}>
      <Text style={badgeStyle}>{badgeText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  easy: {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  medium: {
    backgroundColor: "yellow",
    color: "black",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  hard: {
    backgroundColor: "purple",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
  },
});

export default DifficultyBadge;
