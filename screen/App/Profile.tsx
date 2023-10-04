import { View, Text, Animated, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";

import AnimatedScreen from "../../components/global/AnimatedScreen";
import Header from "../../components/profile/Header";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Bio from "../../components/profile/Bio";
import MyPosts from "./ProfileScreens/MyPosts";
import { useGetFollowDetailsQuery } from "../../redux/api/user";

export default function Profile() {
  const offset = useRef(new Animated.Value(0)).current;
  const getFollowData = useGetFollowDetailsQuery(null);

  useEffect(() => {
    console.log(getFollowData.data);
    getFollowData.refetch();
  }, []);

  return (
    <AnimatedScreen>
      <ExpoStatusBar style="light" backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <Header animatedValue={offset} />
        <MyPosts offset={offset} />
      </View>
    </AnimatedScreen>
  );
}
