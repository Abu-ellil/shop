import { View, Text,TouchableOpacity } from "react-native";
import styles from "../Style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

const SizesFilter = ({data}) => {
    const {
      product,
      price,
      setPrice,
      priceHandler,
      handleOptionSelect,
      focusedDropdownIndex,
      handleFocus,
      handleBlur,
      handleSizeChange,
      selectedSizes,
      handleAddSize
    } = data;
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.pickerItem}
            onPress={handleOptionSelect}
          ></TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleAddSize(product)}
          style={styles.addDropDown}
        >
          <Ionicons style={{ fontSize: 20 }} name="add-outline"></Ionicons>
        </TouchableOpacity>
      </View>

      {product.sizes.map((sizesArray, index) => (
        <View style={styles.container} key={index}>
          <View
            style={[
              styles.dropdown,
              focusedDropdownIndex === index && {
                borderColor: "orange",
                borderWidth: 1,
                backgroundColor: "white",
              },
            ]}
          >
            <ModalDropdown
              style={styles.dropdownItem}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              data={sizesArray.map((size) => ({
                label: size,
                value: size,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select size"
              value={selectedSizes[index] || ""}
              onChange={(item) => handleSizeChange(item, index)}
              renderRightIcon={() => null}
              renderLeftIcon={() => (
                <Ionicons
                  style={styles.icon}
                  name={
                    focusedDropdownIndex === index
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                />
              )}
              iconColor="#0000008D"
              renderItem={(item) => {
                return (
                  <View style={styles.item}>
                    <Text
                      style={[
                        styles.textItem,
                        selectedSizes[index] === item.label && {
                          borderRightColor: "orange",
                          borderRightWidth: 3,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default SizesFilter;
