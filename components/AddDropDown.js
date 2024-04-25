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
    borderColor: "gray",
    borderStyle:"dashed",
    paddingVertical: 3,
    paddingHorizontal: 20,
    width:75,
    height:35,
    alignItems: "center",
    justifyContent: "center",
    marginRight:4,
    borderRadius:6
  },
});
export default AddDropDown;
