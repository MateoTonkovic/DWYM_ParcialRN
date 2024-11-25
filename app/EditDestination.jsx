import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useGlobalSearchParams, useRouter } from "expo-router";
import Checkbox from "../components/ui/Checkbox";

export default function EditDestination() {
  const { destinationId } = useGlobalSearchParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isFavorite, setIsFavorite] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.4:8000/destinations/${destinationId}`
        );
        const destination = response.data;
        setName(destination.name || "");
        setDescription(destination.description || "");
        setDifficulty(destination.difficulty || "");
        setIsFavorite(destination.isFavorite || false);
      } catch (error) {
        console.error("Error fetching destination data:", error);
      }
    };

    if (destinationId) fetchDestination();
  }, [destinationId]);

  const editDestination = async () => {
    try {
      await axios.patch(
        `http://172.20.10.4:8000/destinations/${destinationId}`,
        {
          name,
          description,
          difficulty,
          isFavorite,
        }
      );
      router.back();
    } catch (error) {
      console.error("Error editing destination:", error);
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

      <Button title="Editar destinatino" onPress={editDestination} />
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
