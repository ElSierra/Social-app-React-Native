import { ReactNode, useEffect } from "react";

import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused ,useRoute} from "@react-navigation/native";


export default function AnimatedScreen({ children }: { children: ReactNode }) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });

  const isFocused = useIsFocused();
const route = useRoute()
  console.log("🚀 ~ file: index.tsx:23 ~ AnimatedScreen ~ route:", route)
  useEffect(() => {
    if (isFocused) {
      opacity.value = withTiming(1, { duration: 400 });
    } else {
      opacity.value = withTiming(0);
    }
  }, [isFocused]);
  return (
    <>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {children}
      </Animated.View>
    </>
  );
}
