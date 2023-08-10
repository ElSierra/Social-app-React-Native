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
      return <ForbiddenIcon size={20} color={"#400000"} />;
    } else if (toastState.type === "Success") {
      return <VerifyIcon size={20} color={"green"} />;
    } else {
      return <InfoIcon size={20} color={color} />;
    }
  };
  return (
    <>
      {toastState.open && (
        <Animated.View
          style={{
            width: width,
            height: 85,
            backgroundColor:
              toastState.type === "Failed"
                ? "#D8000061"
                : toastState.type === "Success"
                ? "#4CF10062"
                : "#00000058",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          entering={FadeInUp.springify().duration(400).withCallback(callback)}
          exiting={FadeOutUp.mass(200).duration(400).delay(1000)}
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
    </>
  );
}
