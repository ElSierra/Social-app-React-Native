import { View, Text, useColorScheme } from "react-native";
import React, { ElementType } from "react";

export default function IconWithValue({
  Icon,
  text,
}: {
  Icon: ElementType;
  text: string;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const color = isDark? "white":"black"
  return (
    <View style={{ flexDirection: "row", alignItems: "center",gap:2 }}>
      
      <Icon size={20} color={color} />
      <Text style={{color}}>{text}</Text>
    </View>
  );
}
