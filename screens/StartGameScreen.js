import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../SharedComponent/Card";
import colors from "../constants/colors";
import Input from "../SharedComponent/Input";
import NumberContainer from "../SharedComponent/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmedValue] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    // setEnteredValue((parseInt(inputtext)).replace(/[^0-9]/g, ''));
    // console.log('the input text', inputText.toString().replace(/[^0-9]/g, ''));
    setEnteredValue(inputText);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const resetInput = () => {
    setEnteredValue("");
    setConfirmedValue(false);
  };

  const confirmInputHandler = () => {
    //console.log('the ent ', enteredValue);
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //Add an alert
      Alert.alert("Invalid Number Detected", "Number has to between 1 and 99", [
        { text: "Dismiss", style: "destructive", onPress: resetInput },
      ]);
      return;
    }
    setConfirmedValue(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    //  console.log('selected no', selectedNumber);
    confirmedOutput = (
      <Card style={styles.confirmedNumberContainer}>
        <BodyText>Chosen No:</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View style={styles.textFont}>
          {/* <Button title="START GAME" onPress ={() => props.onStartGame(selectedNumber)} /> */}
          <MainButton onPress ={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.screen}>
        <BodyText style={{color: 'black', fontSize: 30, marginVertical: 20}}>Start a New Game</BodyText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>

          <Input
            style={styles.inputStyle}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />

          <View style={styles.buttonStyleContainer}>
            <View style={styles.buttonStyle}>
              <Button
                color={colors.accent}
                title="RESET"
                onPress={resetInput}
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                color={colors.accent2}
                title="CONFIRM"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonStyleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderColor: "yellow",
    height: 40,
    width: 100,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  inputStyle: {
    width: 70,
    textAlign: "center",
  },
  confirmedNumberContainer: {
    width: 250,
    backgroundColor: "#fffbf3",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    shadowColor: "purple",
  },
  textFont: {
    color: "blue",
    fontFamily: "ArialHebrew-Bold",
  },
});
