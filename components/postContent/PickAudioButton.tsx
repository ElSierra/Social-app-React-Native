import { View, Text, Pressable } from "react-native";
import React from "react";
import { AudioIcon, CameraIcon } from "../icons";
import DocumentPicker from "react-native-document-picker";
import useGetMode from "../../hooks/GetMode";
export default function PickAudioButton({
  handleSetAudioPost,
}: {
  handleSetAudioPost: (
    mimeType: string,
    uri: string,
    size: number,
    name: string
  ) => void;
}) {
  const dark = useGetMode();
  const backgroundColor = dark ? "white" : "black";
  const backgroundColorView = !dark ? "white" : "black";
  const rippleColor = !dark ? "#ABABAB" : "#55555500";
  return (
    <View
      style={{
        borderColor: "#B4B4B488",
        borderWidth: 1,
        width: 100,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: backgroundColorView,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          DocumentPicker.pick({ type: "audio/mpeg" })
            .then((e) => {

              handleSetAudioPost(
                e[0]?.type as string,
                e[0].uri,
                e[0]?.size || 0,
                e[0]?.name || "any.mp3"
              );
            })
            .catch((e) => {});
        }}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AudioIcon color={backgroundColor} size={40} />
      </Pressable>
    </View>
  );
}
