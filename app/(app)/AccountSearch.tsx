import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Account {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
}

interface AccountSearchProps {
  onAccountSelect: (accountId: string) => void;
}

const AccountSearch: React.FC<AccountSearchProps> = ({ onAccountSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAccounts = async (query: string) => {
    if (!query.trim()) {
      setAccounts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://demo-app-backend-lac.vercel.app/api/accounts/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      setError('Failed to search accounts');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAccounts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleAccountPress = (account: Account) => {
    onAccountSelect(account.Id);
  };

  const renderAccountItem = ({ item }: { item: Account }) => (
    <TouchableOpacity
      style={styles.accountItem}
      onPress={() => handleAccountPress(item)}
    >
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.Name}</Text>
        <Text style={styles.accountId}>ID: {item.Id}</Text>
      </View>
      <AntDesign name="right" size={24} color="#666" />
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) {
      return null;
    }

    return (
      <View style={styles.emptyState}>
   
        <Text style={styles.emptyText}>No accounts found for "{searchQuery}"</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search accounts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <AntDesign name="delete" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Only show results area when there's a search query */}
      {searchQuery.trim() && (
        <View style={styles.resultsContainer}>
          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}

          {/* Results List */}
          {!loading && (
            <FlatList
              data={accounts}
              renderItem={renderAccountItem}
              keyExtractor={(item) => item.Id}
              ListEmptyComponent={renderEmptyState}
              style={styles.resultsList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    
    flexGrow: 1, // change this
    minHeight: 100,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    marginHorizontal: 16,
   
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    minHeight: 100,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  resultsList: {
    flex: 1,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  accountId: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AccountSearch;