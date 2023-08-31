export type IPostBuilder = {
  imageUri: string;
  name: string;
  date: Date;
  userTag: string;
  comments?: number;
  isLiked: boolean;
  verified: boolean;
  photoUri: string[];
  videoUri?: string;
  videoTitle?: string;
  postText: string;
  videoViews?: string;
  repost?: string;
  title?: string;
  thumbNail: string | null;
  like: number;
  id: string;
  audioUri?: string;
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
