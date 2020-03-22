import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function Gift() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 5
  }
});
