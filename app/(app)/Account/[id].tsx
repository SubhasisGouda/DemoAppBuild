import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Account {
  Id: string;
  Name: string;
  Industry: string;
  Phone?: string;
  Website?: string;
  AnnualRevenue?: number;
  attributes?: {
    type?: string;
    url?: string;
  };
}

const AccountDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(`https://demo-app-backend-lac.vercel.app/api/accounts/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json: Account = await response.json();
        setAccount(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  const handleCall = () => {
    if (account?.Phone) {
      Linking.openURL(`tel:${account.Phone}`);
    } else {
      Alert.alert('No Phone', 'Phone number not available');
    }
  };

  const handleWebsite = () => {
    if (account?.Website) {
      let url = account.Website;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      Linking.openURL(url);
    } else {
      Alert.alert('No Website', 'Website not available');
    }
  };

  const formatRevenue = (revenue?: number) => {
    if (!revenue) return 'Not available';
    
    if (revenue >= 1000000000) {
      return `$${(revenue / 1000000000).toFixed(1)} Billion`;
    } else if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(0)} Million`;
    } else {
      return `$${revenue.toLocaleString()}`;
    }
  };

  const getIndustryIcon = (industry?: string) => {
    switch (industry?.toLowerCase()) {
      case 'construction': return '🏗️';
      case 'apparel': return '👕';
      case 'consulting': return '💼';
      case 'hospitality': return '🏨';
      case 'electronics': return '📱';
      default: return '🏢';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading account...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backIcon} 
          onPress={() => router.back()}
        >
          <Text style={styles.backIconText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.profileIcon}>
            {getIndustryIcon(account?.Industry)}
          </Text>
        </View>
        <Text style={styles.companyName} numberOfLines={3}>
          {account?.Name}
        </Text>
        <Text style={styles.industryTag}>
          {account?.Industry} Industry
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <Text style={styles.actionIcon}>📞</Text>
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
          <Text style={styles.actionIcon}>🌐</Text>
          <Text style={styles.actionText}>Website</Text>
        </TouchableOpacity>
      </View>

      {/* Account Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Company Name</Text>
          <Text style={styles.infoValue}>
            {account?.Name || 'Not available'}
          </Text>
        </View>

        <TouchableOpacity style={styles.infoCard} onPress={handleCall}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={[styles.infoValue, styles.linkText]}>
            {account?.Phone || 'Not available'}
          </Text>
          {account?.Phone && <Text style={styles.tapHint}>Tap to call</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={handleWebsite}>
          <Text style={styles.infoLabel}>Website</Text>
          <Text style={[styles.infoValue, styles.linkText]}>
            {account?.Website || 'Not available'}
          </Text>
          {account?.Website && <Text style={styles.tapHint}>Tap to visit</Text>}
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Industry</Text>
          <Text style={styles.infoValue}>
            {account?.Industry || 'Not available'}
          </Text>
        </View>

        <View style={styles.revenueCard}>
          <Text style={styles.infoLabel}>Annual Revenue</Text>
          <Text style={styles.revenueValue}>
            {formatRevenue(account?.AnnualRevenue)}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Account ID</Text>
          <Text style={styles.infoValue}>{account?.Id}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Account Type</Text>
          <Text style={styles.infoValue}>
            {account?.attributes?.type || 'Not available'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Salesforce URL</Text>
          <Text style={styles.infoValueSmall}>
            {account?.attributes?.url || 'Not available'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 15,
  },
  backIconText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    marginBottom: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  profileIcon: {
    fontSize: 40,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  industryTag: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontWeight: '500',
  },
  actionSection: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoSection: {
    padding: 15,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  revenueValue: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  infoValueSmall: {
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
    lineHeight: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  tapHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    margin: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AccountDetails;