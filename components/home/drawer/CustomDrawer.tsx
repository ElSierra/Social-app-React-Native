import { View, Text, Linking, useColorScheme } from "react-native";
import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BlurView } from "expo-blur";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const style = !isDark ? "light" : "dark";
  return (
    <View style={{ flex: 1, }}>
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
        
          right: 0,
          top: 0,
        }}
        
        tint={style}
        intensity={80}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL("https://mywebsite.com/help")}
        />
      </DrawerContentScrollView>
    </View>
  );
}
