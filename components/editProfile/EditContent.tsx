import { View, Text, Pressable } from "react-native";
import useGetMode from "../../hooks/GetMode";

export default function EditContent({
  text,
  Icon,
  color,
  onPress,
}: {
  text: string;
  Icon: React.ElementType;
  color: string;
  onPress: () => void;
}) {
  const dark = useGetMode();
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";
  const textColor = !dark ? "black" : "white";
  const rColor = !dark ? "#00000014" : "#BBBBBB";
  return (
    <View style={{ borderRadius: 20, overflow: "hidden" }}>
      <Pressable onPress={onPress} android_ripple={{ color: rColor }}>
        <View
          style={{
            padding: 20,
            borderRadius: 20,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor,
          }}
        >
          <Icon size={20} color={color} />
          <Text
            style={{
              color: textColor,
              fontSize: 16,
              fontFamily: "jakara",
              includeFontPadding: false,
            }}
          >
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
