import { View, Text } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

export default function Show() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Show</Text>
      <Animated.View
        sharedTransitionTag="i"
        style={{ height: 200, width: 200, backgroundColor: "red" }}
      />
      <Animated.Image
        sharedTransitionTag="j"
        style={{ height: 100, width: 100 }}
        source={{
          uri: "https://images.pexels.com/photos/4088144/pexels-photo-4088144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
      />
    </View>
  );
}
