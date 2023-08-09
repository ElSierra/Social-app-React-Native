import { View, Text, useColorScheme, Dimensions } from "react-native";
import React from "react";
import useGetMode from "../../../hooks/GetMode";
import { BlurView } from "expo-blur";
import { ForbiddenIcon } from "../../icons";
import { ToastProps } from "react-native-toast-message";
const { width } = Dimensions.get("screen");
export default function CustomAuth({
  props,
  type,
}: {
  props: any;
  type: "success" | "failed";
}) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";

  return (
    <View
      style={{
        borderRadius: 100,
        height: 100,
        position: "absolute",
        width: width,
      }}
    >
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#FFABAB00",
          height: 93,
          paddingBottom: 20,
          width: "100%",
        }}
      >
        <BlurView
          tint={tint}
          intensity={100}
          style={{
            position: "absolute",
            width: "100%",
            height: 93,
            backgroundColor: type === "failed" ? "#FF29299A" : "#00BA6392",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          {type == "failed" ? (
            <ForbiddenIcon size={20} color={color} />
          ) : (
            <ForbiddenIcon size={20} color={color} />
          )}
          <Text
            style={{
              color,

              fontFamily: "mulishMedium",
              includeFontPadding: false,
            }}
          >
            {props.text1}
          </Text>
        </View>
      </View>
    </View>
  );
}
