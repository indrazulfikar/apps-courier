import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { Header as HeaderRNE, Dialog } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { router, Link } from "expo-router";
import { HostUri } from './HostUri';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const Header = (props) => {

  const [title, setTitle] = useState((props.title) ? props.title : 'Ican Express'  );
  const [name, setName] = useState('Loading ...');
  const [token, setToken] = useState('');
  const [popupLogout, setPopupLogout] = useState(false);

  useEffect(() => {
    async function getValueFor(key) {
      await SecureStore.getItemAsync(key).then((result) => {
        if(!result){
          router.replace('/');
        }else{
          if(key == 'secured_name'){
            setName(result);
          }
          if(key == 'secured_token'){
            setToken(result);
          }
        }
      });
    }
    getValueFor('secured_name');
    getValueFor('secured_token');
  }, []);

  toggleLogout = () =>
  {
    setPopupLogout(!popupLogout);
  }

  async function del(key) {
    await SecureStore.deleteItemAsync(key);
  }

  const logoutHandler = async () =>
  {
    await axios({
      method: "get",
      url: HostUri+'logout',
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
    }).then(function (response) {
        // berhasil
        del('secured_token');
        del('secured_name');
        router.replace('/');
      }).catch(function (error) {
        // masuk ke server tapi return error (unautorized dll)
        if (error.response) {
          //gagal login
          if(error.response.data.message == 'Unauthenticated.' || error.response.data.message == 'Unauthorized')
          {
            SecureStore.deleteItemAsync('secured_token');
            SecureStore.deleteItemAsync('secured_name');
            router.replace('/');
          }
          // console.error(error.response.data);
          // console.error(error.response.status);
          // console.error(error.response.headers);
        } else if (error.request) {
          // ga konek ke server
          alert('Check Koneksi anda !')
          console.error(error.request);
        } else {
          // error yang ga di sangka2
          console.error("Error", error.message);
        }
    });
  }

return (
  <SafeAreaProvider>
    <HeaderRNE
      leftComponent={{ text : title, style: styles.subheaderText }}
      rightComponent={
        // { text: 'kurir_pickup_'+name, style: styles.heading }
        <Text style={styles.heading} onPress={toggleLogout}>{name}</Text> 
      }
      centerComponent={{}}
      backgroundColor = '#ff0000'
      placement = 'left'
    />
    <Dialog
      isVisible={popupLogout}
      onBackdropPress={toggleLogout}
    >
      <Dialog.Title title="Logout"/>
      <Text>anda ingin logout?</Text>
      <Dialog.Actions>
        <Dialog.Button title="Logout" onPress={() => logoutHandler()}/>
        <Dialog.Button title="Cancel" onPress={toggleLogout}/>
      </Dialog.Actions>
    </Dialog>
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
heading: {
  color: 'white',
  fontSize: 15,
//   fontWeight: 'bold',
  paddingTop:5,
  // paddingBottom:5,
},
subheaderText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  paddingTop:5,
  paddingBottom:5,
},
});

export default Header;