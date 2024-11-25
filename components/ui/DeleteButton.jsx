import React from "react";
import { Button } from "react-native";
import axios from "axios";

function DeleteButton({ id, setDestinations }) {
  return (
    <Button
      title="Borrar"
      color="red"
      onPress={async () => {
        try {
          await axios.delete(`http://172.20.10.4:8000/destinations/${id}`);
          setDestinations((prevDestinations) =>
            prevDestinations.filter((destination) => destination.id == id)
          );
        } catch (error) {
          console.log("Error deleting destination:", error);
        }
      }}
    />
  );
}

export default DeleteButton;
