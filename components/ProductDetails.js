import React, { Component, useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDropdown from "./CustomDropdown";
import AddDropDown from "./AddDropDown";


const ProductDetails =()=> {
  
    const colors = ["#1D396Cff", "#06A6D0ff", "#E62230ff", "#EC6000ff","green"];
    const options = ["M", "L", "XL", "S"]; 

    return (
      <View style={styles.productCard}>
        <View style={styles.productCardTop}>
          <View style={styles.colorContainer}>
            <Text style={[theme.fontFamily, styles.text]}>اختر اللون</Text>

            <View style={styles.colors}>
              {colors.map((color, index) => (
                <View
                  key={index}
                  style={[styles.colorCircle, { backgroundColor: color }]}
                ></View>
              ))}

              <View style={styles.addColorButton}>
                <Ionicons
                  style={{ fontSize: 18 }}
                  name="add-outline"
                ></Ionicons>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/1000.jpg")}
              resizeMode="cover"
            />
            <View style={styles.addImageButton}>
              <Ionicons
                style={{ fontSize: 18, color: "#fff" }}
                name="add-outline"
              ></Ionicons>
            </View>
          </View>
          <View></View>
        </View>

        <View style={styles.productCardBottom}>
          <View>
            <Text style={[theme.fontFamily, styles.text]}>حدد الاحجام المتاحة من المنتج</Text>
          </View>
          <View style={styles.optionsContainer}>
            <AddDropDown/>
            <CustomDropdown options={options} />
            <CustomDropdown options={options} />
            <CustomDropdown options={options} />
            <CustomDropdown options={options} />
          </View>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  productCard: {
    backgroundColor: theme.colors.light,
    borderRadius: 12,
    height: 600,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  productCardTop: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 10,
    flex: 1,
  },
  colorContainer: {
    width: "50%",
    paddingRight: 53,
  },
  imageContainer: {
    width: "50%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },

  text: {
    fontSize: theme.fontSizes.medium,
  },
  colors: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
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
    padding:10
  },
  optionsContainer:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
});

export default ProductDetails;
