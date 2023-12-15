import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Divider } from '@rneui/themed';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { HostUri } from "./_components/HostUri";
import * as SecureStore from 'expo-secure-store';

export default function index() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    async function getValueFor(key) {
      await SecureStore.getItemAsync(key).then((result) => {
        if(result){
          router.replace('/home');
        }
      });
    }
    getValueFor('secured_token');
  }, []);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  const loginHandler = async () => {
    const formData = {
      telp: phone,
      password: password,
    };
    
    await fetch(HostUri+'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then( (result) => {
      // await SecureStore.setItemAsync('token', result.data.token);
      // await SecureStore.setItemAsync('name', result.data.name);
      save('secured_token', result.data.token);
      save('secured_name', result.data.name);
      console.log(result.data);
      router.replace('/home');
    })
    .catch(error => {
      console.error('Error:', error);
    });

  } 

  return (

    <View style={styles.container}>
    <Image style={styles.imageLogo} source={require("../assets/icondepan.png")} />
    <Image style={styles.image} source={require("../assets/logo-login.png")} />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          keyboardType="number-pad"
          style={styles.TextInput}
          placeholder="Number"
          placeholderTextColor="#003f5c"
          onChangeText={(phone) => setPhone(phone)}
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

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{loginHandler()}}>
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

  imageLogo :{
    width:150,
    height:80,
    borderRadius:5
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
