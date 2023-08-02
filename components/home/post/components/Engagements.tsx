import { View, Text } from "react-native";
import React from "react";
import IconWithValue from "./IconWithValue";
import { ActivityUnfocused, HeartUnfocused, MessageUnfocused, ShareUnfocused } from "../../../icons";

export default function Engagements({title,}: {title?:string}) {
  return (
    <View
      style={{
        flexDirection: "row",

        alignItems: "center",

        gap: 6,
        justifyContent: "space-between",
      }}
    >
      {title && <Text>{title}</Text>}
      <IconWithValue Icon={MessageUnfocused} text="210" />
      <IconWithValue Icon={HeartUnfocused} text="110K" />
      <IconWithValue Icon={ActivityUnfocused} text="110K" />
      <ShareUnfocused size={20} color="black" />
    </View>
  );
}
