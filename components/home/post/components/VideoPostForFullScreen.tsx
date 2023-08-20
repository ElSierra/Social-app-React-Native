import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { PlayIcon } from "../../../icons";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import useGetMode from "../../../../hooks/GetMode";

import Slider from "@react-native-community/slider";
import convertMsToHMS from "../../../../util/convert";

export default function VideoPostFullScreen({
  videoTitle,

  videoUri,

  imageUri,
  name,
  userTag,
}: {
  videoTitle?: string;
  imageUri: string;
  name: string;
  userTag: string;
  videoUri: string;

  videoViews?: string;
}) {
  const video = useRef<null | Video>(null);
  console.log("🚀 ~ file: VideoPostForFullScreen.tsx:48 ~ video:", video);

  const [status, setStatus] = useState<any>(null);
  console.log("🚀 ~ file: VideoPostForFullScreen.tsx:49 ~ status:", status);

  const [play, setPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  console.log(
    "🚀 ~ file: VideoPostForFullScreen.tsx:52 ~ isLoading:",
    isLoading
  );

  useEffect(() => {
    video.current?.setIsLoopingAsync(true).catch((e) => {});
  }, []);

  useMemo(() => {
    if (status?.positionMillis === status?.playableDurationMillis) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status?.positionMillis, status?.playableDurationMillis]);
  const handlePlay = () => {
    setPlay(!play);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPlay(false);
      };
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        {
          <TouchableWithoutFeedback
            style={{ flex: 1, width: "100%" }}
            onPress={() => {
              setPlay(!play);
              console.log("pressed");
            }}
          >
            <Video
              ref={video}
              style={{ flex: 1, width: "100%", borderRadius: 10 }}
              source={{
                uri: videoUri,
              }}
              useNativeControls={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={play}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </TouchableWithoutFeedback>
        }
      </View>
      {!play && (
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut.springify()}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 999,
          }}
        >
          <Pressable onPress={handlePlay}>
            <PlayIcon size={80} color="white" />
          </Pressable>
        </Animated.View>
      )}
      {!play && (
        <TouchableWithoutFeedback
          onPress={handlePlay}
        >
          <Animated.View
            entering={FadeInDown.springify()}
            exiting={FadeOutDown.springify()}
            style={{
              position: "absolute",
              bottom: 40,
              width: "100%",
              justifyContent: "flex-end",
              backgroundColor: "#00000062",
              height: "100%",
              padding: 20,
            }}
          >
            <View style={{ width: "100%", height: 30 }}>
              <Slider
                style={{ width: "100%" }}
                minimumValue={0}
                thumbTintColor="transparent"
                thumbImage={require("../../../../assets/images/seek.png")}
                upperLimit={status?.durationMillis}
                disabled={status === null || status.loaded === false}
                value={status?.playableDurationMillis}
                maximumValue={status?.durationMillis}
                minimumTrackTintColor="#C1C0C0"
                maximumTrackTintColor={"#D3D3D3"}
              />
              <Slider
                style={{ width: "100%", position: "absolute" }}
                minimumValue={0}
                thumbImage={require("../../../../assets/images/seek.png")}
                upperLimit={status?.durationMillis}
                disabled={status === null || status.loaded === false}
                value={status?.positionMillis}
                maximumValue={status?.durationMillis}
                onValueChange={(position: number) => {
                  video.current?.setPositionAsync(position);
                }}
                minimumTrackTintColor="#FFFEFE"
                maximumTrackTintColor={"#FFFFFF"}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={{ color: "white", fontFamily: "jakara", fontSize: 14 }}
              >
                {convertMsToHMS(status?.positionMillis)} /{" "}
                {convertMsToHMS(status?.durationMillis)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={imageUri}
                style={{ height: 40, width: 40, borderRadius: 10 }}
              />
              <View style={{ justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "mulishBold",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {name}
                </Text>
                <Text style={{ fontFamily: "mulish", color: "white" }}>
                  @{userTag}
                </Text>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            zIndex: 999,
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color={"white"} />
        </View>
      )}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: "jakaraBold",
            fontSize: 14,
            color,
            maxWidth: width * 0.6,
          }}
        >
          {videoTitle}
        </Text>
        <Text style={{ color }}>{videoViews} Views</Text>
      </View> */}
    </View>
  );
}
