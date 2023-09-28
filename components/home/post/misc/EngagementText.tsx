import { View, Text } from "react-native";
import React from "react";
import useGetMode from "../../../../hooks/GetMode";

export default function EngagementsText({
  engage,
  engagementNumber,
}: {
  engage: string;
  engagementNumber: number;
}) {
  const dark = useGetMode();

  const color = dark ? "white" : "black";
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
      <Text style={{ color, fontFamily: "mulishBold", fontSize: 14 }}>
        {engagementNumber}
      </Text>
      <Text
        style={{ color: "#7a868f", fontFamily: "mulish", fontSize: 14 }}
      >
        {engage}
        {engagementNumber > 1 && "s"}
      </Text>
    </View>
  );
}
