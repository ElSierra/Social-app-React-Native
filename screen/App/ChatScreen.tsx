import { View, Text, Pressable, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ChatScreenProp } from "../../types/navigation";
import FastImage from "react-native-fast-image";

import { Entypo } from "@expo/vector-icons";
import ChatBox from "../../components/chat/ChatBox";
import { dummyChat } from "../../data/dummyChat";
import ChatBuilderText from "../../components/chat/ChatBuilderText";
import { useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";

export default function ChatScreen({ navigation }: ChatScreenProp) {
  const userId = useAppSelector((state) => state.user?.data?.id);
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "@hojoisaac",

      headerTitleStyle: { fontFamily: "jakaraBold", color },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View
              style={{
                marginRight: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo name="chevron-left" size={30} color={color} />
              <FastImage
                style={{ height: 40, width: 40, borderRadius: 9999 }}
                source={{
                  uri: "https://quick-chop.nyc3.digitaloceanspaces.com/ead02f5af07c418086c82b925db0f257.gif",
                }}
              />
            </View>
          </Pressable>
        );
      },
    });
  }, [color]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          inverted
          fadingEdgeLength={100}
          data={dummyChat}
          contentContainerStyle={{ gap: 15, padding: 20 }}
          renderItem={({ item }) => (
            <ChatBuilderText isMe={item.userId === userId} text={item.text} />
          )}
        />
      </View>
      <View style={{ padding: 10 }}>
        <ChatBox />
      </View>
    </View>
  );
}
