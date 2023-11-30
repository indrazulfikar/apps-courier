import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Dialog, CheckBox, Input } from '@rneui/themed';

const CustomAccordion = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = useState(1);

    let data = props.data;

    const toggleModal = () => {
      setShowModal(!showModal);
    };

    return(
        <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title><Text style={{ color:'white' }}>{data.name}</Text></ListItem.Title>
            <ListItem.Subtitle><Text style={{ color:'white' }}>{data.id}</Text></ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
            setExpanded(!expanded);
        }}
        key={data.id}
        containerStyle={styles.host}
      >
        <ListItem key={data.id} containerStyle={styles.guest}>
          <ListItem.Content>
            <View style={{ flexDirection:'row' }}>
                <View style={{ flex:1 }}>
                    <Text>{data.address}</Text>
                    <Text>Telp. {data.phone}</Text>
                    <Text>Muatan : {data.weight} gram</Text>
                </View>
                <View><TouchableOpacity><Text onPress={toggleModal} style={{ color:'blue',  fontWeight:'bold' }}>Update</Text></TouchableOpacity></View>
                        <Dialog
              isVisible={showModal}
              // onBackdropPress={toggleModal}
            >
          <Dialog.Title title=""/>
          {['Dangerous Goods', 'Invalid Address', 'Packing Rusak', 'Paket Belum Siap', 'Alasan Lain'].map((l, i) => (
            <CheckBox
              key={i}
              title={l}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === i + 1}
              onPress={() => setChecked(i + 1)}
            />
          ))}
          { checked == 5 && <Input />}

          <Dialog.Actions>
            <Dialog.Button
              title="CONFIRM"
              onPress={() => {
                console.log(`Option ${checked} was selected!`);
                toggleModal();
              }}
            />
            <Dialog.Button title="CANCEL" onPress={toggleModal} />
          </Dialog.Actions>
          </Dialog>
            </View>
            <View style={styles.buttongroup}>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Call</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Chat</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>Navigasi</Text></TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    );
}

const styles = StyleSheet.create({
    host : {
        backgroundColor : '#ff0000',
        marginBottom : 5,
    },
    guest : {
        backgroundColor : '#F3EEEA',
        padding: 10,
    },
    button : {
        flex : 1,
        borderColor : 'white',
        borderWidth : 2,
        borderRadius : 10,
        padding : 10,
        backgroundColor : '#ff0000',
        margin : 5
    },
    buttongroup : {
        flexDirection : 'row',
        margin : 10,
    }
});
    
export default CustomAccordion;