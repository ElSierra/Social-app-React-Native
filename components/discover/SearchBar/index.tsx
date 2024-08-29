import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import useGetMode from "../../../hooks/GetMode";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/Debounce";
import {
  useLazySearchPeopleQuery,
  useLazySearchPostsQuery,
} from "../../../redux/api/services";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
export default function SearchBar() {
  const dark = useGetMode();
  const [searchParam, setSearchParam] = useState("");
  const color = dark ? "white" : "black";
  const placeholderColor = !dark ? "grey" : "grey";
  const borderColor = dark ? "#FFFFFF" : "#DAD9D9";
  const backgroundColor = dark ? "#383838" : "#EAEBEB";
  const query = useDebounce(searchParam, 1000);
  const insets = useSafeAreaInsets();
  const [getSearchPosts, res] = useLazySearchPostsQuery();
  const [getSearchPeople] = useLazySearchPeopleQuery();

  useEffect(() => {
    if (query) {
      getSearchPosts({ q: query });
      getSearchPeople({ q: query });
    }
  }, [query]);

  return (
    <Animated.View
      entering={FadeInRight.springify()}
      style={[
        {
          width: width * 0.7,
          height: 40,
          marginLeft: 20,
          borderColor: borderColor,

          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor,
        },
      ]}
    >
      <TextInput
        cursorColor={color}
        placeholder="Search Qui"
        onChangeText={(text) => setSearchParam(text)}
        placeholderTextColor={placeholderColor}
        style={{
          width: "100%",
          fontSize: 16,
          color,
          fontFamily: "jakara",
          includeFontPadding: false,
        }}
      />
    </Animated.View>
  );
}
