import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider, Skeleton } from '@rneui/themed';
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';
import { useState, useEffect } from 'react';
import { HostUri } from './_components/HostUri';
import AccordionDelivery from './_components/AccordionDelivery'
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import axios from 'axios';

export default function listDeliveryFail() {
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
            url: HostUri+'delivery/fail',
            headers: {
              "Content-Type": 'application/json',
              "Authorization" : `Bearer ${token}`,
            },
          }).then(function (response) {
              // berhasil
              setLoading(false);
              setData(response.data.data);
            }).catch(function (error) {
              // masuk ke server tapi return error (unautorized dll)
              setLoading(false);
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
                setLoading(false);
                alert('Check Koneksi anda !')
                console.error(error.request);
              } else {
                setLoading(false);
                // error yang ga di sangka2
                console.error("Error", error.message);
              }
          });
        });
      }
      
    return(
      <SafeAreaView style={styles.container}>

        <View style={styles.headerContainer}>
          <Header title='Delivery Gagal'/>
        </View>

        <View style={styles.datepickContainer}>
          <View>
            <CustomDatePick />
          </View>
          <View>
            <CustomDatePick />
          </View>
        </View>

        <Divider
          style={{margin: 5 }}
          color="red"
          width={2}
          orientation="horizontal"
        />

        <ScrollView style={styles.listContainer}>
          {
            loading &&
            <View style={{ flex:1, flexDirection:'column', padding:10 }}>
              {
                [{},{},{},{},{},{},].map((l, i) => (
                  <Skeleton
                  // LinearGradientComponent={LinearGradient}
                  animation="pulse"
                  width={'100%'}
                  height={60}
                  style={{ marginBottom:5 }}
                  key={i}
                />
                  ))
              }
            </View>
            
          }
          {
            data.length == 0 && !loading &&
            <Text>No Data Found</Text>
          }
            { !loading &&
              data.map((l, i) => (
                <AccordionDelivery data={ l } key={l.shipping_awb}/>
                // <ListItem key={i} bottomDivider Component={View}>
                //   <ListItem.Content>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>AWB</Text></ListItem.Subtitle>
                //     <ListItem.Title><Text style={{ fontWeight:'bold' }}>{l.shipping_awb}</Text></ListItem.Title>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>Alasan</Text></ListItem.Subtitle>
                //     <ListItem.Title>{l.reason}</ListItem.Title>
                //   </ListItem.Content>
                //   <ListItem.Content right>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>Status</Text></ListItem.Subtitle>
                //     <ListItem.Title><Text style={{ color:'red' }}>{l.shipping_status}</Text></ListItem.Title>
                //     <ListItem.Subtitle ><TouchableOpacity><Text style={{ color:'blue' }}>Update</Text></TouchableOpacity></ListItem.Subtitle>
                //   </ListItem.Content>
                // </ListItem>
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
    // flex:2,
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
    height:'74%'
  },
  tableHead :{
    fontSize:12,
    color : 'grey'
  }
});
