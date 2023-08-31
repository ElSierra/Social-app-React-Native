import { View, Text, Animated, ScrollView } from "react-native";
import React, { useRef } from "react";

import AnimatedScreen from "../../components/global/AnimatedScreen";
import Header from "../../components/profile/Header";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Bio from "../../components/profile/Bio";
import MyPosts from "./ProfileScreens/MyPosts";

export default function Profile() {
  const offset = useRef(new Animated.Value(0)).current;

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
