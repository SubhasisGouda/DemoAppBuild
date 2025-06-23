
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

interface Contact {
  Id: string;
  FirstName: string;
  LastName: string;
  Email?: string;
  Phone?: string;
  attributes?: {
    type?: string;
    url?: string;
  };
}

const ContactDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://demo-app-backend-lac.vercel.app/api/contacts/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json: Contact = await response.json();
        setContact(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleCall = () => {
    if (contact?.Phone) {
      Linking.openURL(`tel:${contact.Phone}`);
    } else {
      Alert.alert('No Phone', 'Phone number not available');
    }
  };

  const handleEmail = () => {
    if (contact?.Email) {
      Linking.openURL(`mailto:${contact.Email}`);
    } else {
      Alert.alert('No Email', 'Email address not available');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading contact...</Text>
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
        <Text style={styles.headerTitle}>Contact Details</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>
            {contact?.FirstName ? contact.FirstName[0] : '?'}
          </Text>
        </View>
        <Text style={styles.fullName}>
          {contact?.FirstName} {contact?.LastName}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <Text style={styles.infoValue}>
            {contact?.FirstName} {contact?.LastName}
          </Text>
        </View>

        <TouchableOpacity style={styles.infoCard} onPress={handleEmail}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={[styles.infoValue, styles.linkText]}>
            {contact?.Email || 'Not available'}
          </Text>
          {contact?.Email && <Text style={styles.tapHint}>Tap to send email</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={handleCall}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={[styles.infoValue, styles.linkText]}>
            {contact?.Phone || 'Not available'}
          </Text>
          {contact?.Phone && <Text style={styles.tapHint}>Tap to call</Text>}
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Contact ID</Text>
          <Text style={styles.infoValue}>{contact?.Id}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Contact Type</Text>
          <Text style={styles.infoValue}>
            {contact?.attributes?.type || 'Not available'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>First Name</Text>
          <Text style={styles.infoValue}>
            {contact?.FirstName || 'Not available'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Last Name</Text>
          <Text style={styles.infoValue}>
            {contact?.LastName || 'Not available'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Salesforce URL</Text>
          <Text style={styles.infoValueSmall}>
            {contact?.attributes?.url || 'Not available'}
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
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitial: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    padding: 15,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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

export default ContactDetails;