import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Image,
  Alert,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Post, Profile } from '@/types/database';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react-native';

type PostWithProfile = Post & {
  profiles: Profile;
  isLiked?: boolean;
};

export default function HomeScreen() {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && user) {
        const { data: likes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(likes?.map(l => l.post_id) || []);
        const postsWithLikes = data.map(post => ({
          ...post,
          isLiked: likedPostIds.has(post.id),
        }));

        setPosts(postsWithLikes);
      }
    } catch (error: any) {
      console.error('Error loading posts:', error);
    }
  }

  async function handleCreatePost() {
    if (!newPost.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: newPost,
        });

      if (error) throw error;

      setNewPost('');
      await loadPosts();
      Alert.alert('Success', 'Post created successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId: string, isLiked: boolean) {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        const post = posts.find(p => p.id === postId);
        if (post) {
          await supabase
            .from('posts')
            .update({ likes_count: Math.max(0, post.likes_count - 1) })
            .eq('id', postId);
        }
      } else {
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });

        const post = posts.find(p => p.id === postId);
        if (post) {
          await supabase
            .from('posts')
            .update({ likes_count: post.likes_count + 1 })
            .eq('id', postId);
        }
      }

      await loadPosts();
    } catch (error: any) {
      console.error('Error toggling like:', error);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  }

  function renderPost({ item }: { item: PostWithProfile }) {
    return (
      <View style={[styles.postCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.postHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.profiles?.full_name?.charAt(0) || 'U'}
            </Text>
          </View>
          <View style={styles.postHeaderText}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {item.profiles?.full_name || 'Unknown User'}
            </Text>
            <Text style={[styles.username, { color: colors.textSecondary }]}>
              @{item.profiles?.username || 'user'}
            </Text>
          </View>
        </View>

        <Text style={[styles.postContent, { color: colors.text }]}>
          {item.content}
        </Text>

        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id, item.isLiked || false)}
          >
            <Heart
              color={item.isLiked ? colors.error : colors.textSecondary}
              size={20}
              fill={item.isLiked ? colors.error : 'transparent'}
            />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {item.likes_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle color={colors.textSecondary} size={20} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {item.comments_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share2 color={colors.textSecondary} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Sada</Text>
      </View>

      <View style={[styles.createPost, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.textSecondary}
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity
          style={[styles.postButton, loading && styles.postButtonDisabled]}
          onPress={handleCreatePost}
          disabled={loading || !newPost.trim()}
        >
          <Send color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No posts yet. Be the first to share something!
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createPost: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  list: {
    padding: 16,
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postHeaderText: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
