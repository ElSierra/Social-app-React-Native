import { View, Text } from "react-native";
import React from "react";
import CustomBottomBar from "../components/global/BottomBar.tsx/CustomBottomBar";
import { useIsFocused } from "@react-navigation/native";

export default function Notifications() {
  const isFocused = useIsFocused();
  return (
    <>
      <View style={{ flex: 1 }}></View>
      <CustomBottomBar notification={isFocused} />
    </>
  );
}
