import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const CommonInput = ({placeHolder, value, onChange,typeofKeyBoard}) => {
  return (
    <TextInput 
    style={styles.input}
    placeholder={placeHolder}
    placeholderTextColor='#999'
    keyboardType={typeofKeyBoard ? typeofKeyBoard : 'default'}
    autoCapitalize="none"
    value={value}
    onChangeText={onChange}
    />

  )
}

export default CommonInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#EDF5FF",
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: "NotoSans-SemiBold",
      },
})