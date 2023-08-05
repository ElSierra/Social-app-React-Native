import { View, Text } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import AnimatedScreen from "../components/global/AnimatedScreen";


export default function Messages() {
  const isFocused = useIsFocused();
  return (
 
    <AnimatedScreen style={{ flex: 1 }}>
      
    </AnimatedScreen>

  );
}
