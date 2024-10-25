import { View, Text, Animated, ScrollView } from "react-native";
import React, { useRef } from "react";

import AnimatedScreen from "../../components/global/AnimatedScreen";
import Header from "../../components/profilePeople/Header";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Bio from "../../components/profile/Bio";
import MyPosts from "./ProfileScreens/MyPosts";
import { ProfilePeopleProp } from "../../types/navigation";
import PeoplePosts from "./ProfileScreens/PeoplePosts";

export default function ProfilePeople({
  navigation,
  route,
}: ProfilePeopleProp) {
  const offset = useRef(new Animated.Value(0)).current;
  const { id } = route.params;
  return (
    <AnimatedScreen>
      <ExpoStatusBar style="light" backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <Header animatedValue={offset} {...route.params} />
        <PeoplePosts offset={offset} {...route.params} />
      </View>
    </AnimatedScreen>
  );
}
