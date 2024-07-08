import { View, Text, Dimensions, Pressable } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
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
import { ActivityIndicator } from "react-native-paper";
import { BlurView } from "expo-blur";
import { isEmoji } from "../../util/emoji";
import { useAppSelector } from "../../redux/hooks/hooks";

const { width } = Dimensions.get("window");
function ChatBuilderText({
  isMe,
  time,
  id,
  isModal,
  text,
  isClicked,
  sent,
  photoUri,
  photo,
  isLast,
}: {
  isMe: boolean;
  text: string;
  isClicked: string | null;
  isModal?: boolean;
  time: string;
  sent: boolean;
  id: string;
  photoUri?: string;
  photo?: { imageWidth: number; imageHeight: number };
  isLast: boolean;
}) {
  console.log("🚀 ~ file: ChatBuilderText.tsx:45 ~ isClicked:", isClicked);
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
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  console.log("isEmoji", isEmoji(text));
  return (
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
            padding: isEmoji(text) ? undefined : 10,
            borderRadius: 15,
            maxWidth: width / 1.5,
            flexDirection: "column",
            borderBottomLeftRadius: !isMe ? 0 : undefined,
            borderBottomRightRadius: isMe ? 0 : undefined,
            alignSelf: !isMe ? "flex-start" : "flex-end",
            justifyContent: "flex-start",
            backgroundColor:
              isEmoji(text) || isClicked === id
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
                fontSize: isEmoji(text) ? 40 : 14,
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
                  height: photo?.imageHeight,
                  width: photo?.imageWidth,
                });
              }}
            >
              <Animated.View
         
                style={{ padding: 5, overflow: "hidden", borderRadius: 10 }}
              >
                <Image
                  source={{ uri: photoUri }}
                  priority={"high"}
                  style={{
                    width: 200,
                    height: 100,
                    borderRadius: 10,
                    opacity: !sent && isLast ? 0.4 : 1,
                  }}
                />
                {!sent && isLast && (
                  <>
                    {
                      <BlurView
                        experimentalBlurMethod=  {isHighEndDevice ?"dimezisBlurView": undefined}
                        style={{
                          height: 200,
                          width: 600,
                          position: "absolute",
                        }}
                      />
                    }
                    <ActivityIndicator
                      color={color}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    />
                  </>
                )}
              </Animated.View>
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
  );
}
export default ChatBuilderText;
