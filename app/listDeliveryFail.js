import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider, Skeleton } from '@rneui/themed';
import { Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';
import { useState, useEffect } from 'react';
import { HostUri } from './_components/HostUri';
import * as SecureStore from 'expo-secure-store';

export default function listDeliveryFail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState('Disconnected Please Check your Connection !');

      useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        await SecureStore.getItemAsync('secured_token').then((token) => {
          fetch(HostUri+'delivery/fail', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+token       
            },
          })
          .then(response => {
            if (!response.ok) {
              setLoading(false);
              throw new Error('Disconnected please check connection');
            }
            return response.json();
          })
          .then( (result) => {
            setData(result.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(token);
            setLoading(false);
            console.error('Error:', error);
          })
        });
      }

    return(
      <SafeAreaView style={styles.container}>

        <View style={styles.headerContainer}>
          <Header title='List Delivery Gagal'/>
        </View>

        <View style={styles.headerChild}>
          <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
          <View style={styles.dropdownContainer}>
          </View>
        </View>

        <View style={styles.datepickContainer}>
          <View style={{ margin:10 }}>
            <CustomDatePick />
          </View>
          <View>
            <CustomDatePick />
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total 32 AWB</Text>
        </View>

        <Divider
          style={{margin: 5 }}
          color="red"
          width={2}
          orientation="horizontal"
        />

        <View style={styles.listContainer}>
          <ScrollView>
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
            { !loading &&
              data.map((l, i) => (
                <ListItem key={i} bottomDivider Component={View}>
                  <ListItem.Content>
                    <ListItem.Subtitle><Text style={styles.tableHead}>AWB</Text></ListItem.Subtitle>
                    <ListItem.Title><Text style={{ fontWeight:'bold' }}>{l.shipping_awb}</Text></ListItem.Title>
                    <ListItem.Subtitle><Text style={styles.tableHead}>Alasan</Text></ListItem.Subtitle>
                    <ListItem.Title>{l.reason}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <ListItem.Subtitle><Text style={styles.tableHead}>Status</Text></ListItem.Subtitle>
                    <ListItem.Title><Text style={{ color:'red' }}>{l.shipping_status}</Text></ListItem.Title>
                    <ListItem.Subtitle ><TouchableOpacity><Text style={{ color:'blue' }}>Update</Text></TouchableOpacity></ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </ScrollView>
        </View>

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
    flex:2,
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
    flex:2,
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
    flex : 13,
  },
  tableHead :{
    fontSize:12,
    color : 'grey'
  }
});
