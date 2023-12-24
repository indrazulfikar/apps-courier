import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, useWindowDimensions } from 'react-native';
import { Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useState} from 'react';

//icons 
import mobil from '../assets/mobil.png';
import mobilb from '../assets/mobil2.png';
import motor from '../assets/motor.png';
import box from '../assets/box.png';
import boxgagal from '../assets/boxgagal.png';
import dikirimkurir from '../assets/dikirimkurir.png';
import scan from '../assets/scan.png';
import sirine from '../assets/sirine.png';
import pending from '../assets/pending.png';

export default function home() {

  const windowHeight = useWindowDimensions().height

  return (
    <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }] }>
    
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.searchContainer }>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Cari Paket"
        />
      </View>

      <ScrollView style={styles.contentBackground }>

        <View style={styles.contentList}>
          <Link href="/listPickup" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={mobil} style={styles.iconImage}/>
              <Text style={styles.contentText}>List Pickup</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpSuccess" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={motor} />
              <Text style={styles.contentText}>Pickup Sukses</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listPickUpFail" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={box} />
              <Text style={styles.contentText}>Gagal Pickup</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.contentList}>
          <Link href="/listDelivery" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={mobilb} />
              <Text style={styles.contentText}>List Delivery</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listDeliverySuccess" asChild>
            <TouchableOpacity   style={styles.contentItem}>
              <Image source={dikirimkurir} />
              <Text style={styles.contentText}>Delivery Sukses</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listDeliveryFail" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={boxgagal} />
              <Text style={styles.contentText}>Delivery Gagal</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.contentList}>
          <Link href="/listDeliveryPending" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={pending} />
              <Text style={styles.contentText}>Paket Pending</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/scanMenu" asChild>
            <TouchableOpacity style={styles.contentItem}>
              <Image source={scan} />
              <Text style={styles.contentText}>Scan AWB</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={sirine} />
            <Text style={styles.contentText}>Emergency</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    <Footer />
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
    height:'10%',
  },
  searchContainer : {
    backgroundColor:'#FAF8ED',
    borderRadius:10,
    marginHorizontal : 10,
    height:'10%',
    justifyContent:'space-around'
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#FF8080',
    borderRadius:5
  },
  contentBackground : {
    height:'70%',
    padding:10, 
    margin:15,
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
    justifyContent:'space-evenly',
    width:'30%'
  },
  iconImage:{
    resizeMode : 'contain'
  },
  contentText : {
    fontSize:12,
    marginTop:5,
    width:90,
    textAlign:'center'
  },
});
