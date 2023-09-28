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
    id?: string;
    height?: number;
    width?: number;
  };
  FollowingFollowers: {
    initial: "Following" | "Followers";
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
  ProfilePeople: {
    id: string;
    imageUri: string;
    userTag: string;
    name: string;
    verified: boolean;
  };
  ChatScreen: {
    id: string;
    chatId?: string;
    name: string;
    imageUri: string;
    receiverId: string;
  };
  SearchUser: undefined;
  PostContent: undefined;
  EditProfile: undefined;
  ChangeData: {
    change: "userName" | "password" | "name";
  };
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
export type PeopleProfileNavigationProp = NavigationProp<
  RootStackParamList,
  "ProfilePeople"
>;
export type ImageFullScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ImageFullScreen"
>;
export type PostContentProp = NativeStackScreenProps<
  RootStackParamList,
  "PostContent"
>;
export type ProfilePeopleProp = NativeStackScreenProps<
  RootStackParamList,
  "ProfilePeople"
>;
export type ChatScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ChatScreen"
>;
export type EditProfileProp = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;
export type ChangeDataProp = NativeStackScreenProps<
  RootStackParamList,
  "ChangeData"
>;
export type SearchUserProp = NativeStackScreenProps<
  RootStackParamList,
  "SearchUser"
>;
export type SearchUserNavigation = NavigationProp<
  RootStackParamList,
  "SearchUser"
>;
export type ChatNavigation = NavigationProp<RootStackParamList, "ChatScreen">;
export type ChangeDataNavigationProp = NavigationProp<
  RootStackParamList,
  "ChatScreen"
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
