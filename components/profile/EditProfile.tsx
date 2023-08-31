import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";

export default function ButtonOutlined() {
  const dark = useGetMode()
  const color = dark ? "white" : "black"
  return (
    <View>
      <Pressable
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderColor: "#B4B4B4D1",
          borderRadius: 999,
          borderWidth: 1,
        }}
      >
        <Text style={{ fontFamily: "jakaraBold", color }}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}
