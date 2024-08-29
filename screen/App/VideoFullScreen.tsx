import {
  View,
  Text,
  Pressable,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import VideoPostFullScreen from "../../components/home/post/components/VideoPostForFullScreen";
import { VideoFullScreen } from "../../types/navigation";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { StatusBar } from "expo-status-bar";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import ReactNativeBlobUtil from "react-native-blob-util";
import uuid from "react-native-uuid";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
export default function VideoFull({ navigation, route }: VideoFullScreen) {
  const dispatch = useAppDispatch();
  console.log("file url", route.params?.videoUri);
  const [progress, setProgress] = useState({ received: 0, total: 1 });
  const [done, setDone] = useState(true);
  console.log((progress?.received / progress.total) * 100);
  const handleDownload = () => {
    setDone(false);
    setProgress({ received: 0, total: 1 });
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

        setProgress((prev) => {
          return { ...prev, received: Number(received), total: Number(total) };
        });
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
            setDone(true);
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
            <Feather name="download" size={24} color="white" />
          </View>
        </Pressable>
      ),
    });
  });

  useEffect(() => {
    const backAction = () => {
      if (!done) {
        setDone(true);
      } else {
        navigation.canGoBack() ? navigation.goBack() : null;
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [done]);

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <AnimatedScreen>
        <VideoPostFullScreen {...route.params} />
        {!done && (
          <TouchableWithoutFeedback>
            <>
              <Animated.View
                entering={FadeIn.springify()}
                exiting={FadeOut.springify()}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#000000CA",
                }}
              >
                <AnimatedCircularProgress
                  size={80}
                  width={8}
                  fill={(progress?.received / progress.total) * 100}
                  tintColor="#FFFFFF"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#D1D1D1"
                  dashedBackground={{ width: 2, gap: 2 }}
                />
              </Animated.View>
              <Animated.View
                entering={FadeIn.springify()}
                exiting={FadeOut.springify()}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "white",
                    fontFamily: "jakaraBold",
                  }}
                >
                  {Math.floor((progress?.received / progress.total) * 100)}
                </Text>
              </Animated.View>
            </>
          </TouchableWithoutFeedback>
        )}
      </AnimatedScreen>
    </>
  );
}
