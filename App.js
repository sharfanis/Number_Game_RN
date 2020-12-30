import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View ,SafeAreaView } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameoverScreen";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
    <AppLoading 
     startAsync= {fetchFonts} 
     onFinish= { () => setDataLoaded(true)}
     onError = { ()=> console.log(err) }
     /> 
    )
  }

  const configureNewGameHandler = props => {
    setGuessRounds(0);
    setuserNumber(null);    
  };

  const startGamehandler = (selectedNumber) => {
    setuserNumber(selectedNumber);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGamehandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} userNumber={userNumber}  onRestart= {configureNewGameHandler}/>;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess A Number !" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
