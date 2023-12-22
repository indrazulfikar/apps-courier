import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider, Skeleton } from '@rneui/themed';
import { Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import {SelectList} from 'react-native-dropdown-select-list';
import { HostUri } from './_components/HostUri';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


export default function listPickup() {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingCorporate, setLoadingCorporate] = useState(true);
  const [data, setData] = useState([]);
  const [dataCorporate, setDataCorporate] = useState([]);
  const [err, setErr] = useState('Disconnected Please Check your Connection !');

  const urut = [
    // {key:'1', value:'Seller', disabled:true},
    {key:'1', value:'Seller'},
    {key:'2', value:'Kelurahan'},
  ];

  useEffect(() => {
    getData();
    getDataCorporate();
  }, []);

  const getDataCorporate = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+'pickup/corporate',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(function (response) {
          // berhasil
          setLoadingCorporate(false);
          setDataCorporate(response.data.data);
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

  const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+'pickup/seller',
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

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header />
          </View>

          <View style={styles.headerChild}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
            <View style={styles.dropdownContainer}>
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={urut} 
                save="value"
                placeholder='Urutkan'
                dropdownStyles={{ zIndex:999, minHeight:100, backgroundColor : 'white', borderColor:'red' }}
                boxStyles={{ padding:10, marginHorizontal:5, borderColor:'red' }}
              />
            </View>
          </View>

          <View style={styles.totalContainer}><Text style={styles.totalText}>Total : {Object.keys(data).length} Seller | {Object.keys(dataCorporate).length} Corporate</Text></View>
          
          <Divider
            style={{marginHorizontal: 5 }}
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
                data.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={TouchableOpacity} >
                    <ListItem.Content>
                      <ListItem.Title>{l.name} {l.total > 1 && "("+l.total+")"}</ListItem.Title>
                      <ListItem.Subtitle>{l.subdistrict_name}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle ><Link href={"/detailPickup/"+l.user_id} asChild><Text style={{ color:'blue' }}>Detail</Text></Link></ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </ScrollView>
            <Divider
            style={{marginHorizontal: 5 }}
            color="red"
            width={2}
            orientation="horizontal"
          />
            <ScrollView style={styles.listContainer}>
            {
              loadingCorporate &&
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
                dataCorporate.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={TouchableOpacity} >
                    <ListItem.Content>
                      <ListItem.Title>{l.company_name} {l.total > 1 && "("+l.total+")"}</ListItem.Title>
                      <ListItem.Subtitle>{l.subdistrict_name}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle ><Link href={"/detailPickupCorporate/"+l.user_id} asChild><Text style={{ color:'blue' }}>Detail</Text></Link></ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
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
    height:'10%',
  },
  headerChild : {
    height:'10%',
    flex: 1,
    flexDirection : 'row',
    marginHorizontal:5,
  },
  tanggal : {
    flex : 2,
    color:'grey',
    marginHorizontal: 5
  },
  dropdownContainer : {
    flex:1
  },
  totalContainer : {
    height:'10%',
    marginHorizontal:10,

  },
  totalText : {
    fontSize:16, 
    fontWeight:'bold',
    marginTop:5
  },
  listContainer : {
    height:'32%'
  }
});