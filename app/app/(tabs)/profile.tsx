import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { User, Mail, CreditCard as Edit2, Check, X } from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  async function handleSave() {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username,
          bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
      setBio(profile.bio || '');
    }
    setIsEditing(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Edit2 color={colors.primary} size={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
              <X color={colors.error} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.iconButton, loading && styles.iconButtonDisabled]}
              disabled={loading}
            >
              <Check color={colors.success} size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User color={colors.primary} size={60} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account Information
          </Text>

          <View style={styles.infoCard}>
            <View style={[styles.infoItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Full Name
              </Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textSecondary}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {profile?.full_name || 'Not set'}
                </Text>
              )}
            </View>

            <View style={[styles.infoItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Username
              </Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  @{profile?.username || 'Not set'}
                </Text>
              )}
            </View>

            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
              <View style={styles.emailRow}>
                <Mail color={colors.textSecondary} size={16} />
                <Text style={[styles.email, { color: colors.text }]}>
                  {user?.email || 'No email'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Bio</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.bioInput,
                { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
              ]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          ) : (
            <View style={[styles.bioCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.bioText, { color: colors.text }]}>
                {profile?.bio || 'No bio yet'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Statistics</Text>
          <View style={styles.statsContainer}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Posts
              </Text>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Followers
              </Text>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Following
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  editButton: {
    padding: 8,
  },
  editActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  iconButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'transparent',
  },
  infoItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    marginLeft: 8,
  },
  bioInput: {
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bioCard: {
    padding: 16,
    borderRadius: 12,
    minHeight: 80,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
});
