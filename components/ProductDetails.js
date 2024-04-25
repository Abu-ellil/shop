import React, { useRef, useState } from "react";
import { Image, TextInput, View, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { StyleSheet, Text } from "react-native";
import { theme } from "../assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDropdown from "./CustomDropdown";
import AddDropDown from "./AddDropDown";
import { TouchableOpacity } from "react-native";
import DropdownComponent from "./DropDown";
import ColorPicker from "react-native-wheel-color-picker";

const ProductDetails = () => {
  let productsList = [
    {
      id: 1,
      name: "T-Shirt",
      price: {
        currency: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"],
        value: 10,
      },
      imageUri: "../assets/1000.jpg",
      colors: [],
      sizes: [
        { label: "S", value: "1" },
        { label: "M", value: "2" },
        { label: "L", value: "3" },
        { label: "XL", value: "4" },
        { label: "XXL", value: "5" },
      ],
    },
  ];

  const pickerRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [colorPickerOn, setColorPickerOn] = useState(false);
  const [colorSelectionMade, setColorSelectionMade] = useState(false);
  const [products, setProducts] = useState(productsList);
  const [oldColor, setOldColor] = useState(null);




  // Handel color sellection
  const onColorChange = (color) => {
    setCurrentColor(color);
    console.log(products[0].colors);

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


  const replaceColor = (product,color,index) => {
console.log(
  product.colors[index],
  color
);
  };

  return (
    <View style={styles.container}>
      {products.map((product) => {
        return (
          <View style={styles.productCard}>
            <View style={styles.productCardTop}>
              <View style={styles.colorContainer}>
                <View style={styles.colors}>
                  {colorPickerOn && (
                    <View style={styles.colorPickerContainer}>
                      {colorPickerOn && (
                        <View style={styles.colorPickerContainer}>
                          <ColorPicker
                            ref={pickerRef}
                            color={currentColor} // Use currentColor as the initial color
                            swatchesOnly={swatchesOnly}
                            onColorChange={onColorChange}
                            onColorChangeComplete={() => {
                              onColorChangeComplete(product);
                              if (colorSelectionMade) {
                              }
                            }}
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
                            style={styles.addButton}
                            onPress={() => {
                              addColor(product);
                              setColorPickerOn(false);
                            }}
                          >
                            <Text>Add Color</Text>
                          </TouchableOpacity>
                          {/* Button */}
                          {colorSelectionMade && colorPickerOn && (
                            <TouchableOpacity
                              style={styles.addButton}
                              onPress={() => {
                             replaceColor(product, color, index);
                              }}
                            >
                              <Text>Change Color</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  )}
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
                  {product.colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setCurrentColor(color);
                        setColorSelectionMade(true);
                        setColorPickerOn(true);
                        replaceColor();
                      }}
                    >
                      <View
                        style={[styles.colorCircle, { backgroundColor: color }]}
                      ></View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: product.imageUri }}
                  resizeMode="contain"
                />
                <Image
                  style={styles.image}
                  source={require("../assets/1000.jpg")}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.optionsContainer}>
              <AddDropDown />
              {product.sizes.map((option, index) => (
                <>
                  <DropdownComponent product={product} key={index} />
                </>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterRight}>
                <Text style={[theme.fontFamily, styles.text]}>
                  سعر اللون الاول
                </Text>

                <View style={styles.price}>
                  <TextInput placeholder="Price" />
                  <CustomDropdown
                    style={styles.dropDown}
                    options={product.price.currency}
                  />
                </View>
              </View>

              <View style={styles.cardFooterLeft}>
                <Text style={[theme.fontFamily, styles.text]}>الكمية</Text>
                <TextInput style={styles.quantity} placeholder="Quantity" />
              </View>
            </View>

            <TouchableOpacity
              style={styles.discount}
              onPress={() => {
                // console.log("Add discount ");
              }}
            >
              <Ionicons
                style={{
                  fontSize: 18,
                  color: theme.colors.orangy,
                  paddingLeft: 10,
                }}
                name="add-circle-outline"
              ></Ionicons>
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.orangy,
                  fontFamily: theme.fontFamily.fontFamily,
                }}
              >
                إضافة خصم
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* <View style={styles.productCard}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    // height: 600,
    backgroundColor: theme.colors.light,
    borderRadius: 12,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  productCardTop: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 10,
    flex: 1,
    marginBottom: 20,
  },
  colorContainer: {
    width: "45%",
    paddingRight: 13,
  },
  colorPickerContainer: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#ccc",
    fontSize: 16,
    zIndex: 1011,
  },
  imageContainer: {
    height: 200,
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    backgroundColor: "#0553",
  },

  text: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.dark,
    paddingBottom: 19,
  },
  colors: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginBottom: 10,
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
    bottom: 8,
    right: 8,
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
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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

  dropDown: {
    backgroundColor: "red",
  },
  discount: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    zIndex: 0,
  },
});

export default ProductDetails;
