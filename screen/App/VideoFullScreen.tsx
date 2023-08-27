import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import VideoPostFullScreen from "../../components/home/post/components/VideoPostForFullScreen";
import { VideoFullScreen } from "../../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNFetchBlob from "rn-fetch-blob";
import { StatusBar } from "expo-status-bar";
export default function VideoFull({ navigation, route }: VideoFullScreen) {
  const handleDownload = () => {
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,

        description: "File downloaded by download manager.",
      },
    })
      .fetch("GET", route.params?.videoUri)
      .then((res) => {});
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          android_ripple={{ color: "black" }}
          onPress={handleDownload}
          style={{
            height: 50,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="download-box"
              size={30}
              color="white"
            />
          </View>
        </Pressable>
      ),
    });
  });
  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <AnimatedScreen>
        <VideoPostFullScreen {...route.params} />
      </AnimatedScreen>
    </>
  );
}
