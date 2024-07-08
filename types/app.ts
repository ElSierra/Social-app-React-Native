import { Audio } from "expo-av";

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type IPostBuilder = {
  imageUri: string;
  deletePost?: (id: string) => void;
  photo?: { uri: string; height: number; width: number };
  name: string;
  userId?: string;
  date: Date;
  myPost?: boolean;
  userTag: string;
  comments?: number;
  isLiked: boolean;
  isReposted: boolean;
  verified: boolean;
  photoUri: string[];
  videoUri?: string;
  videoTitle?: string;
  postText: string;
  videoViews?: string;
  repost?: string;
  title?: string;
  link: {
    id: string;
    imageHeight?: number;
    imageUri?: string;
    imageWidth?: number;
    title: string;
  } | null;
  thumbNail: string | null;
  like: number;
  id: string;
  audioUri?: string;
  postId?: string;
  inView?: boolean;
  idx:number;

};

export type SearchPostBuilder = {
  imageUri: string;
  userTag: string;
  verified: boolean;
  photoUri: string[];
  videoUri?: string;
  postText: string;
  title?: string;
  id: string;
  audioUri?: string;
};

export type ICommentBuilder = {
  imageUri: string;
  name: string;
  comment: string;
  date: string;
  userTag: string;
  verified: boolean;
  photoUri: string[];
  id: string;
};

export type ICommentContent = {
  name: string;
  id: string;
  comment: string;
};

export type ChatType = {
  id: string | number;
  user: {
    id: string | number;
    imageUri: string;
    name: string;
    userName: string;
  };
  messages: {
    id: string | number;
    text: string;
    createdAt: string;
    sender: {
      id: string;
      userName: string;
    };
  }[];
};
