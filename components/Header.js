import React, { Component } from 'react'
import { View , Text , StyleSheet } from 'react-native'
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
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
    },
    headerTitle:{
        color: colors.acccent2,
        fontSize: 18

    }
});

export default Header;


