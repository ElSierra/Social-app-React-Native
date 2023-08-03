import { View, Text } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import CustomBottomBar from "../components/global/BottomBar.tsx/CustomBottomBar";

export default function Messages() {
  const isFocused = useIsFocused();
  return (
    <>
    <View style={{ flex: 1 }}>
      
    </View>
    <CustomBottomBar message={isFocused} /></>
  );
}
