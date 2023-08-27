import { View, Text, FlatList } from "react-native";
import React from "react";
import PeopleContainer from "../PeopleContainer";
import { personState } from "../../../redux/slice/people/search";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { SearchSkeleton } from "../Skeleton/SearchSkeleton";
import { Image } from "expo-image";

export default function People({ people }: { people: personState }) {
  return (
    <View style={{ gap: 5, marginVertical: 20, height: "100%" }}>
      {people.loading && (
        <Animated.View
          entering={FadeIn.springify()}
          style={{ gap: 5, marginTop: 150 }}
          exiting={FadeOut.springify()}
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
          <Image
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
    </View>
  );
}
