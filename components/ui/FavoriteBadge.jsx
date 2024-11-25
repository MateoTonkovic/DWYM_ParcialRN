import axios from "axios";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function FavoriteBadge({ destinationId, initialValue, setDestinations }) {
  const [isFavorite, setIsFavorite] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const updateFavoriteState = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        `http://172.20.10.4:8000/destinations/${destinationId}`,
        {
          isFavorite: !isFavorite,
        }
      );

      setIsFavorite(!isFavorite);
      setDestinations((prevDestinations) =>
        prevDestinations.map((destination) => {
          if (destination.id === destinationId) {
            return { ...destination, isFavorite: !destination.isFavorite };
          } else return destination;
        })
      );
    } catch (error) {
      console.log("Error fetching destinations:", error);
    }
    setIsLoading(false);
  };

  const isIOs = Platform.OS === "ios";

  return (
    <View styles={isFavorite ? styles.isFavorite : styles.notFavorite}>
      <TouchableOpacity onPress={updateFavoriteState} disabled={isLoading}>
        {isIOs ? (
          isFavorite ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="red" />
          )
        ) : isFavorite ? (
          <AntDesign name="star" size={24} color="yellow" />
        ) : (
          <AntDesign name="staro" size={24} color="yellow" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  isFavorite: {
    color: "red",
  },
  notFavorite: {
    color: "blue",
  },
});

export default FavoriteBadge;
