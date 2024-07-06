import { View, Text, useColorScheme, Pressable } from "react-native";

import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { ProfileIcon, VerifiedIcon } from "../../icons";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import { useGetFollowDetailsQuery } from "../../../redux/api/user";

export default function HeaderDrawer() {
  const dark = useGetMode();
  const isDark = dark;
  const navigation = useNavigation<HomeNavigationProp>();
  const color = isDark ? "white" : "black";
  const user = useAppSelector((state) => state.user.data);
  const follows = useAppSelector((state) => state.followers);

  const getFollowData = useGetFollowDetailsQuery(null);

  useEffect(() => {
    console.log(getFollowData.data);
    getFollowData.refetch();
  }, []);
  return (
    <View style={{  flex: 1 }}>
      {user?.imageUri ? (
        <Image
          priority={"high"}
          style={{ height: 50, width: 50, borderRadius: 9999 }}
          source={{ uri: user?.imageUri }}
        />
      ) : (
        <ProfileIcon color={color} size={50} />
      )}
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontFamily: "jakara", color, includeFontPadding: false }}
          >
            @{user?.userName}
          </Text>
          {user?.verified && (
            <View>
              <VerifiedIcon size={20} color="green" />
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("FollowingFollowers", { initial: "Following" });
          }}
        >
          <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
            <Text
              style={{
                fontFamily: "jakaraBold",
                color,
                includeFontPadding: false,
              }}
            >
              {follows.following || 0}
            </Text>
            <Text
              style={{ fontFamily: "jakara", color, includeFontPadding: false }}
            >
              Following
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("FollowingFollowers", { initial: "Followers" });
          }}
        >
          <View style={{ marginTop: 16, flexDirection: "row", gap: 4 }}>
            <Text
              style={{
                fontFamily: "jakaraBold",
                color,
                includeFontPadding: false,
              }}
            >
              {follows.followers || 0}
            </Text>
            <Text
              style={{ fontFamily: "jakara", color, includeFontPadding: false }}
            >
              Followers
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
