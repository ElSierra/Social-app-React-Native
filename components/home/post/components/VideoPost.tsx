import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import IconButton from "../../../global/IconButton";
import { ResizeMode, Video } from "expo-av";
import { PlayIcon } from "../../../icons";
import { Dimensions } from "react-native";
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function VideoPost({
  handlePlay,
  videoTitle,
  play,
  video,
  videoUri,
  setStatus,
  videoViews,
}: {
  handlePlay: () => void;
  videoTitle?: string;
  play: boolean;
  video: React.MutableRefObject<Video | null>;
  videoUri: string;
  setStatus: React.Dispatch<React.SetStateAction<{}>>;
  videoViews?: string;
}) {
  const width = Dimensions.get("screen").width;
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  useEffect(() => {
    if (!play) {
      opacity.value = withTiming(1, { duration: 400 });
    } else {
      opacity.value = withTiming(0);
    }
  }, [play]);
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
        <Video
          ref={video}
          style={{ flex: 1, width: "100%", borderRadius: 10 }}
          source={{
            uri: videoUri,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={play}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
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
            maxWidth: width * 0.6,
          }}
        >
          {videoTitle}
        </Text>
        <Text>{videoViews} Views</Text>
      </View>
    </View>
  );
}
