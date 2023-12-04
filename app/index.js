import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { router, Link } from "expo-router";
import { Divider } from '@rneui/themed';

import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";

export default function index() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (

    <View style={styles.container}>
    <Text style={{ fontSize:34, color:'white' }}>kirimdisini</Text>
    <Image style={styles.image} source={require("../assets/logo-login.png")} />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{router.replace('/home')}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Divider
      style={{ width: "80%", margin: 20 }}
      color="white"
      insetType="left"
      subHeader={<Text style={styles.register_button}>Mau bergabung menjadi mitra kurir? <TouchableOpacity><Text style={{ color:'white' }}>Daftar Sekarang</Text></TouchableOpacity></Text>}
      subHeaderStyle={{}}
      width={1}
      orientation="horizontal"
    />
    </View>
  );

}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    height: 40,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  register_button: {
    height: 30,
    marginBottom: 30,
    color:'white'
  },

  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
    borderColor:'black'
  },

});
