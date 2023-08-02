import { View, Text, Pressable } from "react-native";
import React from "react";
import IconButton from "../../../global/IconButton";
import { ResizeMode, Video } from "expo-av";
import { PlayIcon } from "../../../icons";
import { Dimensions } from "react-native";

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
  return (
    <View
      style={{
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ width: "100%", height: 200 }}>
        <Pressable
          onPress={handlePlay}
          style={{
            position: "absolute",

            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: play ? "transparent" : "#0000008E",
          }}
        >
          <IconButton
            Icon={play ? <></> : <PlayIcon size={60} color="white" />}
            onPress={handlePlay}
          />
        </Pressable>
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
        <Text numberOfLines={1} style={{ fontFamily: "jakaraBold", fontSize: 14, maxWidth: width*0.6 }}>
        {videoTitle}
        </Text>
        <Text>{videoViews} Views</Text>
      </View>
    </View>
  );
}
