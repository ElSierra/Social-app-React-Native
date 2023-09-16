import { Pressable, View, StyleSheet } from "react-native";
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
import { RadixIcon } from "radix-ui-react-native-icons";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import { Image, ImageBackground } from "expo-image";

export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri, id } = route.params;
  const dispatch = useAppDispatch();

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
      .fetch("GET", route.params?.photoUri)
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        dispatch(
          openToast({ text: "File saved in notification", type: "Info" })
        );
      })
      .catch((e) => {});
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
            <RadixIcon name="download" size={25} color="white" />
          </View>
        </Pressable>
      ),
    });
  });
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
        <ImageBackground
          source={{ uri: photoUri }}
          blurRadius={20}
          imageStyle={{ opacity: 0.5 }}
          style={{ height: "100%", width: "100%", justifyContent: "center" }}
          contentFit="cover"
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                height: "70%",
                width: "100%",
              }}
            >
              <Image
                source={{ uri: photoUri }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
      {/* <View
        style={{
          elevation:4,
         borderColor:"white",
        backgroundColor:"#CFF8FF3C",
         borderTopWidth:0.5,
          position: "absolute",
          height: 50,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BlurView intensity={40} style={{position:"absolute", width:"100%",height:50}}/>
        <Pressable
          android_ripple={{ color: "black" }}
          onPress={handleDownload}
          style={{
            
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
              size={20}
              color="white"
            />
            <Text style={{ fontFamily: "mulishBold" ,color:"white"}}>Download</Text>
          </View>
        </Pressable>
      </View> */}
    </>
  );
}
