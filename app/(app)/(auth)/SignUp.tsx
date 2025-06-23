import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://demo-app-backend-lac.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store token
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('userName', data.name);
      await AsyncStorage.setItem('userEmail', email);

      console.log('Signup success:', data);
      router.replace('/(app)/HomePage');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Failed' || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass:any) => {
    if (pass.length === 0) return { strength: 0, label: '', color: '#e5e7eb' };
    if (pass.length < 4) return { strength: 1, label: 'Weak', color: '#ef4444' };
    if (pass.length < 6) return { strength: 2, label: 'Fair', color: '#f59e0b' };
    if (pass.length < 8) return { strength: 3, label: 'Good', color: '#10b981' };
    return { strength: 4, label: 'Strong', color: '#059669' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with gradient */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-add" size={40} color="white" />
              </View>
              <Text style={styles.headerTitle}>Create Account</Text>
              <Text style={styles.headerSubtitle}>Join us and get started today</Text>
            </View>
          </LinearGradient>

          {/* Form Content */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    autoComplete="name"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <View style={styles.passwordStrength}>
                    <View style={styles.strengthBarContainer}>
                      {[1, 2, 3, 4].map((level) => (
                        <View
                          key={level}
                          style={[
                            styles.strengthBar,
                            {
                              backgroundColor: level <= passwordStrength.strength 
                                ? passwordStrength.color 
                                : '#e5e7eb'
                            }
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                      {passwordStrength.label}
                    </Text>
                  </View>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <View style={styles.passwordMatch}>
                    <Ionicons 
                      name={password === confirmPassword ? "checkmark-circle" : "close-circle"} 
                      size={16} 
                      color={password === confirmPassword ? "#10b981" : "#ef4444"}
                    />
                    <Text style={[
                      styles.matchText, 
                      { color: password === confirmPassword ? "#10b981" : "#ef4444" }
                    ]}>
                      {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                    </Text>
                  </View>
                )}
              </View>

              {/* Terms & Conditions */}
              <TouchableOpacity 
                style={styles.termsContainer}
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                  {acceptTerms && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity 
                style={[styles.signupButton, loading && styles.signupButtonDisabled]} 
                onPress={handleSignup}
                disabled={loading}
              >
                <LinearGradient
                  colors={loading ? ['#9ca3af', '#6b7280'] : ['#10b981', '#059669']}
                  style={styles.signupButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <View style={styles.signupButtonContent}>
                      <Ionicons name="hourglass-outline" size={20} color="white" />
                      <Text style={styles.signupButtonText}>Creating Account...</Text>
                    </View>
                  ) : (
                    <View style={styles.signupButtonContent}>
                      <Ionicons name="person-add-outline" size={20} color="white" />
                      <Text style={styles.signupButtonText}>Create Account</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Sign Up Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={20} color="#ea4335" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={20} color="#1877f2" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Link href="/(app)/(auth)/Login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
  },
  form: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  passwordToggle: {
    padding: 4,
  },
  passwordStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
  },
  strengthBar: {
    height: 4,
    flex: 1,
    marginRight: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  passwordMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  termsLink: {
    color: '#6366f1',
    fontWeight: '500',
  },
  signupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signupButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  signupButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  signupButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#374151',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#6b7280',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
});