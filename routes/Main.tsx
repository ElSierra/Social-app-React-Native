import { Platform, View, StyleSheet, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/navigation";

import { BlurView } from "expo-blur";

import ImageFullScreen from "../screen/App/ImageFullScreen";

import Profile from "../screen/App/Profile";

import useGetMode from "../hooks/GetMode";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetContainer } from "../components/global/BottomSheetContainer";
import PostContent from "../screen/App/PostContent";

import VideoFullScreen from "../screen/App/VideoFullScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  useGetUserQuery,
  useUpdateNotificationIdMutation,
} from "../redux/api/user";
import PostScreen from "../screen/App/PostScreen";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  updateFollowers,
  updateFollowing,
} from "../redux/slice/user/followers";
import ProfilePeople from "../screen/App/ProfilePeople";
import ChatScreen from "../screen/App/ChatScreen";
import SearchUsers from "../screen/App/SearchUsers";

import {
  addNewChat,
  addNewIndication,
  addToChatList,
} from "../redux/slice/chat/chatlist";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { AppState } from "react-native";

import { updateOnlineIds } from "../redux/slice/chat/online";
import { openToast } from "../redux/slice/toast/toast";
import { IMessageSocket } from "../types/socket";

import useSocket from "../hooks/Socket";

import Notifications from "../util/notification";

