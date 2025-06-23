// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useAuth } from '../AuthContext';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// const ProfileScreen: React.FC = () => {
//   const { currentUser, logout } = useAuth();

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await logout();
//             } catch (error: any) {
//               Alert.alert('Error', 'Failed to logout');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const formatDate = (date: string | null) => {
//     if (!date) return 'Not available';
//     return new Date(date).toLocaleDateString();
//   };

//   const getInitials = (name: string | null) => {
//     if (!name) return '?';
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const isGoogleUser = currentUser?.providerData.some(
//     provider => provider.providerId === 'google.com'
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.profileImageContainer}>
//           {currentUser?.photoURL ? (
//             <View style={styles.profileImage}>
//               <Text style={styles.profileImageText}>
//                 {getInitials(currentUser.displayName)}
//               </Text>
//             </View>
//           ) : (
//             <View style={styles.profileImage}>
//               <Text style={styles.profileImageText}>
               
//               </Text>
//             </View>
//           )}
//           {isGoogleUser && (
//             <View style={styles.googleBadge}>
//               <FontAwesome5 name="google" size={12} color="white" />
//             </View>
//           )}
//         </View>
        
//         <Text style={styles.userName}>
//           {currentUser?.displayName || 'User'}
//         </Text>
//         <Text style={styles.userEmail}>{currentUser?.email}</Text>
//       </View>

//       {/* Profile Information */}
//       <View style={styles.content}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Account Information</Text>
          
//           <View style={styles.infoCard}>
//             <View style={styles.infoRow}>
//               <FontAwesome5 name="user" size={20} color="#666" />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Display Name</Text>
//                 <Text style={styles.infoValue}>
//                   {currentUser?.displayName || 'Not set'}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.infoRow}>
//               <FontAwesome5 name="envelope" size={20} color="#666" />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Email</Text>
//                 <Text style={styles.infoValue}>{currentUser?.email}</Text>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.infoRow}>
//               <FontAwesome5 name="shield-alt" size={20} color="#666" />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Email Verified</Text>
//                 <Text style={[
//                   styles.infoValue,
//                   currentUser?.emailVerified ? styles.verified : styles.unverified
//                 ]}>
//                   {currentUser?.emailVerified ? 'Verified' : 'Not Verified'}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.infoRow}>
//               <FontAwesome5 name="calendar-alt" size={20} color="#666" />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Account Created</Text>
//                 <Text style={styles.infoValue}>
//                   {formatDate(currentUser?.metadata.creationTime || null)}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.infoRow}>
//               <FontAwesome5 name="clock" size={20} color="#666" />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Last Sign In</Text>
//                 <Text style={styles.infoValue}>
//                   {formatDate(currentUser?.metadata.lastSignInTime || null)}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Authentication Method</Text>
          
//           <View style={styles.infoCard}>
//             <View style={styles.infoRow}>
//               <FontAwesome5 
//                 name={isGoogleUser ? "google" : "envelope"} 
//                 size={20} 
//                 color="#666" 
//               />
//               <View style={styles.infoContent}>
//                 <Text style={styles.infoLabel}>Sign-in Method</Text>
//                 <Text style={styles.infoValue}>
//                   {isGoogleUser ? 'Google Account' : 'Email & Password'}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.section}>
//           <TouchableOpacity style={styles.actionButton}>
//             <FontAwesome5 name="edit" size={20} color="#007AFF" />
//             <Text style={styles.actionButtonText}>Edit Profile</Text>
//             <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <FontAwesome5 name="key" size={20} color="#007AFF" />
//             <Text style={styles.actionButtonText}>Change Password</Text>
//             <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <FontAwesome5 name="cog" size={20} color="#007AFF" />
//             <Text style={styles.actionButtonText}>Settings</Text>
//             <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
//           </TouchableOpacity>
//         </View>

//         {/* Logout Button */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <FontAwesome5 name="sign-out-alt" size={20} color="white" />
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };
// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: '#007AFF',
//     paddingTop: 60,
//     paddingBottom: 40,
//     alignItems: 'center',
//   },
//   profileImageContainer: {
//     position: 'relative',
//     marginBottom: 15,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: 'white',
//   },
//   profileImageText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   googleBadge: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: '#4285F4',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 15,
//   },
//   infoCard: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   infoContent: {
//     marginLeft: 15,
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   infoValue: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 5,
//   },
//   verified: {
//     color: '#4CAF50',
//   },
//   unverified: {
//     color: '#F44336',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   actionButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 15,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F44336',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   logoutButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'white',
//     marginLeft: 10,
//   },
// });

