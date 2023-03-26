import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import routes from "./src/config/routes";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'AddGarden'}>
        {routes.map((r, i) => (
          <Stack.Screen
            key={i}
            name={r.name}
            component={r.component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



