import { View, Text, Pressable } from "react-native";
import React from "react";

export default function HeaderTag({
  text,
  onPress,
  selected,
}: {
  text: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <View
      style={{
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 60,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          width: 60,
          padding: 10,
          backgroundColor: selected ? "black" : "grey",
          borderRadius: 60,

          justifyContent: "center",
          alignItems: "center",
        }}
        android_ripple={{ color: "white" }}
      >
        <Text
          style={{ fontFamily: "jakaraBold", fontSize: 12, color: "white" }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