import { BottomTabNavigator } from "./Main/BottomNavigation";
import { dismissAllNotificationsAsync } from "expo-notifications";
import { useLazyGetAllChatsQuery } from "../redux/api/chat";
import FollowingFollowers from "../screen/App/FollowingFollowers";
import EditProfile from "../screen/App/EditProfile";
import ChangeData from "../screen/App/ChangeData";
import { createStackNavigator } from "@react-navigation/stack";
const BACKGROUND_FETCH_TASK = "background-fetch";
const Stack = createNativeStackNavigator<RootStackParamList>();
const JStack = createStackNavigator()
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export default function Main() {
  const [updateNotificationId] = useUpdateNotificationIdMutation();
  const chatList = useAppSelector((state) => state?.chatlist?.data);
  const id = useAppSelector((state) => state.user?.data?.id);
  const dark = useGetMode();
  const isDark = dark;
  const tint = isDark ? "dark" : "light";
  const backgroundColor = isDark ? "black" : "white";
  const color = !isDark ? "black" : "white";
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  const [getAllChats] = useLazyGetAllChatsQuery();
  useGetUserQuery(null);
  useEffect(() => {
    getAllChats(null)
      .then((e) => {})
      .catch((e) => e);
  }, []);

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_PROJECT_ID);
    async function registerForPushNotificationsAsync() {
      try {
        let token;

        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          dispatch(
            openToast({
              text: "Notifications are disabled",
              type: "Failed",
            })
          );
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID as string,
        });
        console.log(token);

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#8FFF1FC0",
          });
          Notifications.setNotificationCategoryAsync("message", [
            {
              identifier: "message",
              buttonTitle: "Reply",
              textInput: {
                submitButtonTitle: "reply",
                placeholder: "Enter Reply",
              },
            },
          ]);
        }

        return token;
      } catch (e) {}
    }

    registerForPushNotificationsAsync()
      .then((e) => {
        console.log("🚀 ~ file: Main.tsx:187 ~ .then ~ e:", e);
        updateNotificationId({ notificationId: e?.data as string });
      })
      .catch((e) => {
        console.log(e);
      });

    dismissAllNotificationsAsync()
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    socket?.on("connected", (connected) => {
      dispatch(openToast({ text: "Connected", type: "Success" }));
    });
    return () => {
      socket?.off("connected");
    };
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
    const rooms: string[] = [];
    for (let i in chatList) {
      rooms.push(chatList[i]?.id);
    }
    socket?.emit("chat", rooms);

    return () => {
      socket?.off("chat");
    };
  }, [chatList]);

  useEffect(() => {
    if (socket) {
      socket?.on("newChat", (chatMessages) => {
        console.log(
          "🚀 ~ file: Main.tsx:203 ~ socket?.on ~ chatMessages:",
          chatMessages
        );
        if (chatMessages) {
          if (chatMessages?.isNew) {
            dispatch(
              addToChatList({
                id: chatMessages?.id,
                messages: chatMessages?.messages,
                users: chatMessages?.users,
              })
            );
            dispatch(addNewIndication());
          }
        }
      });
    }
    return () => {
      socket?.off("newChat");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("online", (online) => {
      dispatch(updateOnlineIds({ ids: online }));
    });

    socket?.on("message", (data: IMessageSocket) => {
      if (data) {
        console.log(
          "🚀 ~ file: Main.tsx:267 ~ socket?.on ~ data:",
          new Date(),
          data
        );
        if (data.message?.sender?.id !== id) {
          dispatch(addNewChat(data));
          dispatch(addNewIndication());
          dispatch(
            openToast({
              type: "Message",
              text: data?.message.text,
              imageUri: data.imageUri,
            })
          );
        }
      }
    });
    return () => {
      socket?.off("online");
      socket?.off("message");
    };
  }, [socket]);

  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  console.log(
    "🚀 ~ file: Main.tsx:159 ~ Main ~ appStateVisible:",
    appStateVisible
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        socket?.emit("online");
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
      if (appState.current === "background") {
        socket?.emit("away");
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  useEffect(() => {
    handlePresentModalPress();
  }, []);
  return (
    <BottomSheetModalProvider>
      {/* <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal> */}
      <BottomSheetContainer />
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor },
        }}
      >
        <Stack.Screen
          name="Main"
          options={{ headerShown: false, title: "Home" }}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="Profile"
          options={{
            headerTitle: "",

            animation: Platform.OS === "ios" ? "fade_from_bottom" : "none",
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
            animation: "fade_from_bottom",

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
              <>
                {isHighEndDevice ? (
                  <BlurView
                    experimentalBlurMethod="dimezisBlurView"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      top: 0,
                      right: 0,
                      borderColor,
                      height: 300,
                      borderBottomWidth: 0.5,
                    }}
                    tint={tint}
                    intensity={200}
                  />
                ) : (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      top: 0,
                      right: 0,
                      borderColor,
                      borderBottomWidth: 0.5,
                      backgroundColor: "red",
                    }}
                  />
                )}
              </>
            ),
            title: "Chat",
            animation: "fade_from_bottom",
            headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
            headerShadowVisible: false,

            headerTransparent: true,
            headerTitleAlign: "center",
            headerTintColor: color,
            headerStyle: {
              backgroundColor,
            },
          }}
          component={ChatScreen}
        />
        <Stack.Screen
          name="VideoFullScreen"
          options={{
            title: "",
            contentStyle: { backgroundColor: "black" },
            animation: "fade_from_bottom",
            headerTransparent: true,
            headerShadowVisible: false,
            headerTintColor: "white",
          }}
          component={VideoFullScreen}
        />
        <Stack.Screen
          name="ViewPost"
          options={{
            // headerBackground: () => (
            //   <BlurView
            //     experimentalBlurMethod="dimezisBlurView"
            //     style={{
            //       position: "absolute",
            //       bottom: 0,
            //       left: 0,
            //       top: 0,
            //       right: 0,
            //       borderColor,
            //       borderBottomWidth: 0.5,
            //     }}
            //     tint={tint}
            //     intensity={200}
            //   />
            // ),
            title: "Post",
      animation:"fade_from_bottom",

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
          name="FollowingFollowers"
          options={{
            title: "Follow List",
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
          component={FollowingFollowers}
        />
        <Stack.Screen
          name="EditProfile"
          options={{
            title: "Edit Profile",
            animation: "none",
            headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
            headerShadowVisible: false,

            headerTransparent: true,
            headerTitleAlign: "center",
            headerTintColor: color,
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
          component={EditProfile}
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
        <Stack.Screen
          name="ChangeData"
          component={ChangeData}
          options={{
            headerTintColor: color,
            animation: "none",
            headerStyle: { backgroundColor },
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
