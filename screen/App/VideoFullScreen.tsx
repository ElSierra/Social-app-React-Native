import { View, Text } from "react-native";
import React from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import VideoPostFullScreen from "../../components/home/post/components/VideoPostForFullScreen";
import { VideoFullScreen } from "../../types/navigation";

export default function VideoFull({ navigation, route }: VideoFullScreen) {
  return (
    <AnimatedScreen>
      <VideoPostFullScreen {...route.params} />
    </AnimatedScreen>
  );
}
