import { View, Text, useColorScheme, Pressable } from "react-native";
import React from "react";
import { CloseCircleIcon, TrashIcon, VerifiedIcon } from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";

import { BlurView } from "expo-blur";
import Entypo from '@expo/vector-icons/Entypo';
export default function NameAndTag({
  name,
  verified,
  dateAgo,
  userTag,
  id,
  myPost,
  deletePost,
}: {
  name: string;
  dateAgo?: string;
  verified: boolean;
  userTag: string;
  id?: string;
  myPost: boolean;
  deletePost?: (id: string) => void;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const [visible, setVisible] = React.useState(false);
  const style = dark ? "dark" : "light";
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "jakaraBold",
            includeFontPadding: false,
            fontSize: 14,
            color,
          }}
        >
          {name}
        </Text>
        {verified && <VerifiedIcon color="green" size={16} />}
        <Text
          style={{
            fontFamily: "jakara",
            includeFontPadding: false,
            color: "#7a868f",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          @{userTag}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <View
            style={{
              backgroundColor: "#7a868f",
              height: 4,
              width: 4,
              borderRadius: 9999,
            }}
          />
          <Text style={{ color: "#7a868f" }}>{dateAgo}</Text>
        </View>
      </View>
      {myPost && (
        <Menu
          contentStyle={{
            backgroundColor: "transparent",
            elevation: 0,
            shadowColor: "transparent",
            borderWidth: 1,
            borderColor: "#B4B4B488",
            borderRadius: 10,
            overflow: "hidden",
          }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable onPress={openMenu}>
             <Entypo name="dots-three-horizontal" size={24} color="black" />
            </Pressable>
          }
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            tint={style}
            style={{ height: "130%", width: "300%", position: "absolute" }}
          />
          <Menu.Item
            titleStyle={{ fontFamily: "jakara", color }}
            onPress={() => {
              deletePost ? deletePost(id || "") : undefined;
              closeMenu();
            }}
            trailingIcon={() => <TrashIcon size={20} color="red" />}
            title="Delete"
          />

          <Divider />
          <Menu.Item
            titleStyle={{ fontFamily: "jakara", color }}
            trailingIcon={() => <CloseCircleIcon size={20} color="red" />}
            onPress={() => {
              setVisible(false);
            }}
            title="Cancel"
          />
        </Menu>
      )}
    </View>
  );
}
