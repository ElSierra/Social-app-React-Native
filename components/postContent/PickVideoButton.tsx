import { View, Text, Pressable } from "react-native";
import React from "react";
import { CameraIcon, VideoIcon } from "../icons";
import ImagePicker, { launchImageLibrary } from "react-native-image-picker";
import useGetMode from "../../hooks/GetMode";
import { Video } from "react-native-compressor";
export default function PickVideoButton({
  handleSetPhotoPost,
  setProgress,
  setIsCompressing,
}: {
  handleSetPhotoPost: (mimeType: string, uri: string, size: number) => void;
  setProgress: any;
  setIsCompressing: any;
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
          setIsCompressing(true);
          launchImageLibrary({ mediaType: "video" }, async (video) => {
            setIsCompressing(false);
            console.log(
              "🚀 ~ file: PickVideoButton.tsx:37 ~ launchImageLibrary ~ video:",
              video
            );

            if (video.assets && video.assets.length > 0) {
              const result = await Video.compress(
                video?.assets[0].uri as string,
                {
                  progressDivider: 10,

                  downloadProgress: (progress) => {
                    console.log("Download Progress: ", progress);
                  },
                },
                (progress) => {
                  console.log("Compression Progress: ", progress);
                  setProgress(progress);
                }
              );
              console.log(
                "🚀 ~ file: PickVideoButton.tsx:46 ~ launchImageLibrary ~ result:",
                result
              );

              handleSetPhotoPost(
                video?.assets[0]?.type as string,
                result as string,
                video?.assets[0].fileSize as number
              );
            }
          });
          // ImagePicker.openPicker({

          //   mediaType: "video",

          // })
          //   .then((video) => {

          //     handleSetPhotoPost(video?.mime, video?.path, video?.size);
          //   })
          //   .catch((e) => {});
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
