import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ChatScreenProp } from "../../types/navigation";
import FastImage from "react-native-fast-image";

export default function ChatScreen({ navigation }: ChatScreenProp) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "@hojoisaac",
      headerTitleStyle: { fontFamily: "jakaraBold" },
      headerLeft: () => {
        return (
          <View style={{ marginRight: 10 }}>
            <FastImage
              style={{ height: 50, width: 50, borderRadius: 9999 }}
              source={{
                uri: "https://quick-chop.nyc3.digitaloceanspaces.com/ead02f5af07c418086c82b925db0f257.gif",
              }}
            />
          </View>
        );
      },
    });
  }, []);
  return <View style={{ flex: 1 }}></View>;
}
