import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../constants/colors";
import BodyText from "./BodyText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <BodyText
        style={{
          ...styles.headerTitle,
          ...Platform.select({
            ios: styles.headerTitleIOS,
            android: styles.headerTitleAndroid,
          }),
        }}
      >
        {props.title}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: colors.acccent2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.fbColor,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitleIOS: {
    color: colors.fbColor,
  },
  headerTitleAndroid: {
    color: colors.accent,
  },
  headerTitle: {
    fontSize: 18,
  },
});

export default Header;
