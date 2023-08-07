import { View, Text, Pressable } from "react-native";
import React, { ElementType } from "react";

export type IconButton = { Icon: JSX.Element; onPress: () => void };

export default function IconButton({ Icon, onPress }: IconButton) {
  return (
    <View>
      <Pressable
        onPress={onPress}
      >
        {Icon}
      </Pressable>
    </View>
  );
}
