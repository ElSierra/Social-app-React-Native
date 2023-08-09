import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { CloseCircleIcon, ForbiddenIcon, InfoIcon, VerifyIcon } from "../icons";


export default function InfoToast(props: any) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <View
      style={{
        backgroundColor: isDarkTheme ? "#0000005A" : "#FFFFFF8F",
        borderRadius: 100,
        paddingVertical: 3,
        paddingHorizontal: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <InfoIcon size={20} color="green" />
        <Text
          style={{
            color: isDarkTheme?"white":"black",
            fontFamily: "JakaraSemiBold",
            includeFontPadding: false,
          }}
        >
          {props.text1}
        </Text>
      </View>
    </View>
  );
}
