import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { supabase } from "./index";
import { useNavigation } from "@react-navigation/native";

const GroupDetails = ({ route }) => {
  const { groupId } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const { data: groupData, error: groupError } = await supabase
          .from("gruposInova")
          .select("*")
          .eq("id", groupId)
          .single();

        if (groupError) {
          throw groupError;
        }

        setGroupDetails(groupData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      {groupDetails ? (
        <View>
          <Text style={styles.groupTitle}>Tema: {groupDetails.tema}</Text>
          <Text style={styles.groupDescription}>
            Dias de Apresentação: {groupDetails.diasApresentacao}
          </Text>
          <Text style={styles.sectionTitle}>Integrantes:</Text>
          <Text>
            {JSON.parse(groupDetails.integrantes)
              .map((member) => member.name)
              .join(", ")}
          </Text>
          <Text style={styles.sectionTitle}>Cursos:</Text>
          <Text>
            {JSON.parse(groupDetails.cursos)
              .map((course) => course.course)
              .join(", ")}
          </Text>
          <Text style={styles.sectionTitle}>Tópicos:</Text>
          <Text>
            {JSON.parse(groupDetails.topicos)
              .map((topic) => topic.topic)
              .join(", ")}
          </Text>
        </View>
      ) : (
        <Text>Grupo não encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  groupDescription: {
    fontSize: 17,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default GroupDetails;
