import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { ProfileIcon } from "../../icons";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

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
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        <ProfileIcon size={size} color={color} />
      </Pressable>
    </View>
  );
}
