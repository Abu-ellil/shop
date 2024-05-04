import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "../components/mainStyles";
import ColorFilter from "./ColorFilter";
import ImageFilter from "./ImageFilter";
import { Image } from "react-native";
import { ScrollView } from "react-native";

const FilterCard = ({ filterList }) => {
  const [colorPickerOn, setColorPickerOn] = useState(false);
  const handleCloseColorPicker = () => {
    if (colorPickerOn) {
      setColorPickerOn(false);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={handleCloseColorPicker}
      style={{ backgroundColor: "#444" }}
    >
      <View style={styles.productCard}>
        <View style={styles.productCardTop}>
          <ImageFilter filterList={filterList} />
          <ColorFilter
            filterList={filterList}
            colorPickerOn={colorPickerOn}
            setColorPickerOn={setColorPickerOn}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilterCard;
