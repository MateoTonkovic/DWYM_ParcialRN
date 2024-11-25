import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Checkbox({ label, inputValue, setValue, value }) {
  const isActive = inputValue === value;

  const onPress = () => {
    if (isActive) {
      setValue("");
    } else setValue(inputValue);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={isActive && styles.isActive}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  isActive: {
    backgroundColor: "blue",
    color: "white",
  },
});

export default Checkbox;
