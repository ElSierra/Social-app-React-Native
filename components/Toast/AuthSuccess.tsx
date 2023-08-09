import { View, Text, useColorScheme, Dimensions } from "react-native";
import React from "react";
import { CloseCircleIcon, ForbiddenIcon } from "../icons";
import CustomAuth from "./CustomAuth";
const { width } = Dimensions.get("screen");
export default function AuthSuccess(props: any) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return <CustomAuth props={props} type="success" />;
}
