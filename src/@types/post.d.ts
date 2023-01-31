interface Post {
  _id: string;
  title: string;
  imgCover?: string;
  content: string;
  tags: [];
  author: string;
  createdAt: string;
  active: boolean;
}
