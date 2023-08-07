import { View, Text, useColorScheme, Pressable } from "react-native";
import React, { ElementType, useState } from "react";
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useGetMode from "../../../../hooks/GetMode";

export default function IconWithValue({
  IconUnfocused,
  IconFocused,
  text,
}: {
  IconUnfocused: ElementType;
  IconFocused: ElementType;
  text: string;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const [clicked, setClicked] = useState(false);
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
    };
  });
  return (
    <Pressable
      style={{
        flexDirection: "row",
        width: 50,
        height: 20,
        alignItems: "center",
        gap: 2,
      }}
      onPress={() => {
        liked.value = withSpring(liked.value ? 0 : 1);
        setClicked(!clicked);
      }}
    >
      <Animated.View style={clicked ? fillStyle : outlineStyle}>
        {clicked ? (
          <IconFocused size={16} color={color} />
        ) : (
          <IconUnfocused size={16} color={color} />
        )}
      </Animated.View>

      <Text style={{ color }}>{text}</Text>
    </Pressable>
  );
}
