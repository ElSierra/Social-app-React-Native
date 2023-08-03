import { View, Text, Button } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

export default function Home({ navigation }: any) {
  return (
    <View>
      <Text>Home</Text>
      <Animated.View   sharedTransitionTag="i" style={{height:200, width: 200, backgroundColor:"red"}}/>
      <Animated.Image
        sharedTransitionTag="j"
        style={{ height: 200, width: 200 }}
        source={{
          uri: "https://images.pexels.com/photos/4088144/pexels-photo-4088144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
      />
      <Button
        title="hjkhk"
        onPress={() => {
          navigation.navigate("Show");
        }}
      />
    </View>
  );
}
