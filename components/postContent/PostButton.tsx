import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";

export default function PostButton() {
  const dark = useGetMode();
  const dispatch = useAppDispatch();

  const backgroundColor = dark ? "white" : "black";
  const rippleColor = !dark ? "white" : "black";
  const color = !dark ? "white" : "black";
  return (
    <View
      style={{
        backgroundColor,
        height: 45,
        width: 80,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => {
          dispatch(openToast({ text: "Successful Login", type: "Success" }));
        }}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          height: 45,
          width: 80,
          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontFamily: "mulishBold" }}>Post</Text>
      </Pressable>
    </View>
  );
}
