import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import styles from '../components/mainStyles'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"; // Import ActivityIndicator


import { theme } from "../assets/theme";
import ImageFilter from "./ImageFilter";
import ColorFilter from "./ColorFilter";

const ProductDetails = ({ productsList }) => {
  
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
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
    
  }, [productsList]);



  const handleAddSize = (object) => {
    if(object.sizes.length <7){
       const newSizes = [...object.sizes];
    newSizes.push(["S", "M", "L", "XL",""]); // Push new sizes to the copied array
    object.sizes = newSizes; // Update the sizes in the object
    
    // Update the state with the modified object
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === object.id ? object : p))
    );
    }
   
  };
 const addColor = (product,currentColor) => {
  console.log( product, currentColor);
   
 };

  const handleSizeChange = (item, index) => {
    const updatedSelectedSizes = [...selectedSizes];
    updatedSelectedSizes[index] = item.value;
    setSelectedSizes(updatedSelectedSizes);
  };
  const handleOptionSelect = () => {
    
  };
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

  

  return (
    <View style={styles.container}>
      {products.map((product) => {
        return (
          <View style={styles.productCard} key={product.id}>
            <View style={styles.productCardTop}>
              <ImageFilter product={product} />
              <ColorFilter product={product} addColor={addColor} />
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
              {product.sizes?.map((sizesArray, index) => (
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
                      data={sizesArray?.map((size) => ({
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

                {true ? (
                  <View style={styles.price}>
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
                  </View>
                ) : (
                  <View style={styles.price}>
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
                  </View>
                )}

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


export default ProductDetails;
