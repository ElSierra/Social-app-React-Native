import { View, Text, Button } from "react-native";
import { ImageFullScreenProp } from "../../types/navigation";
import { Image } from "expo-image";
import Animated, {
  BounceIn,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadingTransition,
  SharedTransition,
  SlideInUp,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";

//Hero Transition

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    width: withTiming(values.targetWidth, {
      easing: Easing.quad,
    }),
    height: withTiming(values.targetHeight, {
      easing: Easing.quad,
    }),
    originX: withTiming(values.targetOriginX, {
      easing: Easing.quad,
    }),
    originY: withTiming(values.targetOriginY, {
      easing: Easing.quad,
    }),
  };
});
export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri } = route.params;
  console.log("🚀 ~ file: ImageFullScreen.tsx:23 ~ route:", route);

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <Animated.View
        entering={FadeIn.duration(250)}
        exiting={FadeOut.duration(250)}
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 300,
          }}
        >
          <Animated.Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </Animated.View>
    </>
  );
}
