import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NotificationIcon } from "./../components/icons/index";
import { NotFunction } from "./../node_modules/@reduxjs/toolkit/src/createReducer";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { IPostBuilder } from "./app";

export type RootStackParamList = {
  Main: undefined;
  ImageFullScreen: {
    photoUri: string;
    id: string;
  };
  VideoFullScreen: {
    videoUri: string;
    videoTitle: string;
    videoViews: string;
    imageUri: string;
    userTag: string;
    name: string;
    thumbNail: string | null;
  };
  ViewPost: IPostBuilder;
  Profile: undefined;
  PostContent: undefined;
};

export type BottomRootStackParamList = {
  BottomHome: undefined;

  Messages: undefined;
  Discover: undefined;
  Notifications: undefined;
};

export type DrawerRootStackParamList = {
  Home: undefined;
};

export type AuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeNavigationProp = NavigationProp<RootStackParamList, "Main">;

export type ImageFullScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ImageFullScreen"
>;
export type PostContentProp = NativeStackScreenProps<
  RootStackParamList,
  "PostContent"
>;
export type HomeProp = NativeStackScreenProps<RootStackParamList, "Main">;
export type DrawerHomeProp = DrawerScreenProps<
  DrawerRootStackParamList,
  "Home"
>;

export type BottomProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "BottomHome"
>;

export type DiscoverProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "Discover"
>;
export type VideoFullScreen = NativeStackScreenProps<
  RootStackParamList,
  "VideoFullScreen"
>;
export type LoginScreen = NativeStackScreenProps<
  AuthRootStackParamList,
  "Login"
>;
export type ViewPost = NativeStackScreenProps<RootStackParamList, "ViewPost">;
export type RegisterScreen = NativeStackScreenProps<
  AuthRootStackParamList,
  "Register"
>;
