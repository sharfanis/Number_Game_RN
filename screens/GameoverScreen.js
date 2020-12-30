import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import constants from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText>The Game is Over! </BodyText>
        <View
          style={{
            marginVertical: availableDeviceWidth / 20,
            borderRadius: (availableDeviceWidth * 0.7) / 2,
            borderWidth: 3,
            borderColor: "black",
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              width: availableDeviceWidth > 500 ? "100%" : "100%",
              height: availableDeviceHeight > 600 ? "100%" : "100%",
            }}
            // source={require("../assets/success.png")}
            source={{ uri: constants.imageGameOver }}
            resizeMode="cover"
            fadeDuration={1000}
          />
        </View>
        {/* In general the styles are not passed down to the nested child elements , but the only excepttion
      in RN is for text , the parent Text element( BodyText) will drill down the all the styles to the child text elements too
      so any font color or font size change on the Body text will also reflect on the child elements. */}
        <BodyText>
          It took you total of{" "}
          <Text style={styles.highlight}>{props.rounds}</Text> rounds :) Number
          was: <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
        <View style={{ marginTop: (availableDeviceHeight * 0.7) / 14}}>
          <MainButton onPress={props.onRestart}>ANOTHER GAME BABE ?</MainButton>
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
  // image: {
  //   width: availableDeviceWidth > 500 ? "100%" : "100%",
  //   height: availableDeviceHeight > 600 ? "100%" : "100%",
  // },
  // imageContainer: {
  //   marginVertical: availableDeviceWidth / 20,
  //   borderRadius: (availableDeviceWidth * 0.7) / 2,
  //   borderWidth: 3,
  //   borderColor: "black",
  //   width: availableDeviceWidth * 0.7,
  //   height: availableDeviceWidth * 0.7,
  //   overflow: "hidden",
  // },
  highlight: {
    color: colors.primary,
    textAlign: "center",
  },
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newGameBtn: {
    // marginTop: (availableDeviceHeight * 0.7) / 14,
    // borderRadius: 8,
    // backgroundColor: colors.fbColor,
    // height: 40,
    // width: 260,
  },
});
