import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import NumberContainer from "../SharedComponent/NumberContainer";
import Card from "../SharedComponent/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import numberContainer from "../SharedComponent/NumberContainer";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentState] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const [availableDeviceWidth , setDeviceWidth] = useState(Dimensions.get('window').width);

  const [availableDeviceHeight , setDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // Array Destructuring .
  const { userChoice, onGameOver } = props;



  useEffect(() => {

   const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
      setDeviceWidth(Dimensions.get('window').width);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });



  // Runs after every render cycle , well this will only run when opnly userChoce or
  //OnGameOVer will change
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie Babe!!", "You know this is wrong", {
        text: "Sorry",
        style: "destructive",
      });
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentState(nextNumber);
    //setRounds((rounds) => rounds + 1);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  };

  let listContainerReal = styles.listContainer;

  // if (Dimensions.get("window").width > 350) {
  //   listContainerReal = styles.listContainerBig;
  // } or
if (availableDeviceWidth > 350) {
    listContainerReal = styles.listContainerBig;
  }


  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            style={{ backgroundColor: "orange" }}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            style={{ backgroundColor: "orange" }}
            onPress={nextGuessHandler.bind(this, "higher")}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        {/* Logic for listContainer is mentioned above , it's conditional for different devices. */}
        <View style={listContainerReal}>
          <ScrollView contentContainerStyle={styles.listVal}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          style={{ backgroundColor: "orange" }}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          style={{ backgroundColor: "orange" }}
          onPress={nextGuessHandler.bind(this, "higher")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      {/* Logic for listContainer is mentioned above , it's conditional for different devices. */}
      <View style={listContainerReal}>
        <ScrollView contentContainerStyle={styles.listVal}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  controls:{
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
    //width: Dimensions.get('window').width < 350 ? '60%' : '80%',
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  listVal: {
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: "flex-end",
  },
});
