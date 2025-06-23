import { Link } from "expo-router";
import { Text, View,TouchableOpacity } from "react-native";
import AccountList from "./(app)/AccountList";
import Homepage from "./(app)/HomePage";
import { useEffect, useState } from "react";
import LoadingScreen from "./(app)/LoadingScreen";


export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Add your app initialization logic here
        // For example: check authentication, load initial data, etc.
        
        // Simulate loading time (remove this in production)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // You can add real initialization logic here:
        // await checkAuthStatus();
        // await loadUserData();
        // await initializeServices();
        
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      {isLoading?<LoadingScreen/>:<Homepage/>}
      
    

    </View>
  );
}
