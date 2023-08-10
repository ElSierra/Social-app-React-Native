import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NotificationIcon } from "./../components/icons/index";
import { NotFunction } from "./../node_modules/@reduxjs/toolkit/src/createReducer";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  ImageFullScreen: {
    photoUri: string;
  };
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

export type HomeNavigationProp = NavigationProp<
  RootStackParamList,
  "Main"
>;

export type ImageFullScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ImageFullScreen"
>;
export type PostContentProp = NativeStackScreenProps<
  RootStackParamList,
  "PostContent"
>;
export type HomeProp = NativeStackScreenProps<RootStackParamList, "Main">;

export type BottomProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "BottomHome"
>;
