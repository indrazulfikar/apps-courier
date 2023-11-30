import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import {SelectList} from 'react-native-dropdown-select-list';
import { useState } from 'react';

export default function listPickup() {
  const [selected, setSelected] = useState('');
  const data = [
    // {key:'1', value:'Seller', disabled:true},
    {key:'1', value:'Seller'},
    {key:'2', value:'Kelurahan'},
  ];

    const dummy = [
        {
          name: 'Pasti_Laku',
          subtitle: 'Kel. Karang Tengah'
        },
        {
          name: 'Jaya_Abadi',
          subtitle: 'Kel. Karang Pinggir'
        },
        {
          name: 'Seller_ID',
          subtitle: 'Kel. Karang Mulya'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
        {
          name: 'Parfum_ON',
          subtitle: 'Kel. Karang Mangu'
        },
      ]

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header/>
          </View>

          <View style={styles.headerChild}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
            <View style={styles.dropdownContainer}>
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder='Urutkan'
                dropdownStyles={{ zIndex:999, minHeight:100, backgroundColor : 'white' }}
                boxStyles={{ margin:10, borderColor:'red' }}
              />
            </View>
          </View>

          <View style={styles.totalContainer}><Text style={styles.totalText}>Total : 25 Seller</Text></View>
          
          <Divider
            style={{margin: 5 }}
            color="red"
            width={2}
            orientation="horizontal"
          />

          <View style={styles.listContainer}>
            <ScrollView>
              {
                dummy.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={TouchableOpacity} >
                    <ListItem.Content>
                      <ListItem.Title>{l.name}</ListItem.Title>
                      <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle ><Link href="/detailListPickup" asChild><Text style={{ color:'blue' }}>Detail</Text></Link></ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
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
    flex:1
  },
  totalContainer : {
    flex:1,
    margin:10
  },
  totalText : {
    fontSize:16, 
    fontWeight:'bold'
  },
  listContainer : {
    flex : 13,
  }
});