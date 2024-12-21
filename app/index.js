import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // ref
  const bottomSheetRef = useRef(null);

  // callbacks
  // const handleSheetChanges = useCallback((index) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{ flex: 0.3, alignSelf: "center", justifyContent: "center" }}
      >
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>
          Please sign in to your existing account
        </Text>
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={["70%"]}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.sheetContent}>
            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
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
              <View style={styles.rememberMeContainer}>
                <Switch value={rememberMe} onValueChange={setRememberMe} />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Signup and Social Login */}
            <Text style={styles.signupText}>
              Don’t have an account?{" "}
              <Text style={styles.linkText}>Sign Up</Text>
            </Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="twitter" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="apple" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    // padding: 36,
    alignItems: "center",
  },
  sheetContent: {
    // padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2C2F36",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
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
  },
  rememberMeText: {
    color: "white",
    marginLeft: 5,
  },
  linkText: {
    color: "#FF7A00",
  },
  loginButton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialButton: {
    backgroundColor: "#2C2F36",
    padding: 12,
    borderRadius: 50,
  },
});

export default index;
