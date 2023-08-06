import { View, Text, Linking, useColorScheme, Switch } from "react-native";
import React, { useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import HeaderDrawer from "./HeaderDrawer";
import ToggleSwitch from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileIconUnfocused } from "../../icons";
import { HomeNavigationProp } from "../../../types/navigation";
export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const style = !isDark ? "light" : "dark";
  const backgroundColor = isDark ? "white" : "black";
  const color = isDark ? "white" : "black";
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation<HomeNavigationProp>();
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
        <HeaderDrawer />
        <View
          style={{
            height: 1,
            width: "100%",
            marginVertical: 20,
            backgroundColor,
          }}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          label={({ focused }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                gap: 14,
              }}
            >
              <ProfileIconUnfocused size={25} color={color} />
              <Text
                style={{
                  color,
                  fontFamily: "jakaraBold",
                  includeFontPadding: false,
                  fontSize: 20,
                }}
              >
                Profile
              </Text>
            </View>
          )}
          onPress={() =>navigation.navigate("Profile")}
        />
      </DrawerContentScrollView>
      <View style={{ marginBottom: 50 }}>
        <ToggleSwitch
          isOn={toggle}
          onColor="green"
          offColor="red"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="large"
          onToggle={() => setToggle(!toggle)}
        />
      </View>
    </View>
  );
}
