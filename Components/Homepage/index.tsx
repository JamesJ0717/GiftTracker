import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import firebase from "firebase";

function getStuffFromDatabase() {
  let uid = "";
  let recipients: JSX.Element[] = [];

  recipients.push(
    <TouchableOpacity key={"me"} style={styles.button}>
      <Text style={{ color: "white" }}>Me</Text>
    </TouchableOpacity>
  );
  recipients.push(
    <TouchableOpacity key={"alex"} style={styles.button}>
      <Text style={{ color: "white" }}>Alex</Text>
    </TouchableOpacity>
  );
  recipients.push(
    <TouchableOpacity key={"Mom"} style={styles.button}>
      <Text style={{ color: "white" }}>Mom</Text>
    </TouchableOpacity>
  );
  return recipients;
}

function Homepage({ route, navigation }) {
  let textArray: JSX.Element[] = [];
  textArray = getStuffFromDatabase();
  return (
    <View style={styles.container}>
      {textArray}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch"
        }}
      >
        <TouchableOpacity style={styles.smbutton}>
          <Text style={{ color: "white" }}>New Person</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smbutton}>
          <Text style={{ color: "white" }}>Remove Person</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    width: 250,
    alignItems: "center"
  },
  smbutton: {
    padding: 20,
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    width: "28%",
    alignItems: "center"
  },
  logo: {
    width: 305,
    height: 300,
    marginBottom: 20
  }
});

export default Homepage;
