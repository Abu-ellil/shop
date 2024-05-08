import { ScrollView, StyleSheet } from "react-native";
import EditProduct from "./components/productFilters/EditProduct";
import { useFonts } from "expo-font";



export default function App() {

  const [fontsLoaded] = useFonts({
    "Almarai-Bold": require("./assets/fonts/Almarai-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <EditProduct />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
});
