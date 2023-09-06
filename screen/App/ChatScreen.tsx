import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ChatScreenProp } from "../../types/navigation";
import FastImage from "react-native-fast-image";

import { Entypo } from "@expo/vector-icons";
import ChatBox from "../../components/chat/ChatBox";
import { dummyChat } from "../../data/dummyChat";
import ChatBuilderText from "../../components/chat/ChatBuilderText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";
import socket from "../../util/socket";
import { addNewChat, addToChatList } from "../../redux/slice/chat/chatlist";
import uuid from "react-native-uuid";

export default function ChatScreen({ navigation, route }: ChatScreenProp) {
  const user = useAppSelector((state) => state.user?.data);
  const chatState = useAppSelector((state) => state?.chatlist.data);
  const dispatch = useAppDispatch();
  const userChats = chatState.find((chats) => chats.id === route.params.id);
  console.log(
    "🚀 ~ file: ChatScreen.tsx:22 ~ ChatScreen ~ userChats:",
    userChats?.messages
  );
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIstyping] = useState();
  console.log(
    "🚀 ~ file: ChatScreen.tsx:28 ~ ChatScreen ~ isTyping:",
    isTyping
  );

  useLayoutEffect(() => {
    socket.emit("chat", route.params.id);
  }, []);
  useMemo(() => {
    if (messageText.length > 0) {
      socket.emit("isTyping", route.params.id, true);
    } else if (messageText.length === 0) {
      socket.emit("isTyping", route.params.id, false);
    }
  }, [messageText]);

  useEffect(() => {
    socket.on("newChat", (chatMessages) => {
      if (chatMessages) {
        //TODO: CONFIRM IF DATA MATCHES
        console.log(
          "🚀 ~ file: ChatScreen.tsx:29 ~ socket.on ~ chatMessages:",
          chatMessages
        );
        if (chatMessages?.isNew) {
          dispatch(addToChatList(chatMessages));
        }
      }
    });
    socket.on("newMessage", (message) => {
      if (message) {
        console.log(
          "🚀 ~ file: ChatScreen.tsx:43 ~ socket.on ~ message:",
          message
        );
        dispatch(addNewChat(message));
      }
    });

    socket.on("isTyping", (isTyping) => {
      if (isTyping.id !== user?.id) {
        setIstyping(isTyping.isTyping);
      }
    });
  }, [socket]);

  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.name,

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
                  uri: route.params.imageUri,
                }}
              />
            </View>
          </Pressable>
        );
      },
    });
  }, [color]);

  const handleSendMessage = () => {
    console.log("pressed");
    setMessageText("");
    socket.emit("newMessage", {
      message: {
        sender: { userName: user?.userName || "", id: user?.id as string },
        text: messageText,
        id: uuid.v4().toString(),
        createdAt: `${new Date()}`,
      },
      chatId: route?.params?.id as string,
    });

    // dispatch(
    //   addNewChat({
    //     message: {
    //       sender: { userName: user?.userName || "", id: user?.id as string },
    //       text: messageText,
    //       id: uuid.v4().toString(),
    //       createdAt: `${new Date()}`,
    //     },
    //     chatId: route?.params?.id as string,
    //   })
    // );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          inverted
          fadingEdgeLength={100}
          ListHeaderComponent={() => {
            return <View>{isTyping && <Text>is Typing</Text>}</View>;
          }}
          data={userChats?.messages}
          contentContainerStyle={{ gap: 15, padding: 20, paddingTop: 80 }}
          renderItem={({ item }) => (
            <ChatBuilderText
              isMe={item?.sender?.id === user?.id}
              text={item?.text}
              time={item?.createdAt}
            />
          )}
        />
      </View>
      <View
        style={{
          padding: 10,
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ChatBox
          props={{ value: messageText, onChangeText: setMessageText }}
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
}
