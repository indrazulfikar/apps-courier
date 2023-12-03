import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function home() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Header/>
      </View>

      <View style={styles.searchContainer }>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Cari Paket"
        />
      </View>

      <View style={styles.contentBackground }>

        <View style={styles.contentList}>
          <Link href="/listPickup" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/mobil.png')} />
              <Text style={styles.contentText}>List Pickup</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpSuccess" asChild>
            <TouchableOpacity   style={styles.contentItem}>
              <Image source={require('../assets/motor.png')} />
              <Text style={styles.contentText}>Pickup Sukses</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpFail" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/box.png')} />
              <Text style={styles.contentText}>Gagal Pickup</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.contentList}>
          <Link href="/listDelivery" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/mobil2.png')} />
              <Text style={styles.contentText}>List Delivery</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listDeliverySuccess" asChild>
            <TouchableOpacity   style={styles.contentItem}>
              <Image source={require('../assets/dikirimkurir.png')} />
              <Text style={styles.contentText}>Delivery Sukses</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listDeliveryFail" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/boxgagal.png')} />
              <Text style={styles.contentText}>Delivery Gagal</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.contentList}>
          <Link href="/scanMenu" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/scan.png')} />
              <Text style={styles.contentText}>Scan AWB</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={require('../assets/sirine.png')} />
            <Text style={styles.contentText}>Emergency</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{ flex:4 }}></View>
    <Footer  />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE3D5',
    flexDirection:'column',
  },
  headerContainer : {
    flex:2,
  },
  searchContainer : {
    backgroundColor:'#FAF8ED',
    borderRadius:10,
    margin : 10,
    flex:2,
    justifyContent:'space-around'
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#FF8080',
    borderRadius:5
  },
  contentBackground : {
    flex:8,
    padding:10, 
    margin:10,
    borderRadius:20,
    backgroundColor:'#FAF8ED', 
  },
  contentList  : {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  contentItem : {
    padding:10, 
    margin:5, 
    borderColor:'#FF8080', 
    borderWidth:1, 
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  contentText : {
    fontSize:12,
    marginTop:5,
    width:90,
    textAlign:'center'
  },
});
