import { View, Text } from "react-native";
import React from "react";

export default function HeaderTag({ text }: { text: string }) {
  return (
    <View
      style={{
        padding: 10,
        borderColor: "black",
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 60,
      }}
    >
      <Text style={{ fontFamily: "jakaraBold", fontSize: 16, color: "white" }}>
       {text}
      </Text>
    </View>
  );
}
