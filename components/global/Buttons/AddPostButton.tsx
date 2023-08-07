import { View, Text, Pressable } from "react-native";
import React from "react";
import { AddIcon } from "../../icons";

export default function AddPostButton() {
  return (
    <View
      style={{
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Pressable
        style={{
          backgroundColor: "blue",
          borderRadius: 9999,
          width: "100%",
        }}
      >
        <AddIcon size={50} color="white" />
      </Pressable>
    </View>
  );
}
