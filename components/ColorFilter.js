import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { theme } from "../assets/theme";
import styles from "../components/mainStyles";
import { FlatList } from "react-native";

const ColorFilter = ({
  filterList,
  addColor,
  colorPickerOn,
  setColorPickerOn,
}) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [chosenColorIndex, setChosenColorIndex] = useState(null);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const pickerRef = useRef(null);

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const addColorHandler = (product) => {
    if (currentColor !== undefined) {
      addColor(product, currentColor);
      setCurrentColor("#ffffff");
      setColorPickerOn(false);
    } else {
      console.log("Please select a color first.");
    }
  };

  const handleColorPress = (index) => {
    setChosenColorIndex(index);
  };

  const handlePickerToggle = () => {
    setColorPickerOn(!colorPickerOn);
  };

  return (
    <View style={styles.colorContainer}>
      <View style={styles.colors}>
        {colorPickerOn && (
          <TouchableWithoutFeedback>
            <View style={styles.colorPickerContainer}>
              <ColorPicker
                ref={pickerRef}
                color={currentColor}
                swatchesOnly={swatchesOnly}
                onColorChange={onColorChange}
                thumbSize={30}
                sliderSize={10}
                noSnap={true}
                row={false}
                swatchesLast={false}
                swatches={true}
                discrete={false}
                wheelLodingIndicator={
                  <ActivityIndicator size={40} color="#0000ff" />
                }
                sliderLodingIndicator={
                  <ActivityIndicator size={20} color="#0000ff" />
                }
                useNativeDriver={false}
                useNativeLayout={false}
                style={styles.colorPicker}
              />
              <TouchableOpacity
                style={styles.chosenColor}
                onPress={() => {
                  addColorHandler(product);
                  setColorPickerOn(false);
                }}
              >
                <Text>Add Selected Color</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}

        <Text style={[theme.fontFamily, styles.text]}>اختر اللون</Text>
        <View style={styles.colorList}>
          {filterList.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleColorPress(index)}
              style={[
                { backgroundColor: filter.color.value },
                styles.colorCircle,
                index === chosenColorIndex && styles.chosenColorCircle,
              ]}
            ></TouchableOpacity>
          ))}

          <View style={styles.addColorContainer}>
            <View style={styles.addColorButton}>
              <View style={[]}></View>
              <Ionicons
                onPress={handlePickerToggle}
                style={{ fontSize: 18 }}
                name="add-outline"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorFilter;
