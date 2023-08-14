import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeInUp,
  FadeOutUp,
  runOnJS,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { closeToast } from "../../../redux/slice/toast/toast";
import { BlurView } from "expo-blur";
import { ForbiddenIcon, InfoIcon, VerifyIcon } from "../../icons";
import useGetMode from "../../../hooks/GetMode";
import { Portal } from "react-native-paper";
import { useForm } from "react-hook-form";

const width = Dimensions.get("screen").width;
export default function CustomToast() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";
  const colorForbidden = dark ? "#ff0000" : "#400000";
  const dispatch = useAppDispatch();
  const toastState = useAppSelector((state) => state.toast);

  function handleClose() {
    dispatch(closeToast());
  }

  function callback() {
    "worklet";
    runOnJS(handleClose)();
  }

  const renderIcon = () => {
    if (toastState.type === "Failed") {
      return <ForbiddenIcon size={20} color={colorForbidden} />;
    } else if (toastState.type === "Success") {
      return <VerifyIcon size={20} color={"green"} />;
    } else {
      return <InfoIcon size={20} color={color} />;
    }
  };
  return (
    <Portal>
      {toastState.open && (
        <Animated.View
          style={{
            height: 85,
            width: width,
            backgroundColor:
              toastState.type === "Failed"
                ? "#D8000061"
                : toastState.type === "Success"
                ? "#4CF10062"
                : "#00000058",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          entering={FadeInUp.springify()
            .withCallback(callback)}
          exiting={FadeOutUp.springify().delay(2000)}
        >
          <BlurView
            tint={tint}
            style={{ position: "absolute", width, height: 100 }}
            intensity={50}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            {renderIcon()}
            <Text
              style={{
                color,
                fontFamily: "mulishMedium",
                fontSize: 16,
              }}
            >
              {toastState.text}
            </Text>
          </View>
        </Animated.View>
      )}
    </Portal>
  );
}
