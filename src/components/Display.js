import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Display = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: '28%',
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    color: "#ffffff",
    fontSize: 60,
  },
});