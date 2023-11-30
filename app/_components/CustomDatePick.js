import React, {useState} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Icon } from '@rneui/themed';

const CustomDatePick = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button type="outline" onPress={showPicker}  buttonStyle={styles.pickButton} titleStyle={styles.pickTitle} containerStyle={styles.containerStyle}
        icon={{
            name: 'calendar',
            type: 'font-awesome',
            size: 25,
            color: 'red',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 20 }}
        >
            {date.toLocaleDateString('id-ID', {month: 'short', day:'2-digit', year :'numeric' })}
        </Button>
    </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
        //   is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    pickContainer : {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    pickButton : {
        borderColor : 'red',
        borderWidth : 3,
        borderRadius : 10
    },
    pickTitle : {
        color : 'grey',
    }
});
    
export default CustomDatePick;