import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';

export default function scanMenu() {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [choice, setChoice] = useState(null);
    const [openScanner, setOpenScanner] = useState(false);
    const [awb, setAwb] = useState(null);
    const metode = [
      { name : 'Gagal PickUp', uri : ''},
      { name : 'Pickup Sukses', uri : ''},
      { name : 'Diterima DC', uri : ''},
      { name : 'Keluar DC', uri : ''},
      { name : 'Sampai DC', uri : ''},
      { name : 'Dikirim Kurir', uri : ''},
      { name : 'Selesai', uri : ''},
      { name : 'Pending', uri : ''},
      { name : 'Call Attempt 2', uri : ''},
      { name : 'Call Attempt 3', uri : ''},
      { name : 'Gagal', uri : ''},
      { name : 'Refund Diterima DC', uri : ''},
      { name : 'Refund Keluar DC', uri : ''},
      { name : 'Kurir Refund', uri : ''},
      { name : 'Refund Finish', uri : ''},
      { name : 'Refund Diambil', uri : ''},
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
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(0)}}>
                <Image source={require('../assets/scangagalpickup.png')} />
                <Text style={styles.contentText}>Gagal Pickup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(1)}}>
              <Image source={require('../assets/scansuccesspickup.png')} />
              <Text style={styles.contentText}>Pickup Sukses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(3)}}>
              <Image source={require('../assets/terimadc.png')} />
              <Text style={styles.contentText}>Diterima DC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(3)}}>
              <Image source={require('../assets/terimadc.png')} />
              <Text style={styles.contentText}>Keluar DC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(4)}}>
              <Image source={require('../assets/terimadc.png')} />
              <Text style={styles.contentText}>Sampai DC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(5)}}>
              <Image source={require('../assets/dikirimkurir.png')} />
              <Text style={styles.contentText}>Dikirim Kurir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(6)}}>
              <Image source={require('../assets/selesai.png')} />
              <Text style={styles.contentText}>Selesai</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(7)}}>
              <Image source={require('../assets/pending.png')} />
              <Text style={styles.contentText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(8)}}>
              <Image source={require('../assets/motormini.png')} />
              <Text style={styles.contentText}>Call Attempt 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(9)}}>
              <Image source={require('../assets/motormini.png')} />
              <Text style={styles.contentText}>Call Attempt 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(10)}}>
              <Image source={require('../assets/gagal.png')} />
              <Text style={styles.contentText}>Gagal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(11)}}>
              <Image source={require('../assets/refunddc.png')} />
              <Text style={styles.contentText}>Refund Diterima DC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(12)}}>
              <Image source={require('../assets/refunddc.png')} />
              <Text style={styles.contentText}>Refund Keluar DC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(13)}}>
              <Image source={require('../assets/kurirrefund.png')} />
              <Text style={styles.contentText}>Kurir Refund</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(14)}}>
              <Image source={require('../assets/refundfinish.png')} />
              <Text style={styles.contentText}>Refund Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentItem} onPress={()=>{handlerChoice(15)}}>
              <Image source={require('../assets/refundtake.png')} />
              <Text style={styles.contentText}>Refund Diambil</Text>
            </TouchableOpacity>
            
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
    contentText : {
      fontSize:12,
      marginTop:3,
      width:60,
      height:45,
      textAlign:'center'
    },
  });
  