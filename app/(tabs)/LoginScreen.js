import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import uvv from "@/assets/images/UVV.png";
import { supabase } from "./index";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Usuário logado:", user);
      navigation.replace("Groups");
    } catch (error) {
      console.error("Erro. Tente novamente.", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={uvv} style={styles.logo} />
      <Text style={styles.header}>Seja bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#28a745" }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#28a745" }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
