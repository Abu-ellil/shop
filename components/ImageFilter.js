import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../components/mainStyles";



const ImageFilter = ({ filterList } ) => {


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
      {
        <Image
          style={styles.image}
          source={filterList[0].image.value }
          resizeMode="contain"
        />
      }
    </View>
  );
};

export default ImageFilter

