import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over! </Text>
      <Text>It took you total of {props.rounds} rounds :)</Text>
      <Text>Number was: {props.userNumber}</Text>
      <View style={styles.newGameBtn}>
      <Button color="white" title="ANOTHER GAME BABE" onPress={props.onRestart}/>
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
  screen:{
      flex: 1,
      padding: 10,
      justifyContent:'center',
      alignItems:'center'
  },
  newGameBtn:{
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors.fbColor,
      height: 40,
      width: 260,
  }
});
