import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';

// Define types for your contact data
interface Contact {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}

const ContactList = () => {
  const [data, setData] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://demo-app-backend-lac.vercel.app/api/contacts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactPress = (contactId: string) => {
    router.push(`/Contact/${contactId}`);
    console.log('Contact pressed:', contactId);
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity 
      style={styles.contactCard} 
      onPress={() => handleContactPress(item.Id)}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>
            {item.FirstName ? item.FirstName[0] : '?'}
          </Text>
        </View>
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {item.FirstName} {item.LastName}
        </Text>
        <Text style={styles.contactEmail}>{item.Email}</Text>
        <Text style={styles.contactPhone}>{item.Phone}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
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
        <Text style={styles.headerTitle}>Contact List</Text>
      </View>

      {/* Contact List */}
      <FlatList
        data={data}
        renderItem={renderContact}
        keyExtractor={(item) => item.Id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    padding: 15,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
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

export default ContactList; 