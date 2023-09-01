import { View, Text } from "react-native";
import React, { useEffect } from "react";
import FollowerUser from "./FollowerUser";
import { useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";
import { useGetGuestQuery, useLazyGetGuestQuery } from "../../redux/api/user";

export default function Bio({
  name,
  userTag,
  id,
}: {
  name: string;
  userTag: string;
  id: string;
}) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const user = useAppSelector((state)=>state.user.data)
  const [getGuestData, guestData] = useLazyGetGuestQuery();

  useEffect(() => {
    getGuestData({ id })
      .unwrap()
      .then((r) => {
      })
      .catch((e) => {});
  }, []);
  
  return (
    <View style={{ borderBottomWidth: 1, borderColor: "#B4B4B4D1" }}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        <View style={{ alignItems: "flex-end", width: "100%" ,height:60}}>
          {guestData.data?.data.isFollowed !== undefined && user?.id !== id && (
            <FollowerUser
              id={id}
              isFollowed={guestData.data?.data.isFollowed}
            />
          )}
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
            {name}
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
            @{userTag}
          </Text>
          <View style={{ width: "100%", flexDirection: "row", gap: 20 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color, fontFamily: "jakaraBold", fontSize: 16 }}>
                {guestData.data?.data.followingCount}
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
                {guestData.data?.data.followersCount}
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
