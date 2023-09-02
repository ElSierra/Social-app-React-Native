import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

export default function AvatarName() {
  return (
    <View
      style={{
        gap: 10,
        justifyContent: "center",
        width: 65,

        alignItems: "center",
      }}
    >
      <FastImage
        style={{ borderRadius: 9999, height: 65, width: 65 }}
        source={require("../../../assets/avatar/placeholder.png")}
      />
      <Text style={{ fontFamily: "jakara", fontSize: 16 }}>Isaac</Text>
    </View>
  );
}
