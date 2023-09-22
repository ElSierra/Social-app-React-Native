import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  useLazyGetFollowersListQuery,
  useLazyGetFollowingListQuery,
} from "../../../redux/api/user";
import { FollowData, FollowingData } from "../../../types/api";
import FFContainer from "../../../components/followingFollowers/FollowingFollowerContainer";
import useGetMode from "../../../hooks/GetMode";

export default function Followers() {
  const dark = useGetMode();
  const [getLazyFollowers, followersResponse] = useLazyGetFollowingListQuery();
  const [data, setData] = useState<FollowingData[]>([]);
  const color = dark ? "white" : "black";
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

  const renderItem = ({ item }: { item: FollowingData }) => {
    return (
      <FFContainer
        id={item.id}
        name={item.name}
        userName={item.userName}
        imageUri={item.imageUri}
        isFollowed={true}
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
        data={data}
        ListEmptyComponent={
          followersResponse.isLoading ? (
            <View>
              <ActivityIndicator color={color} />
            </View>
          ) : (
            <Text style={{ color }}>Such Empty</Text>
          )
        }
        onEndReachedThreshold={0.3}
        onEndReached={fetchMoreData}
        renderItem={renderItem}
      />
    </View>
  );
}
