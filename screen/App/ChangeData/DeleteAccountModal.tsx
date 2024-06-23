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
import { Image } from "expo-image";
import {
  ProfileIcon,
  TrashIcon,
  VerifiedIcon,
} from "../../../components/icons";
import InputPassword from "../../Auth/components/InputPassword";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import { useDeleteAccountMutation } from "../../../redux/api/user";
import { signOut } from "../../../redux/slice/user";
import { resetPost } from "../../../redux/slice/post";
import { clearAllChatData } from "../../../redux/slice/chat/chatlist";
import { resetFollowers } from "../../../redux/slice/user/followers";

const { height, width } = Dimensions.get("screen");
export const DeleteAccountModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const dark = useGetMode();
  const imageUri = useAppSelector((state) => state.user.data?.imageUri);
  const color = !dark ? "#FFFFFF" : "#00430C";
  const cancelColor = dark ? "#d2f2d4" : "#009c1a";
  const deleteColor = dark ? "#FA9090" : "#ff0000";
  const dispatch = useAppDispatch();
  const tint = dark ? "dark" : "light";
  const [password, setPassword] = useState("");
  const [deleteAccount, deleteAccountResponse] = useDeleteAccountMutation();
  const handleSetPassword = (text: string) => {
    setPassword(text);
  };
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAccountDeletion = () => {
    if (password.length <= 1) {
      setErrorMsg("Password is Empty");
      return;
    }
    deleteAccount({ password })
      .unwrap()
      .then((e) => {
        dispatch(resetPost());
        dispatch(signOut());
        dispatch(clearAllChatData());
        dispatch(resetFollowers());
      })
      .catch((e) => {
        setErrorMsg(e.data?.msg);
      });
  };
  return (
    <Portal>
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
                  position: "absolute",
                  zIndex: 999,
                  top: 100,

                  left: 0,
                  right: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                  gap: 10,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {errorMsg && (
                  <Animated.View
                    key={errorMsg}
                    entering={FadeInLeft.springify()}
                    style={{
                      borderColor: "red",
                      borderWidth: 1,
                      borderStyle: "dashed",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,

                        fontFamily: "jakara",
                        includeFontPadding: false,
                      }}
                    >
                      {errorMsg}
                    </Text>
                  </Animated.View>
                )}
                <Animated.View entering={FadeIn.springify()}>
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{ height: 150, width: 150, borderRadius: 9999 }}
                    />
                  ) : (
                    <ProfileIcon size={160} color={color} />
                  )}
                </Animated.View>
                <View style={{ padding: 20 }}>
                  <InputPassword
                    props={{ value: password, onChangeText: handleSetPassword }}
                  />
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable
                    disabled={deleteAccountResponse.isLoading}
                    onPress={handleAccountDeletion}
                    style={{
                      padding: 10,
                      borderWidth: 1,

                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: deleteColor,
                      borderRadius: 10,
                    }}
                  >
                    {deleteAccountResponse.isLoading ? (
                      <ActivityIndicator size={"small"} color={color} />
                    ) : (
                      <>
                        <TrashIcon size={20} color={deleteColor} />
                        <Text style={{ color: deleteColor }}>
                          Delete Account
                        </Text>
                      </>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={closeModal}
                    style={{
                      backgroundColor: cancelColor,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: 70,
                      borderRadius: 10,
                      flexDirection: "row",
                    }}
                  >
                    <VerifiedIcon size={20} color={color} />
                    <Text style={{ color: color }}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </>
      </>
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
