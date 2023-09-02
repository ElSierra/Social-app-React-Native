import { View, Text, Dimensions } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";

const { width } = Dimensions.get("screen");
export default function ChatBuilderText({
  isMe,
  text,
}: {
  isMe: boolean;
  text: string;
}) {
  const dark = useGetMode();
  const backgroundColorForMe = dark ? "#35383A" : "#DDE6ED";
  const backgroundColor = dark ? "#181B1D" : "#B5CBD9";
  const color = dark ? "white" : "black";
  return (
    <View
      style={{ width: "100%", alignItems: isMe ? "flex-end" : "flex-start" }}
    >
      <View>
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            borderBottomLeftRadius: !isMe ? 0 : undefined,
            borderBottomRightRadius: isMe ? 0 : undefined,
            alignSelf: "flex-start",

            backgroundColor: isMe ? backgroundColorForMe : backgroundColor,
          }}
        >
          <Text style={{ fontFamily: "jakara", color }}>{text}</Text>
        </View>
      </View>
    </View>
  );
}
