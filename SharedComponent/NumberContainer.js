import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const numberContainer = (props) => {
  return (
    <View>
      <Text style={{ ...styles.textFont, color: colors.fbColor, fontSize: 37 }}>
        {props.children}
      </Text>
    </View>
  );
};

export default numberContainer;

const styles = StyleSheet.create({
  textFont: {
    color: "blue",
    fontFamily: "open-sans-bold",
  },
});
