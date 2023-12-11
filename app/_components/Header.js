import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { Header as HeaderRNE, Dialog } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { router, Link } from "expo-router";
import { HostUri } from './HostUri';
import * as SecureStore from 'expo-secure-store';

const Header = (props) => {

  const [title, setTitle] = useState((props.title) ? props.title : 'kirimdisini'  );
  const [name, setName] = useState('Loading ...');
  const [token, setToken] = useState('');
  const [popupLogout, setPopupLogout] = useState(false);
  const getToken = props.getToken ? props.getToken : function(text){} ;

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
            getToken(result);
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
    await fetch(HostUri+'logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer '+token,
      },
      // body: JSON.stringify(formData),
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
      del('secured_token');
      del('secured_name');
      console.log(result);
      router.replace('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

return (
  <SafeAreaProvider>
    <HeaderRNE
      leftComponent={{ text : title, style: styles.subheaderText }}
      rightComponent={
        // { text: 'kurir_pickup_'+name, style: styles.heading }
        <Text style={styles.heading} onPress={toggleLogout}>kurir_pickup_{name}</Text> 
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
  paddingBottom:5,
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