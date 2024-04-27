import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ColorPicker from "react-native-wheel-color-picker";
import RNPickerSelect from "react-native-picker-select";
import { theme } from "../assets/theme";

const ProductDetails = ({ productsList }) => {
  const pickerRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [colorPickerOn, setColorPickerOn] = useState(false);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [chosenColorIndex, setChosenColorIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);



  const [sizes, setSizes] = useState([]);

  // DropDown Menu Stuff``

  const placeholder = {
    label: "Select",
    value: null,
  };

  const option = [
    [
      { label: "S", value: "1" },
      { label: "M", value: "2" },
      { label: "L", value: "3" },
      { label: "XL", value: "4" },
    ],
  ];


  const handleAddSize = () => {
    const newSizes = [...sizes];
    // const newValue = (parseInt(sizes[sizes.length - 1].value) + 1).toString();
    newSizes.push(option);
    // options.push(
    //   { label: "S", value: "1" },
    //   { label: "M", value: "2" },
    //   { label: "L", value: "3" },
    //   { label: "XL", value: "4" }
    // );
    setSizes(newSizes);
    console.log(newSizes);
   
  };
  const handleOptionSelect = () => {};
  // Handel color sellection
    const handleColorPress = (index) => {
      setChosenColorIndex(index);
    };
  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const onColorChangeComplete = (color) => {
    setOldColor(color);
    setColorSelectionMade(true); // Mark that a color selection has been made
  };

  const addColor = (product) => {
    if (currentColor !== undefined) {
      const updatedProducts = [...products];
      const updatedProduct = updatedProducts.find((p) => p.id === product.id);
      updatedProduct.colors = [...updatedProduct.colors, currentColor];
      setProducts(updatedProducts);
      setCurrentColor("#ffffff");
      setColorPickerOn(false);
    } else {
      console.log("Please select a color first.");
    }
  };

  // const renderItem = (item) => {

  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.textItem}>{item.label}</Text>
  //       {item.value === value && (
  //         <View
  //           style={styles.icon}
  //           height={30}
  //           borderRightWidth={3}
  //           borderColor="orange"
  //           marginLeft={10}
  //           alignItems="flex-start"
  //         />
  //       )}
  //     </View>
  //   );
  // };

  // const renderLabel = (option) => {
  //   console.log("option: ", option);
  //   if (value || isFocus) {
  //     return (
  //       <Text
  //         style={[
  //           styles.label,
  //           isFocus &&
  //             option.value === value && {
  //               color: "orange",
  //               borderColor: "orange",
  //             },
  //         ]}
  //       >
  //         {option.label}
  //         {/* {console.log(option.label)} */}
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  const pickImage = async (productId) => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.cancelled) {
      const updatedProducts = products.map((product) =>
        product.id === productId
          ? { ...product, imageUri: result.assets[0].uri }
          : product
      );
      setProducts(updatedProducts);
    }
  };

  const handleAddImage = (productId) => {
    pickImage(productId);
  };

  return (
    <View style={styles.container}>
      {products.map((product) => {
        return (
          <View style={styles.productCard} key={product.id}>
            <View style={styles.productCardTop}>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.addImageButton}
                  onPress={() => handleAddImage(product.id)}
                >
                  <Ionicons
                    style={{ fontSize: 18, color: "#fff" }}
                    name="add-outline"
                  ></Ionicons>
                </TouchableOpacity>
                {product.imageUri && (
                  <Image
                    style={styles.image}
                    source={{ uri: product.imageUri }}
                    resizeMode="contain"
                  />
                )}
              </View>
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
                            <Text>Add</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}

                  <Text style={[theme.fontFamily, styles.text]}>
                    اختر اللون
                  </Text>
                  <View style={styles.colorList}>
                    {product.colors.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleColorPress(index)}
                        style={[
                          styles.colorCircle,
                          index === chosenColorIndex &&
                            styles.chosenColorCircle,
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
            </View>
            <View>
              <Text style={[theme.fontFamily, styles.text]}>
                حدد الاحجام المتاحة من المنتج
              </Text>
            </View>
            <View style={styles.optionsContainer}>
              <View style={styles.dropdownContainer}>
                {/* Dropdown for adding new size */}
                <View style={StyleSheet.dropdown}>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={handleOptionSelect}
                  ></TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleAddSize}
                  style={styles.addDropDown}
                >
                  <Ionicons
                    style={{ fontSize: 20 }}
                    name="add-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>

              {/* Dropdown for selecting size */}
              {sizes.map((option, index) => (
                <View style={styles.container} key={index}>
                  <View
                    style={[
                      styles.dropdown,
                      // isFocus && { borderColor: "orange" },
                    ]}
                  >
                    <View>
                      <Text>+:</Text>
                      <RNPickerSelect
                        key={(value) => setSelectedValue(value)}
                        placeholder={placeholder}
                        items={sizes}
                        onValueChange={(value) => setSelectedValue(value)}
                        value={selectedValue?.value} // Use optional chaining
                      />
                      {selectedValue && <Text> {selectedValue}</Text>}
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterLeft}>
                <Text style={[theme.fontFamily, styles.text]}>الكمية</Text>
                <TextInput style={styles.quantity} placeholder="Quantity" />
              </View>
              <View style={styles.cardFooterRight}>
                <Text style={[theme.fontFamily, styles.text]}>
                  سعر اللون الاول
                </Text>

                <View style={styles.price}>
                  <TextInput placeholder="Price" />
                  <Dropdown
                    style={styles.dropdownItem}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={product.price.currency}
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
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.discount}
              onPress={() => {
                addDiscount(product);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.orangy,
                  fontFamily: theme.fontFamily.fontFamily,
                }}
              >
                إضافة خصم
              </Text>

              <Ionicons
                style={{
                  fontSize: 18,
                  color: theme.colors.orangy,
                  paddingLeft: 10,
                }}
                name="add-circle-outline"
              ></Ionicons>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: theme.colors.light,
    borderRadius: 12,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  productCardTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingVertical: 10,
    flex: 1,
    marginBottom: 20,
  },
  colorContainer: {
    width: "45%",
    marginLeft: 3,
    alignItems: "flex-end",
  },
  colors: {
    width: "80%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  colorList: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },

  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginBottom: 10,
  },
  chosenColorCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "yellow",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 9,
  },
  colorPickerContainer: {
    position: "absolute",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#D4D0D0",
    width: 180,
    height: 350,
    right: 50,
    zIndex: 1000,
  },
  chosenColor: {
    width: 45,
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    marginRight: 10,
    backgroundColor: "#F8F7FAF1",
  },
  addButton: {
    backgroundColor: "#ccc",
    fontSize: 16,
    zIndex: 1011,
  },
  imageContainer: {
    height: 200,
    width: "100%",
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    backgroundColor: "#0553",
  },

  text: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.dark,
    paddingBottom: 19,
    flex: 1,
  },

  addImageButton: {
    position: "absolute",
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.light,
    alignItems: "center",
    justifyContent: "center",
    bottom: 14,
    left: 14,
    zIndex: 1000,
  },
  addColorButton: {
    width: 35,
    height: 35,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },

  productCardBottom: {
    backgroundColor: theme.colors.gray,
    borderRadius: 12,
    flex: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },

  cardFooter: {
    flexDirection: "row",
  },
  cardFooterRight: {
    flex: 2,
  },
  cardFooterLeft: {
    flex: 1,
  },
  price: {
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.light,
    borderRadius: 6,
    padding: 12,
  },
  quantity: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.light,
    borderRadius: 6,
    padding: 18,
  },

  discount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  dropdownItem: {
    width: 70,
    height: 35,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dropdown: {
    marginRight: 6,
    width: 80,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 22,
    paddingLeft: 10,
  },

  addDropDown: {
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
    paddingVertical: 3,
    paddingHorizontal: 20,
    width: 75,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    borderRadius: 6,
    marginBottom: 22,
  },
  optionsContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
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

export default ProductDetails;
