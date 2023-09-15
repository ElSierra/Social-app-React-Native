import { View, Text, Dimensions, FlatList } from "react-native";

import { useEffect, useLayoutEffect, useState } from "react";

import useGetMode from "../../hooks/GetMode";
import { useLazySearchPeopleQuery } from "../../redux/api/services";
import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutRight,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import PeopleContainer from "../../components/discover/PeopleContainer";
import { SearchSkeleton } from "../../components/discover/Skeleton/SearchSkeleton";
import { SearchUserProp } from "../../types/navigation";
import SearchBox from "../../components/searchUser/SearchBox";
import { useDebounce } from "../../hooks/Debounce";
import UserContainer from "../../components/searchUser/UserContainer";
import { Image } from "expo-image";

export default function SearchUsers({ navigation }: SearchUserProp) {
  const dark = useGetMode();
  const tint = dark ? "dark" : "light";

  const [getPersons, persons] = useLazySearchPeopleQuery();


  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [1, 0]),
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    return () => {
      cancelAnimation(opacity);
    };
  }, []);

  const [searchParam, setSearchParam] = useState("");
  const query = useDebounce(searchParam, 1000);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchBox setSearchParam={setSearchParam} />,
    });
  }, []);

  useEffect(() => {
    if (query.length > 0) getPersons({ q: query });
  }, [query]);
  return (
    <Animated.View
      entering={FadeInRight.springify()}
      exiting={FadeOutRight.springify()}
      style={{ gap: 5, height: "100%" }}
    >
      {persons?.isLoading && (
        <Animated.View
          style={[
            { gap: 5, marginTop: 10, paddingHorizontal: 10 },
            animatedStyle,
          ]}
        >
          {[0, 1, 2].map((idx) => (
            <SearchSkeleton key={idx} />
          ))}
        </Animated.View>
      )}
      {persons?.data?.people.length === 0 && !persons?.isLoading && (
        <Animated.View
          entering={FadeInUp.springify()}
          exiting={FadeOutDown.springify()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image
            style={{ height: 300, width: 300 }}
            source={require("../../assets/images/emptySearch.png")}
          />
        </Animated.View>
      )}
      <FlatList
        keyboardShouldPersistTaps="always"
        data={persons.data?.people}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 100,
          gap: 5,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <UserContainer {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animated.View>
  );
}
