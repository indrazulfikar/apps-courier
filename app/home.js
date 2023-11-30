import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex:2 }}>
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
      <Text style={{ paddingLeft:10, fontSize:14, fontWeight:'bold' }}>Pick Up</Text>
      <View style={styles.flexContainer}>
      <Link href="/listPickup" asChild>
        <TouchableOpacity style={styles.flexItem}>
          <Image source={require('../assets/mobil.png')} />
          <Text style={styles.flextext}>List Pickup</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/listPickUpSuccess" asChild>
        <TouchableOpacity   style={styles.flexItem}>
        <Image source={require('../assets/motor.png')} />
          <Text style={styles.flextext}>Pickup Sukses</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/listPickUpFail" asChild>
        <TouchableOpacity style={styles.flexItem}>
        <Image source={require('../assets/box.png')} />
          <Text style={styles.flextext}>Gagal Pickup</Text>
        </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.flexItem}>
        <Image source={require('../assets/scan.png')} />
        <Text style={styles.flextext}>Scan Pickup</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ paddingLeft:10, fontSize:14, fontWeight:'bold' }}>Delivery</Text>
      <View style={styles.flexContainer}>
        <Link href="/listPickup" asChild>
          <TouchableOpacity style={styles.flexItem}>
            <Image source={require('../assets/mobil.png')} />
            <Text style={styles.flextext}>List Pickup</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/listPickUpSuccess" asChild>
          <TouchableOpacity   style={styles.flexItem}>
          <Image source={require('../assets/motor.png')} />
            <Text style={styles.flextext}>Pickup Sukses</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/listPickUpFail" asChild>
          <TouchableOpacity style={styles.flexItem}>
          <Image source={require('../assets/box.png')} />
            <Text style={styles.flextext}>Gagal Pickup</Text>
          </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.flexItem}>
          <Image source={require('../assets/scan.png')} />
          <Text style={styles.flextext}>Scan Pickup</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.flexContainer}>
      
      <TouchableOpacity style={styles.flexItem}>
      <Image source={require('../assets/papan.png')} />
      <Text style={styles.flextext}>POP Manual</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flexItem}>
      <Image source={require('../assets/sirine.png')} />
      <Text style={styles.flextext}>Emergency</Text>
      </TouchableOpacity>
      </View>
      <View style={{ flex:3 }}></View>
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
  searchContainer : {
    backgroundColor:'#FAF8ED',
    borderRadius:10,
    margin : 10,
  }, 
  flexContainer : {
    flex:3,
    flexDirection:'row', 
    flexWrap: 'wrap', 
    alignItems: 'flex-start' , 
    backgroundColor:'#FAF8ED', 
    padding:10, 
    margin:10, 
    borderRadius:20 ,
    minHeight : 60,
  },
  flexItem : {
    width:'20%', 
    padding:10, 
    margin:5, 
    borderColor:'#FF8080', 
    borderWidth:1, 
    borderRadius:10,
    alignItems:'center'
  },
  flextext : {
    fontSize:12,
    marginTop:5,
    minHeight:30
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#FF8080',
    borderRadius:5
  },
});
