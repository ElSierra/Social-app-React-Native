import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { ProfileIcon } from "../../icons";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { Image } from "expo-image";

type ProfileButtonType = {
  onPress: () => void;
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
};
export default function ProfileButton({
  onPress,
  color,
  size,
  style,
}: ProfileButtonType) {
  const imageUri = useAppSelector((state) => state.user.data?.imageUri);
  console.log("🚀 ~ file: ProfileButton.tsx:20 ~ imageUri:", imageUri);
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ height: size, width: size, borderRadius: 9999 }}
          />
        ) : (
          <ProfileIcon size={size} color={color} />
        )}
      </Pressable>
    </View>
  );
}
