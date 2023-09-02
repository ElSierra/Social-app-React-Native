import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import useGetMode from "../../../hooks/GetMode";

export default function AvatarName() {
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  
  return (
    <View
      style={{
        gap: 10,
        justifyContent: "center",
        width: 100,

        alignItems: "center",
      }}
    >
      <FastImage
        style={{ borderRadius: 9999, height: 65, width: 65 }}
        source={require("../../../assets/avatar/placeholder.png")}
      />
      <Text style={{ fontFamily: "jakara", fontSize: 16, color }}>
        @hojoisaac
      </Text>
    </View>
  );
}
