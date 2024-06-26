import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../assets/theme";
import ProductDetails from "./ProductDetails";

export default function EditProduct() {
  const [productsList, setProductsList] = useState([
    {
      id: 10,
      name: "",
      price: "100",
      currency: ["USD"],
      imageUri: "https://picsum.photos/id/9/200/200",

      colors: ["#F50909", "#110DF5", "#05F535", "#D2FB03", "#1DD4FD"],
      sizes: [
        ["S", "M", "L", "XL"],
        ["S", "M", "L", "XL"],
        ["S", "M", "L", "XL"],
      ],
    },
  ]);

 

  const addNewProduct = () => {
    const newProduct = {
      id: productsList.length + 1,
      name: "",
      price: 10,
      currency: [],
      imageUri: "https://picsum.photos/id/9/200/200",
      colors: [],
      sizes: [],
    };
    setProductsList([...productsList, newProduct]);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.mainWrapper}>
          <View style={styles.addProductHeader}>
            <View style={styles.textArea}>
              <Text style={[theme.fontFamily, styles.text]}>إضافة منتج</Text>
            </View>

            <View style={styles.backArrowWrapper}>
              <Ionicons
                style={styles.backArrowIcone}
                name="arrow-forward-outline"
              ></Ionicons>
            </View>
          </View>
          <View>
            <Text style={[theme.fontFamily, styles.text]}>
              قم باضافة تفاصيل المنتج
            </Text>
          </View>

          <ScrollView>
            <ProductDetails productsList={productsList} />
          </ScrollView>
        </View>
        <View style={styles.addButtonsWrapper}>
          <Text
            onPress={() => {
              addNewProduct();
            }}
            style={styles.addNewProductButtons}
          >
            اضافة عنصر جديد من المنتج
          </Text>
          <Text
            onPress={() => {
              alert("اضافة عنصر جديد من المنتج");
            }}
            style={styles.addProductButtons}
          >
            اضافة منتج جديد
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "theme.colors.vl",
    paddingTop: 50,
  },
  mainWrapper: {
    margin: 20,
  },
  addProductHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#3C3C3C11",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  textArea: {
    flex: 2,
    marginRight: 18,
  },
  text: {
    justifyContent: "center",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
    paddingVertical: 16,
  },
  backArrowWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
  backArrowIcone: {
    fontSize: 40,
    color: "#3C3C3Cff",
  },
  addButtonsWrapper: {
    width: "100%",
    padding: 18,
    backgroundColor: theme.colors.light,
  },
  addNewProductButtons: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 25,
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: theme.fontFamily.fontFamily,
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
  },
  addProductButtons: {
    width: "100%",
    paddingVertical: 25,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: theme.fontFamily.fontFamily,
    color: theme.colors.light,
    textAlign: "center",
    fontSize: theme.fontSizes.medium,
  },
});
