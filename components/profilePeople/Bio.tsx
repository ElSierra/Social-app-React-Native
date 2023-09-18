import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import FollowerUser from "./FollowerUser";
import { useAppSelector } from "../../redux/hooks/hooks";
import useGetMode from "../../hooks/GetMode";
import { useGetGuestQuery, useLazyGetGuestQuery } from "../../redux/api/user";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
import { useLazyFollowUserQuery } from "../../redux/api/services";

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
  const user = useAppSelector((state) => state.user.data);
  const [getGuestData, guestData] = useLazyGetGuestQuery();
  const [followers, setFollowers] = useState<number | null>(null);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    getGuestData({ id })
      .unwrap()
      .then((r) => {
        setFollowed(r?.data?.isFollowed);
        setFollowers(Number(r?.data?.followersCount));
      })
      .catch((e) => {});
  }, []);

  const [followUser] = useLazyFollowUserQuery();
  const handleFollow = () => {
    setFollowed(!followed);
    followUser({ id })
      .then((e) => {})
      .catch((e) => {});
    if (followed) {
      if (followers) {
        setFollowers(followers - 1);
      }
    }
    if (!followed) {
      if (followers) {
        setFollowers(followers + 1);
      }
    }
  };

  return (
    <View style={{ borderBottomWidth: 0.5, borderColor: "#B4B4B4D1",marginTop: 20 }}>
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
              <Animated.Text
                entering={FadeInDown.springify()}
                exiting={FadeOutUp.springify()}
                key={guestData.data?.data.followingCount || "followingCount"}
                style={{ color, fontFamily: "jakaraBold", fontSize: 16 }}
              >
                {guestData.data?.data.followingCount}
              </Animated.Text>
              <Text
                style={{ fontFamily: "jakara", fontSize: 16, color: "grey" }}
              >
                Following
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Animated.Text
                entering={FadeInDown.springify()}
                exiting={FadeOutUp.springify()}
                key={followers || guestData.data?.data.followersCount}
                style={{ color, fontFamily: "jakaraBold", fontSize: 16 }}
              >
                {!followers ? guestData.data?.data.followersCount : followers}
              </Animated.Text>
              <Text
                style={{ fontFamily: "jakara", fontSize: 16, color: "grey" }}
              >
                Followers
              </Text>
            </View>
          </View>
        </View>
        <View style={{}}>
          {guestData.data?.data.isFollowed !== undefined && user?.id !== id && (
            <FollowerUser
              handleFollow={handleFollow}
              id={id}
              followed={followed}
            />
          )}
        </View>
      </View>
    </View>
  );
}
