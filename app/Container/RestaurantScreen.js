import {useLocalSearchParams,useRouter} from 'expo-router'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    SafeAreaView,
    Animated,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {SIZES, COLORS, icons, images, FONTS} from '../../constants';

const RestaurantScreen = () => {
    const {item} = useLocalSearchParams()
    const navigation = useRouter()
    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = useState(item);
    const [cartItems, setCartItems] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
  
    useEffect(() => {
    //   let {item} = route.params;
      setRestaurant(item);
    }, []);
  
    function editOrder(action, menuItem) {
      let index = cartItems.findIndex(item => item.menuId === menuItem.menuId);
      console.log('index', index);
      console.log('before update', cartItems);
      let totalAmount = 0;
      if (index > -1) {
        if (action == '+') {
          menuItem['qty'] = menuItem['qty'] + 1;
          totalAmount = finalPrice + menuItem.price;
        } else {
          menuItem['qty'] = menuItem['qty'] - 1;
          totalAmount = finalPrice - menuItem.price;
        }
        cartItems[index] = menuItem;
        console.log('updated Item', menuItem);
        if (menuItem['qty'] === 0) {
          cartItems.splice(index, 1);
        }
        setCartItems([...cartItems]);
        console.log('after update', cartItems);
        setFinalPrice(totalAmount);
      } else {
        if (action == '+') {
          menuItem['qty'] = 1;
          totalAmount = finalPrice + menuItem.price;
          setCartItems([...cartItems, menuItem]);
          setFinalPrice(totalAmount);
        }
      }
    }
  
    function renderHeader() {
      return (
        <View style={{flexDirection: 'row', height: 50}}>
          <TouchableOpacity
            style={{
              width: 50,
              justifyContent: 'center',
              paddingLeft: SIZES.padding * 2,
            }}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.lightGray3,
                borderRadius: SIZES.radius,
                width: '70%',
                height: '100%',
              }}>
              <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              justifyContent: 'center',
            }}>
            <Image
              source={icons.list}
              style={{width: 30, height: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );
    }
  
    function renderFoodInfo() {
      return (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {restaurant?.menu.map((menuItem, index) => {
            return (
              <View key={index} style={{alignItems: 'center'}}>
                <View style={{height: SIZES.height * 0.3}}>
                  <Image
                    source={menuItem.photo}
                    resizeMode="cover"
                    style={{width: SIZES.width, height: '100%'}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'row',
                      bottom: -20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                      }}
                      onPress={() => editOrder('-', menuItem)}>
                      <Text style={{...FONTS.body1}}>-</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{...FONTS.h2}}>
                        {menuItem.qty !== undefined ? menuItem.qty : 0}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => editOrder('+', menuItem)}>
                      <Text style={{...FONTS.body1}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Name and Price */}
                <View
                  style={{
                    alignItems: 'center',
                    width: SIZES.width,
                    marginTop: 30,
                    paddingHorizontal: SIZES.padding * 2,
                  }}>
                  <Text style={{...FONTS.h3, textAlign: 'center'}}>
                    {menuItem?.name} - $ {menuItem?.price.toFixed(2)}
                  </Text>
                  <Text
                    style={{...FONTS.body2, marginTop: 15, textAlign: 'center'}}>
                    {menuItem?.description}
                  </Text>
                </View>
                {/* Calories */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Image
                    source={icons.fire}
                    style={{width: 25, height: 25}}
                    resizeMode="cover"
                  />
                  <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                    {' '}
                    {menuItem?.calories.toFixed(2)} cal
                  </Text>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      );
    }
  
    function renderOrderInfo() {
      function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return (
          <View style={{height: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: SIZES.padding,
              }}>
              {restaurant?.menu.map((item, index) => {
                const opacity = dotPosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });
  
                const dotSize = dotPosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                  extrapolate: 'clamp',
                });
  
                const dotColor = dotPosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    opacity={opacity}
                    style={{
                      marginHorizontal: 6,
                      borderRadius: SIZES.radius,
                      width: dotSize,
                      height: dotSize,
                      backgroundColor: dotColor,
                    }}
                  />
                );
              })}
            </View>
          </View>
        );
      }
      return (
        <View>
          {renderDots()}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding * 3,
                paddingVertical: SIZES.padding * 2,
                borderBottomColor: COLORS.lightGray2,
                borderBottomWidth: 1,
              }}>
              <Text style={{...FONTS.h3}}>{cartItems.length} items in Cart</Text>
              <Text style={{...FONTS.h3}}>$ {finalPrice?.toFixed(2)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding * 3,
                paddingVertical: SIZES.padding * 2,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.pin}
                  style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
                  resizeMode="contain"
                />
                <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                  Location
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.master_card}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray,
                  }}
                />
                <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>8888</Text>
              </View>
            </View>
            {/* Order Button */}
            <View
              style={{
                padding: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  borderRadius: SIZES.radius,
                  alignItems: 'center',
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                }}
                onPress={() =>
                  navigation.navigate('Order', {restaurant: restaurant})
                }>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                position: 'absolute',
                bottom: -34,
                left: 0,
                right: 0,
                height: 34,
                backgroundColor: COLORS.white,
              }}></View>
          </View>
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray4}}>
        {/* HeaderBar */}
        {renderHeader()}
        {/* Food Info */}
        {/* {renderFoodInfo()} */}
        {/* Order Info */}
        {/* {renderOrderInfo()} */}
      </SafeAreaView>
    );
}

export default RestaurantScreen

const styles = StyleSheet.create({})