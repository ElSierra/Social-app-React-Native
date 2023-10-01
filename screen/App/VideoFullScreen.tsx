import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import VideoPostFullScreen from "../../components/home/post/components/VideoPostForFullScreen";
import { VideoFullScreen } from "../../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { RadixIcon } from "radix-ui-react-native-icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import ReactNativeBlobUtil from "react-native-blob-util";
import uuid from "react-native-uuid";
export default function VideoFull({ navigation, route }: VideoFullScreen) {
  const dispatch = useAppDispatch();
  console.log("file url", route.params?.videoUri);
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
      .fetch("GET", route.params?.videoUri, {
        //some headers ..
      })
      .progress((received, total) => {
        console.log("progress", received, total);
      })
      .then(async (res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: uuid.v4(), // name of the file
            parentFolder: "qui", // subdirectory in the Media Store, e.g. HawkIntech/Files to create a folder HawkIntech with a subfolder Files and save the image within this folder
            mimeType: `video/${
              route.params?.videoUri?.split(".")[
                route.params?.videoUri?.split(".")?.length - 1
              ]
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
      <AnimatedScreen>
        <VideoPostFullScreen {...route.params} />
      </AnimatedScreen>
    </>
  );
}
