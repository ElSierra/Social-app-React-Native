import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useLazyGetFollowersListQuery } from "../../../redux/api/user";
import { FollowData } from "../../../types/api";
import FFContainer from "../../../components/followingFollowers/FollowingFollowerContainer";
import { ActivityIndicator } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";

export default function Followers() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const [getLazyFollowers, followersResponse] = useLazyGetFollowersListQuery();
  const [data, setData] = useState<FollowData[]>([]);

  const [skip, setSkip] = useState(0);
  const [noMore, setNoMore] = useState(false);
  useEffect(() => {
    getLazyFollowers({ take: 20, skip })
      .unwrap()
      .then((e) => {
        setData(e);
        setSkip(e.length);
      })
      .catch((e) => {});
  }, []);

  const renderItem = ({ item }: { item: FollowData }) => {
    return (
      <FFContainer
        id={item.id}
        name={item.name}
        userName={item.userName}
        imageUri={item.imageUri}
        isFollowed={item.isFollowed}
      />
    );
  };

  const fetchMoreData = () => {
    if (!noMore && !followersResponse.isError && skip > 0)
      getLazyFollowers({ take: 10, skip })
        .unwrap()
        .then((r) => {
          setSkip(skip + r.length);
          setData((prev) => [...prev, ...r]);

          if (r.length < 10) {
            setNoMore(true);
          }
        });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingTop: 20, gap: 5 }}
        style={{ paddingHorizontal: 10 }}
        ListEmptyComponent={
          followersResponse.isLoading ? (
            <View>
              <ActivityIndicator color={color} />
            </View>
          ) : (
            <Text style={{ color }}>Such Empty</Text>
          )
        }
        data={data}
        onEndReachedThreshold={0.3}
        onEndReached={fetchMoreData}
        renderItem={renderItem}
      />
    </View>
  );
}
