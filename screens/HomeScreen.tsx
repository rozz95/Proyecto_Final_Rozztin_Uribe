import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity,Text } from "react-native";
import { Book } from "../types";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import { auth } from '../firebase';
import { db } from '../firebase';



export default function HomeScreen({ navigation }: any) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

 return (
  <View style={styles.container}>
    {/* Header: Email, Perfil y Logout */}
    <View style={styles.header}>
      <Text style={styles.email}>
        Perfil: {auth.currentUser?.email ?? "Desconocido"}
      </Text>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileButton}>
          <Text style={styles.profileText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Lista de libros */}
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <BookCard
          book={item}
          onPress={() => navigation.navigate("Details", { book: item })}
        />
      )}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 8 }}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  email: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    marginRight: 12,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  profileText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
