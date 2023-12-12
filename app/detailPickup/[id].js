import { StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { useState, useEffect } from 'react';
import AccordionPickUp from '../_components/AccordionPickUp';
import { Divider, Skeleton } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { HostUri } from '../_components/HostUri';
import * as SecureStore from 'expo-secure-store';

export default function detailListPickup() {
    const { id } = useLocalSearchParams();
    const [bigdata, setBigData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('')
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
        fetch(HostUri+'pickup/seller/'+id, {
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
            // console.log(result.data);
            setBigData(result.data);
            setLoading(false);
        })
        .catch(error => {
        console.log(token);
            setLoading(false);
            console.error('Error:', error);
        })
    });
    }
    const onPressUpdate = async (shipping_id, selected_choice = null, reason = '') =>{
        // choice
        //   {key:'1', value:'Pickup Sukses'},
        //   {key:'2', value:'Pickup Gagal'},
        let choice = [4, 0];

        // ALL REQUEST shipping_id, selected_tracking, alasan
        await SecureStore.getItemAsync('secured_token').then((token) => {
        const formData = {
            shipping_id: shipping_id,
            selected_tracking: choice[(selected_choice-1)],
            alasan : reason
        };
      
        fetch(HostUri+'pickup/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+token       
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => {
            getData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
  
    }

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header/>
          </View>

          <View style={styles.headerChild}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
            <Text style={styles.dropdownContainer}>Total {Object.keys(bigdata).length} AWB</Text>
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
                <View style={{ flex:1, flexDirection:'column', padding:5 }}>
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
                bigdata.map((l, i) => (
                    <AccordionPickUp data={ l } onPressUpdate ={onPressUpdate} />
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
    flex:1,
    margin : 10,
    textAlign:'right',
    fontSize:16,
    fontWeight:'bold'
  },
  listContainer : {
    flex : 13,
    paddingLeft:10,
    paddingRight:10,
  }
});