import { View, Text } from "react-native";
import React from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ViewPost } from "../../types/navigation";
import FullScreenPost from "../../components/home/post/FullScreenPost";

export default function PostScreen({ navigation, route }: ViewPost) {
  const { params } = route;

  return (
    <AnimatedScreen>
      <FullScreenPost {...params} />
    </AnimatedScreen>
  );
}
