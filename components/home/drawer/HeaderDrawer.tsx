import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";

export default function HeaderDrawer() {
  const dark = useGetMode();
  const isDark = dark;

  const color = isDark ? "white" : "black";
  const user = useAppSelector((state) => state.user.data);
  return (
    <View style={{ paddingLeft: 14, flex: 1 }}>
      <Image
        style={{ height: 50, width: 50, borderRadius: 9999 }}
        source={{uri: user?.imageUri}}
      />
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: "jakaraBold",
            includeFontPadding: false,
            color,
            fontSize: 22,
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{ fontFamily: "jakara", color, includeFontPadding: false }}
        >
          @{user?.userName}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              color,
              includeFontPadding: false,
            }}
          >
            {user?.following.length}
          </Text>
          <Text
            style={{ fontFamily: "jakara", color, includeFontPadding: false }}
          >
            Following
          </Text>
        </View>
        <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              color,
              includeFontPadding: false,
            }}
          >
           {user?.followers.length}
          </Text>
          <Text
            style={{ fontFamily: "jakara", color, includeFontPadding: false }}
          >
            Followers
          </Text>
        </View>
      </View>
    </View>
  );
}
