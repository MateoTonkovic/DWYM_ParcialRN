import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import TravelBox from "../components/ui/TravelBox";

export default function DestinationList() {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchDestinations();
    }, [])
  );

  const sortedDestinations = useMemo(() => {
    const favorites = destinations.filter(
      (destination) => destination.isFavorite
    );

    const sortedFavorites = favorites.sort((a, b) => a.name - b.name);

    const notFavorites = destinations.filter(
      (destination) => !destination.isFavorite
    );

    const sortedNonFavorites = notFavorites.sort((a, b) => a.name - b.name);

    const newSortedDestinations = sortedFavorites.concat(sortedNonFavorites);

    return newSortedDestinations;
  }, [destinations]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("http://172.20.10.4:8000/destinations");
      const destinations = await response.json();

      setDestinations(destinations);
    } catch (error) {
      console.log("Error fetching destinations:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedDestinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TravelBox
            difficulty={item.difficulty}
            id={item.id}
            isFavorite={item.isFavorite}
            name={item.name}
            setDestinations={setDestinations}
          />
        )}
      />
      <Button
        title="Agregar destination"
        color="green"
        onPress={async () => {
          navigation.navigate("AddDestination");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
});
