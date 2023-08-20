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
import { Skeleton } from "../../components/home/misc/Skeleton";
import SkeletonGroupPost from "../../components/home/misc/SkeletonGroupPost";

export default function Discover() {
  const isFocused = useIsFocused();
  return (
    <AnimatedScreen>
      <View style={{ flex: 1, paddingTop: 100 }}>
        <Text>People</Text>
        <View style={{ width: "100%", height: 1, backgroundColor: "black" }} />
        <View style={{ width: "50%", height: 50, flexDirection: "row" }}>
          <Image
            source={require("../../assets/avatar/placeholder.png")}
            style={{ height: 50, width: 50, borderRadius: 9999 }}
          />
          <View>
            <Text>Isaac Ojo</Text>
            <Text>@hojoIsaac</Text>
          </View>
        </View>
        <Text>Posts</Text>
        <View style={{ width: "100%", height: 1, backgroundColor: "black" }} />
      </View>
    </AnimatedScreen>
  );
}
