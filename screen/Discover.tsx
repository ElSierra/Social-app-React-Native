import { View, Text } from "react-native";
import React from "react";

import { useIsFocused } from "@react-navigation/native";

export default function Discover() {
  const isFocused = useIsFocused();
  return (
    <>
      <View style={{ flex: 1 }}></View>
    </>
  );
}
