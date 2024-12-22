import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { Children } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const CommonSheetView = ({ mainTitle, subTitle, children, fromScreen }) => {
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { backgroundColor: fromScreen !== "Cart" ? "#1c1540" : null },
      ]}
    >
      {fromScreen !== "Cart" && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{ flex: 0.3, alignSelf: "center", justifyContent: "center" }}
          >
            <Text style={styles.title}>{mainTitle}</Text>
            <Text style={styles.subtitle}>{subTitle}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <BottomSheet snapPoints={["50%", "70%"]}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CommonSheetView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 7,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
});
