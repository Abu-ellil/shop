import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"; // Import ActivityIndicator
import { Dropdown } from "react-native-element-dropdown";
import { theme } from "../../assets/theme";
import DiscountFilter from "../discount/DiscountFilter";
import styles from "./Style";
import ColorsFilter from "./colors/ColorsFilter";

const ProductDetails = ({ productsList }) => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [colorPickerOn, setColorPickerOn] = useState(false);
  const [chosenColorIndex, setChosenColorIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [discountModalVisible, setDiscountModalVisible] = useState(true);
  const [discountAmount, setDiscountAmount] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState(["M", "L", "XL", ""]);
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
  }, [productsList]);

  const handleAddSize = (object) => {
    if (object.sizes.length < 7) {
      const newSizes = [...object.sizes];
      newSizes.push(["S", "M", "L", "XL", ""]); // Push new sizes to the copied array
      object.sizes = newSizes; // Update the sizes in the object

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
  const handleOptionSelect = () => {};
  // Handel color sellection

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

  const priceHandler = () => {
    console.log("priceHandler");
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

              <ColorsFilter
                data={{
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
                }}
              />
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
              <View style={styles.cardFooterLeft}>
                <Text style={[theme.fontFamily, styles.text]}>الكمية</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.quantity}
                  placeholder="50   "
                />
              </View>
              <View style={styles.priceCurrencyWrapper}>
                <View style={styles.title}>
                  <Text>سعر اللون الاول</Text>
                </View>

                <View style={styles.priceCurrency}>
                  <View style={styles.currency}>
                    {true ? (
                      <Ionicons
                        style={{ fontSize: 18 }}
                        name="caret-up-outline"
                      />
                    ) : (
                      <Ionicons
                        style={{ fontSize: 18 }}
                        name="chevron-up-outline"
                      />
                    )}
                    <Text>Shekel()</Text>
                  </View>
                  <View style={styles.priceInp}>
                    <TextInput
                      style={styles.price}
                      keyboardType="numeric"
                      placeholder="السعر"
                    />
                  </View>
                </View>
              </View>
            </View>

            <DiscountFilter
              data={{
                product,
                price,
                setPrice,
                priceHandler,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ProductDetails;
