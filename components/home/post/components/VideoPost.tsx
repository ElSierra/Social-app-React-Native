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

function VideoPost({
  videoTitle,

  video,
  videoUri,

  videoViews,
}: {
  videoTitle?: string;

  video: React.MutableRefObject<Video | null>;
  videoUri: string;

  videoViews?: string;
}) {
  const width = Dimensions.get("screen").width;
  const opacity = useSharedValue(0);
  const opacityLoad = useSharedValue(0);
  const dark = useGetMode();
  const isDark = dark;

  const color = isDark ? "white" : "black";
  const backgroundVideoColor = isDark ? "#1d1d1d" : "black";
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    video.current?.unloadAsync();
  }, []);
  useEffect(() => {
    if (!play) {
      opacity.value = withTiming(1, { duration: 400 });
    } else {
      opacity.value = withTiming(0);
      if (!status?.isLoaded) {
        setIsLoading(true);
        video.current
          ?.loadAsync({ uri: videoUri })
          .then((e) => {
            video.current?.playAsync();
          })
          .catch((e) => {});
        return;
      }
      video.current?.playAsync().then().catch();
    }
    if (status?.isLoaded) {
      setIsLoading(false);
      opacityLoad.value = withTiming(0);
    } else {
      opacityLoad.value = withTiming(1, { duration: 400 });
    }
  }, [play, status?.isLoaded]);

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
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ width: "100%", height: 200 }}>
        <Animated.View
          style={[
            {
              width: "100%",
              height: 200,
              position: "absolute",
              zIndex: 50,
              top: 0,
              left: 0,

              bottom: 0,
              right: 0,
            },
            animatedStyle,
          ]}
        >
          <Pressable
            onPress={handlePlay}
            onLongPress={()=>{
              console.log('long')
            }}
            style={{
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: play
                ? "transparent"
                : !status?.isLoaded
                ? backgroundVideoColor
                : "#0000008E",
            }}
          >
            <IconButton
              Icon={play ? <></> : <PlayIcon size={60} color="white" />}
              onPress={handlePlay}
            />
          </Pressable>
        </Animated.View>

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
            <ActivityIndicator size={50} color={color} />
          </View>
        )}

        {
          <Pressable
            style={{ flex: 1, width: "100%" }}
            onPress={() => {
              setPlay(!play);
            }}
          >
            <Video
              ref={video}
              style={{ flex: 1, width: "100%", borderRadius: 10 }}
              source={{
                uri: videoUri,
              }}
              useNativeControls={false}
              resizeMode={ResizeMode.COVER}
              shouldPlay={play}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </Pressable>
        }
      </View>
      <View
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
      </View>
    </View>
  );
}

export default VideoPost;
