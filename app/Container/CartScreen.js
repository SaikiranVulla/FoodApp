import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants";
import CommonHeader from "../Components/CommonHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CommonSheetView from "../Components/CommonSheetView";
import CommonInput from "../Components/CommonInput";
import CommonButton from "../Components/CommonButton";

const CartScreen = () => {
  const [cartList, setCartList] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cartItem } = useLocalSearchParams();
  const navigation = useRouter();

  useEffect(() => {
    if (cartItem) {
      const parsedCartItem = JSON.parse(cartItem);
      setCartList(parsedCartItem);
    }
  }, [cartItem]);

  const handlePress = () => {
    navigation.navigate({
      pathname: "/Container/HomeScreen",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <CommonHeader screenName={"Cart"} fromScreen={"CartScreen"} />
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBackGround}>
            <Image
              source={cartList?.photo}
              style={styles.imageStyles}
              resizeMode="cover"
            />
          </View>
        </View>

        <View
          style={{
            flex: 0.6,
          }}
        >
          <View style={styles.titleContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.itemName}
            >
              {cartList?.name}
            </Text>
            <MaterialIcons name="highlight-remove" size={30} color="red" />
          </View>
          <Text style={styles.itemPrice}>$ {cartList?.price}</Text>
          <View style={styles.lastItemContainer}>
            <Text style={styles.sizeText}>{cartList?.size}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity activeOpacity={0.7} style={styles.qtyButton}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyShow}>{quantity}</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.qtyButton}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CommonSheetView fromScreen={"Cart"}>
        <View style={styles.deliveryAdress}>
          <Text style={styles.deliveryText}>DELIVERY ADDRESS</Text>
          <Text style={styles.editText}>EDIT</Text>
        </View>
        <CommonInput placeHolder={"2118 Thornridge Cir, Syracuse"} />
        <View style={styles.totalPriceContainer}>
          <Text>
            TOTAL: <Text style={{ fontSize: 20 }}>$96</Text>
          </Text>
          <Text style={styles.breakDownText}>BreakDown{">"}</Text>
        </View>
        <CommonButton title={"PLACE ORDER"} action={handlePress} />
      </CommonSheetView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080808" },
  subContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    marginHorizontal: 12,
  },
  imageContainer: { flex: 0.4, marginRight: 6 },
  imageBackGround: {
    backgroundColor: "#171717",
    width: 140,
    aspectRatio: 1,
    borderTopEndRadius: 45,
    borderTopStartRadius: 45,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: { width: 100, height: 100, borderRadius: 8 },
  titleContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  itemName: { color: "white", width: 180, fontSize: 22 },
  itemPrice: { marginTop: 8, color: COLORS.lightGray4, fontSize: 16 },
  lastItemContainer: { flexDirection: "row", marginTop: 10 },
  sizeText: { color: "white", width: 100, fontSize: 16 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "#171717",
    width: 30,
    aspectRatio: 1,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { color: "white", fontSize: 16 },
  qtyShow: { color: "white", marginHorizontal: 16, fontSize: 16 },
  deliveryAdress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deliveryText: { letterSpacing: 0.6, color: COLORS.darkgray },
  editText: {
    color: COLORS.primary,
    textDecorationLine: "underline",
    letterSpacing: 0.6,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakDownText: {
    color: COLORS.primary,
    textDecorationLine: "underline",
    letterSpacing: 1,
  },
});
