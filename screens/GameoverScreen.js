import React from "react";
import { View, Text, StyleSheet, Button, Image , Dimensions ,ScrollView } from "react-native";
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import constants from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <BodyText>The Game is Over! </BodyText>
      <View style={styles.imageContainer}>
      <Image style={styles.image} 
            // source={require("../assets/success.png")} 
               source = {{uri: constants.imageGameOver}}
             resizeMode= 'cover'
             fadeDuration={1000}
      />
      </View>
      {/* In general the styles are not passed down to the nested child elements , but the only excepttion
      in RN is for text , the parent Text element( BodyText) will drill down the all the styles to the child text elements too
      so any font color or font size change on the Body text will also reflect on the child elements. */}
      <BodyText>
        It took you total of <Text style ={styles.highlight}>{props.rounds}</Text> rounds :)
        Number was: <Text style ={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
      <View style={styles.newGameBtn}>
        <MainButton
          onPress={props.onRestart}
        >ANOTHER GAME BABE ?</MainButton>
      </View>
     </View>
     </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  textFont: {
    color: "blue",
    fontFamily: "open-sans-bold",
  },
  image: {
    width: Dimensions.get('window').width > 500 ? '100%' : '100%',
    height: Dimensions.get('window').height > 600 ? '100%' : '100%',
  },
  imageContainer: {
    marginVertical: Dimensions.get('window').height / 20,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').height > 500 ? 300 : 200,
    height: Dimensions.get('window').height > 500 ? 300 : 200,
    overflow: 'hidden'
  },
   highlight:{
    color: colors.primary,
    textAlign: 'center'
  },
    screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newGameBtn: {
   marginTop : Dimensions.get('window').height * 0.7 / 14 ,
    // borderRadius: 8,
    // backgroundColor: colors.fbColor,
    // height: 40,
    // width: 260,
  },
});
