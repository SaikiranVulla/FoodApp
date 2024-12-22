import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CommonHeader = ({ screenName, fromScreen }) => {
  const navigation = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        // height: 50,
        marginHorizontal: 12,
        marginTop: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: 50,
          aspectRatio: 1,
          justifyContent: "center",
          backgroundColor: "#171717",
          borderRadius: 25,
          alignItems: "center",
        }}
        onPress={() => navigation.back()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
        <View>
          <Text
            style={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
              fontWeight: "600",
              letterSpacing: 1,
              color: "white",
            }}
          >
            {screenName}
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity
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
    </TouchableOpacity> */}
      {fromScreen == "CartScreen" && (
        <Text
          style={{
            color: "green",
            fontWeight: "800",
            textDecorationLine: "underline",
            letterSpacing: 0.3,
            textAlign: "center",
          }}
        >
          DONE
        </Text>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({});
