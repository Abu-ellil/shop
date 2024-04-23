import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductDetails from "./components/ProductDetails";
import { theme } from "./assets/theme";
import { I18nManager } from "react-native";

I18nManager.forceRTL(true);

export default function App() {
  const [fontsLoaded] = useFonts({
    "Almarai-Bold": require("./assets/fonts/Almarai-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.mainWrapper}>
          <View style={styles.addProductHeader}>
            <View style={styles.backArrowWrapper}>
              <Ionicons
                style={styles.backArrowIcone}
                name="arrow-forward-outline"
              ></Ionicons>
            </View>

            <View style={styles.textArea}>
              <Text style={[theme.fontFamily, styles.text]}>إضافة منتج</Text>
            </View>
          </View>
          <View>
            <Text style={[theme.fontFamily, styles.text]}>
              قم باضافة تفاصيل المنتج
            </Text>
          </View>

          <ScrollView>
            <ProductDetails />
            <ProductDetails />
            <ProductDetails />
          </ScrollView>
        </View>
        <View style={styles.addButtonsWrapper}>
          <Text onPress={() => { alert("اضافة عنصر جديد من المنتج") }} style={styles.addNewProductButtons}>
            اضافة عنصر جديد من المنتج
          </Text>
          <Text onPress={() => { alert("اضافة منتج جديد") }} style={styles.addProductButtons}>اضافة منتج جديد</Text>
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
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#3C3C3C11",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  textArea: {
    flex: 2,
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
    paddingVertical: 20,
  },
  backArrowWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  backArrowIcone: {
    fontSize: 40,
    color: "#3C3C3Cff",
  },
  addButtonsWrapper: {
    width: "100%",
    padding: 18,
    position: "absolute",
    bottom: 0,
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
    fontSize:theme.fontSizes.medium
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
    fontSize:theme.fontSizes.medium
  },
});
