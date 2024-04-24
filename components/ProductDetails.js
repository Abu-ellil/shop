import React, { Component, useState } from "react";
import { Image, TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDropdown from "./CustomDropdown";
import AddDropDown from "./AddDropDown";
import { TouchableOpacity } from "react-native";

const ProductDetails = () => {
  const colors = ["red", "cyan", "navy", "orange", "green"];
  const sizes = ["M", "L", "XL", "S"];
  const currencyOptions = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

  return (
    <View style={styles.productCard}>
      <View style={styles.productCardTop}>
        <View style={styles.colorContainer}>
          <Text style={[theme.fontFamily, styles.text]}>اختر اللون</Text>

          <View style={styles.colors}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorCircle, { backgroundColor: color }]}
                onPress={() => console.log(color)}
              ></TouchableOpacity>
            ))}

            <View style={styles.addColorButton}>
              <Ionicons
                onPress={() => {
                  console.log("Add a new color");
                }}
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
            resizeMode="contain"
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
          <Text style={[theme.fontFamily, styles.text]}>
            حدد الاحجام المتاحة من المنتج
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <AddDropDown />
          <CustomDropdown options={sizes} />
          <CustomDropdown options={sizes} />
          <CustomDropdown options={sizes} />
          <CustomDropdown options={sizes} />
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardFooterRight}>
            <Text style={[theme.fontFamily, styles.text]}>سعر اللون الاول</Text>

            <View style={styles.price}>
              <TextInput placeholder="Price" />
              <CustomDropdown
                style={styles.dropDown}
                options={currencyOptions}
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
            console.log("Add discount ");
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
    width:"90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: 10,
  },
  addImageButton: {
    position: "absolute",
    width: 40,
    height: 40,
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
    zIndex:0
  },
});

export default ProductDetails;
