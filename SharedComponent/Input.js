import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <TextInput
      {...props} //this will allow us to set the props from outside and set just like what wedid with style
      style={{ ...styles.InputStyle, ...props.style }}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  InputStyle: {
    //padding: 10,
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
