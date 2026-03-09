export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string;
  avatar_url: string | null;
  cover_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Chat = {
  id: string;
  name: string | null;
  is_group: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'voice' | 'video';
  media_url: string | null;
  is_read: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
};

export type PostLike = {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
};

export type PostComment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};
