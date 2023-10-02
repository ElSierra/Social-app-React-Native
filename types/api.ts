export interface IUSerData {
  name: string;
  userName: string;
  email: string;
  followersCount: string;
  followingCount: string;
  imageUri: string;
  id: string;
  verified: boolean;
  emailIsVerified: boolean;
}

export interface IGuestData extends IUSerData {
  isFollowed: boolean;
}

export interface IPostContent {
  photoUri?: string[];
  audioTitle?: string;
  audioUri?: string;
  photo?: {
    uri: string;
    height: number;
    width: number;
  };
  videoUri?: string;
  videoTitle?: string;
  postText?: string;
  videoThumbnail?: string;
}

export interface IPerson {
  name: string;
  userName: string;
  id: string;
  isFollowed: boolean;
  imageUri: string;
}

export interface User {
  imageUri: string;
  id: string;
  name: string;
  userName: string;
  verified: boolean;
}

export interface IPost {
  id: string;
  _count: { like: number; comments: number; repostUser: number };
  userId: string;
  like: Array<{ userId: string }>;
  repostUser: Array<{ id: string }>;
  link: {
    id: string;
    imageHeight?: number;
    imageUri?: string;
    imageWidth?: number;
    title: string;
  } | null;

  audioUri: string | null;
  audioTitle: string | null;
  videoUri: string | null;
  videoTitle: string | null;
  photoUri: string[];
  photo: {
    id: string;
    imageUri: string;
    imageHeight: number;
    imageWidth: number;
  } | null;
  postText: string;
  videoThumbnail: string | null;
  videoViews: number | null;
  user: User;
  createdAt: Date;
}

export interface IComment {
  id: string;
  comment: string;
  User: User;
  createdAt: string;
}
export interface IChatUser {
  userName: string;
  name: string;
  imageUri: string;
  id: string;
}
export interface IChatMessage {
  text: string;
  photoUri?: string;
  id: string;
  photo?: {
    id: string;
    imageUri: string;
    imageHeight: number;
    imageWidth: number;
  };
  sender: {
    userName: string;
    id: string;
  };
  createdAt: string;
}
export interface IChatList {
  id: string;
  users: IChatUser[];
  messages: IChatMessage[];
}

export interface Notifications {
  text: string;
  to?: string;
  type: "Follow" | "Posts" | "Suggestions" | "Reminder";
  id: string;
  createdAt: string;
  notifUser?: User;
}

export type FollowData = {
  id: string;
  userName: string;
  name: string;
  imageUri: string;
  verified: boolean;
  isFollowed: boolean;
};

export type FollowingData = Omit<FollowData, "isFollowed">;
