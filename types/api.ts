export interface IUSerData {
  name: string;
  userName: string;
  email: string;
  followers: any[];
  following: any[];
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

export interface User {
  imageUri: string;
  name: string;
  userName: string;
  verified: boolean;
}

export interface IPost {
  id: string;

  userId: string;
  audioUri: string | null;
  audioTitle: string | null;
  videoUri: string | null;
  videoTitle: string | null;
  photoUri: string[];
  postText: string;
  videoViews: number | null;
  user: User;
}