import { View, Text } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import PeopleContainer from "../../components/discover/PeopleContainer";
import HeaderTag from "../../components/discover/HeaderTag";
import PostsContainer from "../../components/discover/PostsContainer";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useGetRandomPostsQuery } from "../../redux/api/services";
import { useAppSelector } from "../../redux/hooks/hooks";

export default function Discover() {
  const posts = useAppSelector((state) => state.searchPost.data);

  return (
    <AnimatedScreen>
      <View style={{ flex: 1, paddingTop: 100, padding: 10 }}>
        <HeaderTag text="People" />
        <View style={{ gap: 5, marginVertical: 20 }}>
          <PeopleContainer />
          <PeopleContainer />
          <PeopleContainer />
        </View>

        <HeaderTag text="Posts" />
        <View style={{ gap: 5, marginVertical: 20, height: 200 }}>
          <FlatList
            data={posts}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item }) => (
              <PostsContainer
                id={item.id}
                imageUri={item.user?.imageUri}
                name={item.user?.name}
                userTag={item.user?.userName}
                verified={item.user?.verified}
                audioUri={item.audioUri || undefined}
                photoUri={item.photoUri}
                videoTitle={item.videoTitle || undefined}
                videoUri={item.videoUri || undefined}
                postText={item.postText}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </AnimatedScreen>
  );
}
