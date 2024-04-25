import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../assets/theme";

const CustomDropdown = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [style, setStyle] = useState(theme.notActive);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setStyle(isDropdownOpen ? theme.notActive : theme.active);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    const updatedStyle = options.map((opt) =>
      opt === option ? theme.active : theme.notActive
    );
    setStyle(updatedStyle);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={''}
      
      >
        <View>
          <Text>{selectedOption || ""}</Text>
        </View>
        <View>
          <Ionicons
            style={[styles.dropDownIcon, { fontSize: 20 }]}
            name={
              "chevron-down-outline"
              // options[0] === "M" ? "chevron-down-outline" : "caret-down-outline"
            }
          />
        </View>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {product.price.currency.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.pickerItem, style]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.option}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 4,
    marginBottom: 10,
    position: "relative",
    zIndex:1
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.dark,
    backgroundColor: "#fff",
    borderRadius: 6,
    zIndex: 10,
  },
  pickerItem:{
    zIndex:11
  },
  option: {
    // paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontWeight: "500",
  },
});

export default CustomDropdown;
