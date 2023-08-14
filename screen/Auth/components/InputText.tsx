import {
  View,
  Text,
  TextInput,
  useColorScheme,
  TextInputProps,
  StyleProp,
  RegisteredStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import useGetMode from "../../../hooks/GetMode";

export default function InputText({
  props,
  style,
}: {
  props: TextInputProps;
  style?: StyleProp<ViewStyle>;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "#292828" : "#f1f1f1";
  const color = isDark ? "white" : "black";
  const placeholderColor = isDark ? "#959595" : "#393939";
  return (
    <View
      style={[
        {
          width: "100%",
          height: 50,
          paddingHorizontal: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor,
        },
        style,
      ]}
    >
      <TextInput
        cursorColor={color}
        placeholder="Enter Username"
        placeholderTextColor={placeholderColor}
        style={[
          {
            width: "90%",
            height: "100%",
            fontSize: 16,
            color,
            fontFamily: "jakara",
            includeFontPadding: false,
          },
        ]}
        {...props}
      />
      <View
        style={{
          width: "10%",
          height: "100%",

          alignItems: "center",
          paddingBottom: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "jakara",
            color,
            fontSize: 25,
            includeFontPadding: false,
          }}
        >
          @
        </Text>
      </View>
    </View>
  );
}
