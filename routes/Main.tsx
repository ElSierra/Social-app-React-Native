import { View, Text, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomProp,
  BottomRootStackParamList,
  DrawerRootStackParamList,
  RootStackParamList,
} from "../types/navigation";
import Home from "../screen/Home";
import {
  AddIcon,
  DiscoverIcon,
  HomeIcon,
  HomeIconUnfocused,
  MessageUnfocused,
  MessagesIcon,
  NotificationIcon,
  NotificationUnfocused,
  ProfileIcon,
  SearchIcon,
  SearchUnfocused,
  Settings,
} from "../components/icons";

import { BlurView } from "expo-blur";

import Discover from "../screen/Discover";
import CustomDrawerHeader from "../components/home/header/CustomDrawerHeader";

import ImageFullScreen from "../screen/ImageFullScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screen/Profile";
import { StatusBar } from "expo-status-bar";
import CustomDrawerContent from "../components/home/drawer/CustomDrawer";
import ProfileButton from "../components/home/header/ProfileButton";
import IconButtons from "../components/global/BottomBarButtons";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomRootStackParamList>();
const Drawer = createDrawerNavigator<DrawerRootStackParamList>();

function DrawerNavigator() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const tint = isDark ? "dark" : "light";
  const color = isDark ? "white" : "black";
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ drawerStyle: { backgroundColor: "transparent" } }}
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
            headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
            headerShadowVisible: false,
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0.2,
              borderColor: "#FFFFFF7D",
            },
            headerTransparent: true,
            headerTitleAlign: "center",
            headerLeft: () => (
              <ProfileButton
                color={color}
                style={{ paddingLeft: 20 }}
                size={40}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerStyle: { backgroundColor: "transparent" },
            title: "QuickPost",
          };
        }}
      />
    </Drawer.Navigator>
  );
}
export default function Main() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const style = isDark ? "light" : "dark";
  const backgroundColor = isDark ? "black" : "white";
  return (
    <>
      <StatusBar animated={true} style={style} backgroundColor="transparent" />
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor } }}>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="ImageFullScreen"
          options={{
            title: "",
            animation: "fade",
            presentation: "transparentModal",
            headerTransparent: true,
            headerShadowVisible: false,
            headerTintColor: "white",
          }}
          component={ImageFullScreen}
        />
      </Stack.Navigator>
    </>
  );
}

export function BottomTabNavigator() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const tint = !isDark ? "light" : "dark";
  const color = isDark ? "white" : "black";
  const backgroundColor = isDark ? "black" : "white";
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
      sceneContainerStyle={{backgroundColor,}}
      screenOptions={({ navigation, route }) => {
        return {
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          

          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            height: 60,
            borderTopWidth: 0.2,
            borderColor: "#FFFFFF7D",
          },
          headerBackgroundContainerStyle: {
            borderBottomWidth: 0.2,
            borderColor: "#FFFFFF7D",
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
        options={{
          title: "Discover",
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Discover}
        options={{
          title: "Notification",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Discover}
        options={{
          title: "Discover",
        }}
      />
    </Tab.Navigator>
  );
}
