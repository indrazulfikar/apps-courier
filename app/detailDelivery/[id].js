import { StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AccordionDelivery from '../_components/AccordionDelivery';
import { Divider, Skeleton } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import CanvasCamera from '../_components/CanvasCamera';
import { HostUri } from '../_components/HostUri';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function detailListDelivery() {
    const { id } = useLocalSearchParams();
    const [bigdata, setBigData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('')
    const [startCamera, setStartCamera] = useState(false);
    const [imageUri, setImageUri] = useState('');
    // const [choice, setChoice] = useState('');
    // const [reasonCheck, setReasonCheck] = useState('');
    // const [reasonText, setReasonText] = useState('');
    // const [awb, setAwb] = useState('');
    // const [name, setName] = useState('');
    const [formData, setFormData] = useState({
      shipping_id: '',
      selected_tracking: '',
      alasan : '',
      image : '',
      name : '',
    });

    const choiceList = [9, 13];
    const reasonList = ['Dangerous Goods', 'Invalid Address', 'Packing Rusak', 'Paket Belum Siap', 'Alasan Lain'];

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+`delivery/seller/${id}`,
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(function (response) {
          // berhasil
          setLoading(false);
          setBigData(response.data.data);
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

    const onPressUpdate = (awb_return, choice_return = '', name_return = '', check_return = '', reason_return = '') => {
      if(choice_return == 1){

      }
      if(choice_return == 2)
      {
        updateShipping(awb_return, choice_return, name_return, check_return, reason_return);
      }
    }

    const returnImage = (uri) =>
    {
      setImageUri(uri);
      setStartCamera(false);
      updateShipping();
    }
    const updateShipping = async (awb, selected_choice, name, check, reason) =>{
      console.log('masuk');
      // choice
      //   {key:'9', value:'finish'},
      //   {key:'13', value:'failed'},

        // ALL REQUEST shipping_id, selected_tracking, alasan, image, name
        await SecureStore.getItemAsync('secured_token').then((token) => {
        axios({
          method: "post",
          url: HostUri+'delivery/update',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${token}`,
          },
          data :{
            shipping_id: id,
            selected_tracking: choiceList[(selected_choice-1)],
            alasan : (check == 5) ? reason : reasonList[(check-1)],
            image : '',
            name : name,
        }
        }).then(function (response) {
            // berhasil
            router.back();
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
          {
            startCamera &&
            <CanvasCamera startCamera={startCamera} returnImage = {returnImage}/>
          }
          {!startCamera && 
            (
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
                    <AccordionDelivery data={ l } onPressUpdate ={onPressUpdate} reasonList = {reasonList} key={l.shipping_awb} />
                ))
              }
            </ScrollView>
            )
            }
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