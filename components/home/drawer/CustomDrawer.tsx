import { View, Text, Linking, useColorScheme, Pressable, Platform } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import {
  GlobalIcon,
  LogoutIcon,
  MoonIcon,
  ProfileIconUnfocused,
} from "../../icons";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { openSheet } from "../../../redux/slice/bottomSheet";
import { signOut } from "../../../redux/slice/user";

import { resetPost } from "../../../redux/slice/post";
import { resetFollowers } from "../../../redux/slice/user/followers";
import socket from "../../../util/socket";
import { clearAllChatData } from "../../../redux/slice/chat/chatlist";
import { useLazyLogoutQuery } from "../../../redux/api/user";
import { Switch } from "react-native-paper";
import { setHighEnd } from "../../../redux/slice/prefs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import * as WebBrowser from 'expo-web-browser';
export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const dark = useGetMode();
  const isDark = dark;
  const insets = useSafeAreaInsets();
  const style = !isDark ? "light" : "dark";
  const backgroundColor = isDark ? "white" : "black";
  const color = isDark ? "white" : "black";
  const toolbarColor = isDark ? "black" : "white";
  const pressColor = isDark ? "#BEBEBE" : "#4F4F4F";
  const dispatch = useAppDispatch();
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  const navigation = useNavigation<HomeNavigationProp>();
  const [logout] = useLazyLogoutQuery();
  const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(
    null
  );
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://www.isaacojo.me",{
      
    });
    setResult(result);
  };
  const onToggleSwitch = () => {
    dispatch(setHighEnd({ isHighEnd: !isHighEndDevice }));
  };
  const modal = useBottomSheetModal()
  return (
    <View style={{ flex: 1, padding: 20,paddingBottom:Platform.select({ios:insets.bottom,android:40}) }}>
      {isHighEndDevice ? (
        <BlurView
          experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
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
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: isDark ? "black" : "white",
            right: 0,
            top: 0,
          }}
        />
      )}
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
                  fontSize: 18,
                }}
              >
                Profile
              </Text>
            </View>
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            navigation.navigate("Profile");
          }}
        />
      </DrawerContentScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20,
          paddingBottom: 10,
        }}
      >
        <View>
          <Text style={{ fontFamily: "mulishBold",color }}>
            {isHighEndDevice ? "Disable" : "Enable"} Glass UI
          </Text>
          <Text style={{ fontFamily: "mulish",color }}>
            {"May cause performance issue on low end devices"}
          </Text>
        </View>
        <Switch
          color={color}
          value={isHighEndDevice}
          onValueChange={onToggleSwitch}
        />
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginBottom: 50,
            height: 40,
            width: 40,
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <Pressable
            style={{
              height: 40,
              width: 40,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              props.navigation.closeDrawer();
              dispatch(openSheet({ type: "modeSelect" }));
            }}
            android_ripple={{ color: pressColor, foreground: true }}
          >
            <MoonIcon size={25} color={color} />
          </Pressable>
        </View>
        <View
          style={{
            marginBottom: 50,
            height: 40,
            width: 40,
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <Pressable
            style={{
              height: 40,
              width: 40,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={_handlePressButtonAsync}
            android_ripple={{ color: pressColor, foreground: true }}
          >
            <GlobalIcon size={25} color={color} />
          </Pressable>
        </View>
        <View
          style={{
            marginBottom: 50,
            height: 40,
            width: 40,
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <Pressable
            style={{
              height: 40,
              width: 40,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              props.navigation.closeDrawer();
              logout(null)
                .then()
                .catch((e) => {});
              dispatch(resetPost());
              dispatch(signOut());
              dispatch(clearAllChatData());
              dispatch(resetFollowers());
            }}
            android_ripple={{ color: pressColor, foreground: true }}
          >
            <LogoutIcon size={25} color={color} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
