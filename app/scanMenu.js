import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';

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

    const menuButton = [
      { name : 'Gagal PickUp', endPoint : '', code: '', img : scangagalpickup},
      { name : 'Pickup Sukses', endPoint : '', code: '', img : scansuccesspickup},
      { name : 'Diterima DC', endPoint : '', code: '', img : terimadc},
      { name : 'Keluar DC', endPoint : '', code: '', img : terimadc},
      { name : 'Sampai DC', endPoint : '', code: '', img : terimadc},
      { name : 'Dikirim Kurir', endPoint : '', code: '', img : dikirimkurir},
      { name : 'Selesai', endPoint : '', code: '', img : selesai},
      { name : 'Pending', endPoint : '', code: '', img : pending},
      { name : 'Call Attempt 2', endPoint : '', code: '', img : motormini},
      { name : 'Call Attempt 3', endPoint : '', code: '', img : motormini},
      { name : 'Gagal', endPoint : '', code: '', img : gagal},
      { name : 'Refund Diterima DC', endPoint : '', code: '', img : refunddc},
      { name : 'Refund Keluar DC', endPoint : '', code: '', img : refunddc},
      { name : 'Kurir Refund', endPoint : '', code: '', img : kurirrefund},
      { name : 'Refund Finish', endPoint : '', code: '', img : refundfinish},
      { name : 'Refund Diambil', endPoint : '', code: '', img : refundtake},
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
        alert(`AWB ${data} Ditandai ${metode[choice].name} !`);
    };

    const handlerChoice = (number) => {
        setChoice(number);
        setOpenScanner(true);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
          <ScrollView contentContainerStyle={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start', alignItems:'flex-start', padding:10  }}>
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
    },
    iconImage:{
      resizeMode : 'contain'
    },
    contentText : {
      fontSize:12,
      marginTop:3,
      width:60,
      height:45,
      textAlign:'center'
    },
  });
  