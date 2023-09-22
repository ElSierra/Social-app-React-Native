import { View, Text, Pressable } from "react-native";
import React from "react";
import ButtonOutlined from "./EditProfile";
import { useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../types/navigation";

export default function Bio() {
  const follow = useAppSelector((state) => state.followers);
  const user = useAppSelector((state) => state.user);
  const dark = useGetMode();
  const navigation = useNavigation<HomeNavigationProp>();
  const color = dark ? "white" : "black";
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: "#B4B4B4D1",
        marginTop: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              fontSize: 22,
              color,
              includeFontPadding: false,
              height: 24,
            }}
          >
            {user.data?.name}
          </Text>
          <Text
            style={{
              fontFamily: "jakara",
              fontSize: 16,
              color: "grey",
              includeFontPadding: false,
              height: 22,
            }}
          >
            @{user.data?.userName}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("FollowingFollowers", {
                initial: "Following",
              });
            }}
          >
            <View style={{ width: "100%", flexDirection: "row", gap: 20 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={{ color, fontFamily: "jakaraBold", fontSize: 16 }}>
                  {follow.following}
                </Text>
                <Text
                  style={{ fontFamily: "jakara", fontSize: 16, color: "grey" }}
                >
                  Following
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={{ color, fontFamily: "jakaraBold", fontSize: 16 }}>
                  {follow.followers}
                </Text>
                <Text
                  style={{ fontFamily: "jakara", fontSize: 16, color: "grey" }}
                >
                  Followers
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={{}}>
          <ButtonOutlined />
        </View>
      </View>
    </View>
  );
}
