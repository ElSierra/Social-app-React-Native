import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import IconButton from "../../../global/Buttons/IconButton";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { PlayIcon } from "../../../icons";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import useGetMode from "../../../../hooks/GetMode";
import { current } from "@reduxjs/toolkit";
import { HomeNavigationProp } from "../../../../types/navigation";

function VideoPost({
  videoTitle,
  thumbNail,
  videoUri,
  imageUri,
  userTag,
  name,

  videoViews,
}: {
  videoTitle?: string;
  imageUri: string;
  videoUri: string;
  thumbNail: string | null;
  name: string;
  userTag: string;
  videoViews?: string;
}) {


  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View
      style={{
        height: 200,
        width: "100%",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ flex: 1, backgroundColor: "black", borderRadius: 10 }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("VideoFullScreen", {
                videoUri,
                videoTitle: videoTitle || "",
                videoViews: videoViews || "0",
                userTag,
                name,
                imageUri,
                thumbNail,
              });
            }}
          >
            <PlayIcon size={50} color="white" />
          </Pressable>
        </View>
        <Image
          source={{ uri: thumbNail ? thumbNail : videoUri }}
          style={{ flex: 1, opacity: 0.6 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

export default VideoPost;
