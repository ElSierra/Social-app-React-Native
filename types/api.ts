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
  _count: { like: number; comments: number };
  userId: string;
  isLiked: boolean;
  audioUri: string | null;
  audioTitle: string | null;
  videoUri: string | null;
  videoTitle: string | null;
  photoUri: string[];
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
