import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import AccountSearch from './AccountSearch';

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

const AccountList = () => {
  const [data, setData] = useState<Account[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://demo-app-backend-lac.vercel.app/api/accounts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json: Account[] = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccountPress = (accountId: string) => {
    router.push(`/Account/${accountId}`);
  };

  const formatRevenue = (revenue?: number) => {
    if (!revenue) return 'Not available';
    
    if (revenue >= 1000000000) {
      return `$${(revenue / 1000000000).toFixed(1)}B`;
    } else if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(0)}M`;
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

  const renderAccount = ({ item }: { item: Account }) => (
    <TouchableOpacity 
      style={styles.accountCard} 
      onPress={() => handleAccountPress(item.Id)}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileIcon}>
            {getIndustryIcon(item.Industry)}
          </Text>
        </View>
      </View>
      
      <View style={styles.accountInfo}>
        <Text style={styles.accountName} numberOfLines={2}>
          {item.Name}
        </Text>
        <Text style={styles.accountIndustry}>{item.Industry}</Text>
        <Text style={styles.accountRevenue}>
          Revenue: {formatRevenue(item.AnnualRevenue)}
        </Text>
        <Text style={styles.accountPhone}>{item.Phone || 'No phone'}</Text>
      </View>

      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading accounts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Company Accounts</Text>
        
      </View>
      <AccountSearch onAccountSelect={handleAccountPress} />

      {/* Account List */}
      <FlatList
        data={data}
        renderItem={renderAccount}
        keyExtractor={(item) => item.Id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
    paddingBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  accountCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  profileIcon: {
    fontSize: 24,
  },
  accountInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 20,
  },
  accountIndustry: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 3,
    fontWeight: '500',
  },
  accountRevenue: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  accountPhone: {
    fontSize: 12,
    color: '#999',
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
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
});

export default AccountList;