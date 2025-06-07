import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Book } from "../types";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  book: Book;
  onPress: () => void;
}

export default function BookCard({ book, onPress }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = getAuth().currentUser;

  const favoriteDocRef = user
    ? doc(db, "usuarios", user.uid, "favoritos", book.id)
    : null;

  useEffect(() => {
    const checkFavorite = async () => {
      if (!favoriteDocRef) return;
      const docSnap = await getDoc(favoriteDocRef);
      setIsFavorite(docSnap.exists());
    };

    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    if (!user || !favoriteDocRef) return;

    try {
      if (isFavorite) {
        await deleteDoc(favoriteDocRef);
        setIsFavorite(false);
      } else {
        await setDoc(favoriteDocRef, {
          titulo: book.title,
          imagen: book.imageLinks?.thumbnail || "",
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {book.imageLinks?.thumbnail && (
        <>
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Quitar favorito" : "Agregar favorito"}
            </Text>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        {book.subtitle && <Text>{book.subtitle}</Text>}
        <Text>{book.authors.join(", ")}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 180,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  overview: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    width: "48%", // 2 columnas (48% + 48% + margen = 100%)
    margin: "1%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  favoriteButton: {
    marginTop: 8,
    backgroundColor: "#2196F3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    alignSelf: "center",
  },
  favoriteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
