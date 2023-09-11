import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
export default function ChatBuilderText({
  isMe,
  time,
  id,
  isModal,
  text,
  isClicked,
  sent,
  photoUri,
}: {
  isMe: boolean;
  text: string;
  isClicked: string | null;
  isModal?: boolean;
  time: string;
  sent: boolean;
  id: string;
  photoUri?: string;
}) {
  const dark = useGetMode();
  const backgroundColorForMe = dark ? "#35383A" : "#0c81f8";
  const backgroundColor = dark ? "#181B1D" : "#e8e8eb";
  const color = dark ? "white" : "black";
  const [height, setHeight] = useState(0);
  const navigate = useNavigation<ChatNavigation>();
  const chatTextRef = useRef<Animated.View>(null);
  useEffect(() => {
    chatTextRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setHeight(height);
    });
  }, []);
  return (
    <>
      {id !== isClicked ? (
        <Animated.View
          exiting={FadeOut.delay(20)}
          ref={chatTextRef}
          key={id}
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
                      id,
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
                  entering={FadeIn.duration(400)}
                  exiting={isModal ? undefined : FadeOut.duration(400)}
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
      ) : (
        <View style={{ height: height, width: 100 }} />
      )}
    </>
  );
}
