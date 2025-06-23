// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import { useAuth } from '../AuthContext';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import { Link, router } from 'expo-router';



// const SignupScreen: React.FC = ({  }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const { signup, signInWithGoogle } = useAuth();

//   const handleSignup = async () => {
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       await signup(email, password, name);
//     } catch (error: any) {
//       Alert.alert('Signup Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     try {
//       await signInWithGoogle();
//     } catch (error: any) {
//       Alert.alert('Google Sign-In Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container} 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <FontAwesome5 name="user-plus" size={64} color="white" />
//         <Text style={styles.headerTitle}>Create Account</Text>
//         <Text style={styles.headerSubtitle}>Sign up to get started</Text>
//       </View>

//       {/* Form */}
//       <View style={styles.form}>
//         <View style={styles.inputContainer}>
//           <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//             autoCapitalize="words"
//             autoCorrect={false}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <FontAwesome5 name="envelope" size={20} color="#666" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setShowPassword(!showPassword)}
//             style={styles.eyeIcon}
//           >
//             <FontAwesome5 
//               name={showPassword ? "eye" : "eye-slash"} 
//               size={20} 
//               color="#666" 
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputContainer}>
//           <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry={!showConfirmPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//             style={styles.eyeIcon}
//           >
//             <FontAwesome5 
//               name={showConfirmPassword ? "eye" : "eye-slash"} 
//               size={20} 
//               color="#666" 
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.signupButton}
//           onPress={handleSignup}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={styles.signupButtonText}>Sign Up</Text>
//           )}
//         </TouchableOpacity>

//         <View style={styles.divider}>
//           <View style={styles.dividerLine} />
//           <Text style={styles.dividerText}>OR</Text>
//           <View style={styles.dividerLine} />
//         </View>

//         <TouchableOpacity
//           style={styles.googleButton}
//           onPress={handleGoogleSignIn}
//           disabled={loading}
//         >
//           <FontAwesome5 name="google" size={20} color="#007AFF" />
//           <Text style={styles.googleButtonText}>Continue with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.switchButton}
        
//         >
//           <Text style={styles.switchText}>
//             Already have an account? <Text style={styles.switchTextBold}>Sign In</Text>
//           </Text>
       
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#007AFF',
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 30,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 20,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 8,
//   },
//   form: {
//     flex: 2,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 30,
//     paddingTop: 40,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 12,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#f8f9fa',
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 5,
//   },
//   signupButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 12,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   signupButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 25,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#e0e0e0',
//   },
//   dividerText: {
//     marginHorizontal: 20,
//     color: '#666',
//     fontSize: 14,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#007AFF',
//     borderRadius: 12,
//     height: 50,
//     backgroundColor: 'white',
//   },
//   googleButtonText: {
//     color: '#007AFF',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   switchButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   switchText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   switchTextBold: {
//     color: '#007AFF',
//     fontWeight: '600',
//   },
// });
