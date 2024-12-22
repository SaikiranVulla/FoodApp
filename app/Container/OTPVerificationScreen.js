import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import CommonSheetView from "../Components/CommonSheetView";
import CommonButton from "../Components/CommonButton";
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants";

const OTPVerificationScreen = () => {
  const navigation = useRouter();
  const [countdown, setCountdown] = useState(60); // Resend countdown

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    navigation.navigate({
      pathname: "/Container/HomeScreen",
    });
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60); // Reset timer
      Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
    }
  };
  return (
    <CommonSheetView
      mainTitle={"Verification"}
      subTitle={"We have sent a code to your email example@gmail.com"}
    >
      <StatusBar backgroundColor={COLORS.lightGray3} barStyle="dark-content" />
      <View style={styles.resendContainer}>
        <Text style={styles.codeText}>Code</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={countdown > 0}
          onPress={handleResend}
          style={styles.resendView}
        >
          <Text style={styles.resendText}>Resend </Text>
          <Text style={styles.countdownText}>
            {countdown > 0 ? `in ${countdown} sec` : ""}
          </Text>
        </TouchableOpacity>
      </View>
      <OtpInput numberOfDigits={4} onTextChange={(text) => console.log(text)} />
      <CommonButton title={"VERIFY"} action={handleVerify} />
    </CommonSheetView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c36",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  otpContainer: {
    width: "80%",
    height: 100,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  otpInputActive: {
    borderColor: "#ff6f00",
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: "#ff6f00",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resendView: {
    flexDirection: "row",
  },
  codeText: {
    fontSize: 16,
    fontFamily: "NotoSans-Bold",
    fontWeight: "400",
  },
  resendText: {
    textDecorationLine: "underline",
    fontFamily: "NotoSans-Bold",
    fontSize: 16,
    fontWeight: "600",
  },
  countdownText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
