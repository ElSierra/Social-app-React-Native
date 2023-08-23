export interface IUSerData {
  name: string;
  userName: string;
  email: string;
  followersCount: string;
  followingCount: string;
  imageUri: string;
  emailIsVerified: boolean;
}

export interface IPostContent {
  photoUri?: string[];
  audioTitle?: string;
  audioUri?: string;
  videoUri?: string;
  videoTitle?: string;
  postText?: string;
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
  name: string;
  userName: string;
  verified: boolean;
}

export interface IPost {
  id: string;
  _count: { like: number; comments: number };
  userId: string;
  isLiked: boolean;
  audioUri: string | null;
  audioTitle: string | null;
  videoUri: string | null;
  videoTitle: string | null;
  photoUri: string[];
  postText: string;
  videoViews: number | null;
  user: User;
}
