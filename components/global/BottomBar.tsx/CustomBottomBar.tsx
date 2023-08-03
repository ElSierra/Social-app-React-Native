import { View, Text } from "react-native";
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
  const navigation = useNavigation();
  return (
    <BlurView
      intensity={70}
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60,
        borderTopColor: "#0000001B",
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
