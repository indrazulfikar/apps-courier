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

    const [returnData, setReturnData] = useState({
      shipping_id : '',
      selected_choice : '',
      name : '',
      check : '',
      reason : '',
    });
   
    
    const choiceList = [9, 10, 13];
    const reasonList = ['Tidak ada orang', 'Invalid Address', 'Ditolak Penerima', 'Alasan Lain'];
  
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

    const onPressUpdate = (id_return, choice_return = '', name_return = '', check_return = '', reason_return = '') => {
      // console.log(id_return);
      // console.log(choice_return);
      // console.log(name_return);
      // console.log(check_return);
      // console.log(reason_return);
      if(choice_return == 1){
        setReturnData({
          shipping_id : id_return,
          selected_choice : choice_return,
          name : name_return,
          check : check_return,
          reason : reason_return,
        });
        setStartCamera(true);
      }else{
        updateShipping(id_return, choice_return, name_return, check_return, reason_return);
      }
    }

    const returnImage = (uri) =>
    {
      setImageUri(uri);
      setStartCamera(false);
      updateShipping(returnData.shipping_id, returnData.selected_choice, returnData.name, returnData.check, returnData.reason, uri);
      // console.log(returnData);
    }
    const updateShipping = async (shipping_id, selected_choice, name, check, reason, img='') =>{
     // choice
      //   {key:'1', value:'Pickup Sukses'},
      //   {key:'2', value:'Pickup Gagal'},
      // ALL REQUEST shipping_id, selected_tracking, alasan
      let true_reason = (check == 4) ? reason : reasonList[check-1];
      let filename = img.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      await SecureStore.getItemAsync('secured_token').then((token) => {
        let optHeader = (img == '') ? { "Content-Type": 'application/json', "Authorization" : `Bearer ${token}`} : {"Content-Type": 'multipart/form-data', "Authorization" : `Bearer ${token}`};
      axios({
        method: "post",
        url: HostUri+'delivery/update',
        headers: optHeader,
        data : {
          shipping_id: shipping_id,
          selected_tracking: choiceList[(selected_choice-1)],
          alasan : true_reason,
          img : { uri: img, name: filename, type:type }
        }
      }).then(function (response) {
          // berhasil
          // router.back();
          console.log('masuk sini');
          getData();
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
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
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
                    <AccordionDelivery data={ l } key={l.shipping_awb} onPressUpdate ={onPressUpdate} reasonList ={reasonList}  />
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