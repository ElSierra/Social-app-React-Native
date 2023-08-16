import { Pressable, View, Text } from "react-native";
import { ImageFullScreenProp } from "../../types/navigation";

import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SharedTransition,
  withTiming,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";

//Hero Transition
const dirs = RNFetchBlob.fs.dirs;
export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    width: withTiming(values.targetWidth, {
      easing: Easing.quad,
    }),
    height: withTiming(values.targetHeight, {
      easing: Easing.quad,
    }),
    originX: withTiming(values.targetOriginX, {
      easing: Easing.quad,
    }),
    originY: withTiming(values.targetOriginY, {
      easing: Easing.quad,
    }),
  };
});

export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri } = route.params;
  console.log("🚀 ~ file: ImageFullScreen.tsx:23 ~ route:", route);
  const handleDownload = () => {
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Optional, override notification setting (default to true)
        notification: true,
        // Optional, but recommended since android DownloadManager will fail when
        // the url does not contains a file extension, by default the mime type will be text/plain
        mime: "image/jpg",
        description: "File downloaded by download manager.",
      },
      // response data will be saved to this path if it has access right.
    })
      .fetch("GET", photoUri)
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log("The file saved to ", res.path());
      });
  };
  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <Animated.View
        entering={FadeIn.duration(250)}
        exiting={FadeOut.duration(250)}
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 300,
          }}
        >
          <Animated.Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </Animated.View>
      <View
        style={{
          backgroundColor: "#CDC7C7",
          position: "absolute",
          height: 50,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Pressable
          android_ripple={{ color: "black" }}
          onPress={handleDownload}
          style={{
            backgroundColor: "#CDC7C7",
            position: "absolute",
            height: 50,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
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
              color="black"
            />
            <Text style={{ fontFamily: "mulishBold" }}>Download</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}
