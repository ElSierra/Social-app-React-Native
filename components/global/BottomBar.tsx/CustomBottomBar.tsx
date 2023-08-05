import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import IconButtons from "./IconButtons";
import {
  HomeIcon,
  HomeIconUnfocused,
  MessageUnfocused,
  MessagesIcon,
  NotificationIcon,
  NotificationUnfocused,
  SearchIcon,
  SearchUnfocused,
} from "../../icons";

//? - Created because transition doesn't work with BottomBar from react navigation
function CustomBottomBar({
  message,
  home,
  explore,
  notification,
}: {
  message?: boolean;
  home?: boolean;
  explore?: boolean;
  notification?: boolean;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const borderTopColor = isDark ? "#0000001B" : "#FFFFFF00";
  const tint = isDark ? "dark" : "light";
  return (
    <BlurView
      intensity={70}
      tint={tint}
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60,
        borderTopColor,
        borderTopWidth: 1,
        paddingHorizontal: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButtons
        Icon={home ? HomeIcon : HomeIconUnfocused}
        routeName={"Main"}
      />

      <IconButtons
        Icon={explore ? SearchIcon : SearchUnfocused}
        routeName={"Discover"}
      />
      <IconButtons
        Icon={notification ? NotificationIcon : NotificationUnfocused}
        routeName={"Notifications"}
      />
      <IconButtons
        Icon={message ? MessagesIcon : MessageUnfocused}
        routeName={"Messages"}
      />
      {/* <IconButtons />
      <IconButtons /> */}
    </BlurView>
  );
}

export default React.memo(CustomBottomBar);
