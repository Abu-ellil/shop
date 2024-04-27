import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"; // Import ActivityIndicator
import { Dropdown } from "react-native-element-dropdown";
import ColorPicker from "react-native-wheel-color-picker";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../assets/theme";









const ProductDetails = () => {
  let productsList = [
    {
      id: 1,
      name: "",
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
  const [products, setProducts] = useState(productsList);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    const [chosenColorIndex, setChosenColorIndex] = useState(null);
const [image, setImage] = useState(null);




    const handleColorPress = (index) => {
      setChosenColorIndex(index);
    };


const [sizes, setSizes] = useState([
  { label: "S", value: "1" },
  { label: "M", value: "2" },
  { label: "L", value: "3" },
  { label: "XL", value: "4" },
  { label: "XXL", value: "5" },
]);




  const handleAddSize = () => {
    const newSizes = [...sizes];
    const newValue = (parseInt(sizes[sizes.length - 1].value) + 1).toString();
    newSizes.push({ label: "New Size", value: newValue });
    setSizes(newSizes);
    setValue(newValue); // Select the newly added size
  };
  const handleOptionSelect = () => { 
    // Logic to handle option select
  };
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

//  const getColorCircleStyle = (color) => {
//    const baseStyle = [styles.colorCircle, { backgroundColor: color }];
//    if (currentColor === chosenColor) {
//      return [...baseStyle, styles.chosenColorCircle];
//    }
//    return baseStyle;
//  };

  // DropDown Menu Stuff``
  const renderItem = (item) => {
    console.log("item: ",item);
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

  const renderLabel = (option) => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "orange", borderColor: "orange" },
          ]}
        >
          {option.label}
          {/* {console.log(option.label)} */}
        </Text>
      );
    }
    return null;
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
     aspect: [4, 3],
     quality: 1,
   });

   console.log(result);

   if (!result.cancelled) {
     const updatedProducts = products.map((product) =>
       product.id === productId ? { ...product, imageUri: result.uri } : product
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
        console.log("product id sss", product.id, product);
        return (
          <View style={styles.productCard} key={product.id}>
            <View style={styles.productCardTop}>
              <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.addImageButton} onPress={() => handleAddImage(product.id)}>
                  <Ionicons
                    style={{ fontSize: 18, color: "#fff" }}
                    name="add-outline"
                  ></Ionicons>
                  
                </TouchableOpacity>
                {product.imageUri && (
                  <Image
                    source={{ uri: product.imageUri }}
                    style={styles.image}
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
                            style={styles.addButton}
                            onPress={() => {
                              addColor(product);
                              setColorPickerOn(false);
                            }}
                          >
                            <Text>Add Color</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}

                  <Text style={[theme.fontFamily, styles.text]}>
                    اختر اللون
                  </Text>
                  <View style={styles.colorList}>
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
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.optionsContainer}>
              <View>
                <Text style={[theme.fontFamily, styles.text]}>
                  حدد الاحجام المتاحة من المنتج
                </Text>
              </View>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  onPress={handleAddSize}
                  style={styles.addDropDown}
                >
                  <Ionicons
                    style={{ fontSize: 20 }}
                    name="add-outline"
                  ></Ionicons>
                </TouchableOpacity>
                {/* Dropdown for adding new size */}
                <View style={StyleSheet.dropdown}>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={handleOptionSelect}
                  ></TouchableOpacity>
                </View>
              </View>

              {/* Dropdown for selecting size */}
              {sizes.map((option, index) => (
                <View style={styles.container} key={index}>
                  <View
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "orange" },
                    ]}
                  >
                    {renderLabel(option)}
                    <Dropdown
                      style={styles.dropdownItem}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={sizes}
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
                    renderItem={renderItem}
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
    paddingLeft: 13,
  },
  addColorContainer: {},
  colorPickerContainer: {
    position: "absolute",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
    width: 222,
    height: 350,
    zIndex: 1000,
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
    flex: 1,
  },
  colors: {
    width: "90%",
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
