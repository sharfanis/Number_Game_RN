import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../SharedComponent/Card";
import colors from "../constants/colors";
import Input from "../SharedComponent/Input";
import NumberContainer from "../SharedComponent/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmedValue] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth , setButtonWidth] = useState(Dimensions.get('window').width / 4);

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

  // To have only one event listener , because there is always a new listener when orientation changes we can use useEffect.

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    //ADD a listenner
    Dimensions.addEventListener('change' , updateLayout);

    return () => {
     Dimensions.removeEventListener('change' , updateLayout);
    
    }
  });

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
          <MainButton onPress={() => props.onStartGame(selectedNumber)}>
            START GAME
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.screen}>
            <BodyText
              style={{ color: "black", fontSize: 30, marginVertical: 20 }}
            >
              Start a New Game
            </BodyText>
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
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    onPress={resetInput}
                    color={Colors.acccent2}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    // Since its only width for these styles , use the above logic of updateWidth so that the code changes 
    // the width of buttons everytime the orientation changes.
     //width: Dimensions.get("window").width / 4,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
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
    fontFamily: "open-sans-bold",
  },
});
