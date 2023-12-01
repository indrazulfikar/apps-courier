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
        <Text style={{ paddingLeft:10, fontSize:14, fontWeight:'bold' }}>Pick Up</Text>
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
          <TouchableOpacity style={styles.contentItem}>
            <Image source={require('../assets/scan.png')} />
            <Text style={styles.contentText}>Scan Pickup</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBackground }>
        <Text style={{ paddingLeft:10, fontSize:14, fontWeight:'bold' }}>Delivery</Text>
        <View style={styles.contentList}>
          <Link href="/listPickup" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/mobil.png')} />
              <Text style={styles.contentText}>List Delivery</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpSuccess" asChild>
            <TouchableOpacity   style={styles.contentItem}>
              <Image source={require('../assets/motor.png')} />
              <Text style={styles.contentText}>Delivery Sukses</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpFail" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={require('../assets/box.png')} />
              <Text style={styles.contentText}>Delivery Gagal</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={require('../assets/scan.png')} />
            <Text style={styles.contentText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBackground }>
      <Text style={{ paddingLeft:10, fontSize:14, fontWeight:'bold' }}></Text>
        <View style={{ flex:1, flexDirection:'row', }}>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={require('../assets/papan.png')} />
            <Text style={styles.contentText}>POP Manual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={require('../assets/sirine.png')} />
            <Text style={styles.contentText}>Emergency</Text>
          </TouchableOpacity>
        </View>
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
    flex:3,
    padding:5, 
    margin:10,
    borderRadius:20,
    backgroundColor:'#FAF8ED', 
  },
  contentList  : {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  contentItem : {
    padding:5, 
    margin:5, 
    borderColor:'#FF8080', 
    borderWidth:1, 
    borderRadius:10,
    alignItems:'center'
  },
  contentText : {
    fontSize:12,
    marginTop:5,
  },
});
