import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SIZES, COLORS, icons, images, FONTS } from "../../constants";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
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

  console.log("Restaurant", restaurantDetail);

  const renderInGridents = ({ item }) => {
    return (
      <View
        style={{
          width: 60,
          aspectRatio: 1,
          justifyContent: "center",
          backgroundColor: "#f5dac4",
          borderRadius: 30,
          alignItems: "center",
          marginRight: 8,
        }}
      >
        <Image
          source={item.icon}
          style={{ width: 30, height: 30 }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray4 }}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginTop: 10,
          marginHorizontal: 12,
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
          onPress={() => navigation.back()}
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
              Details
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ marginHorizontal: 12, padding: 4 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginTop: 10,
            height: 250,
          }}
        >
          <Image
            source={particularDishes?.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              marginBottom: 10,
              borderRadius: 6,
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsFavorite(!isFavorite)}
          style={{
            position: "relative",
            top: -40,
            left: -10,
          }}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "red" : "black"}
            style={{ textAlign: "right" }}
          />
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.6,
            width: "40%",
            borderRadius: 20,
            padding: 10,
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="restaurant-sharp" size={20} color={COLORS.primary} />
          <Text style={{ marginLeft: 8, fontSize: 15, letterSpacing: 0.5 }}>
            {restaurantDetail?.name}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 1,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          {particularDishes?.name}
        </Text>
        <Text
          style={{
            color: COLORS.darkgray,
            letterSpacing: 0.6,
            fontSize: 16,
            fontWeight: "400",
            textAlign: "justify",
            marginTop: 6,
          }}
        >
          A carefully crafted dish that combines fresh, high-quality ingredients
          with expert preparation to deliver a symphony of flavors and textures.
          Perfectly balanced and thoughtfully presented, it promises to delight
          your senses with every bite.
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
            {restaurantDetail?.rating}
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
                  {restaurantDetail?.duration}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            // paddingBottom: 590,
          }}
        >
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
        <View
          style={{
            height: 80,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: COLORS.lightGray3,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 26 }}>
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
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              width: 150,
            }}
          >
            <Text style={{ color: COLORS.white, fontWeight: "500" }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
