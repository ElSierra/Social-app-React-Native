import { View, Text, Pressable, FlatList } from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ChatScreenProp } from "../../types/navigation";
import FastImage from "react-native-fast-image";

import { Entypo } from "@expo/vector-icons";
import ChatBox from "../../components/chat/ChatBox";
import { dummyChat } from "../../data/dummyChat";
import ChatBuilderText from "../../components/chat/ChatBuilderText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";

import { addNewChat, addToChatList } from "../../redux/slice/chat/chatlist";
import uuid from "react-native-uuid";
import TypingBox from "../../components/chat/TypingBox";
import BSON from "bson";
import ContextMenu from "react-native-context-menu-view";
import { HoldItem, HoldMenuProvider } from "react-native-hold-menu";
import { IChatList } from "../../types/api";
import { findChatById } from "../../util/chatSearch";
import socket from "../../util/socket";
import Animated from "react-native-reanimated";
import { ChatModal } from "../../components/messages/ChatList/ChatModal";
import { Portal } from "react-native-paper";

export default function ChatScreen({ navigation, route }: ChatScreenProp) {
  const user = useAppSelector((state) => state.user?.data);
  const chatState = useAppSelector((state) => state?.chatlist.data);
  const dispatch = useAppDispatch();
  const onlineIds = useAppSelector((state) => state.online.ids);
  const isOnline = onlineIds.some((ids) => ids === route.params.receiverId);

  const [userChats, setChats] = useState<IChatList | undefined>(undefined);
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const [messageText, setMessageText] = useState("");

  const [isTyping, setIstyping] = useState(false);
  console.log(
    "🚀 ~ file: ChatScreen.tsx:29 ~ ChatScreen ~ isTyping:",
    isTyping
  );

  useEffect(() => {
    findChatById(route.params.id, chatState)
      .then((chat) => {
        if (chat) {
          setChats(chat);
        } else {
          console.log("Chat not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [chatState]);
  const MenuItems = [
    { text: "Actions", icon: "home", isTitle: true, onPress: () => {} },
  ];
  useLayoutEffect(() => {
    socket?.emit("chat", route.params.id);
  }, []);
  useEffect(() => {
    socket?.emit(
      "isTyping",
      route.params.id,
      messageText.length > 0 ? true : false
    );
  }, [messageText]);

  useEffect(() => {
    socket?.on("newChat", (chatMessages) => {
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
    socket?.on("newMessage", (message) => {
      if (message) {
        console.log(
          "🚀 ~ file: ChatScreen.tsx:43 ~ socket.on ~ message:",
          message
        );
        dispatch(addNewChat(message));
      }
    });

    socket?.on("isTyping", (data) => {
      console.log("🚀 ~ file: ChatScreen.tsx:91 ~ socket?.on ~ data:", data);
      if (data) {
        console.log(data.isTyping, isTyping);
        if (data.id !== user?.id) {
          setIstyping(data.isTyping);
        }
      }
    });
  }, [socket]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                color,
                fontFamily: "jakaraBold",
                includeFontPadding: false,

                justifyContent: "center",
                paddingBottom: 4,
              }}
            >
              @{route.params.name}
            </Text>
            <Animated.View
              key={isOnline ? `online` : `offline`}
              style={{
                width: 10,
                height: 10,
                backgroundColor: isOnline ? "green" : "red",
                borderRadius: 9999,
              }}
            />
          </View>
        );
      },
      headerTitleStyle: { fontFamily: "jakaraBold", color },
      headerBackVisible: false,
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
  }, [color, isOnline]);

  const handleSendMessage = () => {
    console.log("pressed");
    const id = new BSON.ObjectId();

    setMessageText("");
    socket?.emit("newMessage", {
      message: {
        sender: { userName: user?.userName || "", id: user?.id as string },
        text: messageText,
        id,
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
  const [isOpen, setIsOpen] = useState(false);
  console.log("🚀 ~ file: ChatScreen.tsx:205 ~ ChatScreen ~ isOpen:", isOpen)

  const openModal = () => {
    setIsOpen(false);
  };

  const [text, setText] = useState({id:"", text:""});

  return (
    <>
      <ChatModal isOpen={isOpen} closeModal={openModal} text={text} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
            fadingEdgeLength={100}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    height: 90,
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {isTyping && messageText.length < 1 && <TypingBox />}
                </View>
              );
            }}
            data={userChats?.messages}
            contentContainerStyle={{ gap: 15, padding: 20, paddingBottom: 100 }}
            renderItem={({ item }) => (
              <Pressable
                onLongPress={() => {
                  console.log('prssed')
                  setText({id:item.id,text:item.text});
                  item?.sender?.id === user?.id && setIsOpen(true)
                }}
              >
                <ChatBuilderText
                  isMe={item?.sender?.id === user?.id}
                  text={item?.text}
                  time={item?.createdAt}
                />
              </Pressable>
            )}
          />
        </View>
        <View
          style={{
            padding: 10,
            paddingBottom: 20,
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ChatBox
            props={{
              value: messageText,
              onChangeText: (text) => {
                setMessageText(text);
              },
              onFocus: (e) => {
                console.log("focused");
              },
              onBlur: (e) => {
                console.log("unfocused");
              },
            }}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </>
  );
}
