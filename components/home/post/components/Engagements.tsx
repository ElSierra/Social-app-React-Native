import { View, Text, useColorScheme } from "react-native";
import React from "react";
import IconWithValue from "./IconWithValue";
import {
  ActivityUnfocused,
  HeartUnfocused,
  HeartsFocused,
  Love,
  MessageUnfocused,
  MessagesIcon,
  ShareUnfocused,
} from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";

export default function Engagements({ title }: { title?: string }) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,

        alignItems: "center",

        gap: 6,
        justifyContent: "space-between",
      }}
    >
      {title && <Text>{title}</Text>}
      <View style={{flexDirection:"row"}}>
        <IconWithValue
          IconUnfocused={MessageUnfocused}
          text="210"
          IconFocused={MessageUnfocused}
        />
        <IconWithValue
          IconUnfocused={HeartUnfocused}
          text="110K"
          IconFocused={HeartsFocused}
        />
      </View>
      <ShareUnfocused size={20} color={color} />
    </View>
  );
}
