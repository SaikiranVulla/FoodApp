import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, icons, images, FONTS } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

const RestuarantItem = [
  { label: "Burger", value: "Burger" },
  { label: "Pizza", value: "Pizza" },
  { label: "Sushi", value: "Sushi" },
  { label: "Salad", value: "Salad" },
];

const RestaurantScreen = () => {
  const { item } = useLocalSearchParams();
  const navigation = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (item) {
      const parsedItem = JSON.parse(item);
      setRestaurant(parsedItem);
    }
  }, [item]);

  function editOrder(action, menuItem) {
    let index = cartItems.findIndex((item) => item.menuId === menuItem.menuId);
    console.log("index", index);
    console.log("before update", cartItems);
    let totalAmount = 0;
    if (index > -1) {
      if (action == "+") {
        menuItem["qty"] = menuItem["qty"] + 1;
        totalAmount = finalPrice + menuItem.price;
      } else {
        menuItem["qty"] = menuItem["qty"] - 1;
        totalAmount = finalPrice - menuItem.price;
      }
      cartItems[index] = menuItem;
      console.log("updated Item", menuItem);
      if (menuItem["qty"] === 0) {
        cartItems.splice(index, 1);
      }
      setCartItems([...cartItems]);
      console.log("after update", cartItems);
      setFinalPrice(totalAmount);
    } else {
      if (action == "+") {
        menuItem["qty"] = 1;
        totalAmount = finalPrice + menuItem.price;
        setCartItems([...cartItems, menuItem]);
        setFinalPrice(totalAmount);
      }
    }
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginHorizontal: 12,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: "center",
            backgroundColor: COLORS.lightGray3,
            borderRadius: 25,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate({
              pathname: "/Container/HomeScreen",
            })
          }
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
          <View>
            <Text
              style={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              Restuarant New
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 50,
            justifyContent: "center",
            backgroundColor: COLORS.lightGray3,
            borderRadius: 25,
            alignItems: "center",
          }}
        >
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      // <Animated.ScrollView
      //   horizontal
      //   pagingEnabled
      //   scrollEventThrottle={16}
      //   showsHorizontalScrollIndicator={false}
      //   snapToAlignment="center"
      //   onScroll={Animated.event(
      //     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      //     { useNativeDriver: false }
      //   )}
      // >
      //   {restaurant?.menu.map((menuItem, index) => {
      //     return (
      //       <View key={index} style={{ alignItems: "center" }}>
      //         <View style={{ height: SIZES.height * 0.3 }}>
      //           <Image
      //             source={menuItem.photo}
      //             resizeMode="cover"
      //             style={{ width: SIZES.width, height: "100%" }}
      //           />
      //           <View
      //             style={{
      //               position: "absolute",
      //               flexDirection: "row",
      //               bottom: -20,
      //               width: SIZES.width,
      //               height: 50,
      //               justifyContent: "center",
      //             }}
      //           >
      //             <TouchableOpacity
      //               style={{
      //                 width: 50,
      //                 backgroundColor: COLORS.white,
      //                 justifyContent: "center",
      //                 alignItems: "center",
      //                 borderTopLeftRadius: 25,
      //                 borderBottomLeftRadius: 25,
      //               }}
      //               onPress={() => editOrder("-", menuItem)}
      //             >
      //               <Text style={{ ...FONTS.body1 }}>-</Text>
      //             </TouchableOpacity>
      //             <View
      //               style={{
      //                 width: 50,
      //                 backgroundColor: COLORS.white,
      //                 alignItems: "center",
      //                 justifyContent: "center",
      //               }}
      //             >
      //               <Text style={{ ...FONTS.h2 }}>
      //                 {menuItem.qty !== undefined ? menuItem.qty : 0}
      //               </Text>
      //             </View>
      //             <TouchableOpacity
      //               style={{
      //                 width: 50,
      //                 backgroundColor: COLORS.white,
      //                 borderTopRightRadius: 25,
      //                 borderBottomRightRadius: 25,
      //                 alignItems: "center",
      //                 justifyContent: "center",
      //               }}
      //               onPress={() => editOrder("+", menuItem)}
      //             >
      //               <Text style={{ ...FONTS.body1 }}>+</Text>
      //             </TouchableOpacity>
      //           </View>
      //         </View>
      //         {/* Name and Price */}
      //         <View
      //           style={{
      //             alignItems: "center",
      //             width: SIZES.width,
      //             marginTop: 30,
      //             paddingHorizontal: SIZES.padding * 2,
      //           }}
      //         >
      //           <Text style={{ ...FONTS.h3, textAlign: "center" }}>
      //             {menuItem?.name} - $ {menuItem?.price.toFixed(2)}
      //           </Text>
      //           <Text
      //             style={{ ...FONTS.body2, marginTop: 15, textAlign: "center" }}
      //           >
      //             {menuItem?.description}
      //           </Text>
      //         </View>
      //         {/* Calories */}
      //         <View
      //           style={{
      //             flexDirection: "row",
      //             alignItems: "center",
      //             marginTop: 15,
      //           }}
      //         >
      //           <Image
      //             source={icons.fire}
      //             style={{ width: 25, height: 25 }}
      //             resizeMode="cover"
      //           />
      //           <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
      //             {" "}
      //             {menuItem?.calories.toFixed(2)} cal
      //           </Text>
      //         </View>
      //       </View>
      //     );
      //   })}
      // </Animated.ScrollView>
      <View style={{ marginHorizontal: 12, marginTop: 20 }}>
        <Image
          source={restaurant?.photo}
          resizeMode="cover"
          style={{ borderRadius: 10, height: 200, width: 360 }}
        />
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 1,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          {restaurant?.name}
        </Text>
        <Text
          style={{
            color: COLORS.darkgray,
            letterSpacing: 0.8,
            fontSize: 16,
            fontWeight: "400",
            textAlign: "justify",
            marginTop: 6,
          }}
        >
          Nestled in the heart of downtown, Flavor Haven is a cozy yet vibrant
          spot offering a fusion of global cuisines. Known for its eclectic
          menu, the restaurant features everything from hand-rolled sushi to
          wood-fired Neapolitan pizzas.
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Image
            source={icons.star}
            style={{ width: 25, height: 25 }}
            resizeMode="cover"
          />
          <Text style={{ ...FONTS.body3, marginLeft: SIZES.padding }}>
            {restaurant?.rating}
          </Text>
          <View style={{ flexDirection: "row", marginLeft: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={30}
                  color="#FF7A00"
                />
                <Text style={{ marginLeft: 8, fontSize: 16 }}>Free</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 16,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="av-timer"
                  size={30}
                  color="#FF7A00"
                />
                <Text style={{ marginLeft: 8, fontSize: 16 }}>
                  {restaurant?.duration}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // function renderOrderInfo() {
  //   function renderDots() {
  //     const dotPosition = Animated.divide(scrollX, SIZES.width);
  //     return (
  //       <View style={{ height: 30 }}>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             height: SIZES.padding,
  //           }}
  //         >
  //           {restaurant?.menu.map((item, index) => {
  //             const opacity = dotPosition.interpolate({
  //               inputRange: [index - 1, index, index + 1],
  //               outputRange: [0.3, 1, 0.3],
  //               extrapolate: "clamp",
  //             });

  //             const dotSize = dotPosition.interpolate({
  //               inputRange: [index - 1, index, index + 1],
  //               outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
  //               extrapolate: "clamp",
  //             });

  //             const dotColor = dotPosition.interpolate({
  //               inputRange: [index - 1, index, index + 1],
  //               outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
  //               extrapolate: "clamp",
  //             });
  //             return (
  //               <Animated.View
  //                 key={index}
  //                 opacity={opacity}
  //                 style={{
  //                   marginHorizontal: 6,
  //                   borderRadius: SIZES.radius,
  //                   width: dotSize,
  //                   height: dotSize,
  //                   backgroundColor: dotColor,
  //                 }}
  //               />
  //             );
  //           })}
  //         </View>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View>
  //       {renderDots()}
  //       <View
  //         style={{
  //           backgroundColor: COLORS.white,
  //           borderTopLeftRadius: 40,
  //           borderTopRightRadius: 40,
  //         }}
  //       >
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             paddingHorizontal: SIZES.padding * 3,
  //             paddingVertical: SIZES.padding * 2,
  //             borderBottomColor: COLORS.lightGray2,
  //             borderBottomWidth: 1,
  //           }}
  //         >
  //           <Text style={{ ...FONTS.h3 }}>
  //             {cartItems.length} items in Cart
  //           </Text>
  //           <Text style={{ ...FONTS.h3 }}>$ {finalPrice?.toFixed(2)}</Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             paddingHorizontal: SIZES.padding * 3,
  //             paddingVertical: SIZES.padding * 2,
  //           }}
  //         >
  //           <View style={{ flexDirection: "row" }}>
  //             <Image
  //               source={icons.pin}
  //               style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
  //               resizeMode="contain"
  //             />
  //             <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
  //               Location
  //             </Text>
  //           </View>
  //           <View style={{ flexDirection: "row" }}>
  //             <Image
  //               source={icons.master_card}
  //               resizeMode="contain"
  //               style={{
  //                 width: 20,
  //                 height: 20,
  //                 tintColor: COLORS.darkgray,
  //               }}
  //             />
  //             <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
  //               8888
  //             </Text>
  //           </View>
  //         </View>
  //         {/* Order Button */}
  //         <View
  //           style={{
  //             padding: SIZES.padding * 2,
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               width: SIZES.width * 0.9,
  //               borderRadius: SIZES.radius,
  //               alignItems: "center",
  //               padding: SIZES.padding,
  //               backgroundColor: COLORS.primary,
  //             }}
  //             onPress={() =>
  //               navigation.navigate("Order", { restaurant: restaurant })
  //             }
  //           >
  //             <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       <View>
  //         <View
  //           style={{
  //             position: "absolute",
  //             bottom: -34,
  //             left: 0,
  //             right: 0,
  //             height: 34,
  //             backgroundColor: COLORS.white,
  //           }}
  //         ></View>
  //       </View>
  //     </View>
  //   );
  // }
  function renderOrderInfo() {
    return <View></View>;
  }

  const handlePress = (item) => {
    setSelectedItem(item.label);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        backgroundColor:
          selectedItem === item.label ? COLORS.primary : COLORS.white,
        borderRadius: 30,
        width: 120,
        justifyContent: "center",
        paddingVertical: 8,
        marginVertical: 15,
        marginRight: 6,
        marginHorizontal: 12,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: selectedItem === item.label ? COLORS.white : COLORS.black,
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const menuItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        console.log(item, "clickedmenu item");
        navigation.navigate({
          pathname: "/Container/DetailScreen",
          params: {
            item: JSON.stringify(item),
            restaurant: JSON.stringify(restaurant),
          },
        });
      }}
      style={styles.card}
    >
      <Image
        source={item.photo}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 140,
          marginBottom: 10,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
      <Text numberOfLines={1} style={{ marginLeft: 4, marginBottom: 8 }}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 6,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "700" }}>${item.price}</Text>
        <Ionicons name="add-circle-sharp" size={24} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray4 }}>
      {/* HeaderBar */}
      {renderHeader()}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Food Info */}
        {renderFoodInfo()}
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={RestuarantItem}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
          />
        </View>
        <View>
          <FlatList
            data={restaurant?.menu}
            keyExtractor={(item) => item.menuId.toString()}
            renderItem={menuItem}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "45%",
  },
});
