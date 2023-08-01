import { View, Text } from "react-native";
import React, { ElementType } from "react";

export default function IconWithValue({
  Icon,
  text,
}: {
  Icon: ElementType;
  text: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center",gap:2 }}>
      
      <Icon size={20} color={"black"} />
      <Text>{text}</Text>
    </View>
  );
}
