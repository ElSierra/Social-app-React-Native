import {
  View,
  Text,
  useColorScheme,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomProp,
  BottomRootStackParamList,
  DiscoverProp,
  DrawerRootStackParamList,
  RootStackParamList,
} from "../types/navigation";
import Home from "../screen/App/Home";
import {
  HomeIcon,
  HomeIconUnfocused,
  MessageUnfocused,
  MessagesIcon,
  NotificationIcon,
  NotificationUnfocused,
  SearchIcon,
  SearchUnfocused,
} from "../components/icons";

import { BlurView } from "expo-blur";

import Discover from "../screen/App/Discover";

import ImageFullScreen from "../screen/App/ImageFullScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screen/App/Profile";
import { StatusBar } from "expo-status-bar";
import CustomDrawerContent from "../components/home/drawer/CustomDrawer";
import ProfileButton from "../components/home/header/ProfileButton";
import IconButtons from "../components/global/Buttons/BottomBarButtons";
import Messages from "../screen/App/Messages";
import NotificationsPage from "../screen/App/Notifications";
import useGetMode from "../hooks/GetMode";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetContainer } from "../components/global/BottomSheetContainer";
import PostContent from "../screen/App/PostContent";
import CustomToast from "../components/global/Toast";
import InputText from "../screen/Auth/components/InputText";
import SearchBar from "../components/discover/SearchBar";
import VideoFullScreen from "../screen/App/VideoFullScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useLazyGetFollowDetailsQuery } from "../redux/api/user";
import PostScreen from "../screen/App/PostScreen";
import { useEffect, useRef, useState } from "react";

import {
  updateFollowers,
  updateFollowing,
} from "../redux/slice/user/followers";
import ProfilePeople from "../screen/App/ProfilePeople";
import ChatScreen from "../screen/App/ChatScreen";
import SearchUsers from "../screen/App/SearchUsers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { addNewChat, addToChatList } from "../redux/slice/chat/chatlist";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { AppState } from "react-native";
import { store } from "../redux/store";

import { updateOnlineIds } from "../redux/slice/chat/online";
import { openToast } from "../redux/slice/toast/toast";
import { IMessageSocket } from "../types/socket";
import { useNavigationState } from "@react-navigation/native";
import useSocket from "../hooks/Socket";
import oldSocket from "../util/socket";
import Notifications from "../util/notification";
import DrawerNavigator from "./Main/DrawerNavigation";
import { BottomTabNavigator } from "./Main/BottomNavigation";
const BACKGROUND_FETCH_TASK = "background-fetch";
const Stack = createNativeStackNavigator<RootStackParamList>();

const width = Dimensions.get("screen").width;

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});
function scheduleNoticationHandler() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Qui",
      body: "Connected",
      data: {
        connected: true,
      },
    },
    trigger: {
      seconds: 1,
    },
  });
}

export default function Main() {
  const chatList = useAppSelector((state) => state.chatlist.data);
  const id = useAppSelector((state) => state.user?.data?.id);
  const dark = useGetMode();
  const isDark = dark;
  const tint = isDark ? "dark" : "light";
  const backgroundColor = isDark ? "black" : "white";
  const color = !isDark ? "black" : "white";
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";

  useEffect(() => {
    socket?.on("connected", (connected) => {
      scheduleNoticationHandler();
      dispatch(openToast({ text: "Connected", type: "Success" }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("followedStatus");
    socket?.on("following", (following: number) => {
      if (following) dispatch(updateFollowing({ following }));
    });
    socket?.on("followers", (followers: number) => {
      if (followers) dispatch(updateFollowers({ followers }));
    });
    return () => {
      socket?.off("following");
      socket?.off("followers");
    };
  }, [socket]);

  useEffect(() => {
    for (let i in chatList) {
      socket?.emit("chat", chatList[i].id);
    }
  }, [chatList]);

  useEffect(() => {
    if (socket) {
      socket?.on("newChat", (chatMessages) => {
        console.log(
          "🚀 ~ file: Main.tsx:203 ~ socket?.on ~ chatMessages:",
          chatMessages
        );
        if (chatMessages) {
          //TODO: CONFIRM IF DATA MATCHES

          if (chatMessages?.isNew) {
            dispatch(
              addToChatList({
                id: chatMessages?.id,
                messages: chatMessages?.messages,
                users: chatMessages?.users,
              })
            );
          }
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    socket?.on("message", (message: IMessageSocket) => {
      if (message) {
        if (message.message?.sender?.id !== id) {
          dispatch(addNewChat(message));
          dispatch(
            openToast({
              type: "Message",
              text: message?.message.text,
              imageUri: message.imageUri,
            })
          );
        }
      }
    });
  }, [socket]);
  useEffect(() => {
    socket?.on("online", (online) => {
      dispatch(updateOnlineIds({ ids: online }));
    });
  }, [socket]);
  return (
    <BottomSheetModalProvider>
      <BottomSheetContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor },
          }}
        >
          <Stack.Screen
            name="Main"
            options={{ headerShown: false, freezeOnBlur: true }}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name="Profile"
            options={{
              headerTitle: "",
              animation: "fade_from_bottom",
              headerTransparent: true,
              headerTintColor: "white",
            }}
            component={Profile}
          />
          <Stack.Screen
            name="ProfilePeople"
            options={{
              headerTitle: "",
              animation: "fade_from_bottom",
              headerTransparent: true,
              headerTintColor: "white",
            }}
            component={ProfilePeople}
          />
          <Stack.Screen
            name="ImageFullScreen"
            options={{
              title: "",
              animation: "fade",
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
            component={ImageFullScreen}
          />
          <Stack.Screen
            name="PostContent"
            options={{
              title: "",

              headerShown: false,
              animation: "fade_from_bottom",
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
            component={PostContent}
          />
          <Stack.Screen
            name="ChatScreen"
            options={{
              headerBackground: () => (
                <BlurView
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    borderColor,
                    borderBottomWidth: 0.5,
                  }}
                  tint={tint}
                  intensity={200}
                />
              ),
              title: "Chat",
              animation: "fade_from_bottom",
              headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
              headerShadowVisible: false,

              headerTransparent: true,
              headerTitleAlign: "center",
              headerTintColor: color,
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
            component={ChatScreen}
          />
          <Stack.Screen
            name="VideoFullScreen"
            options={{
              title: "",
              contentStyle: { backgroundColor: "black" },
              animation: "fade",
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
            component={VideoFullScreen}
          />
          <Stack.Screen
            name="ViewPost"
            options={{
              headerBackground: () => (
                <BlurView
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    borderColor,
                    borderBottomWidth: 0.5,
                  }}
                  tint={tint}
                  intensity={200}
                />
              ),
              title: "Post",
              animation: "fade",
              headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
              headerShadowVisible: false,

              headerTransparent: true,
              headerTitleAlign: "center",
              headerTintColor: color,
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
            component={PostScreen}
          />
          <Stack.Screen
            name="SearchUser"
            component={SearchUsers}
            options={{
              headerTintColor: color,
              animation: "fade_from_bottom",
              headerStyle: { backgroundColor },
              headerTitle: "",
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </BottomSheetContainer>
    </BottomSheetModalProvider>
  );
}
