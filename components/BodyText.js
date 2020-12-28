import React from 'react';
import { Text , StyleSheet, Dimensions } from 'react-native';

const BodyText = props => {
    return (
   <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
body: {
    fontFamily: 'open-sans-bold',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 17    
}

});

export default BodyText;