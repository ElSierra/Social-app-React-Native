import { View, Text, ScrollView } from "react-native";
import React from "react";
import PostText from "../components/home/post/PostText";
import PostImage from "../components/home/post/PostImage";
import PostVideo from "../components/home/post/PostVideo";

export default function Home() {
  return (
    <ScrollView
    contentContainerStyle={{paddingTop:100,paddingBottom:100}}
      style={{
        flex: 1,
      backgroundColor:'white',
        paddingBottom: 0,
  
      }}
    >
      <PostText />
      <PostImage />
      <PostVideo />
      <PostText />
      <PostImage />
      <PostVideo />
      <PostText />
      <PostImage />
      <PostVideo />
      <PostText />
      <PostImage />
      <PostVideo />

    </ScrollView>
  );
}
