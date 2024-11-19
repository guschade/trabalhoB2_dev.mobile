import { createClient } from "@supabase/supabase-js";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import RecoverPasswordScreen from "./RecoverPasswordScreen";
import Groups from "./Groups";
import GroupDetails from "./GroupDetails";

const SUPABASE_URL = "https://gphdiicyfhnbcxqpcdfr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaGRpaWN5ZmhuYmN4cXBjZGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4ODAyOTcsImV4cCI6MjA0NzQ1NjI5N30.JIiRSCwVld7JnQCVA1hKWwIYlTnO-t-0gG3Bvjg4Ze8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPasswordScreen}
        />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
