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

import { RadixIcon } from "radix-ui-react-native-icons";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import { Image, ImageBackground } from "expo-image";
import uuid from "react-native-uuid";


import ReactNativeBlobUtil from "react-native-blob-util";

export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri, id, width, height } = route.params;

  const dispatch = useAppDispatch();
 

  console.log(
    "sssss",
    photoUri?.split(".")[photoUri?.split(".")?.length - 1],
    uuid.v4()
  );
  const handleDownload = () => {
    ReactNativeBlobUtil.config({
      // response data will be saved to this path if it has access right.
      // path:
      //   dirs.DocumentDir +
      //   `${photoUri?.split(".")[photoUri?.split(".")?.length - 2]}${
      //     photoUri?.split(".")[photoUri?.split(".")?.length - 1]
      //   }`,
      fileCache: true,
    })
      .fetch("GET", photoUri, {
        //some headers ..
      })
      .then(async (res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: uuid.v4(), // name of the file
            parentFolder: "qui", // subdirectory in the Media Store, e.g. HawkIntech/Files to create a folder HawkIntech with a subfolder Files and save the image within this folder
            mimeType: `image/${
              photoUri?.split(".")[photoUri?.split(".")?.length - 1]
            }`,
          },
          "Download",
          res.path()
        )
          .then((r) => {
            console.log(r);
            dispatch(openToast({ text: "Saved", type: "Info" }));
          })
          .catch((e) => {});
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
                maxHeight: "80%",
                width: "100%",
                aspectRatio:
                  width &&
                  height &&
                  typeof width == "number" &&
                  typeof height === "number"
                    ? `${width.toString()}/${height.toString()}`
                    : undefined,
              }}
            >
              <Image
                transition={1000}
                source={{ uri: photoUri }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
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
