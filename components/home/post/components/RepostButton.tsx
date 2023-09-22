import {
  View,
  Text,
  useColorScheme,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { ElementType, Ref, useEffect, useState } from "react";
import Animated, {
  Extrapolate,
  FadeIn,
  FadeInDown,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useGetMode from "../../../../hooks/GetMode";
import LikeLottie from "../misc/Robot";
import Lottie from "lottie-react-native";
import { HeartUnfocused, HeartsFocused, Repost, RepostUnFocused } from "../../../icons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function RepostButton({
  isPosted,
  clicked,
  text,

  setReposted,
}: {
  text?: string;
  setReposted: (isClicked: boolean) => void;
  clicked: boolean;
  isPosted?: boolean;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const rColor = isDark ? "#75B8C8" : "#11262C";
  

  const reposted = useSharedValue(isPosted ? 1 : 0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(reposted.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: reposted.value,
        },
      ],
    };
  });
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          width: 30,
          height: 22,
          gap: 2,
          alignItems: "center",
        }}
        onPress={() => {
          reposted.value = withSpring(reposted.value ? 0 : 1);
          setReposted(!clicked);
        }}
      >
        <View style={{ width: 18 }}>
          {
            <>
              <Animated.View
                style={[StyleSheet.absoluteFillObject, outlineStyle]}
              >
                <RepostUnFocused size={18} color={color} />
              </Animated.View>

              <Animated.View style={fillStyle}>
                <Repost size={18} color={rColor} />
              </Animated.View>
            </>
          }
        </View>
       
      </Pressable>
    </View>
  );
}
