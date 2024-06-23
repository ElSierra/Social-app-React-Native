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
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { Image } from "expo-image";

import { CameraIcon, ProfileIcon } from "../icons";

const { height, width } = Dimensions.get("screen");
export const ViewProfilePhoto = ({
  isOpen,
  imageUri,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
  imageUri: string;
}) => {
  const dark = useGetMode();

  const color = !dark ? "black" : "white";
  const tint = dark ? "dark" : "light";

  return (
    <>
      <>
        <>
          <Modal
            statusBarTranslucent
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={closeModal}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              tint={tint}
              style={{ position: "absolute", height, width }}
              intensity={40}
            />

            <View style={styles.centeredView}>
              <Pressable
                onPress={closeModal}
                style={{ height: "100%", width: "100%" }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                ></View>
              </Pressable>

              <View
                style={{
                  height: "60%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  pointerEvents: "box-none",
                }}
              >
                {imageUri ? (
                  <Image
                    style={{ height: 300, width: 300, borderRadius: 9999 }}
                    contentFit="contain"
                    source={{ uri: imageUri }}
                  />
                ) : (
                  <ProfileIcon size={400} color={color} />
                )}
              </View>
            </View>
          </Modal>
        </>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
