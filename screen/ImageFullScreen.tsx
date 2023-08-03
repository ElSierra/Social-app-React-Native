import { View, Text, Button } from "react-native";
import { ImageFullScreenProp } from "../types/navigation";
import { Image } from "expo-image";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInUp,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
//Hero Transition

export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri } = route.params;
  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000F9",
        }}
      >
        <Animated.Image
          sharedTransitionTag="a"
          source={{ uri: photoUri }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </>
  );
}
