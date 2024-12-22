import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import CommonButton from "../Components/CommonButton";
import CommonSheetView from "../Components/CommonSheetView";
import CommonInput from "../Components/CommonInput";
import { COLORS } from "../../constants";

const index = () => {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate({
      pathname: "/Container/OTPVerificationScreen",
    });
  };

  return (
    <CommonSheetView
      mainTitle={"Login"}
      subTitle={"Please sign in to your existing account"}
    >
      <StatusBar backgroundColor={COLORS.lightGray4} barStyle="dark-content" />
      <View style={styles.sheetContent}>
        {/* Email Input */}
        <Text style={styles.fieldsName}>Email</Text>
        <CommonInput
          placeHolder={"example@gmail.com"}
          value={email}
          onChange={setEmail}
          typeofKeyBoard={"email-address"}
        />

        {/* Password Input */}
        <Text style={styles.fieldsName}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <FontAwesome
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <MaterialCommunityIcons
              name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
              size={22}
              color={rememberMe ? "#FF7A00" : "#999"}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <CommonButton title="Log In" action={handleLoginPress} />

        {/* Signup and Social Login */}
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.socialButton, { backgroundColor: "#4267B2" }]}
          >
            <FontAwesome name="facebook" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]}
          >
            <FontAwesome name="twitter" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.socialButton, { backgroundColor: "black" }]}
          >
            <FontAwesome name="apple" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </CommonSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1540",
  },
  contentContainer: {
    flex: 7,
    marginHorizontal: 24,
  },
  sheetContent: {
    // padding: 20,
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
  fieldsName: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "NotoSans-SemiBold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  input: {
    backgroundColor: "#EDF5FF",
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "NotoSans-SemiBold",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  rememberMeText: {
    marginLeft: 5,
    letterSpacing: 1.2,
    fontFamily: "NotoSans-Medium",
    fontSize: 14,
  },
  linkText: {
    color: "#FF7A00",
    marginTop: 14,
    letterSpacing: 1.2,
    fontFamily: "NotoSans-Medium",
  },
  loginButton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NotoSans-Bold",
    letterSpacing: 1.2,
  },
  signupText: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 15,
    fontFamily: "NotoSans-Regular",
    marginTop: 10,
    letterSpacing: 1.2,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 15,
    // width:250,
    // height:250,
  },
  socialButton: {
    padding: 12,
    borderRadius: 35,
    width: 70,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default index;
