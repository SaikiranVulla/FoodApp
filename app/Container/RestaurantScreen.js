import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, icons } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CommonHeader from "../Components/CommonHeader";

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
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (item) {
      const parsedItem = JSON.parse(item);
      setRestaurant(parsedItem);
    }
  }, [item]);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() =>
            navigation.navigate({
              pathname: "/Container/HomeScreen",
            })
          }
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Restaurant View</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.moreContainer}>
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <View style={styles.foodInfoContainer}>
        <Image
          source={restaurant?.photo}
          resizeMode="cover"
          style={styles.mainRestaurantImage}
        />
        <Text style={styles.restaurantName}>{restaurant?.name}</Text>
        <Text style={styles.restaurantDescription}>
          Nestled in the heart of downtown, Flavor Haven is a cozy yet vibrant
          spot offering a fusion of global cuisines. Known for its eclectic
          menu, the restaurant features everything from hand-rolled sushi to
          wood-fired Neapolitan pizzas.
        </Text>
        <View style={styles.feedBackContainer}>
          <Image
            source={icons.star}
            style={styles.starImage}
            resizeMode="cover"
          />
          <Text style={styles.starRating}>{restaurant?.rating}</Text>
          <View style={styles.deliveryContainer}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={30}
              color="#FF7A00"
            />
            <Text style={styles.deliveryText}>Free</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <MaterialCommunityIcons name="av-timer" size={30} color="#FF7A00" />
            <Text style={styles.deliveryText}>{restaurant?.duration}</Text>
          </View>
        </View>
      </View>
    );
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item.label)}
      style={{
        backgroundColor:
          selectedItem === item.label ? COLORS.primary : COLORS.lightGray3,
        borderRadius: 30,
        width: 80,
        justifyContent: "center",
        paddingVertical: 10,
        marginVertical: 15,
        marginRight: 12,
        // marginHorizontal: 12,
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

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate({
          pathname: "/Container/DetailScreen",
          params: {
            item: JSON.stringify(item),
            restaurant: JSON.stringify(restaurant),
          },
        })
      }
      style={styles.card}
    >
      <Image source={item.photo} resizeMode="cover" style={styles.itemIMage} />
      <Text numberOfLines={1} style={{ marginLeft: 4, marginBottom: 8 }}>
        {item.name}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={{ fontWeight: "700" }}>${item.price}</Text>
        <Ionicons name="add-circle-sharp" size={24} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.lightGray4} barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={
          <>
            {/* {renderHeader()} */}
            <CommonHeader
              screenName={"Restaurant View"}
              fromScreen={"restaurant"}
            />
            {renderFoodInfo()}
            <FlatList
              style={{ marginHorizontal: 12 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={RestuarantItem}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.label}
            />
          </>
        }
        data={restaurant?.menu}
        keyExtractor={(item) => item.menuId.toString()}
        renderItem={renderMenuItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray4 },
  headerContainer: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 12,
    marginTop: 10,
  },
  backButtonContainer: {
    width: 50,
    justifyContent: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: 25,
    alignItems: "center",
  },
  titleTextContainer: { flex: 1, justifyContent: "center", marginLeft: 10 },
  titleText: { fontSize: 16, fontWeight: "600" },
  moreContainer: {
    width: 50,
    justifyContent: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: 25,
    alignItems: "center",
  },
  foodInfoContainer: { marginHorizontal: 12, marginTop: 20 },
  mainRestaurantImage: { borderRadius: 10, height: 200, width: 360 },
  restaurantName: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  restaurantDescription: { color: COLORS.darkgray, fontSize: 16, marginTop: 6 },
  feedBackContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  starImage: { width: 25, height: 25 },
  starRating: { marginLeft: 10 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 10,
    width: "45%",
  },
  itemIMage: { width: "100%", height: 140, borderTopLeftRadius: 6 },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 10,
  },
  deliveryContainer: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
  },
  deliveryText: { marginLeft: 8, fontSize: 16 },
});
