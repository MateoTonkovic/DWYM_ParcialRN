import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";
import Checkbox from "../components/ui/Checkbox";

export default function AddDestination({}) {
  const navigate = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isFavorite, setIsFavorite] = useState("");

  const addDestination = async () => {
    try {
      await axios.post("http://172.20.10.4:8000/destinations", {
        name,
        description,
        difficulty,
        isFavorite,
      });
      navigate.goBack();
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        placeholder="Nombre del destinatino"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Dificultad</Text>
      <Checkbox
        value={difficulty}
        setValue={setDifficulty}
        inputValue="hard"
        label="Dificil"
      />
      <Checkbox
        value={difficulty}
        setValue={setDifficulty}
        inputValue="medium"
        label="Medio"
      />
      <Checkbox
        value={difficulty}
        setValue={setDifficulty}
        inputValue="easy"
        label="Fácil"
      />

      <Text style={styles.label}></Text>
      <Checkbox
        value={isFavorite}
        setValue={setIsFavorite}
        inputValue={true}
        label="Es favorito"
      />

      <Button title="Agregar destinatino" onPress={addDestination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#333" },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 5,
    fontSize: 14,
  },
});
