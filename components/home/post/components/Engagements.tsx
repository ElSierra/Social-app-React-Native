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

export default function Engagements({ title }: { title?: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
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
      <IconWithValue
        IconUnfocused={MessageUnfocused}
        text="210"
        IconFocused={MessagesIcon}
      />
      <IconWithValue
        IconUnfocused={HeartUnfocused}
        text="110K"
        IconFocused={HeartsFocused}
      />
      <IconWithValue
        IconUnfocused={ActivityUnfocused}
        text="110K"
        IconFocused={ActivityUnfocused}
      />
      <ShareUnfocused size={20} color={color} />
    </View>
  );
}
