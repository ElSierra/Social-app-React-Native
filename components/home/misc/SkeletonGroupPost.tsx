import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Skeleton } from "./Skeleton";
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function SkeletonGroupPost() {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [1, 0]),
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    return () => {
      cancelAnimation(opacity);
    };
  }, []);

  return (
    <Animated.View
      style={[
        { flex: 1, paddingTop: 120, paddingHorizontal: 10, gap: 50 },
        animatedStyle,
      ]}
    >
      {[0, 1, 2].map((idx) => (
        <Skeleton key={idx} />
      ))}
    </Animated.View>
  );
}
