import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Search, Plus, MessageSquare } from 'lucide-react-native';

type ChatItem = {
  id: string;
  name: string | null;
  is_group: boolean;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  other_user_name?: string;
};

export default function ChatsScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  async function loadChats() {
    if (!user) return;

    try {
      const { data: participations, error: partError } = await supabase
        .from('chat_participants')
        .select(`
          chat_id,
          chats(*)
        `)
        .eq('user_id', user.id);

      if (partError) throw partError;

      const chatIds = participations?.map((p: any) => p.chat_id) || [];

      if (chatIds.length === 0) {
        setChats([]);
        return;
      }

      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .in('chat_id', chatIds)
        .order('created_at', { ascending: false });

      if (msgError) throw msgError;

      const chatItems: ChatItem[] = [];

      for (const participation of participations || []) {
        const chat = (participation as any).chats;
        if (!chat || Array.isArray(chat)) continue;

        const lastMsg = messages?.find(m => m.chat_id === chat.id);

        chatItems.push({
          id: chat.id,
          name: chat.name,
          is_group: chat.is_group,
          last_message: lastMsg?.content || 'No messages yet',
          last_message_time: lastMsg?.created_at || chat.created_at,
          unread_count: 0,
        });
      }

      setChats(chatItems);
    } catch (error: any) {
      console.error('Error loading chats:', error);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadChats();
    setRefreshing(false);
  }

  async function handleNewChat() {
    Alert.alert(
      'New Chat',
      'Chat creation feature coming soon!',
      [{ text: 'OK' }]
    );
  }

  function renderChatItem({ item }: { item: ChatItem }) {
    return (
      <TouchableOpacity
        style={[styles.chatItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
        onPress={() => router.push(`/chat/${item.id}`)}
      >
        <View style={styles.avatar}>
          <MessageSquare color={colors.primary} size={24} />
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatName, { color: colors.text }]} numberOfLines={1}>
              {item.name || 'Chat'}
            </Text>
            <Text style={[styles.chatTime, { color: colors.textSecondary }]}>
              {new Date(item.last_message_time).toLocaleDateString()}
            </Text>
          </View>

          <Text style={[styles.lastMessage, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.last_message}
          </Text>
        </View>

        {item.unread_count > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread_count}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  const filteredChats = chats.filter(chat =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Chats</Text>
        <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
          <Plus color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search color={colors.textSecondary} size={20} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search chats..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MessageSquare color={colors.textSecondary} size={48} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No chats yet
            </Text>
            <TouchableOpacity
              style={[styles.startChatButton, { backgroundColor: colors.primary }]}
              onPress={handleNewChat}
            >
              <Text style={styles.startChatText}>Start a Chat</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  newChatButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  startChatButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  startChatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
