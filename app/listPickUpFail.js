import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';
import { HostUri } from './_components/HostUri';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AccordionPickUp from './_components/AccordionPickUp';

export default function listPickUpFail() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState('Disconnected Please Check your Connection !');
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+'pickup/fail',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(function (response) {
          // berhasil
          console.log(response.data.data)
          setLoading(false);
          setData(response.data.data);
        }).catch(function (error) {
          // masuk ke server tapi return error (unautorized dll)
          if (error.response) {
            //gagal login
            if(error.response.data.message == 'Unauthorized')
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
      
    });
  }

    return(
      <SafeAreaView style={styles.container}>

        <View style={styles.headerContainer}>
          <Header title='Pickup Gagal'/>
        </View>

        <View style={styles.datepickContainer}>
          <View >
            <CustomDatePick />
          </View>
          <View>
            <CustomDatePick />
          </View>
        </View>

        <Divider
          style={{marginHorizontal: 5 }}
          color="red"
          width={2}
          orientation="horizontal"
        />
          <ScrollView style={styles.listContainer}>
            {
              data.map((l, i) => (
                <AccordionPickUp data={ l } key={i} />
              ))
            }
          </ScrollView>
        <Footer  />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
  },
  headerContainer : {
    height:'10%'
  },
  headerChild : {
    flex: 1,
    flexDirection : 'row'
  },
  tanggal : {
    flex : 2,
    color:'grey',
    margin: 10
  },
  dropdownContainer : {
    flex:1
  },
  datepickContainer : { 
    height:'10%',
    flexDirection : 'row', 
    alignItems: "center", 
    justifyContent: "space-evenly" 
  },
  totalContainer : {
    flex:1,
    margin:10
  },
  totalText : {
    fontSize:16, 
    fontWeight:'bold'
  },
  listContainer : {
    height:'70%',
    paddingHorizontal:10
  },
  tableHead :{
    fontSize:12,
    color : 'grey'
  }
});
