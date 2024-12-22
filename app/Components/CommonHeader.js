import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CommonHeader = ({ screenName, fromScreen }) => {
  const navigation = useRouter();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={[
          styles.backButtonContainer,
          {
            backgroundColor:
              fromScreen == "CartScreen" ? "#171717" : COLORS.lightGray3,
          },
        ]}
        onPress={() => navigation.back()}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={fromScreen == "CartScreen" ? "white" : "black"}
        />
      </TouchableOpacity>
      <View style={styles.titleTextContainer}>
        <View>
          <Text
            style={[
              styles.titleText,
              { color: fromScreen == "CartScreen" ? "white" : "black" },
            ]}
          >
            {screenName}
          </Text>
        </View>
      </View>

      {fromScreen == "CartScreen" ? (
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
      ) : (
        fromScreen !== "Detail" && (
          <TouchableOpacity activeOpacity={0.7} style={styles.moreContainer}>
            <Feather
              name={
                fromScreen == "restaurant" ? "more-horizontal" : "shopping-bag"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
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
});
