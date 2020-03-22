import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Alert,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import "./ImagePicker";
import ImagePicker from "./ImagePicker";
import firebase from "firebase";

export default function GiftAdder({ navigation }) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [giftName, setName] = useState("");
  const [giftFor, setGiftFor] = useState("");
  const [holidayFor, setHolidayFor] = useState("");
  const [picture, setPicture] = useState();

  let createGift = async () => {
    let uid = firebase.auth().currentUser?.uid;

    console.log(`uid ${uid}`);

    firebase
      .database()
      .ref("gifts/" + uid)
      .push({
        giftName: giftName,
        giftFor: giftFor,
        holidayFor: holidayFor,
        picture: picture
      })
      .then(() => {
        Alert.alert("Congrats!", "Gift Successfully Created!");
        return navigation.navigate("Home");
      })
      .catch(() => Alert.alert("Error", "Internal Server Error!"));
  };

  const styles = StyleSheet.create({
    button: {
      margin: 20,
      backgroundColor: "#efefef",
      width: "60%",
      borderRadius: 5
    },
    container: {
      flex: 1,
      backgroundColor: "#383e5a",
      padding: 25,
      justifyContent: "center",
      alignItems: "center"
    },
    thumbnail: {
      width: 300,
      height: 400,
      resizeMode: "contain"
    },
    input: {
      backgroundColor: "white",
      borderColor: "#fff",
      height: 40,
      width: "60%",
      padding: 10,
      borderRadius: 4
    },
    label: {
      justifyContent: "flex-start",
      color: "white",
      margin: 20,
      marginLeft: 0
    },
    text: { fontSize: 20, color: "#fff" }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gift Name: </Text>
      <Controller
        as={<TextInput style={styles.input} />}
        control={control}
        onChangeText={(text: string) => setName(text)}
        name="name"
      />
      <Text style={styles.label}>Gift For: </Text>
      <Controller
        as={<TextInput style={styles.input} />}
        control={control}
        name="giftFor"
        onChangeText={(text: string) => setGiftFor(text)}
      />
      <Text style={styles.label}>Holiday: </Text>
      <Controller
        as={<TextInput style={styles.input} />}
        control={control}
        name="holidayFor"
        onChangeText={(text: string) => setHolidayFor(text)}
      />
      <ImagePicker onChangeImage={image => setPicture(image)}></ImagePicker>
      <View style={styles.button}>
        <Button
          title="Create Gift"
          onPress={() => handleSubmit(createGift)()}
        />
      </View>
    </View>
  );
}
