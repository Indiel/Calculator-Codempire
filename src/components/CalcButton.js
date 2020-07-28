import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CalcButton = ({ text, background, width, func }) => {
  return (
    <TouchableOpacity 
      onPress={() => func(text)}
      style={[styles.button, { width: width || "21%", backgroundColor: background || "#333333"}]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CalcButton;

const styles = StyleSheet.create({
  button: {
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderRadius: 50,
  },
  text: {
    color: "#ffffff",
    fontSize: 30,
  },
});
