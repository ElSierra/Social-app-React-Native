import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { SendIcon } from "../icons";
import useGetMode from "../../hooks/GetMode";

export default function ChatBox() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#F3F2F2" : "#404040";
  const rippleColor = dark ? "#000000" : "#A1A0A0";
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 20,
        minHeight: 50,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor,
      }}
    >
      <TextInput
        multiline
        placeholder="Type Message 😒"
        placeholderTextColor={"grey"}
        cursorColor={color}
        style={{
          width: "82%",
          height: "100%",
          maxHeight: 100,
          color,
          paddingLeft: 20,
          paddingVertical: 10,
        }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
          }}
        >
          <Pressable
            style={{
              height: 40,
              width: 40,
              overflow: "hidden",
              borderRadius: 999,

              justifyContent: "center",
              alignItems: "center",
            }}
            android_ripple={{ color: rippleColor, foreground: true }}
          >
            <SendIcon size={25} color={color} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
