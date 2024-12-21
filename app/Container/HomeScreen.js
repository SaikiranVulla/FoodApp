import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, images, icons } from "../../constants";
import {
  initialCurrentLocation,
  categoryData,
  restaurantData,
} from "../../constants/DummyData";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import CommonInput from "../Components/CommonInput";

const Home = () => {
  const navigation = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurantList, setRestautantList] = useState(restaurantData);
  const [searchedValue, setSearchedValue] = useState(null);

  function renderHeader() {
    return (
      <View style={styles.HeaderContainer}>
        <TouchableOpacity style={styles.menuContainer}>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
        {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.lightGray3,
                borderRadius: SIZES.radius,
                width: '70%',
                height: '100%',
              }}>
              <Text style={{...FONTS.h3}}>
                {initialCurrentLocation?.streetName}
              </Text>
            </View>
          </View> */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>DELIVER TO</Text>
          <View style={styles.locationSubContainer}>
            <Text style={{ fontWeight: "400", marginRight: 6 }}>
              Halal Lab Office
            </Text>
            <MaterialCommunityIcons name="menu-down" size={24} color="black" />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: "center",
            borderRadius: 25,
            alignItems: "center",
            backgroundColor: "black",
            marginRight: 12,
          }}
        >
          {/* <Image
              source={icons.basket}
              style={{width: 30, height: 25}}
              resizeMode="contain"
            /> */}
          <Feather name="shopping-bag" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  function renderMainCategories() {
    const onSelectCategory = (category) => {
      const listComponent = restaurantData.filter((a) =>
        a.categories.includes(category.id)
      );
      setRestautantList(listComponent);
      setSelectedCategory(category);
      console.log(restaurantList);
    };
    return (
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ marginBottom: 10, fontSize: 15, letterSpacing: 1 }}>
          Hey Halal,{" "}
          <Text style={{ fontWeight: "800", fontSize: 16 }}>
            Good Afternoon!
          </Text>
        </Text>
        <CommonInput
          placeHolder={" Search dishes, restaurants"}
          value={searchedValue}
          onChange={() => console.log("dfhvdf")}
        />
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: SIZES.padding,
                paddingBottom: SIZES.padding * 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedCategory?.id == item.id
                    ? COLORS.primary
                    : COLORS.white,
                borderRadius: SIZES.radius,
                marginRight: SIZES.padding,
                ...styles.card,
                marginTop: 8,
                flexDirection: "row",
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50,
                    height: 50,
                    backgroundColor:
                      selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.lightGray2,
                    borderRadius: 30,
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{ width: 30, height: 30 }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.padding,
                    color:
                      selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.black,
                    ...FONTS.body5,
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
          style={{ marginBottom: SIZES.padding * 2, marginTop: 10 }}
          onPress={() =>
            navigation.navigate({
              pathname: "/Container/RestaurantScreen",
              params: {
                item: item,
              },
            })
          }
        >
          <View style={{ marginBottom: SIZES.padding }}>
            <Image
              source={item.photo}
              style={{ width: "100%", height: 200, borderRadius: SIZES.radius }}
              resizeMode="cover"
            />
            {/* <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 50,
                  borderTopRightRadius: SIZES.radius,
                  borderBottomRightRadius: 2,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  width: SIZES.width * 0.4,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h4}}>{item.duration}</Text>
              </View> */}
          </View>
          <Text style={{ fontSize: 18, letterSpacing: 1, fontWeight: "600" }}>
            {item.name}
          </Text>
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
            {/* price */}
            {/* {[{price: 100}].map(priceRating => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                      }}
                      key={priceRating.price}>
                      <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                        $ {priceRating.price}
                      </Text>
                    </View>
                  );
                })} */}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              alignItems: "center",
            }}
          >
            <Image
              source={icons.star}
              style={{ width: 15, height: 15 }}
              resizeMode="cover"
            />
            <Text style={{ ...FONTS.body3, marginLeft: SIZES.padding }}>
              {item.rating}
            </Text>
            <View style={{ flexDirection: "row", marginLeft: 14 }}>
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
                    size={24}
                    color="#FF7A00"
                  />
                  <Text style={{ marginLeft: 8 }}>Free</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 12,
                    alignItems: "center",
                  }}
                >
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
    return (
      <FlatList
        data={restaurantList}
        keyExtractor={(item) => item.id}
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
      {/* Header */}
      {/* {renderHeader()} */}
      <View style={styles.HeaderContainer}>
        <TouchableOpacity style={styles.menuContainer}>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
        {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.lightGray3,
                borderRadius: SIZES.radius,
                width: '70%',
                height: '100%',
              }}>
              <Text style={{...FONTS.h3}}>
                {initialCurrentLocation?.streetName}
              </Text>
            </View>
          </View> */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>DELIVER TO</Text>
          <View style={styles.locationSubContainer}>
            <Text style={{ fontWeight: "400", marginRight: 6 }}>
              Halal Lab Office
            </Text>
            <MaterialCommunityIcons name="menu-down" size={24} color="black" />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: "center",
            borderRadius: 25,
            alignItems: "center",
            backgroundColor: "black",
            marginRight: 12,
          }}
        >
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

export default Home;

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
    height: 50,
    marginHorizontal: 12,
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
});
