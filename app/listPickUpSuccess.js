import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider, Skeleton } from '@rneui/themed';
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';
import { HostUri } from './_components/HostUri';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AccordionPickUp from './_components/AccordionPickUp';
import AccordionPickUpCorporate from './_components/AccordionPickUpCorporate';

export default function listPickUpSuccess() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState('Disconnected Please Check your Connection !');

  const [loadingCorporate, setLoadingCorporate] = useState(true);
  const [dataCorporate, setDataCorporate] = useState([]);
  const [errCorporate, setErrCorporate] = useState('Disconnected Please Check your Connection !');

  useEffect(() => {
    getData();
    getCorporate();
  }, []);

  const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      fetch(HostUri+'pickup/success', {
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
        setLoading(false);
        setData(result.data);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      })
    });
  }

  const getCorporate = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      fetch(HostUri+'pickup/corporate/success', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+token       
        },
      })
      .then(response => {
        if (!response.ok) {
          setLoadingCorporate(false);
          throw new Error('Disconnected please check connection');
        }
        return response.json();
      })
      .then( (result) => {
        setLoadingCorporate(false);
        setDataCorporate(result.data);
      })
      .catch(error => {
        setLoadingCorporate(false);
        console.error('Error:', error);
      })
    });
  }
  
    return(
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header title='Pickup Sukses'/>
          </View>

          <View style={styles.datepickContainer}>
            <View>
              <CustomDatePick />
            </View>
            <View>
              <CustomDatePick />
            </View>
          </View>
          <Text style={{marginHorizontal: 5, fontWeight:'bold' }}>Seller ({data.length})</Text>

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
              {
                data.map((l, i) => (
                  <AccordionPickUp data={ l } key={i} />
                ))
              }
            </ScrollView>
            <Text style={{marginHorizontal: 5, fontWeight:'bold' }}>Corporate ({dataCorporate.length})</Text>
            <Divider
              style={{marginHorizontal: 5 }}
              color="red"
              width={2}
              orientation="horizontal"
            />
            <ScrollView>
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
                  <AccordionPickUpCorporate data={ l } key={i} />
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
