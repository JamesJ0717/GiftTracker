import React from "react";
import { StatusBar, AsyncStorage } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./Components/Redux/reducers";
import firebase from "firebase";

import GiftAdder from "./Components/GiftAdder";
import Login from "./Components/Login/index";
import Homepage from "./Components/Homepage";

const store = createStore(reducer);

const firebaseConfig = {
  apiKey: "AIzaSyAvp8YOxiSQVq9B6mE3Y-ImQdr0An3-caA",
  authDomain: "gift-tracker-7a748.firebaseapp.com",
  databaseURL: "https://gift-tracker-7a748.firebaseio.com",
  storageBucket: "gs://gift-tracker-7a748.appspot.com"
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
export default function App() {
  let loggedIn = false;
  AsyncStorage.getItem("UID", (err, res) => {
    console.log(`uid ${res}`);
    loggedIn = res !== null ? true : false;
  });
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar barStyle="light-content" />

        <Stack.Navigator>
          {loggedIn && <Stack.Screen name="Login" component={Login} />}
          <Stack.Screen name="Home" component={Homepage} />
          <Stack.Screen name="Create a new Gift" component={GiftAdder} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
