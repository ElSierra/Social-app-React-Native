import { View, Text } from "react-native";
import { Image } from "expo-image";

export default function HeaderDrawer() {
  return (
    <View style={{ paddingLeft: 14, flex: 1, }}>
      <Image
        style={{ height: 50, width: 50, borderRadius: 9999 }}
        source={require("../../../assets/avatar/placeholder.png")}
      />
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: "jakaraBold",
            includeFontPadding: false,
            fontSize: 22,
          }}
        >
          Ojo Isaac
        </Text>
        <Text style={{ fontFamily: "jakara", includeFontPadding: false }}>
          @Hojoisaac
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
          <Text style={{ fontFamily: "jakaraBold", includeFontPadding: false }}>
            10K
          </Text>
          <Text style={{ fontFamily: "jakara", includeFontPadding: false }}>
            Following
          </Text>
        </View>
        <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
          <Text style={{ fontFamily: "jakaraBold", includeFontPadding: false }}>
            8K
          </Text>
          <Text style={{ fontFamily: "jakara", includeFontPadding: false }}>
            Followers
          </Text>
        </View>
      </View>
    </View>
  );
}
