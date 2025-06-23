// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   User, 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   signInWithPopup,
//   updateProfile
// } from 'firebase/auth';
// // import { auth, googleProvider } from '../firebaseConfig';

// import { auth,googleProvider } from '@/firebaseConfig';

// interface AuthContextType {
//   currentUser: User | null|undefined;
//   loading: boolean;
//   signup: (email: string, password: string, displayName: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

//  const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const signup = async (email: string, password: string, displayName: string) => {
//     const { user } = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(user, { displayName });
//   };

//   const login = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   const signInWithGoogle = async () => {
//     await signInWithPopup(auth, googleProvider);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value: AuthContextType = {
//     currentUser,
//     loading,
//     signup,
//     login,
//     logout,
//     signInWithGoogle,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;