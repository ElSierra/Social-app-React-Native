import { View, Text, useColorScheme, Dimensions } from "react-native";
import React from "react";
import { CloseCircleIcon } from "../icons";
import useGetMode from "../../hooks/GetMode";
import { BlurView } from "expo-blur";
import CustomAuth from "./CustomAuth";
const { width } = Dimensions.get("screen");
export default function AuthFailed(props: any) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";
  return (
    <CustomAuth props={props} type="failed"/>
  );
}
