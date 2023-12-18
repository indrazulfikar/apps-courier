import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';
import { HostUri } from './_components/HostUri';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//images
import scangagalpickup from '../assets/scangagalpickup.png';
import scansuccesspickup from '../assets/scansuccesspickup.png';
import terimadc from '../assets/terimadc.png';
import dikirimkurir from '../assets/dikirimkurir.png';
import selesai from '../assets/selesai.png';
import pending from '../assets/pending.png';
import motormini from '../assets/motormini.png';
import gagal from '../assets/gagal.png';
import refunddc from '../assets/refunddc.png';
import kurirrefund from '../assets/kurirrefund.png';
import refundfinish from '../assets/refundfinish.png';
import refundtake from '../assets/refundtake.png';

export default function scanMenu() {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [choice, setChoice] = useState(null);
    const [openScanner, setOpenScanner] = useState(false);
    const [awb, setAwb] = useState(null);
    const [alasan, setAlasan] = useState('');

    const menuButton = [
      { name : 'Gagal PickUp', code: '3', img : scangagalpickup},
      { name : 'Pickup Sukses', code: '4', img : scansuccesspickup},
      { name : 'Diterima DC', code: '5', img : terimadc},
      { name : 'Keluar DC', code: '6', img : terimadc},
      { name : 'Sampai DC', code: '7', img : terimadc},
      { name : 'Dikirim Kurir', code: '8', img : dikirimkurir},
      { name : 'Selesai', code: '9', img : selesai},
      { name : 'Pending',code: '19', img : pending},
      { name : 'Call Attempt 2', code: '11', img : motormini},
      { name : 'Call Attempt 3', code: '12', img : motormini},
      { name : 'Gagal', code: '13', img : gagal},
      { name : 'Refund Diterima DC', code: '14', img : refunddc},
      { name : 'Refund Keluar DC',code: '15', img : refunddc},
      { name : 'Kurir Refund', code: '16', img : kurirrefund},
      { name : 'Refund Finish', code: '17', img : refundfinish},
      { name : 'Refund Diambil', code: '18', img : refundtake},
    ];

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setOpenScanner(false);
        setAwb(data);
        let name = menuButton.find(x => x.code === choice).name;
        Alert.alert(
          'Jadikan '+name+' ?',
          'awb '+data,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text : 'Save',
              onPress: () => updateAwb(data,choice, alasan),
              style : 'default'
            }
          ],
          {
            cancelable: true,
          },
        );
        // alert(`AWB ${data} Ditandai ${metode[choice].name} !`);
    };

    const handlerChoice = (number) => {
        let needAlasan = [];
        setChoice(number);
        setOpenScanner(true);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const updateAwb = async(awb, code, alasan = '')=>
    {
      await SecureStore.getItemAsync('secured_token').then((token) => {
        axios({
          method: "post",
          url: HostUri+'scan',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${token}`,
          },
          data :{
            awb: awb,
            selected_tracking: code,
            alasan : alasan
          }
        }).then(function (response) {
            // berhasil
            // setLoading(false);
            alert('Success update '+awb+' '+menuButton.find(x => x.code === choice).name)
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
              if(error.response.data.message == 'data not found')
              {
                Alert.alert(
                  'Gagal Update',
                  'awb '+awb+' '+error.response.data.message,
                  [
                    {
                      text: 'Ok',
                      style: 'cancel',
                    }
                  ],
                  {
                    cancelable: true,
                  },
                );
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
        {
            openScanner &&
            <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            >
            <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              <Icon type='material-community' name="scan-helper" color="#fff" size={250}/> 
            </View>
            </BarCodeScanner>
         
        }
        <View style={styles.headerContainer}>
            <Header title="SCAN AWB"/>
        </View>
        { ! openScanner &&
            <View style={{flex:10 }}>
          <ScrollView contentContainerStyle={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', alignItems:'flex-start', padding:10  }}>
            {  
              menuButton.map((l, i) => (
            <TouchableOpacity key={i} style={styles.contentItem} onPress={()=>{handlerChoice(l.code)}}>
                <Image source={l.img} style={styles.iconImage} />
                <Text style={styles.contentText}>{l.name}</Text>
            </TouchableOpacity>
              ))
            }
        </ScrollView>
        </View>
        }
        <Footer  />
    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF8ED',
      flexDirection:'column',
    },
    headerContainer : {
      flex:2,
    },
    contentItem : {
      padding:10, 
      margin:5, 
      borderColor:'#FF8080', 
      borderWidth:1, 
      borderRadius:10,
      alignItems:'center',
      justifyContent:'space-evenly',
      width: '20%'
    },
    iconImage:{
      resizeMode : 'contain'
    },
    contentText : {
      fontSize:12,
      marginTop:3,
      height:45,
      textAlign:'center'
    },
  });
  