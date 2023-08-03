import { NotificationIcon } from './../components/icons/index';
import { NotFunction } from "./../node_modules/@reduxjs/toolkit/src/createReducer";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  ImageFullScreen: {
    photoUri: string;
  };
  Profile: undefined;
  Messages: undefined;
  Discover: undefined;
  Notifications: undefined;
};

export type FullImageNavigationProp = NavigationProp<
  RootStackParamList,
  "ImageFullScreen"
>;
export type HomeNavigationProp = NavigationProp<
  RootStackParamList,
  "ImageFullScreen"
>;

export type ImageFullScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ImageFullScreen"
>;
