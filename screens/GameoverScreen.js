import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import constants from '../constants/colors';

const GameOverScreen = (props) => {
  return (
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
      <BodyText>It took you total of {props.rounds} rounds :)</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <View style={styles.newGameBtn}>
        <Button
          color="white"
          title="ANOTHER GAME BABE"
          onPress={props.onRestart}
        />
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  textFont: {
    color: "blue",
    fontFamily: "ArialHebrew-Bold",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    marginVertical: 30,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    width: '80%',
    height: 300,
    overflow: 'hidden'
  },
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newGameBtn: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: colors.fbColor,
    height: 40,
    width: 260,
  },
});
