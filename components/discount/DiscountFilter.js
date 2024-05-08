import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import styles from '../productFilters/Style';
import {theme} from '../../assets/theme';
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from 'react-native';

const DiscountFilter = ({data}) => {

    const {product, price,setPrice, priceHandler, toggleDiscountModal, handleAddDiscount} = data

  return (
    <View>
      <TouchableOpacity
        style={styles.discount}
        onPress={() => {
          priceHandler();
            setPrice(true)
         
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
      {!price ? (
        ""
      ) : (
        <View style={styles.discounts}>
          <View>
            <View style={styles.priceCurrency2}>
              <View style={styles.currency}>
                {true ? (
                  <Ionicons style={{ fontSize: 18 }} name="caret-up-outline" />
                ) : (
                  <Ionicons
                    style={{ fontSize: 18 }}
                    name="chevron-up-outline"
                  />
                )}
                <Text>Shekel()</Text>
              </View>
              <View style={styles.priceInp}>
                <TextInput
                  style={styles.price}
                  keyboardType="numeric"
                  placeholder="قبل الخصم"
                />
              </View>
            </View>
            <View style={styles.priceCurrency2}>
              <View style={styles.currency}>
                {true ? (
                  <Ionicons style={{ fontSize: 18 }} name="caret-up-outline" />
                ) : (
                  <Ionicons
                    style={{ fontSize: 18 }}
                    name="chevron-up-outline"
                  />
                )}
                <Text>Shekel()</Text>
              </View>
              <View style={styles.priceInp}>
                <TextInput
                  style={styles.price}
                  keyboardType="numeric"
                  placeholder="بعد الخصم"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.discount}
            onPress={() => {
              setPrice(null);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.orangy,
                fontFamily: theme.fontFamily.fontFamily,
              }}
            >
              حذف الخصم
            </Text>

            <Ionicons
              style={{
                fontSize: 18,
                color: theme.colors.orangy,
                paddingLeft: 10,
              }}
              name="trash-outline"
            ></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default DiscountFilter