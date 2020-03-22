import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../Redux/reducers";

import logo from "../../assets/logo.png";

import firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";

function Login({ navigation }) {
  const loginWithFacebook = async () => {
    await Facebook.initializeAsync("527141008184478", "Gift Tracker");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    });

    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(result => {
          if (result.user) {
            AsyncStorage.setItem("UID", result.user.uid);
            navigation.navigate("Home");
          }
        })
        .catch(error => {
          Alert.alert("Error Logging In!", error);
        });
    }
  };

  const loginWithApple = async () => {
    const csrf = Math.random()
      .toString(36)
      .substring(2, 15);
    const nonce = Math.random()
      .toString(36)
      .substring(2, 10);
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce
    );
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ],
      state: csrf,
      nonce: hashedNonce
    });
    const { identityToken, email, state } = appleCredential;

    if (identityToken) {
      const provider = new firebase.auth.OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce
      });
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then(result => {
          if (result.user) {
            AsyncStorage.setItem("UID", result.user.uid);
            navigation.navigate("Home");
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ height: 200, width: 200, margin: 10 }} />
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 250, height: 50, margin: 10 }}
        onPress={loginWithApple}
      />
      <TouchableOpacity style={styles.buttonFB} onPress={loginWithFacebook}>
        <Text style={{ color: "white" }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonFB: {
    backgroundColor: "#1877f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 250,
    height: 50,
    margin: 10
  }
});

function mapStateToProps(state) {
  const { loggedIn } = state;
  return { loggedIn };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: bindActionCreators(actions.logIn, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
