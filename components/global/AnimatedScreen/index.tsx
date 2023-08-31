import { ReactNode, useCallback, useEffect } from "react";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
  ImageBackground,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import useGetMode from "../../../hooks/GetMode";
import FastImage from "react-native-fast-image";
export default function AnimatedScreen({ children }: { children: ReactNode }) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = withTiming(1, { duration: 250 });

      return () => {
        FastImage.clearMemoryCache();
        opacity.value = withTiming(0, { duration: 250 });
      };
    }, [opacity])
  );
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Animated.View
        style={[{ flex: 1, backgroundColor: "transparent" }, animatedStyle]}
      >
        {children}
      </Animated.View>
    </View>
  );
}
