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

import { Entypo } from "@expo/vector-icons";
import ChatBox from "../../components/chat/ChatBox";
import { dummyChat } from "../../data/dummyChat";
import ChatBuilderText from "../../components/chat/ChatBuilderText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";

import {
  addNewChat,
  addToChatList,
  addToChatListStrict,
} from "../../redux/slice/chat/chatlist";
import uuid from "react-native-uuid";
import TypingBox from "../../components/chat/TypingBox";
import BSON from "bson";
import ContextMenu from "react-native-context-menu-view";
import { HoldItem, HoldMenuProvider } from "react-native-hold-menu";
import { IChatList } from "../../types/api";
import { findChatById } from "../../util/chatSearch";

import Animated from "react-native-reanimated";
import { ChatModal } from "../../components/messages/ChatList/ChatModal";
import { Portal } from "react-native-paper";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { openToast } from "../../redux/slice/toast/toast";
import { useUploadPhotoMutation } from "../../redux/api/services";
import useSocket from "../../hooks/Socket";
import { useLazyGetAllMessagesQuery } from "../../redux/api/chat";
import { Image } from "expo-image";

export default function ChatScreen({ navigation, route }: ChatScreenProp) {
  console.log(
    "🚀 ~ file: ChatScreen.tsx:38 ~ ChatScreen ~ route:",
    route.params
  );
  const user = useAppSelector((state) => state.user?.data);
  console.log("🚀 ~ file: ChatScreen.tsx:48 ~ ChatScreen ~ user:", user);
  const chatState = useAppSelector((state) => state?.chatlist.data);
  const state = useNavigationState((state) => state);
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const [userChats, setChats] = useState<IChatList | undefined>(undefined);
  const onlineIds = useAppSelector((state) => state.online.ids);
  const isOnline = onlineIds?.some(
    (ids) => ids === (route.params.receiverId || userChats?.users[0].id)
  );

  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const [messageText, setMessageText] = useState("");
  const [sentSuccess, setSentSuccess] = useState(true);
  const [isTyping, setIstyping] = useState(false);
  const [getAllMessages] = useLazyGetAllMessagesQuery();

  const renderItem = (({ item }: any) => (
    <Pressable
      ref={buttonRef}
      onLongPress={(e) => {
        handleModalVariables(
          item.id,
          item.text,
          userChats?.messages[0]?.id === item?.id &&
            userChats?.messages[0]?.sender?.id === user?.id &&
            sentSuccess,
          item?.sender?.id === user?.id,
          item.photoUri
        );
        setVisibleId(item.id);
      }}
    >
      {
        <ChatBuilderText
          id={item.id}
          photoUri={item.photoUri}
          isClicked={visibleId}
          isMe={item?.sender?.id === user?.id}
          text={item?.text}
          time={item?.createdAt}
          sent={
            userChats?.messages[0]?.id === item?.id &&
            userChats?.messages[0]?.sender?.id === user?.id &&
            sentSuccess
          }
        />
      }
    </Pressable>
  ));

  useMemo(() => {
    if (route.params?.chatId) {
      socket?.emit("chat", route.params?.chatId);
      getAllMessages({ id: route.params?.chatId }).then((r) => {
        if (!r?.data?.chatList) {
          return;
        }
        dispatch(
          addToChatListStrict({
            chatList: r.data?.chatList,
            chatId: route.params.chatId,
          })
        );
      });
    }
  }, [route.params?.chatId]);

  useMemo(() => {
    findChatById(route.params.id || route.params.chatId, chatState)
      .then((chat) => {
        if (chat) {
          setChats(chat);
        } else {
          ("Chat not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [chatState]);

  useEffect(() => {
    socket?.on("sent", (sent) => {
      setSentSuccess(sent);
    });
  }, [socket]);
  useLayoutEffect(() => {
    socket?.emit("chat", route.params.id);
  }, []);
  useMemo(() => {
    socket?.emit(
      "isTyping",
      route.params.id || route.params.chatId,
      messageText.length > 0 ? true : false
    );
  }, [messageText, route.params?.chatId]);

  useEffect(() => {
    socket?.on("isTyping", (data: { isTyping: boolean; id: string }) => {
      console.log("🚀 ~ file: ChatScreen.tsx:87 ~ socket?.on ~ data:", data);
      if (data) {
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
              @{route.params.name || userChats?.users[0].userName}
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
              if (!route.params.chatId) navigation.goBack();
            }}
          >
            <View
              style={{
                marginRight: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!route.params.chatId && (
                <Entypo name="chevron-left" size={30} color={color} />
              )}
              <Image
                style={{ height: 40, width: 40, borderRadius: 9999 }}
                source={{
                  uri: route.params.imageUri || userChats?.users[0].imageUri,
                }}
              />
            </View>
          </Pressable>
        );
      },
    });
  }, [color, isOnline, userChats]);

  const handleSendMessage = () => {
    setSentSuccess(false);
    const id = new BSON.ObjectId();

    dispatch(
      addNewChat({
        message: {
          sender: { userName: user?.userName || "", id: user?.id as string },
          text: messageText,
          id: uuid.v4().toString(),
          createdAt: `${new Date()}`,
        },
        chatId: route?.params?.id || route.params?.chatId,
      })
    );

    setMessageText("");
    socket?.emit("newMessage", {
      message: {
        sender: { userName: user?.userName || "", id: user?.id as string },
        text: messageText,
        id,
        createdAt: `${new Date()}`,
      },
      imageUri: route.params.imageUri,
      chatId: route?.params?.id || (route.params?.chatId as string),
    });

    setTimeout(() => {
      if (!sentSuccess) {
        dispatch(openToast({ text: "Message didnot Send", type: "Failed" }));
      }
    }, 10000);
  };
  const [isOpen, setIsOpen] = useState(false);

  const [visibleId, setVisibleId] = useState<string | null>(null);
  const closeModal = () => {
    setIsOpen(false);
    setVisibleId(null);
  };

  const [text, setText] = useState<{
    id: string;
    text: string;
    photoUri: string | undefined;
    x: number;
    y: number;
    width: number;
    sent: boolean;
    height: number;
    pageX: number;
    pageY: number;
  }>({
    id: "",
    text: "",
    photoUri: undefined,
    x: 0,
    y: 0,
    width: 0,
    sent: false,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const buttonRef = useRef<View>(null);
  const handleModalVariables = (
    id: string,
    text: string,
    sent: boolean,
    isMe: boolean,
    photoUri?: string
  ) => {
    buttonRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      setText({ id, text, photoUri, sent, x, y, width, height, pageX, pageY });
      if (isMe) setIsOpen(true);
    });
  };
  const [photo] = useUploadPhotoMutation();

  function handleSetPhotoPost(mimeType: string, uri: string, size: number) {
    const id = new BSON.ObjectId();

    dispatch(
      addNewChat({
        message: {
          sender: { userName: user?.userName || "", id: user?.id as string },
          text: "",
          photoUri: uri,
          id: uuid.v4().toString(),
          createdAt: `${new Date()}`,
        },
        chatId: route?.params?.id || (route.params.chatId as string),
      })
    );
    photo({ mimeType, uri })
      .then((r: any) => {
        socket?.emit("newPhoto", {
          message: {
            sender: { userName: user?.userName || "", id: user?.id as string },
            photoUri: r.data?.photo,
            id,
            createdAt: `${new Date()}`,
          },
          imageUri: route.params.imageUri,
          chatId: route?.params?.id || (route.params.chatId as string),
        });
      })
      .catch((e) => {
        e;
      });
  }

  return (
    <>
      <ChatModal
        isOpen={isOpen}
        closeModal={closeModal}
        text={text}
        chatId={route.params.id}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
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
            renderItem={renderItem}
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
            handleSetPhotoPost={handleSetPhotoPost}
            props={{
              value: messageText,
              onChangeText: (text) => {
                setMessageText(text);
              },
            }}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </>
  );
}
