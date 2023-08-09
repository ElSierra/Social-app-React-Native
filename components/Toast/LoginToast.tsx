import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { CloseCircleIcon, ForbiddenIcon } from "../icons";

export default function LoginToast(props: any) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <View
      style={{
        backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF8F",
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
        <ForbiddenIcon size={20} color="red" />
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
