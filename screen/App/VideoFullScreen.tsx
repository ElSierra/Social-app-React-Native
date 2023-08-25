import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import VideoPostFullScreen from "../../components/home/post/components/VideoPostForFullScreen";
import { VideoFullScreen } from "../../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNFetchBlob from "rn-fetch-blob";
export default function VideoFull({ navigation, route }: VideoFullScreen) {
  const handleDownload = () => {
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Optional, override notification setting (default to true)
        notification: true,
        // Optional, but recommended since android DownloadManager will fail when
        // the url does not contains a file extension, by default the mime type will be text/plain
        description: "File downloaded by download manager.",
      },
      // response data will be saved to this path if it has access right.
    })
      .fetch("GET", route.params?.videoUri)
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
       
      });
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
    <AnimatedScreen>
      <VideoPostFullScreen {...route.params} />
    </AnimatedScreen>
  );
}
