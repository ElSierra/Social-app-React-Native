import {
  View,
  Text,
  useColorScheme,
  Dimensions,
  SafeAreaView,
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
import Notifications from "../screen/App/Notifications";
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
import { useEffect } from "react";
import socket from "../util/socket";
import {
  updateFollowers,
  updateFollowing,
} from "../redux/slice/user/followers";
import ProfilePeople from "../screen/App/ProfilePeople";
import ChatScreen from "../screen/App/ChatScreen";
import SearchUsers from "../screen/App/SearchUsers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomRootStackParamList>();
const Drawer = createDrawerNavigator<DrawerRootStackParamList>();
const TopBar = createMaterialTopTabNavigator();
const width = Dimensions.get("screen").width;

function SearchTabs() {
  return (
    <TopBar.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50,
  
          elevation: 0,
        },

        tabBarBounces: true,
      }}
    >
      <TopBar.Screen name="Users" options={{}} component={Discover} />
      <TopBar.Screen name="Posts" component={Discover} />
    </TopBar.Navigator>
  );
}

function DrawerNavigator() {
  const dark = useGetMode();
  const isDark = dark;
  const tint = isDark ? "dark" : "light";
  const color = isDark ? "white" : "black";
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  const backgroundColor = isDark ? "black" : "white";
  const [getCurrentFollowData] = useLazyGetFollowDetailsQuery();
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStatusBarHeight: 30,

        drawerStyle: { backgroundColor: "transparent", width: width * 0.85 },
        sceneContainerStyle: { backgroundColor },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerBackground: () => (
              <BlurView
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  top: 0,
                  right: 0,
                }}
                tint={tint}
                intensity={200}
              />
            ),

            drawerItemStyle: { display: "none" },
            headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
            headerShadowVisible: false,
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0.2,
              borderColor,
            },
            headerTransparent: true,
            headerTitleAlign: "center",
            headerLeft: () => (
              <ProfileButton
                color={color}
                style={{ paddingLeft: 20 }}
                size={40}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            ),
            headerStyle: { backgroundColor: "transparent" },
            title: "Qui ",
          };
        }}
      />
    </Drawer.Navigator>
  );
}
export default function Main() {
  const dark = useGetMode();
  const isDark = dark;
  const tint = isDark ? "dark" : "light";
  const backgroundColor = isDark ? "black" : "white";
  const color = !isDark ? "black" : "white";
  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector((state) => state.user.token);
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  useEffect(() => {
    socket.connect();

    socket.emit("auth", userAuthenticated);
  }, []);

  useEffect(() => {
    socket.on("following", (following: number) => {
      if (following) dispatch(updateFollowing({ following }));
    });
    socket.on("followers", (followers: number) => {
      if (followers) dispatch(updateFollowers({ followers }));
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
              title: "",

              animation: "fade_from_bottom",
              headerStyle: { backgroundColor },

              headerShadowVisible: false,
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

export function BottomTabNavigator() {
  const dark = useGetMode();
  const isDark = dark;
  const tint = !isDark ? "light" : "dark";
  const color = isDark ? "white" : "black";
  const backgroundColor = isDark ? "black" : "white";
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <BlurView
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint={tint}
          intensity={200}
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}
      sceneContainerStyle={{ backgroundColor }}
      screenOptions={({ navigation, route }) => {
        return {
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerStatusBarHeight: 30,

          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            height: 60,
            borderTopWidth: 0.2,

            borderColor,
          },
          headerBackgroundContainerStyle: {
            borderBottomWidth: 0.2,
            borderColor,
          },
          headerBackground: () => (
            <BlurView
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
              }}
              tint={tint}
              intensity={200}
            />
          ),
          tabBarIcon: ({ focused }) => {
            const iconFocused = () => {
              if (route.name === "BottomHome") {
                return HomeIcon;
              }
              if (route.name === "Discover") {
                return SearchIcon;
              }
              if (route.name === "Messages") {
                return MessagesIcon;
              } else {
                return NotificationIcon;
              }
            };
            const iconUnfocused = () => {
              if (route.name === "BottomHome") {
                return HomeIconUnfocused;
              }
              if (route.name === "Discover") {
                return SearchUnfocused;
              }
              if (route.name === "Messages") {
                return MessageUnfocused;
              } else {
                return NotificationUnfocused;
              }
            };
            return (
              <IconButtons
                Icon={focused ? iconFocused() : iconUnfocused()}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          },
          headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
          headerShadowVisible: false,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
        };
      }}
    >
      <Tab.Screen
        name="BottomHome"
        options={({ navigation, route }: BottomProp) => {
          return {
            headerShown: false,

            title: "Home",

            headerTitleStyle: { fontFamily: "instaBold", fontSize: 24 },
            headerTitleAlign: "center",
          };
        }}
        component={DrawerNavigator}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={({ navigation, route }: DiscoverProp) => {
          return {
            title: "Discover",
            headerTitle: () => {
              return <SearchBar />;
            },
            headerShown: true,
            headerTransparent: true,
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0,
              borderColor,
            },
            headerBackground: () => (
              <BlurView
                style={{
                  opacity: 0,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  top: 0,
                  right: 0,
                }}
                tint={tint}
                intensity={100}
              />
            ),
            headerLeft: () => (
              <ProfileButton
                color={color}
                style={{ paddingLeft: 20 }}
                size={40}
                onPress={() => {
                  navigation.navigate("BottomHome");
                }}
              />
            ),
          };
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notification",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerBackground: () => (
            <BlurView
              style={{
                opacity: 0,
                position: "absolute",
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
              }}
              tint={tint}
              intensity={100}
            />
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { fontFamily: "uberBold", fontSize: 30, color },
          title: "Messages",
          headerTransparent: true,
          headerBackgroundContainerStyle: undefined,
        }}
      />
    </Tab.Navigator>
  );
}
