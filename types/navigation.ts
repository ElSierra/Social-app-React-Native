import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  ImageFullScreen: {
    photoUri: string[];
  };
};

export type FullImageNavigationProp = NavigationProp<
  RootStackParamList,
  "ImageFullScreen"
>;
export type HomeNavigationProp = NavigationProp<
  RootStackParamList,
  "ImageFullScreen"
>;

export type ImageFullScreenProp = NativeStackScreenProps<RootStackParamList, "ImageFullScreen">;