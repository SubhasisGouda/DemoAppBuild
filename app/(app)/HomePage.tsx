import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 // You can use any icon library
// Import your list components
import AccountList from './AccountList';
import ContactList from './ContactList';
import Profile from './Profile';

// Placeholder components - replace with your actual components


type TabType = 'accounts' | 'contacts'| 'profile';

const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('accounts');

  const renderContent = () => {
    return activeTab === 'accounts' ? <AccountList /> : (activeTab=='contacts')? <ContactList />: 
    <Profile />
  ;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Navigation */}
      

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'accounts' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('accounts')}
        >
            <MaterialIcons name="account-box" size={24} color={activeTab === 'accounts' ? '#007AFF' : '#666'} />
        
          <Text
            style={[
              styles.tabText,
              activeTab === 'accounts' && styles.activeTabText,
            ]}
          >
            Accounts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'contacts' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('contacts')}
        >
          <AntDesign
            name="contacts"
            size={20}
            color={activeTab === 'contacts' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'contacts' && styles.activeTabText,
            ]}
          >
            Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'profile' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('profile')}
        >
        <MaterialCommunityIcons name="face-man" size={24}  color={activeTab === 'profile' ? '#007AFF' : '#666'} />
          <Text
            style={[
              styles.tabText,
              activeTab === 'profile' && styles.activeTabText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Homepage;