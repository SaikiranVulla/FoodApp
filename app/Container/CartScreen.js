import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
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

  console.log(cartList, "cartList =-=->>");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#080808" }}>
      <CommonHeader screenName={"Cart"} fromScreen={"CartScreen"} />
      <View
        style={{
          flex: 1,
          marginTop: 20,
          flexDirection: "row",
          marginHorizontal: 12,
        }}
      >
        <View style={{ flex: 0.4, marginRight: 6 }}>
          <View
            style={{
              backgroundColor: "#171717",
              width: 140,
              aspectRatio: 1,
              borderTopEndRadius: 45,
              borderTopStartRadius: 45,
              borderBottomEndRadius: 25,
              borderBottomStartRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={cartList?.photo}
              style={{ width: 100, height: 100, borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View
          style={{
            flex: 0.6,
            // backgroundColor: "red",
          }}
        >
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ color: "white", width: 180, fontSize: 22 }}
            >
              {cartList?.name}
            </Text>
            <MaterialIcons
              name="highlight-remove"
              size={30}
              color="red"
              style={{ justifyContent: "flex-end" }}
            />
          </View>
          <Text
            style={{ marginTop: 8, color: COLORS.lightGray4, fontSize: 16 }}
          >
            ${cartList?.price}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ color: "white", width: 100, fontSize: 16 }}>
              {cartList?.size}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#171717",
                  width: 30,
                  aspectRatio: 1,
                  borderRadius: 12.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>-</Text>
              </TouchableOpacity>
              <Text
                style={{ color: "white", marginHorizontal: 16, fontSize: 16 }}
              >
                {quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#171717",
                  width: 30,
                  aspectRatio: 1,
                  borderRadius: 12.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CommonSheetView fromScreen={"Cart"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ letterSpacing: 0.6, color: COLORS.darkgray }}>
            DELIVERY ADDRESS
          </Text>
          <Text
            style={{
              color: COLORS.primary,
              textDecorationLine: "underline",
              letterSpacing: 0.6,
            }}
          >
            EDIT
          </Text>
        </View>
        <CommonInput placeHolder={"2118 Thornridge Cir, Syracuse"} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            TOTAL: <Text style={{ fontSize: 20 }}>$96</Text>
          </Text>
          <Text
            style={{
              color: COLORS.primary,
              textDecorationLine: "underline",
              letterSpacing: 1,
            }}
          >
            BreakDown{">"}
          </Text>
        </View>
        <CommonButton title={"PLACE ORDER"} action={handlePress} />
      </CommonSheetView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
