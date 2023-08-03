import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../types/navigation";
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
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
import { BlurView } from "expo-blur";
import ProfileButton from "../components/home/header/ProfileButton";
import Discover from "../screen/Discover";
import CustomHeader from "../components/home/header/CustomHeader";
import AddPostButton from "../components/global/AddPostButton";
import ImageFullScreen from "../screen/ImageFullScreen";
import Test from "../screen/Test";
import Show from "../screen/show";
import Messages from "../screen/Messages";
import Notifications from "../screen/Notifications";
export default function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{
          header: ({ options }) => <CustomHeader title={options.title || ""} />,

          title: "Home",
        }}
        component={Home}
      />
      <Stack.Screen
        name="ImageFullScreen"
        options={{
          headerTitle: "",
          headerTransparent: true,
          presentation: "transparentModal",
          
        }}
        component={ImageFullScreen}
      />
      <Stack.Screen
        name="Discover"
        
        component={Discover}
        options={{ animation: "none",  header: ({ options }) => <CustomHeader title={options.title || ""} />,title:"Discover" }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ animation: "none",  header: ({ options }) => <CustomHeader title={options.title || ""} />,title:"Messages" }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ animation: "none",  header: ({ options }) => <CustomHeader title={options.title || ""} />,title:"Notifications" }}
      />
    </Stack.Navigator>
  );
}

export function BottomTabNavigator() {
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
          tint="light"
          intensity={200}
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          header: ({ options }) => <CustomHeader title={options.title || ""} />,

          title: "Home",

          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <HomeIcon size={size} color={color} />
            ) : (
              <HomeIconUnfocused size={size} color={color} />
            ),
          headerTitleStyle: { fontFamily: "instaBold", fontSize: 24 },
          headerTitleAlign: "center",
        }}
        component={Home}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          title: "Discover",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <SearchIcon size={size} color={color} />
            ) : (
              <SearchUnfocused size={size} color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Discover}
        options={{
          title: "Notification",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <NotificationIcon size={size} color={color} />
            ) : (
              <NotificationUnfocused size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Discover}
        options={{
          title: "Discover",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <MessagesIcon size={size} color={color} />
            ) : (
              <MessageUnfocused size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
