import { View, Text, Dimensions, Pressable } from "react-native";
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

import { useNavigation } from "@react-navigation/native";
import { ChatNavigation } from "../../types/navigation";
import { Image } from "expo-image";
import { isEmoji } from "../../util/emoji";

const { width } = Dimensions.get("window");
export default function ModalChatText({
  isMe,
  time,
  isModal,
  text,
  sent,
  photoUri,
}: {
  isMe: boolean;
  text: string;
  isModal?: boolean;
  time: string;
  sent: boolean;
  photoUri?: string;
}) {
  const dark = useGetMode();
  const navigate = useNavigation<ChatNavigation>();
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
            padding: isEmoji(text) ? undefined : 10,
            borderRadius: 15,
            maxWidth: width / 1.5,
            flexDirection: "column",
            borderBottomLeftRadius: !isMe ? 0 : undefined,
            borderBottomRightRadius: isMe ? 0 : undefined,
            alignSelf: !isMe ? "flex-start" : "flex-end",
            justifyContent: "flex-start",
            backgroundColor: isEmoji(text)
              ? "transparent"
              : isMe
              ? backgroundColorForMe
              : backgroundColor,
          }}
        >
          {!photoUri ? (
            <Text
              style={{
                fontFamily: "jakara",
                color: isMe ? "white" : dark ? "white" : "black",
                fontSize: isEmoji(text) ? 40 : isModal ? 20 :15,
              }}
            >
              {text}
            </Text>
          ) : (
            <Pressable
              onPress={() => {
                navigate.navigate("ImageFullScreen", {
                  photoUri,
                  id: "",
                });
              }}
            >
              <View
                style={{ padding: 5, overflow: "hidden", borderRadius: 10 }}
              >
                <Image
                  source={{ uri: photoUri }}
                  priority={"high"}
                  style={{ width: 200, height: 100, borderRadius: 10 }}
                />
              </View>
            </Pressable>
          )}
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
