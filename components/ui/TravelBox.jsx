import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import DifficultyBadge from "./DifficultyBadge";
import FavoriteBadge from "./FavoriteBadge";
import DeleteButton from "./DeleteButton";

function TravelBox({ name, id, isFavorite, difficulty, setDestinations }) {
  const router = useRouter();

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={styles.header}>
          <Text style={styles.text}>{name}</Text>
          <DifficultyBadge difficulty={difficulty} />
        </View>

        <View style={styles.buttonBox}>
          <FavoriteBadge
            destinationId={id}
            initialValue={isFavorite}
            setDestinations={setDestinations}
          />
          <Button
            title="Editar"
            color="green"
            onPress={() =>
              router.push({
                pathname: "/EditDestination",
                params: { destinationId: id },
              })
            }
          />
          <DeleteButton id={id} setDestinations={setDestinations} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get("window").width * 0.85,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
  },
});

export default TravelBox;
