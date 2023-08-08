import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";

export default function PostButton() {
  const dark = useGetMode();
  const backgroundColor = dark ? "white" : "black";
  const rippleColor = !dark ? "white" : "black";
  const color = !dark ? "white" : "black";
  return (
    <View
      style={{
        backgroundColor,
        height: 45,
        width: 80,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Pressable
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          height: 45,
          width: 80,
          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color ,fontFamily:"mulishBold"}}>Post</Text>
      </Pressable>
    </View>
  );
}
