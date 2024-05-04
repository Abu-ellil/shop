import React, { useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductDetails from './ProductDetails';
import { theme } from '../assets/theme';
import FilterCard from './FilterCard';

export default function EditProduct() {

  const DUMMY_IMAGE = require("../assets/1000.jpg");
    const [filterList, setFilterList] = useState([
      {
        id: 1,
        color: {
          id: 1,
          value: "red",
        },
        image: {
          id: 1,
          value: require("../assets/1000.jpg"),
        },
        childSizeFilter: {
          id: 1,
          size: {
            id: 1,
            value: "S",
          },
          price: {
            id: 1,
            value: "100",
          },
          coupon: {
            id: 1,
            value: "10",
          },
          quantity: {
            id: 1,
            value: "10",
          },
        },
      },
      {
        id: 2,
        color: {
          id: 1,
          value: "orange",
        },
        image: {
          id: 1,
          value: require("../assets/1000.jpg"),
        },
        childSizeFilter: {
          id: 1,
          size: {
            id: 1,
            value: "Xl",
          },
          price: {
            id: 1,
            value: "50",
          },
          coupon: {
            id: 1,
            value: "20",
          },
          quantity: {
            id: 1,
            value: "30",
          },
        },
      },
      {
        id: 1,
        color: {
          id: 1,
          value: "green",
        },
        image: {
          id: 1,
          value: require("../assets/1000.jpg"),
        },
        childSizeFilter: {
          id: 1,
          size: {
            id: 1,
            value: "S",
          },
          price: {
            id: 1,
            value: "100",
          },
          coupon: {
            id: 1,
            value: "10",
          },
          quantity: {
            id: 1,
            value: "10",
          },
        },
      },
      {
        id: 2,
        color: {
          id: 1,
          value: "blue",
        },
        image: {
          id: 1,
          value: require("../assets/1000.jpg"),
        },
        childSizeFilter: {
          id: 1,
          size: {
            id: 1,
            value: "Xl",
          },
          price: {
            id: 1,
            value: "50",
          },
          coupon: {
            id: 1,
            value: "20",
          },
          quantity: {
            id: 1,
            value: "30",
          },
        },
      },
    ]);
    
    const [fontsLoaded] = useFonts({
      "Almarai-Bold": require("../assets/fonts/Almarai-Bold.ttf"),
    });
    
    if (!fontsLoaded) {
      return null;
    }



const addNewFilter = () => {
  const NewFilter = {
    id: productsList.length + 1,
  color: {
    id: 1,
    value: 'red',
  },
  image: {
    id: 1,
    value: DUMMY_IMAGE,
  },
  childSizeFilter: {
    id: 1,
    size: {
      id: 1,
      value: 'S',
    },
    price: {
      id: 1,
      value: '100',
    },
    coupon: {
      id: 1,
      value: '10',
    },
    quantity: {
      id: 1,
      value: '10',
    },
  },
}
  setProductsList([...productsList, NewFilter]);
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
            <FilterCard filterList={filterList}/>
          </ScrollView>
        </View>
        <View style={styles.addButtonsWrapper}>
          <Text
            onPress={() => {
              addNewFilter();
            }}
            style={styles.addNewFilterButtons}
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
    minHeight:"100%",
    justifyContent:"space-between",
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
  addNewFilterButtons: {
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
