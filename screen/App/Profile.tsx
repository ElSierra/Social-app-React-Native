import { View, Text, Animated, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";

import AnimatedScreen from "../../components/global/AnimatedScreen";
import Header from "../../components/profile/Header";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Bio from "../../components/profile/Bio";
import MyPosts from "./ProfileScreens/MyPosts";
import { useGetFollowDetailsQuery } from "../../redux/api/user";
import {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

export default function Profile() {
  const getFollowData = useGetFollowDetailsQuery(null);
  const offset = useSharedValue(0);
  console.log("🚀 ~ file: Profile.tsx:16 ~ Profile ~ offset:", offset);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log("🚀 ~ file: Profile.tsx:22 ~ scrollHandler ~ event:", event)

    offset.value = event.contentOffset.y;
  });
  useEffect(() => {
    console.log(getFollowData.data);
    getFollowData.refetch();
  }, []);

  return (
    <AnimatedScreen>
      <ExpoStatusBar style="light" backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <Header offset={offset} />
        <MyPosts onScroll={scrollHandler} />
      </View>
    </AnimatedScreen>
  );
}
