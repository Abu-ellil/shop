import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddDropDown = () => {
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => {}} style={styles.addDropDown}>
        <Ionicons style={{ fontSize: 20 }} name="add-outline"></Ionicons>
      </TouchableOpacity>

      <View style={StyleSheet.dropdown}>
        <TouchableOpacity
          style={styles.pickerItem}
          onPress={() => handleOptionSelect()}
        ></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addDropDown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle:"dashed",
    paddingVertical: 6,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight:10,
    borderRadius:8
  },
});
export default AddDropDown;
