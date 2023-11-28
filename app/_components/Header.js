import React from 'react';
import {
StyleSheet
} from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = (props) => {


return (
  <SafeAreaProvider>
    <HeaderRNE
      leftComponent={{  }}
      rightComponent={{ text: 'kurir_pickup_zaenal', style: styles.heading } }
      centerComponent={{text : 'kirimdisini', style: styles.subheaderText}}
      backgroundColor = '#ff0000'
      placement = 'left'
    />
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
heading: {
  color: 'white',
  fontSize: 15,
//   fontWeight: 'bold',
  paddingTop:5,
  paddingBottom:5,
},
subheaderText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  paddingTop:5,
  paddingBottom:5,
},
});

export default Header;