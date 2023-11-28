import { Tab, Icon} from '@rneui/themed';
import React from 'react';
import {
StyleSheet
} from 'react-native';

const Footer = (props) => {
    const [index, setIndex] = React.useState(0);
    return(
    <Tab value={index} onChange={setIndex}  dense style={styles.tabstyle}>
        <Tab.Item><Icon type="MaterialIcons" name="qr-code-scanner" color="grey" size={30}/></Tab.Item>
        <Tab.Item><Icon type="antdesign" name="bells" color="grey" size={30}/></Tab.Item>
        <Tab.Item><Icon type="antdesign" name="user" color="grey" size={30}/></Tab.Item>
    </Tab>
    );
}

const styles = StyleSheet.create({
    tabstyle : {
        backgroundColor: '#FAF8ED',
    }
});
    
export default Footer;