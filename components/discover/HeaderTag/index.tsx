import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../../hooks/GetMode";

export default function HeaderTag({
  text,
  onPress,
  selected,
}: {
  text: string;
  onPress: () => void;
  selected: boolean;
}) {
  const dark = useGetMode();
  const color = !dark ? "white" : "black";
  const backgroundColor = !dark ? "black" : "white";
  return (
    <View
      style={{
        overflow: "hidden",
        justifyContent: "center",
        height: 40,
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 60,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          width: 60,
          height: 40,
          padding: 10,
          backgroundColor: selected ? backgroundColor : "grey",
          borderRadius: 60,

          justifyContent: "center",
          alignItems: "center",
        }}
        android_ripple={{ color: "white" }}
      >
        <Text style={{ fontFamily: "jakaraBold", fontSize: 12, color: selected ? color : "white" }}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
