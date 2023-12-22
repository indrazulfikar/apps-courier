import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Divider, Dialog } from '@rneui/themed';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import { HostUri } from "./_components/HostUri";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export default function index() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await axios.post(
      HostUri+'login',
      { telp: phone, password: password,},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      ).then(function (response) {
        // berhasil
        // console.log(response);
        save('secured_token', response.data.data.token);
        save('secured_name', response.data.data.name);
        setLoading(false);
        router.replace('/home');
      }).catch(function (error) {
        // masuk ke server tapi return error (unautorized dll)
        if (error.response) {
          //gagal login
          setLoading(false);
          if(error.response.data.message == 'Unauthorized')
          {
            alert('telp / password salah !')
          }else{
            alert(error.response.data.message)

          }
          // console.error(error.response.data);
          // console.error(error.response.status);
          // console.error(error.response.headers);
        } else if (error.request) {
          // ga konek ke server
          setLoading(false);
          alert('Check Koneksi anda !')
          console.error(error.request);
        } else {
          setLoading(false);
          // error yang ga di sangka2
          alert('Fatal error 404')
          console.error("Error", error.message);
        }
    });
  } 

  return (

    <View style={styles.container}>
    <Dialog isVisible={loading} overlayStyle={{backgroundColor:'rgba(52, 52, 52, 0.5)' }}>
      <Dialog.Loading />
    </Dialog>
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
