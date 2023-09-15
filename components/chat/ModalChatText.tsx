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
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ChatNavigation } from "../../types/navigation";

const { width } = Dimensions.get("screen");
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
          {!photoUri ? (
            <Text
              style={{
                fontFamily: "jakara",
                color: isMe ? "white" : dark ? "white" : "black",
              }}
            >
              {text}
            </Text>
          ) : (
            <Pressable
              onPress={() => {
                navigate.navigate("ImageFullScreen", {
                  photoUri,
                  id:"",
                });
              }}
            >
              <FastImage
                source={{ uri: photoUri, priority: "high" }}
                style={{ width: 200, height: 100, borderRadius: 10 }}
              />
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
