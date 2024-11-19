import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { supabase } from "./index";
import { useNavigation } from "@react-navigation/native";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Erro ao recuperar o usuário:", error);
      return;
    }

    if (!user) {
      console.log("Usuário não autenticado. Redirecionando para login.");
      navigation.replace("Login");
      return;
    }

    setUser(user);
    fetchGroups();
  };

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase.from("gruposInova").select("*");

      if (error) {
        throw error;
      }

      console.log("Dados dos Grupos Recuperados:", data);
      setGroups(data);
    } catch (error) {
      console.error("Erro ao recuperar os grupos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const renderGroup = ({ item }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.tema}</Text>
      <Text style={styles.groupDetail}>
        Dias de Apresentação: {item.diasApresentacao}
      </Text>
      <Text style={styles.groupDetail}>
        Integrantes:{" "}
        {JSON.parse(item.integrantes)
          .map((member) => member.name)
          .join(", ")}
      </Text>
      <Text style={styles.groupDetail}>
        Cursos:{" "}
        {JSON.parse(item.cursos)
          .map((course) => course.course)
          .join(", ")}
      </Text>
      <Text style={styles.groupDetail}>
        Tópicos:{" "}
        {JSON.parse(item.topicos)
          .map((topic) => topic.topic)
          .join(", ")}
      </Text>
      <Button
        title="Ver Detalhes"
        onPress={() =>
          navigation.navigate("GroupDetails", { groupId: item.id })
        }
      />
    </View>
  );

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && <Text style={styles.welcomeText}>Bem-vindo, {user.email}!</Text>}
      <Text style={styles.title}>Lista de Grupos</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroup}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupDetail: {
    fontSize: 14,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: "80%",
    backgroundColor: "#28a745", // Cor verde
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Groups;
