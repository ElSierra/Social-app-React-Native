import { View, Text, Dimensions } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";
import { formatDateForChat } from "../../util/date";

const { width } = Dimensions.get("screen");
export default function ChatBuilderText({
  isMe,
  time,
  isModal,
  text,
}: {
  isMe: boolean;
  text: string;
  isModal?: boolean;
  time: string;
}) {
  const dark = useGetMode();
  const backgroundColorForMe = dark ? "#35383A" : "#0c81f8";
  const backgroundColor = dark ? "#181B1D" : "#e8e8eb";
  const color = dark ? "white" : "black";
  return (
    <View
      style={{
        width: "100%",
        alignItems: isMe ? "flex-end" : "flex-start",
      }}
    >
      <View>
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            maxWidth: width / 1.5,

            borderBottomLeftRadius: !isMe ? 0 : undefined,
            borderBottomRightRadius: isMe ? 0 : undefined,
            alignSelf: !isMe ? "flex-start" : "flex-end",
            justifyContent: "flex-start",
            backgroundColor: isMe ? backgroundColorForMe : backgroundColor,
          }}
        >
          <Text
            style={{
              fontFamily: "jakara",
              color: isMe ? "white" : dark ? "white" : "black",
            }}
          >
            {text}
          </Text>
        </View>
        {!isModal && (
          <View
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontFamily: "jakara",
                fontSize: 12,
                color,
                textAlign: "left",
              }}
            >
              {formatDateForChat(time)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
