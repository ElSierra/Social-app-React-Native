import { View, Text, Dimensions, Pressable, Modal } from "react-native";

import { ActivityIndicator, Button, Portal } from "react-native-paper";
import { BlurView } from "expo-blur";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { IPerson } from "../../types/api";
import { useNavigation } from "@react-navigation/native";
import useGetMode from "../../hooks/GetMode";
import { ProfileIcon } from "../icons";

import useSocket from "../../hooks/Socket";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addToChatList } from "../../redux/slice/chat/chatlist";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");
export default function FFContainer({
  name,
  userName,
  id,
  imageUri,
  isFollowed,
}: IPerson) {
  const dark = useGetMode();
  const { height, width } = Dimensions.get("screen");
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";
  const dispatch = useAppDispatch();
  const fbuttonBackgroundColor = dark ? "#FFFFFF" : "#000000";
  const tint = dark ? "dark" : "light";
  const fBColor = dark ? "white" : "black";
  const fBColor1 = !dark ? "white" : "black";
  const navigation = useNavigation<any>();
  const socket = useSocket();
  const user = useAppSelector((state) => state?.user?.data);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMessage = () => {
    socket?.emit("startChat", id);
    setIsOpen(true);
  };

  useEffect(() => {
    socket?.on("hello", (hello) => {});
  }, [socket]);

  useEffect(() => {
    socket?.on("newChat", (data) => {
      if (data?.senderId === user?.id) {
        dispatch(
          addToChatList({
            id: data?.id,
            messages: data?.messages,
            users: data?.users,
          })
        );
        navigation.replace("ChatScreen", {
          id: data.id,
          receiverId: id,
          name:
            data.users[0]?.id === user?.id
              ? data.users[1].userName
              : data.users[0].userName,
          imageUri:
            data.users[0]?.id === user?.id
              ? data.users[1].imageUri
              : data.users[0].imageUri,
        });
      }
    });
  }, [socket]);
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  return (
    <>
      <Portal>
        <>
          <View style={{ flex: 1 }}>
            <Modal
              statusBarTranslucent
              animationType="fade"
              transparent={true}
              visible={isOpen}
              style={{ justifyContent: "center", alignItems: "center" }}
              onRequestClose={closeModal}
            >
              {isHighEndDevice && (
                <BlurView
                  experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
                  tint={tint}
                  style={{ position: "absolute", height, width }}
                  intensity={10}
                />
              )}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color="black" />
              </View>
            </Modal>
          </View>
        </>
      </Portal>
      <Animated.View
        entering={FadeInLeft.springify()}
        style={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "space-between",
          padding: 6,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor,
          borderRadius: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ height: 30, width: 30, borderRadius: 9999 }}
            />
          ) : (
            <ProfileIcon color={color} size={34} />
          )}
          <View>
            <Text style={{ fontSize: 16, fontFamily: "mulishBold", color }}>
              {name}
            </Text>
            <Text style={{ fontFamily: "jakara", fontSize: 12, color }}>
              @{userName}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderRadius: 999,
            borderWidth: 1,
            backgroundColor: isFollowed ? color : "transparent",
            overflow: "hidden",
            borderColor: fbuttonBackgroundColor,
          }}
        >
          <Pressable
            android_ripple={{ color: "white" }}
            onPress={handleMessage}
            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
          >
            <Text
              style={{
                fontFamily: "jakara",
                color: isFollowed ? fBColor1 : fBColor,
                includeFontPadding: false,
              }}
            >
              {isFollowed ? "Following" : "Follow"}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
}
