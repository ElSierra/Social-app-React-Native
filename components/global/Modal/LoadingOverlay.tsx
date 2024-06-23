import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Portal } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  closeLoadingModal,
  openLoadingModal,
} from "../../../redux/slice/modal/loading";

const { height, width } = Dimensions.get("screen");
export const LoadingModal = () => {
  const loadingModal = useAppSelector((state) => state.loadingModal);
  const dispatch = useAppDispatch();
  const dark = useGetMode();
  const color = !dark ? "black" : "white";
  const tint = dark ? "dark" : "light";
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  return (
    <Portal>
      <View style={styles.centeredView}>
        <Modal
          statusBarTranslucent
          animationType="fade"
          transparent={true}
          visible={loadingModal?.isOpen}
          onRequestClose={() => {
            dispatch(closeLoadingModal());
          }}
        >
          <BlurView
            experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
            tint={tint}
            style={{ position: "absolute", height, width }}
            intensity={10}
          />

          <View style={styles.centeredView}>
            <ActivityIndicator size={"large"} color={color} />
          </View>
        </Modal>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
