import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useIsFocused } from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import { Skeleton } from "../../components/home/post/components/Skeleton";

export default function Discover() {
  const isFocused = useIsFocused();
  return (
    <View style={{ marginTop: 200 }}>
      <AnimatedScreen>
        <Skeleton />
      </AnimatedScreen>
    </View>
  );
}
