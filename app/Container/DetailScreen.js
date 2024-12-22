import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SIZES, COLORS, icons, images, FONTS } from "../../constants";

import { inGridents } from "../../constants/DummyData";

const dishesSizes = [10, 14, 16];

const DetailScreen = () => {
  const { item, restaurant } = useLocalSearchParams();
  const navigation = useRouter();
  const [particularDishes, setParticularDishes] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (item && restaurant) {
      const parsedItem = JSON.parse(item);
      const parsedRestaurant = JSON.parse(restaurant);
      setRestaurantDetail(parsedRestaurant);
      setParticularDishes(parsedItem);
    }
  }, [item, restaurant]);

  const renderInGridents = ({ item }) => {
    return (
      <View style={styles.inGridentsItem}>
        <Image
          source={item.icon}
          style={{ width: 30, height: 30 }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.lightGray4} barStyle="dark-content" />
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backSubContainer}
          onPress={() => navigation.back()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.mainTextView}>
          <View>
            <Text style={styles.mainText}>Details</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.subMainView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={particularDishes?.photo}
            resizeMode="cover"
            style={styles.mainImage}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.heartStyle}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "red" : "black"}
            style={{ textAlign: "right" }}
          />
        </TouchableOpacity>
        <View style={styles.restaurantName}>
          <Ionicons name="restaurant-sharp" size={20} color={COLORS.primary} />
          <Text style={styles.nameText}>{restaurantDetail?.name}</Text>
        </View>
        <Text style={styles.itemName}>{particularDishes?.name}</Text>
        <Text style={styles.itemDescription}>
          A carefully crafted dish that combines fresh, high-quality ingredients
          with expert preparation to deliver a symphony of flavors and textures.
          Perfectly balanced and thoughtfully presented, it promises to delight
          your senses with every bite.
        </Text>
        <View style={styles.starContainer}>
          <Image
            source={icons.star}
            style={{ width: 25, height: 25 }}
            resizeMode="cover"
          />
          <Text style={{ ...FONTS.body3, marginLeft: SIZES.padding }}>
            {restaurantDetail?.rating}
          </Text>
          <View style={styles.freeDeliveryContainer}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={30}
              color="#FF7A00"
            />
            <Text style={styles.deliveryText}>Free</Text>
            <View style={styles.freeDeliveryContainer}>
              <MaterialCommunityIcons
                name="av-timer"
                size={30}
                color="#FF7A00"
              />
              <Text style={styles.deliveryText}>
                {restaurantDetail?.duration}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.dishesSizes}>
          <Text>SIZE :</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {dishesSizes.map((size) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedItem(size)}
                key={size}
                style={{
                  borderRadius: 25,
                  marginLeft: 10,
                  backgroundColor:
                    selectedItem == size ? COLORS.primary : COLORS.lightGray3,
                  width: 50,
                  aspectRatio: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 1,
                    color: selectedItem == size ? "white" : "black",
                  }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 10 }}>INGRIDENTS</Text>
          <FlatList
            horizontal
            data={inGridents}
            renderItem={renderInGridents}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.individualItem}>
          <Text style={styles.individualItemPrice}>
            ${particularDishes?.price}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (selectedItem !== null) {
                particularDishes["size"] = selectedItem;
              } else {
                particularDishes["size"] = 14;
              }
              navigation.navigate({
                pathname: "/Container/CartScreen",
                params: {
                  cartItem: JSON.stringify(particularDishes),
                },
              });
            }}
            style={styles.cartButton}
          >
            <Text style={styles.cartText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray4 },
  backContainer: {
    flexDirection: "row",
    height: 50,
    marginTop: 10,
    marginHorizontal: 12,
  },
  backSubContainer: {
    width: 50,
    justifyContent: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: 25,
    alignItems: "center",
  },
  mainTextView: { flex: 1, justifyContent: "center", marginLeft: 10 },
  mainText: {
    // fontFamily: "NotoSans-Bold",
    fontSize: 16,
    fontWeight: "600",
    // letterSpacing: 1,
  },
  subMainView: { marginHorizontal: 12, padding: 4 },
  imageContainer: {
    marginTop: 10,
    height: 250,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius: 6,
  },
  heartStyle: {
    position: "relative",
    top: -40,
    left: -10,
  },
  restaurantName: {
    borderWidth: 0.6,
    width: "40%",
    borderRadius: 20,
    padding: 10,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: { marginLeft: 8, fontSize: 15, letterSpacing: 0.5 },
  itemName: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: "600",
    marginTop: 10,
  },
  itemDescription: {
    color: COLORS.darkgray,
    fontSize: 16,
    textAlign: "justify",
    marginTop: 6,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    alignItems: "center",
  },
  freeDeliveryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  deliveryText: { marginLeft: 8, fontSize: 16 },
  deliveryTime: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
  },
  dishesSizes: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    // paddingBottom: 590,
  },
  individualItem: {
    height: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.lightGray3,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  individualItemPrice: { fontWeight: "600", fontSize: 26 },
  cartButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  cartText: { color: COLORS.white, fontWeight: "500" },
  inGridentsItem: {
    width: 60,
    aspectRatio: 1,
    justifyContent: "center",
    backgroundColor: "#f5dac4",
    borderRadius: 30,
    alignItems: "center",
    marginRight: 8,
  },
});
