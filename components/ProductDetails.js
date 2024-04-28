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
} from "react-native"; // Import ActivityIndicator
import { Dropdown } from "react-native-element-dropdown";
import ColorPicker from "react-native-wheel-color-picker";
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
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [discountAmount, setDiscountAmount] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState(["M", "L", "XL",""]);
  const [focusedDropdownIndex, setFocusedDropdownIndex] = useState(null);
  const [price, setPrice] = useState(null);

  const handleFocus = (index) => {
    setFocusedDropdownIndex(index);
  };

  const handleBlur = () => {
    setFocusedDropdownIndex(null);
  };

  useEffect(() => {
    setProducts(productsList);
    console.log(products);
  }, [productsList]);

  const handleColorPress = (index) => {
    setChosenColorIndex(index);
  };

  const handleAddSize = (object) => {
    if(object.sizes.length <7){
       const newSizes = [...object.sizes];
    newSizes.push(["S", "M", "L", "XL",""]); // Push new sizes to the copied array
    object.sizes = newSizes; // Update the sizes in the object
    console.log("Updated sizes:", newSizes);
    // Update the state with the modified object
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === object.id ? object : p))
    );
    }
   
  };


  const handleSizeChange = (item, index) => {
    const updatedSelectedSizes = [...selectedSizes];
    updatedSelectedSizes[index] = item.value;
    setSelectedSizes(updatedSelectedSizes);
  };
  const handleOptionSelect = () => {
    console.log(option);
  };
  // Handel color sellection
  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const onColorChangeComplete = (color) => {
    setOldColor(color);
    setColorSelectionMade(true);
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
      aspect: [4, 4],
      quality: 1,
    });

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
                            <Text>Add Selected Color</Text>
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
                  onPress={() => handleAddSize(product)}
                  style={styles.addDropDown}
                >
                  <Ionicons
                    style={{ fontSize: 20 }}
                    name="add-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>

              {/* Dropdown for selecting size */}
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
                    <Dropdown
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
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterRight}>
                <Text style={[theme.fontFamily, styles.text]}>الكمية</Text>
                <TextInput style={styles.quantity} placeholder="50   " />
              </View>
              <View style={styles.cardFooterLeft}>
                <Text style={[theme.fontFamily, styles.text]}>
                  سعر اللون الاول
                </Text>

               {true ? ( <View style={styles.price}>
                  <View style={styles.priceText}>
                    <Ionicons
                      style={styles.priceIcon}
                      name={
                        isFocus ? "caret-down-outline" : "caret-down-outline"
                      }
                    >
                      <Text>Shekel()</Text>
                    </Ionicons>
                  </View>

                  <Text>{product.price}</Text>
                </View>)
:
                (<View style={styles.price}>
                  <View style={styles.priceText}>
                    <Ionicons
                      style={styles.priceIcon}
                      name={
                        isFocus ? "caret-down-outline" : "caret-down-outline"
                      }
                    >
                      <Text>Shekel()</Text>
                    </Ionicons>
                  </View>

                  <Text>{price}</Text>
                </View>)}

                {/* Add the discount modal here */}
              </View>
            </View>

            {!price ? (
              <TouchableOpacity
                style={styles.discount}
                onPress={() => {
                  toggleDiscountModal();
                  handleAddDiscount(product);
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
            ) : (
              <TouchableOpacity
                style={styles.discount}
                onPress={() => {
                  handleAddDiscount(product);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.orangy,
                    fontFamily: theme.fontFamily.fontFamily,
                  }}
                >
                  حذف الخصم
                </Text>

                <Ionicons
                  style={{
                    fontSize: 18,
                    color: theme.colors.orangy,
                    paddingLeft: 10,
                  }}
                  name="trash-outline"
                ></Ionicons>
              </TouchableOpacity>
            )}

            {discountModalVisible && (
              <View
                visible={discountModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleDiscountModal}
              >
                {/* Modal content */}
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {/* Add inputs for discount amount */}
                    <TextInput
                      placeholder="Discount (%)"
                      value={discountAmount}
                      onChangeText={setDiscountAmount}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {/* Add buttons to apply or cancel the discount */}
                    <TouchableOpacity
                      onPress={handleAddDiscount}
                      style={styles.addButton}
                    >
                      <Text>Add Discount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleDiscountModal}
                      style={styles.closeButton}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
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
    minHeight: 200,
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
    borderColor: "orange",
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
    width: "100%",
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    marginLeft: 25,
    marginTop: 25,
    backgroundColor: "#F8F7FAF1",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 168,
    height: 172,
    resizeMode: "contain",
    borderRadius: 8,
  },

  text: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.dark,
    paddingBottom: 19,
    flex: 1,
  },

  addImageButton: {
    position: "absolute",
    width: 27,
    height: 27,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.light,
    alignItems: "center",
    justifyContent: "center",
    bottom: 8,
    left: 15,
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
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
  },
  cardFooterLeft: {
    flex: 1,

    paddingRight: 40,
    alignItems: "flex-end",
    paddingLeft: 40,
  },
  price: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  priceText: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  discount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  dropdownItem: {
    width: 90,
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
    padding: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
    fontSize: 18,
  },
  priceIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    // fontSize: 18,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default ProductDetails;
