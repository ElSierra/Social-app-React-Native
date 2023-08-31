import { View, Text } from "react-native";
import React from "react";
import ButtonOutlined from "./EditProfile";
import { useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";

export default function Bio() {
  const follow = useAppSelector((state) => state.followers);
  const user = useAppSelector((state) => state.user);
  const dark = useGetMode()
  const color = dark ? "white": "black"
  return (
    <View style={{ borderBottomWidth: 1,           borderColor: "#B4B4B4D1", }}>
      <View style={{paddingHorizontal:15,paddingVertical:10}}>
        <View style={{ alignItems: "flex-end", width: "100%" }}>
          <ButtonOutlined />
        </View>
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
          <View style={{ width: "100%", flexDirection: "row", gap: 20 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color,fontFamily: "jakaraBold", fontSize: 16 }}>
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
              <Text style={{ color,fontFamily: "jakaraBold", fontSize: 16 }}>
                {follow.followers}
              </Text>
              <Text
                style={{ fontFamily: "jakara", fontSize: 16, color: "grey" }}
              >
                Followers
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
