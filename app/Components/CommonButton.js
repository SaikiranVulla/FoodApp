import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CommonButton = ({title,action}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.loginButton} onPress={action}>
    <Text style={styles.loginButtonText}>{title}</Text>
  </TouchableOpacity>
  )
}

export default CommonButton

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 15,
      },
      loginButtonText: {
        color: "white",
        fontSize:18,
        fontFamily:'NotoSans-Bold',
        letterSpacing:1.2,
      },
})