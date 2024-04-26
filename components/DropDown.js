import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";



const DropdownComponent = ({ product }) => {
  // console.log(product.sizes);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
console.log(product);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <View
            style={styles.icon}
            height={30}
            borderRightWidth={3}
            borderColor="orange"
            marginLeft={10}
            alignItems="flex-start"
          />
        )}
      </View>
    );
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "orange", borderColor: "orange" },
          ]}
        >
          {product.sizes[value - 1]?.label}
          {console.log(product.sizes[value - 1]?.label)}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.dropdown, isFocus && { borderColor: "orange" }]}>
        {renderLabel()}
        <Dropdown
          style={styles.dropdownItem}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={product.sizes}
          maxHeight={300}
          valueField="value"
          placeholder=""
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdownItem: {
    width: 70,
    height: 35,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 35,
  },
  dropdown: {
    marginRight: 6,
    width: 75,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    paddingRight: 4,
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "space-around",
  },
  label: {
    zIndex: 999,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "400",
  },
  item: {
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
});
