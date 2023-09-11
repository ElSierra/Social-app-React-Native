import { View, Text, Dimensions } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";
import { formatDateForChat } from "../../util/date";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { CheckIcon } from "../icons";

const { width } = Dimensions.get("screen");
export default function ModalChatText({
  isMe,
  time,
  isModal,
  text,
  sent,
}: {
  isMe: boolean;
  text: string;
  isModal?: boolean;
  time: string;
  sent: boolean;
}) {
  const dark = useGetMode();
  const backgroundColorForMe = dark ? "#35383A" : "#0c81f8";
  const backgroundColor = dark ? "#181B1D" : "#e8e8eb";
  const color = dark ? "white" : "black";
  return (
    <Animated.View
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
            flexDirection: "column",
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
          {sent && (
            <Animated.View
              style={{
                alignSelf: !isMe ? "flex-start" : "flex-end",
                height: 13,
              }}
            >
              <CheckIcon size={13} color={"white"} />
            </Animated.View>
          )}
        </View>
        {!isModal && (
          <View
            style={{
              alignSelf: !isMe ? "flex-start" : "flex-end",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "jakara",
                fontSize: 12,
                color,
              }}
            >
              {formatDateForChat(time)}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}
