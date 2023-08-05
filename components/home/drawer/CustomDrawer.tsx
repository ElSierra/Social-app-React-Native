import { View, Text, Linking, useColorScheme } from "react-native";
import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const style = !isDark ? "light" : "dark";
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,

          right: 0,
          top: 0,
        }}
        tint={style}
        intensity={200}
      />
      <DrawerContentScrollView {...props}>
        <View style={{ paddingLeft: 14 }}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 9999 }}
            source={require("../../../assets/avatar/placeholder.png")}
          />
          <Text>Ojo Isaac</Text>
          <Text>@Hojoisaac</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL("https://mywebsite.com/help")}
        />
      </DrawerContentScrollView>
    </View>
  );
}
