import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      if (token && name) {
        setUserName(name);
        setUserEmail(email || 'user@example.com');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUserName(null);
    setUserEmail(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Ionicons name="settings-outline" size={24} color="white" />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {userName ? (
          <View style={styles.profileContent}>
            {/* Profile Picture Section */}
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureWrapper}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                  }}
                  style={styles.profilePicture}
                />
                <TouchableOpacity style={styles.editPictureButton}>
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Ionicons name="calendar-outline" size={24} color="#6366f1" />
                <Text style={styles.statNumber}>45</Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="trophy-outline" size={24} color="#f59e0b" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="heart-outline" size={24} color="#ef4444" />
                <Text style={styles.statNumber}>89</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#ddd6fe' }]}>
                    <Ionicons name="person-outline" size={20} color="#6366f1" />
                  </View>
                  <Text style={styles.menuText}>Edit Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#fed7d7' }]}>
                    <Ionicons name="notifications-outline" size={20} color="#ef4444" />
                  </View>
                  <Text style={styles.menuText}>Notifications</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#d1fae5' }]}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#10b981" />
                  </View>
                  <Text style={styles.menuText}>Privacy & Security</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#fef3c7' }]}>
                    <Ionicons name="help-circle-outline" size={20} color="#f59e0b" />
                  </View>
                  <Text style={styles.menuText}>Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authContainer}>
            <View style={styles.authContent}>
              <Ionicons name="person-circle-outline" size={120} color="#e5e7eb" />
              <Text style={styles.authTitle}>Welcome to Your Profile</Text>
              <Text style={styles.authSubtitle}>
                Sign in to access your personalized experience
              </Text>

              <View style={styles.authButtonContainer}>
                <Link href="/(app)/(auth)/Login" asChild>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Ionicons name="log-in-outline" size={20} color="white" />
                    <Text style={styles.primaryButtonText}>Sign In</Text>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => router.push('/(app)/(auth)/SignUp')}
                >
                  <Ionicons name="person-add-outline" size={20} color="#6366f1" />
                  <Text style={styles.secondaryButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 80, // Add padding to account for the tab bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop:50
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  profilePictureWrapper: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366f1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  authContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  authButtonContainer: {
    width: '100%',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});