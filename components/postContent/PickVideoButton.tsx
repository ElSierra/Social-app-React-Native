import { View, Text, Pressable } from "react-native";
import React from "react";
import { CameraIcon, VideoIcon } from "../icons";
import ImagePicker from "react-native-image-crop-picker";
import useGetMode from "../../hooks/GetMode";
export default function PickVideoButton({
  handleSetPhotoPost,
}: {
  handleSetPhotoPost: (mimeType: string, uri: string, size: number) => void;
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
        backgroundColor: backgroundColorView,
        overflow: "hidden",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          ImagePicker.openPicker({
          
            mediaType: "video",
            compressImageQuality: 0.5,
          })
            .then((video) => {
              

              handleSetPhotoPost(video?.mime, video?.path, video?.size);
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
        <VideoIcon color={backgroundColor} size={40} />
      </Pressable>
    </View>
  );
}
