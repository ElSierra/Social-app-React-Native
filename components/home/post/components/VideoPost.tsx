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
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const [play, setPlay] = useState(false);
  const animatedStyleLoading = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityLoad.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  useEffect(() => {
    if (!play) {
      opacity.value = withTiming(1, { duration: 400 });
    } else {
      opacity.value = withTiming(0);
    }
    if (status?.isLoaded) {
      opacityLoad.value = withTiming(0);
    } else {
      opacityLoad.value = withDelay(1000, withTiming(1, { duration: 400 }));
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
        {status?.isLoaded ? (
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
              style={{
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: play ? "transparent" : "#0000008E",
              }}
            >
              <IconButton
                Icon={play ? <></> : <PlayIcon size={60} color="white" />}
                onPress={handlePlay}
              />
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              {
                width: "100%",
                height: 200,
                backgroundColor: "black",
                position: "absolute",
                zIndex: 50,
                borderRadius: 10,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              animatedStyleLoading,
            ]}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 200,
                  width: "100%",
                  opacity: 0.4,
                  borderRadius: 10,
                }}
                source={require("../../../../assets/images/tv-static.gif")}
              />
              <View style={{ position: "absolute" }}>
                <ActivityIndicator color={"white"} size={"large"} />
              </View>
            </View>
          </Animated.View>
        )}
        {
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

export default React.memo(VideoPost);
