import {
  View,
  Text,
  TextInput,
  useColorScheme,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { Eye, EyeSlash } from "../../../components/icons";
import useGetMode from "../../../hooks/GetMode";
import { TextInputProps } from "react-native-paper";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function InputPassword({
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
  const [show, setShow] = useState(false);
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
          backgroundColor,
        },
        style,
      ]}
    >
      <TextInput
        cursorColor={color}
        secureTextEntry={!show}
        placeholder="Enter Password"
        placeholderTextColor={placeholderColor}
        style={{
          width: "90%",
          height: "100%",
          fontSize: 16,
          color,
          fontFamily: "jakara",
          includeFontPadding: false,
        }}
        {...props}
      />
      <View
        style={{
          width: "10%",
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          borderRadius: 999,
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            setShow(!show);
          }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 999,
            alignItems: "center",

            justifyContent: "center",
          }}
          android_ripple={{ color: "#FFFFFF" }}
        >
          {!show ? (
            <Animated.View>
              <Eye size={22} color={color} />
            </Animated.View>
          ) : (
            <EyeSlash size={22} color={color} />
          )}
        </Pressable>
      </View>
    </View>
  );
}
