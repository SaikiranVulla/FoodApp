import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, images, icons } from "../../constants";
import { categoryData, restaurantData } from "../../constants/DummyData";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import CommonInput from "../Components/CommonInput";

const HomeScreen = () => {
  const navigation = useRouter();
  const [selectedCategory, setSelectedCategory] = useState({ id: 1 });
  const [restaurantList, setRestautantList] = useState(restaurantData);
  const [searchedValue, setSearchedValue] = useState(null);

  function renderMainCategories() {
    const onSelectCategory = (category) => {
      const listComponent = restaurantData.filter((a) =>
        a.categories.includes(category.id)
      );
      setRestautantList(listComponent);
      setSelectedCategory(category);
    };
    return (
      <View style={styles.GreetingContainer}>
        <Text style={styles.GreetingText}>
          Hey Halal, <Text style={styles.GreetingSubText}>Good Afternoon!</Text>
        </Text>
        <CommonInput
          placeHolder={" Search dishes, restaurants"}
          value={searchedValue}
        />
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryText}>All Categories</Text>
          <View style={styles.subCategory}>
            <Text style={styles.seeText}>See All </Text>
            <AntDesign name="right" size={14} color="black" />
          </View>
        </View>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: SIZES.padding,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedCategory?.id == item.id
                    ? COLORS.primary
                    : COLORS.white,
                borderRadius: SIZES.radius,
                marginRight: SIZES.padding,
                ...styles.card,
                marginBottom: 10,
                flexDirection: "row",
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    backgroundColor:
                      selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.lightGray2,
                    borderRadius: 20,
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{ width: 25, height: 25 }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={{
                    marginTop: SIZES.padding,
                    color:
                      selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.black,
                    ...FONTS.body5,
                    marginLeft: 10,
                    marginBottom: 6,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function renderRestuarentList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.restuarantList}
          onPress={() => {
            navigation.navigate({
              pathname: "/Container/RestaurantScreen",
              params: {
                item: JSON.stringify(item),
              },
            });
          }}
        >
          <View style={styles.restaurantImage}>
            <Image
              source={item.photo}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={{ flexDirection: "row" }}>
            {item.categories.map((categoryId) => {
              function getCategoryNameById(categoryId) {
                let categoryName = categoryData.filter(
                  (a) => a.id == categoryId
                );
                if (categoryName.length > 0) {
                  return categoryName[0].name;
                } else {
                  return "";
                }
              }
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={categoryId}
                >
                  <Text
                    style={{
                      color: COLORS.darkgray,
                      letterSpacing: 1,
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                    {" "}
                    -{" "}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.reviewContainer}>
            <Image
              source={icons.star}
              style={{ width: 15, height: 15 }}
              resizeMode="cover"
            />
            <Text style={{ ...FONTS.body3, marginLeft: SIZES.padding }}>
              {item.rating}
            </Text>
            <View style={{ flexDirection: "row", marginLeft: 14 }}>
              <View style={styles.deliveryContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="truck-delivery"
                    size={24}
                    color="#FF7A00"
                  />
                  <Text style={{ marginLeft: 8 }}>Free</Text>
                </View>

                <View style={styles.timeContainer}>
                  <MaterialCommunityIcons
                    name="av-timer"
                    size={22}
                    color="#FF7A00"
                  />
                  <Text style={{ marginLeft: 8 }}>{item.duration}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const renderHeader = () => {
      return (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryText}>Open Restaurants</Text>
          <View style={styles.subCategory}>
            <Text style={styles.seeText}>See All </Text>
            <AntDesign name="right" size={14} color="black" />
          </View>
        </View>
      );
    };
    return (
      <FlatList
        data={restaurantList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.lightGray4} barStyle="dark-content" />
      {/* Header */}
      <View style={styles.HeaderContainer}>
        <TouchableOpacity style={styles.menuContainer}>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>DELIVER TO</Text>
          <View style={styles.locationSubContainer}>
            <Text style={styles.usersLocationText}>Halal Lab Office</Text>
            <MaterialCommunityIcons name="menu-down" size={24} color="black" />
          </View>
        </View>
        <TouchableOpacity style={styles.cartIcon}>
          <Feather name="shopping-bag" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Categories */}
      {renderMainCategories()}

      {/* Restuarent List */}
      {renderRestuarentList()}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  HeaderContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
  },
  menuContainer: {
    width: 50,
    justifyContent: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: 25,
    alignItems: "center",
  },
  locationContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15,
  },
  locationText: {
    color: "#FF7A00",
    letterSpacing: 1.2,
    fontFamily: "NotoSans-Bold",
    fontWeight: "700",
  },
  locationSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usersLocationText: {
    fontWeight: "400",
    marginRight: 6,
  },
  cartIcon: {
    width: 50,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "black",
    marginRight: 12,
  },
  GreetingContainer: { marginHorizontal: 20, marginTop: 18, marginBottom: 12 },
  GreetingText: {
    marginBottom: 10,
    fontSize: 15,
    letterSpacing: 1,
    marginBottom: 16,
  },
  GreetingSubText: { fontWeight: "800", fontSize: 16 },
  restuarantList: { marginBottom: SIZES.padding * 2 },
  restaurantImage: { marginBottom: SIZES.padding },

  restaurantImage: { width: "100%", height: 200, borderRadius: 20 },

  restaurantName: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: "600",
    marginTop: 8,
  },

  reviewContainer: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    alignItems: "center",
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    marginLeft: 12,
    alignItems: "center",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subCategory: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
  },
  seeText: {
    marginBottom: 2,
  },
});
