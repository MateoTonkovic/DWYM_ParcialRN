import React from "react";
import { Stack } from "expo-router";

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Destinations" }} />
      <Stack.Screen
        name="AddDestination"
        options={{ title: "Add New Destination" }}
      />
      <Stack.Screen
        name="EditDestination"
        options={{ title: "Edit Destination" }}
      />
    </Stack>
  );
}
