import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { SendIcon } from "../icons";
import useGetMode from "../../hooks/GetMode";
import { IChatMessage } from "../../types/api";

export default function ChatBox({
  props,
  onPress,
}: {
  props: TextInputProps;
  onPress: () => void;
}) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";
  const rippleColor = dark ? "#000000" : "#A1A0A0";
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 20,
        minHeight: 50,
        borderWidth: 0.5,
        borderColor: "#B4B4B488",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <BlurView
        tint={tint}
        intensity={40}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
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
        {...props}
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
            onPress={onPress}
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
