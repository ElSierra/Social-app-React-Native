import { ReactNode, useCallback, useEffect } from "react";

import Animated, {
  AnimateStyle,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  useFocusEffect,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { StyleProp, View, ViewStyle, useColorScheme } from "react-native";
import useGetMode from "../../../hooks/GetMode";

export default function AnimatedScreen({ children }: { children: ReactNode }) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });

  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "black" : "white";

  const route = useRoute();
  console.log("🚀 ~ file: index.tsx:23 ~ AnimatedScreen ~ route:", route);
  useFocusEffect(
    useCallback(() => {
      opacity.value = withTiming(1, { duration: 250 });
      console.log("jjj");

      return () => (opacity.value = withTiming(0, { duration: 250 }));
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
