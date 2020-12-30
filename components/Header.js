import React, { Component } from 'react'
import { View , Text , StyleSheet , Platform } from 'react-native'
import colors from '../constants/colors';
import BodyText from './BodyText';

const Header = props => {
 return(
     <View style={styles.header}>
         <BodyText style={styles.headerTitle}>{props.title}</BodyText>
     </View>
 )

};


const styles = StyleSheet.create({
    header: {
    borderBottomColor: Platform.OS === 'ios' ?  '#ccc' : 'transparent' ,
    borderBottomWidth: Platform.OS === 'ios' ?  1 : 0 ,
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? colors.fbColor : colors.acccent2,
    alignItems: 'center',
    justifyContent: 'center'
    },
    headerTitle:{
        color: Platform.OS === 'android' ? colors.accent : colors.fbColor,
        fontSize: 18

    },
});

export default Header;


