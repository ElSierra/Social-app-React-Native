import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import PeopleContainer from "../PeopleContainer";
import { personState } from "../../../redux/slice/people/search";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutRight,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SearchSkeleton } from "../Skeleton/SearchSkeleton";

import FastImage from "react-native-fast-image";

export default function People({ people }: { people: personState }) {
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

  return (
    <Animated.View
      entering={FadeInRight.springify()}
      exiting={FadeOutRight.springify()}
      style={{ gap: 5, marginVertical: 20, height: "100%" }}
    >
      {people.loading && (
        <Animated.View
          style={[
            { gap: 5, marginTop: 150, paddingHorizontal: 10 },
            animatedStyle,
          ]}
        >
          {[0, 1, 2].map((idx) => (
            <SearchSkeleton key={idx} />
          ))}
        </Animated.View>
      )}
      {people.data.length === 0 && !people.loading && (
        <Animated.View
          entering={FadeInUp.springify()}
          exiting={FadeOutDown.springify()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <FastImage
            style={{ height: 300, width: 300 }}
            source={require("../../../assets/images/emptySearch.png")}
          />
        </Animated.View>
      )}
      <FlatList
        data={people.data}
        contentContainerStyle={{
          paddingTop: 140,
          paddingBottom: 100,
          gap: 5,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <PeopleContainer {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animated.View>
  );
}
