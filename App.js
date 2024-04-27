import { ScrollView, StyleSheet } from "react-native";
import EditProduct from "./components/EditProduct";



export default function App() {

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <EditProduct/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  
});
