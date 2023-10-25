import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';
import SplashScreen from './src/Screen/SplashScreen';
import { ProjectTheme } from './theme/theme';
import { AccountProvider } from './src/Context/AccountContext';
import { ProfileProvider } from './src/Context/ProfileContext';
import { HomeProvider } from './src/Context/HomeContext';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: ProjectTheme.colors,
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AccountProvider>
      <ProfileProvider>
        <HomeProvider>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </HomeProvider>
      </ProfileProvider>
    </AccountProvider>
  );
}
