import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { theme } from "../../../assets/theme";
import ColorPicker from "react-native-wheel-color-picker";

export default function ColorsFilter({ data }) {
  const {
    product,
    addColor,
    currentColor,
    setCurrentColor,
    swatchesOnly,
    setSwatchesOnly,
    colorPickerOn,
    setColorPickerOn,
    chosenColorIndex,
    setChosenColorIndex,
  } = data;

  const pickerRef = useRef(null);

  const handleColorPress = (index) => {
    setChosenColorIndex(index);
  };
  const onColorChange = (color) => {
    setCurrentColor(color);
  };
  const onColorChangeComplete = (color) => {
    setOldColor(color);
    setColorSelectionMade(true);
  };

  return (
    <View style={styles.colorContainer}>
      <View style={styles.colors}>
        {colorPickerOn && (
          <View style={styles.colorPickerContainer}>
            {colorPickerOn && (
              <View style={styles.colorPickerContainer}>
                <ColorPicker
                  ref={pickerRef}
                  color={currentColor}
                  swatchesOnly={swatchesOnly}
                  onColorChange={onColorChange}
                  onColorChangeComplete={() => {}}
                  thumbSize={40}
                  sliderSize={40}
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
                  onPress={() => {
                    setColorSelectionMade();
                  }}
                />
                {/* Button */}
                <TouchableOpacity
                  style={styles.chosenColor}
                  onPress={() => {
                    addColor(product);
                    setColorPickerOn(false);
                  }}
                >
                  <Text>Add Selected Color</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <Text style={[theme.fontFamily, styles.text]}>اختر اللون</Text>
        <View style={styles.colorList}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleColorPress(index)}
              style={[
                styles.colorCircle,
                index === chosenColorIndex && styles.chosenColorCircle,
                { backgroundColor: color },
              ]}
            ></TouchableOpacity>
          ))}
          <View style={styles.addColorContainer}>
            <View style={styles.addColorButton}>
              <View style={[]}></View>
              <Ionicons
                onPress={() => {
                  setColorPickerOn(!colorPickerOn);
                }}
                style={{ fontSize: 18 }}
                name="add-outline"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
